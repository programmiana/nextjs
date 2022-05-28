import {
  utils,
  Account,
  KeyPair,
  Near,
  connect,
  Contract,
  keyStores,
  transactions,
} from "near-api-js";
import Big from "big.js";
import ls from "local-storage";

import { FunctionCallOptions } from "near-api-js/lib/account";
const BN = require("bn.js");
// const fs = require("fs").promises;
export const OneNear = Big(10).pow(24);
const TGas = Big(10).pow(12);
export const BoatOfGas = Big(300).mul(TGas);
const RefStorageDeposit = Big(250)
  .mul(Big(10).pow(19))
  .add(1);
const StorageDeposit = Big(125).mul(Big(10).pow(19));
const PoolStorageDeposit = Big(500).mul(Big(10).pow(19));

export const config = {
  networkId: "testnet",
  masterAccount: "test.near",
  factoryContractAccount: "dev-1653697225261-53906288097280",
  //   keyPath: "/tmp/near-sandbox/validator_key.json",
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

type ChangeFunctionType = (
  arg: Omit<FunctionCallOptions, "methodName" | "contractId"> & {
    amount?: string;
  }
) => any;

type ViewFunctionType = (a?: {
  args?: FunctionCallOptions["args"];
  [s: string]: any;
}) => any;

export interface FactoryContractWithMethods extends Contract {
  get_required_deposit: ViewFunctionType;
  get_number_of_tokens: ViewFunctionType;
  get_tokens: ViewFunctionType;
  get_token: ViewFunctionType;

  create_token: ChangeFunctionType;
  storage_deposit: ChangeFunctionType;
}

export interface TokenContractWithMethods extends Contract {
  nft_total_supply: ViewFunctionType;
  nft_tokens: ViewFunctionType;
  nft_supply_for_owner: ViewFunctionType;
  nft_tokens_for_owner: ViewFunctionType;
  nft_token: ViewFunctionType;
  new_default_meta: ChangeFunctionType;
  nft_mint: ChangeFunctionType;
}

export const tokenContractMethods: {
  viewMethods: [
    "nft_total_supply",
    "nft_tokens",
    "nft_supply_for_owner",
    "nft_tokens_for_owner",
    "nft_token"
  ];
  changeMethods: ["new_default_meta", "nft_mint"];
} = {
  viewMethods: [
    "nft_total_supply",
    "nft_tokens",
    "nft_supply_for_owner",
    "nft_tokens_for_owner",
    "nft_token",
  ],
  changeMethods: ["new_default_meta", "nft_mint"],
};

export const factoryContractMethods: {
  viewMethods: [
    "get_required_deposit",
    "get_number_of_tokens",
    "get_tokens",
    "get_token"
  ];
  changeMethods: ["create_token", "storage_deposit"];
} = {
  viewMethods: [
    "get_required_deposit",
    "get_number_of_tokens",
    "get_tokens",
    "get_token",
  ],
  changeMethods: ["create_token", "storage_deposit"],
};

export async function getSouls(tokenContract, args) {
  return tokenContract.nft_tokens(args);
}

export async function getToken(
  factoryContract: FactoryContractWithMethods,
  args
) {
  const tokens = await factoryContract.get_token(args);
  return tokens;
}

export async function getTokens(
  factoryContract: FactoryContractWithMethods,
  args
) {
  const tokens = await factoryContract.get_tokens(args);
  return tokens;
}

export async function mintNTT(
  tokenContractAsUser: TokenContractWithMethods,
  metadata: object,
  receiver_id: string
) {
  /**
   *
   * Test creating NTTs in end contract
   *
   */

  // see for reference: https://github.com/near-examples/NFT/blob/master/integration-tests/ts/src/main.ava.ts
  await tokenContractAsUser.nft_mint({
    amount: new BN("561000000000000000000000"),
    attachedDeposit: new BN("561000000000000000000000"),
    // gas: tGas("150"),
    args: {
      // FIXME:
      token_id: Math.random()
        .toString()
        .slice(3, 8),
      metadata: {
        title: "",
        description: "",
        media: null,
        media_hash: null,
        copies: 1,
        issued_at: null,
        expires_at: null,
        starts_at: null,
        updated_at: null,
        extra: null,
        reference: null,
        reference_hash: null,
        ...metadata,
      },
      receiver_id: receiver_id,
    },
  } as any);
}

export async function createNTTCollection(
  factoryContractUser: FactoryContractWithMethods,
  ownerAccountId: any,
  userAccount: Account,
  metadata = {}
) {
  const args = {
    owner_id: ownerAccountId,
    metadata: {
      spec: "ntt-0.0.1",
      name: "BOOP",
      // This symbol is used to determine the address boop2.
      symbol: "Boop2",
      icon: "xyz",
      decimals: 1,
      ...metadata,
    },
  };
  const requiredDeposit = Big(
    await factoryContractUser.get_required_deposit({
      args,
      account_id: ownerAccountId,
    })
  );
  if (requiredDeposit.eq(0)) {
    // We have enough $$! Awesome
    await factoryContractUser.create_token({
      args: {
        args: {
          ...args,
        },
      },
      gas: new BN(BoatOfGas.toFixed(0)),
    });
  } else {
    //TODO: This branch of the if doesn't quite work
    // ls(lsKeyToken, args);
    // ls(lsKeyCreateToken, true);
    await userAccount.signAndSendTransaction(config.factoryContractAccount, [
      await factoryContractUser.storage_deposit({
        args: {},
        // Maybe not BN( wrap)
        gas: new BN(BoatOfGas.toFixed(0)),
        amount: requiredDeposit.toFixed(0),
      }),
      await factoryContractUser.create_token({
        args: {
          args: {
            ...args,
          },
        },
        // Maybe not BN( wrap)
        gas: new BN(BoatOfGas.toFixed(0)),
      }),
    ]);
  }
}

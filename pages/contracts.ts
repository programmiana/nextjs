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

interface TokenContractWithMethods extends Contract {
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

export async function createNTTCollection(
  factoryContractUser: FactoryContractWithMethods,
  ownerAccountId: any,
  userAccount: Account,
  metadata = {},
  collectionMetadata = {}
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
          metadata: {
            ...args.metadata,
            ...collectionMetadata,
          },
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
            metadata: {
              ...args.metadata,
              ...collectionMetadata,
            },
          },
        },
        // Maybe not BN( wrap)
        gas: new BN(BoatOfGas.toFixed(0)),
      }),
    ]);
  }
}

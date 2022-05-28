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
const fs = require("fs").promises;
export const OneNear = Big(10).pow(24);
const TGas = Big(10).pow(12);
export const BoatOfGas = Big(300).mul(TGas);
const RefStorageDeposit = Big(250).mul(Big(10).pow(19)).add(1);
const StorageDeposit = Big(125).mul(Big(10).pow(19));
const PoolStorageDeposit = Big(500).mul(Big(10).pow(19));

type ChangeFunctionType = (
  arg: Omit<FunctionCallOptions, "methodName" | "contractId"> & {
    amount?: string;
  }
) => any;

type ViewFunctionType = (a?: {
  args?: FunctionCallOptions["args"];
  [s: string]: any;
}) => any;

interface FactoryContractWithMethods extends Contract {
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

function getConfig(env): {
  networkId: string;
  nodeUrl: string;
  masterAccount: string;
  factoryContractAccount: string;
  keyPath: string;
} {
  switch (env) {
    case "sandbox":
    case "local":
      return {
        networkId: "sandbox",
        nodeUrl: "http://localhost:3030",
        masterAccount: "test.near",
        factoryContractAccount: "ntt_simple.test.near",
        keyPath: "/tmp/near-sandbox/validator_key.json",
      };
  }
}

const tokenContractMethods: {
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

const factoryContractMethods: {
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
let config;
let masterAccount: Account;
let masterKey: KeyPair;
let pubKey: utils.key_pair.PublicKey;
let keyStore: keyStores.InMemoryKeyStore;
let near: Near;

export const toTokenAccountId = (tokenId) => {
  config = getConfig(process.env.NEAR_ENV || "sandbox");
  `${tokenId.toLowerCase()}.${config.factoryContractAccount}`;
};

async function initNear() {
  config = getConfig(process.env.NEAR_ENV || "sandbox");
  const keyFile = require(config.keyPath);
  masterKey = utils.KeyPair.fromString(
    keyFile.secret_key || keyFile.private_key
  );
  pubKey = masterKey.getPublicKey();
  keyStore = new keyStores.InMemoryKeyStore();
  keyStore.setKey(config.networkId, config.masterAccount, masterKey);
  near = await connect({
    deps: {
      keyStore,
    },
    headers: {},
    networkId: config.networkId,
    nodeUrl: config.nodeUrl,
  });
  masterAccount = new Account(near.connection, config.masterAccount);
  console.log("Finish init NEAR");
}

async function createAccount(accountPrefix) {
  let accountId = accountPrefix + "." + config.masterAccount;

  await masterAccount.createAccount(
    accountId,
    pubKey,
    new BN(10).pow(new BN(25))
  );
  const account = new Account(near.connection, accountId);
  keyStore.setKey(config.networkId, accountId, masterKey);

  return account;
}

async function test() {
  // 1. Creates testing accounts and deploys a contract
  await initNear();

  const tokenContract = await fs.readFile("../token/build-output/main.wasm");
  const factoryContract = await fs.readFile(
    "../factory/res/token_factory.wasm"
  );
  // This is definitely creating an account at this address
  const _contractAccount = await masterAccount.createAndDeployContract(
    config.factoryContractAccount,
    pubKey,
    factoryContract,
    new BN(10).pow(new BN(25))
  );

  // Initialize contract!
  await masterAccount.functionCall(config.factoryContractAccount, "new", {});

  const aliceAccount = await createAccount("alice");
  const aliceUseFactoryContract = new Contract(
    aliceAccount,
    config.factoryContractAccount,
    factoryContractMethods
  ) as FactoryContractWithMethods;

  // const bobAccount = await createAccount("bob");
  // const bobUseFactoryContract = new Contract(
  //   bobAccount,
  //   config.factoryContractAccount,
  //   factoryContractMethods
  // ) as FactoryContractWithMethods;

  console.log("Finish deploy contracts and create test accounts");

  await createNTTCollection(
    aliceUseFactoryContract,
    aliceAccount.accountId,
    {}
  );
  const aliceUseTokenContract = new Contract(
    aliceAccount,
    "bop.ntt_simple.test.near",
    tokenContractMethods
  ) as TokenContractWithMethods;
  await mintNTT(aliceUseTokenContract, {});
  console.log(5);
  await listNTTs(aliceUseTokenContract);
  console.log("6");

  return;

  async function listNTTs(tokenContractAsUser: TokenContractWithMethods) {
    console.log(await tokenContractAsUser.nft_tokens());
  }
  async function mintNTT(
    tokenContractAsUser: TokenContractWithMethods,
    metadata
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
        token_id: "0",
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
        receiver_id: "ntt_simple",
      },
    } as any);
    // const tokenAccountId = toTokenAccountId(tokenId);

    // await this._refContract.account.signAndSendTransaction(tokenAccountId, [
    //   transactions.functionCall(
    //     "storage_deposit",
    //     {
    //       account_id: this._accountId,
    //       registration_only: false,
    //     },
    //     TGas.mul(5).toFixed(0),
    //     RefStorageDeposit.toFixed(0)
    //   ),
    //   transactions.functionCall(
    //     "register_tokens",
    //     {
    //       token_ids: [tokenAccountId],
    //     },
    //     TGas.mul(5).toFixed(0),
    //     0
    //   ),
    // ]);
  }

  async function createNTTCollection(
    factoryContractUser: FactoryContractWithMethods,
    ownerAccountId,
    metadata = {},
    collectionMetadata = {}
  ) {
    const args = {
      owner_id: ownerAccountId,
      metadata: {
        spec: "ntt-0.0.1",
        name: "BOOP",
        symbol: "Boop2",
        icon: "xyz",
        decimals: 1,
      },
    };
    console.log("1");
    const requiredDeposit = Big(
      await factoryContractUser.get_required_deposit({
        args,
        account_id: ownerAccountId,
      })
    );
    // ls(lsKeyToken, args);
    // ls(lsKeyCreateToken, true);
    console.log("2");
    await factoryContractUser.storage_deposit({
      args: {},
      gas: BoatOfGas.toFixed(0),
      amount: requiredDeposit.toFixed(0),
    });
    console.log("3");
    await factoryContractUser.create_token({
      args: {
        args: {
          owner_id: ownerAccountId,
          metadata: {
            spec: "ntt-0.0.1",
            name: "Bop",
            symbol: "bop",
            icon: null,
            reference: null,
            reference_hash: null,
            decimals: 2,
            ...collectionMetadata,
          },
        },
      },
      gas: BoatOfGas.toFixed(0),
    });
    console.log("4");

    // const aliceUseTokenContract = new Contract(
    //   aliceAccount,
    //   "bop.ntt_simple.test.near",
    //   tokenContractMethods
    // ) as TokenContractWithMethods;

    // Initialize
    // await aliceUseTokenContract.new_default_meta({
    //   args: {
    //     owner_id: "ntt_simple",
    //     metadata: {
    //       spec: "ntt-0.0.1",
    //       name: "BOOm",
    //       symbol: "BLAH",
    //       icon: "BLAH",
    //       base_uri: "TODO",
    //       ...metadata,
    //       // spec: String,              // required, essentially a version like "nft-1.0.0"
    //       //   name: String,              // required, ex. "Mosaics"
    //       //   symbol: String,            // required, ex. "MOSIAC"
    //       //   icon: Option<String>,      // Data URL
    //       //   base_uri: Option<String>, // Centralized gateway known to have reliable access to decentralized storage assets referenced by `reference` or `media` URLs
    //       //   reference: Option<String>, // URL to a JSON file with more info
    //       //   reference_hash: Option<Base64VecU8>, // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
    //     },
    //   },
    // });
  }
}

test();

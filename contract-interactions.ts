import {
  utils,
  Account,
  KeyPair,
  Near,
  connect,
  Contract,
  keyStores,
} from "near-api-js";
import { FunctionCallOptions } from "near-api-js/lib/account";
const BN = require("bn.js");
const fs = require("fs").promises;

type ChangeFunctionType = (
  arg: Omit<FunctionCallOptions, "methodName" | "contractId">
) => any;

type ViewFunctionType = (a?: { args?: FunctionCallOptions["args"] }) => any;

interface ContractWithMethods extends Contract {
  nft_total_supply: ViewFunctionType;
  nft_tokens: ViewFunctionType;
  nft_supply_for_owner: ViewFunctionType;
  nft_tokens_for_owner: ViewFunctionType;
  nft_token: ViewFunctionType;
  new_default_meta: ChangeFunctionType;
  nft_mint: ChangeFunctionType;
}

// // Initializing our contract APIs by contract name and configuration.
// window.contract = await near.loadContract(config.contractName, {
// ...
//   // View methods are read only. They don't modify the state, but usually return some value.
//   viewMethods: ["hello"],
//   // Change methods can modify the state. But you don't receive the returned value when called.
//   changeMethods: [],
// ...
// });

function getConfig(env): {
  networkId: string;
  nodeUrl: string;
  masterAccount: string;
  contractAccount: string;
  keyPath: string;
} {
  switch (env) {
    case "sandbox":
    case "local":
      return {
        networkId: "sandbox",
        nodeUrl: "http://localhost:3030",
        masterAccount: "test.near",
        contractAccount: "ntt_simple.test.near",
        keyPath: "/tmp/near-sandbox/validator_key.json",
      };
  }
}

const contractMethods: {
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
let config;
let masterAccount: Account;
let masterKey: KeyPair;
let pubKey: utils.key_pair.PublicKey;
let keyStore: keyStores.InMemoryKeyStore;
let near: Near;

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

export async function mintNFT(
  contract: ContractWithMethods,
  tokenId: string, // '0',
  metadata?: object,
  amount?: "561000000000000000000000"
) {
  await contract.nft_mint({
    amount: new BN(amount),
    attachedDeposit: new BN(amount),
    // gas: tGas("150"),
    args: {
      token_id: tokenId,
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
}

async function getContractsOfAccount(account: Account) {
  // TODO: How?
}

async function getContractObject(
  account: Account
): Promise<ContractWithMethods> {
  return new Contract(
    account,
    // Account of user, such as test.near.wallet
    "TODO",
    contractMethods
  ) as ContractWithMethods;
}

async function createContract(account: Account): Promise<void> {
  const contract = await fs.readFile("../build-output/main.wasm");
  const _contractAccount = await masterAccount.createAndDeployContract(
    // Account of user, such as test.near.wallet
    "TODO",
    pubKey,
    contract,
    new BN(10).pow(new BN(25))
  );
}

// async function createContractUser(accountPrefix, contractAccountId) {
//   let accountId = accountPrefix + "." + config.masterAccount;
//   await masterAccount.createAccount(
//     accountId,
//     pubKey,
//     new BN(10).pow(new BN(25))
//   );
//   keyStore.setKey(config.networkId, accountId, masterKey);
//   const account = new Account(near.connection, accountId);
//   const accountUseContract = new Contract(
//     account,
//     contractAccountId,
//     contractMethods
//   );
//   return [accountUseContract, account];
// }

// async function initTest(): Promise<{
//   aliceUseContract: ContractWithMethods;
//   bobUseContract: ContractWithMethods;
//   aliceAccount: Account;
//   bobAccount: Account;
// }> {
//   const contract = await fs.readFile("../build-output/main.wasm");
//   const _contractAccount = await masterAccount.createAndDeployContract(
//     config.contractAccount,
//     pubKey,
//     contract,
//     new BN(10).pow(new BN(25))
//   );

//   const [aliceUseContract, aliceAccount] = await createContractUser(
//     "alice",
//     config.contractAccount
//   );

//   const [bobUseContract, bobAccount] = await createContractUser(
//     "bob",
//     config.contractAccount
//   );
//   console.log("Finish deploy contracts and create test accounts");
//   return { aliceUseContract, bobUseContract, aliceAccount, bobAccount } as any;
// }

// async function test() {
//   // 1. Creates testing accounts and deploys a contract
//   await initNear();
//   const { aliceUseContract, bobUseContract, aliceAccount, bobAccount } =
//     await initTest();

//   await aliceUseContract.new_default_meta({
//     args: { owner_id: "ntt_simple" },
//   });
//   // see for reference: https://github.com/near-examples/NFT/blob/master/integration-tests/ts/src/main.ava.ts
//   await aliceUseContract.nft_mint({
//     amount: new BN("561000000000000000000000"),
//     attachedDeposit: new BN("561000000000000000000000"),
//     // gas: tGas("150"),
//     args: {
//       token_id: "0",
//       metadata: {
//         title: "",
//         description: "",
//         media: null,
//         media_hash: null,
//         copies: 1,
//         issued_at: null,
//         expires_at: null,
//         starts_at: null,
//         updated_at: null,
//         extra: null,
//         reference: null,
//         reference_hash: null,
//       },
//       receiver_id: "ntt_simple",
//     },
//   } as any);

//   console.log(await aliceUseContract.nft_tokens());
//   // await aliceUseContract.
//   // 2. Performs a `set_status` transaction signed by Alice and then calls `get_status` to confirm `set_status` worked
//   // await aliceUseContract.set_status({ args: { message: "hello" } });
//   // let alice_message = await aliceUseContract.get_status({
//   //   account_id: "alice.test.near",
//   // });
//   // assert.equal(alice_message, "hello");
// }

// test();

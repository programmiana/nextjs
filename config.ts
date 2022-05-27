import * as nearAPI from "near-api-js";
declare var window: any;

// creates keyStore using private key in local storage
// * REQUIRES SignIn using walletConnection.requestSignIn() *

// const { connect, keyStores, WalletConnection } = nearAPI;
// const keyStore = new keyStores.BrowserLocalStorageKeyStore();

const config = {
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};


export default config
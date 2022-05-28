import { WebBundlr } from "@bundlr-network/client/build/web";
import { WalletConnection } from "near-api-js";
import { useContext } from "react";
// import { getWallet } from  need to get the wallet address from the connection from NEAR

export async function getBundlr(wal: WalletConnection){
  if(!wal) return;
  console.log(wal)
  const bundlr = new WebBundlr("https://node1.bundlr.network", "near", wal);
  if(bundlr){
    await bundlr.ready();
    return bundlr;
  }
};

export async function uploadImageToArweave(wallet) {
  return true;
  // do bundlr stuff TODO and comment out line above
  await getBundlr(wallet);
}

export const createTx = async (wal, text, tags) => {
  const bundlr = await getBundlr(wal);
  const amount = await bundlr?.createTransaction(text, { tags });
console.log(amount)
  console.log("tx created");
};

export const fundBundlr = async (bun, size) => {
  // calculate amount based on size * 10%
  const total = Math.round(Number(size) * 1.1);

  const amount = (await bun.getPrice(total)).toString();
  await bun.fund(amount);
  await delay(1000); // wait for funding to occur
  // check balance
  const balance = (await bun.getLoadedBalance()).toString();
  if (Number(balance) >= Number(amount)) {
    return true;
  }
  return false;
};

function delay(t) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve();
    }, t);
  });
}

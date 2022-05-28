import { WebBundlr } from "@bundlr-network/client/build/web";
import { useContext } from "react";
// import { getWallet } from  need to get the wallet address from the connection from NEAR

const getBundlr = async (wallet) => {
  // const wallet = await getWallet()
  // hi david here we need a wallet
  const bundlr = new WebBundlr("https://node1.bundlr.network", "near", wallet);
  await bundlr.ready();
  return bundlr;
  console.log("tx created");
};

export async function uploadImageToArweave(wallet) {
  return true;
  // do bundlr stuff TODO and comment out line above
  await getBundlr(wallet);
}

export const createTx = async (text, tags) => {
  const bundlr = await getBundlr();
  return await bundlr.createTransaction(text, { tags });
  console.log("tx created");
};

export const fundBundlr = async (size) => {
  const bundlr = await getBundlr();
  // calculate amount based on size * 10%
  const total = Math.round(Number(size) * 1.1);

  const amount = (await bundlr.getPrice(total)).toString();
  await bundlr.fund(amount);
  await delay(1000); // wait for funding to occur
  // check balance
  const balance = (await bundlr.getLoadedBalance()).toString();
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


import { WalletConnection } from "near-api-js";
import { useState, useEffect } from "react";
import { WebBundlr } from "@bundlr-network/client/build/web";


export function useBundlr(wallet: any) {
  const [getBundlr, setBundlr] = useState<any>();
  const [bundlrRes, setBundlrRes] = useState<any>();
  const [createTx, setCreateTx] = useState<any>();
  const [connectWallet, setConnectWallet] = useState<boolean>(false);


  const text = "text";
  const tags = {};

  useEffect(() => {
    const fetchData = async () => {
      const bundlr = new WebBundlr(
        "https://node1.bundlr.network",
        "near",
        wallet
      );
      setBundlr(bundlr);
    };

    fetchData().catch((e) => console.log(e));
  }, [wallet]);

    
  // useEffect(() => {
  //   if (!getBundlr) return;
  //   setCreateTx(getBundlr.createTransaction(text, tags));
  //   console.log("works I guesss")
  // }, [getBundlr]);

  return { bundlr: getBundlr }
}





import { WalletConnection } from "contract/contract-testing/node_modules/near-api-js/lib";
import { useState, useEffect } from "react";
import * as nearAPI from "near-api-js";
import config from "config";

export function useFetchNear() {
  const [response, setResponse] = useState<any>();
  const [wallet, setWallet] = useState<WalletConnection>();
  const [connectWallet, setConnectWallet] = useState<boolean>(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();

    const fetchData = async () => {
      const response = await nearAPI.connect({
        ...config,
        keyStore,
        headers: {},
      });
      setResponse(response);
    };
    fetchData().catch((e) => console.log(e));
  }, [connectWallet]);

  const myFunction = async () => {
    if (wallet && !wallet?.isSignedIn()) {
      return wallet?.requestSignIn();
    }
  };

  useEffect(() => {
    if (!response) return;
    const walletConn = new WalletConnection(response, "my-app");
    setWallet(walletConn);

    myFunction();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, connectWallet]);

  const accountId = wallet?.getAccountId();

  return { wallet };
}

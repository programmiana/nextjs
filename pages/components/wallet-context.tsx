import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { connect, Near, WalletConnection } from "near-api-js";
import { useRouter } from "next/router";
import {
  cloneElement,
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import styles from "../../styles/Home.module.css";
import PrimaryButton from "./button";
import ObjectCanvas from "./three-object";
import config from "../../config";
import * as nearAPI from "near-api-js";
import React from "react";

const WalletContext = createContext<
  | {
      setConnectWallet: Dispatch<SetStateAction<boolean>>;
      wallet: WalletConnection;
    }
  | undefined
>(undefined);

function WalletProvider({ children }: any) {
  const [response, setResponse] = useState<any>();
  const [wallet, setWallet] = useState<WalletConnection | undefined>();
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
  }, [response, connectWallet]);

  const accountId = wallet?.getAccountId();

  if (!wallet) return <p>loading</p>;

  const value = { wallet, setConnectWallet };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

function useWallet() {
  const context = useContext(WalletContext);

  console.log(context);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}

export { WalletProvider, useWallet };

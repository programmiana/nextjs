/* eslint-disable @next/next/no-sync-scripts */
import "../styles/globals.css";
import Layout from "./components/layout";
import { WalletProvider } from "./components/wallet-context";
import Api from "arweave/node/lib/api";
import { useEffect } from "react";
//import { arweave } from './api/api';
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [creationState, setCreationState] = useLocalStorage(
    "creationState",
    ""
  );

  useEffect(() => {
    // Only on first render
    if (creationState) {
      try {
        const parsedCreationState = JSON.parse(creationState);
        setCreationState("")
        router.push(
          `/your-collection/${parsedCreationState.tokenId}`,
          undefined,
          { shallow: true }
        );
      } catch (err) {
        // ignore
      }
    }
  }, []);

  return (
    <WalletProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WalletProvider>
  );
}

export default MyApp;

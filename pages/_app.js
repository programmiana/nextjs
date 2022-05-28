/* eslint-disable @next/next/no-sync-scripts */
import "../styles/globals.css";
import Layout from "./components/layout";
import { WalletProvider } from "./components/wallet-context";
import Api from "arweave/node/lib/api";
//import { arweave } from './api/api';

function MyApp({ Component, pageProps }) {
  return (
    <WalletProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WalletProvider>
  );
}

export default MyApp;

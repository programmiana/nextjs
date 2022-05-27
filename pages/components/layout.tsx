import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { connect, Near, WalletConnection } from "near-api-js";
import { useRouter } from "next/router";
import { cloneElement, FC, ReactNode, useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import PrimaryButton from "../components/button";
import ObjectCanvas from "./three-object";
import config from "../../config";
import * as nearAPI from "near-api-js";
import { useWallet, WalletProvider } from "./wallet-context";
import SecondaryButton from "./secondary-button";
declare var window: any;

type LayoutProps = {
  children: ReactNode;
};

const StyledAppBar = styled(AppBar)`
  background-color: black;
  padding: 1rem;
`;

const Layout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  const { wallet, setConnectWallet } = useWallet();

  const accountId = wallet.getAccountId();
  return (
    <Box>
      <StyledAppBar position="static">
        <Stack spacing={0} alignItems="center">
          <h1 className={styles.title}>Badger </h1>
          <ObjectCanvas />
        </Stack>
      </StyledAppBar>
      <Grid container spacing={1}>
        <Grid
          item
          xs
          style={{ backgroundColor: "black", height: "100vh" }}
        ></Grid>
        <Grid xs={8} item>
          {accountId && (
            <SecondaryButton
              label={"sign out"}
              onClick={() => {
                wallet?.signOut();
                router.push("/", undefined, {
                  shallow: true,
                });
              }}
            />
          )}

          <Stack
            style={{ minWidth: "100%" }}
            padding={8}
            direction="row"
            alignItems="start"
            justifyItems="space-between"
            justifyContent="space-around"
            gap={4}
          >
            {!accountId && (
              <PrimaryButton
                label={"connect wallet"}
                onClick={() => {
                  setConnectWallet(true);
                }}
              />
            )}
            {children}
          </Stack>
        </Grid>
        <Grid
          item
          xs
          style={{ backgroundColor: "black", height: "100vh" }}
        ></Grid>
      </Grid>
      <footer
        style={{ backgroundColor: "black", width: "100vw", border: "none" }}
        className={styles.footer}
      >
        Powered by stuff
      </footer>
    </Box>
  );
};

export default Layout;

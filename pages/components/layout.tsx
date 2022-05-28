import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";
import styles from "../../styles/Home.module.css";
import PrimaryButton from "../components/button";
import SecondaryButton from "./secondary-button";
import ObjectCanvas from "./three-object";
import { useWallet } from "./wallet-context";
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
          <Link href="/">
            <h1 className={styles.title}>SoulBadge</h1>
          </Link>
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
          {accountId && <Link href="/list">My collections</Link>}
          {"  "}
          {accountId && <Link href="/">Create new collection</Link>}

          {accountId && (
            <SecondaryButton
              label={"sign out"}
              onClick={() => {
                wallet?.signOut();
                setConnectWallet(false);
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

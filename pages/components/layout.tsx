import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { FC, ReactNode } from "react";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import styled from "@emotion/styled";
import AppBar from "@mui/material/AppBar";
import ObjectCanvas from "./three-object";
import { Stack } from "@mui/material";

type LayoutProps = {
  children: ReactNode;
};

const StyledAppBar = styled(AppBar)`
  background-color: black;
  padding: 1rem;
`;

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Box>
      <StyledAppBar position="static">
        <Stack spacing={0} alignItems="center">
          <h1 className={styles.title}>Badger </h1>
          <ObjectCanvas />
        </Stack>
      </StyledAppBar>
      <Grid container spacing={1}>
        <Grid item xs style={{backgroundColor: 'black', height: '100vh'}}></Grid>
        <Grid item xs={8}>
          <div>{children}</div>
        </Grid>
        <Grid item xs style={{backgroundColor: 'black', height: '100vh'}}></Grid>
      </Grid>
      <footer style={{backgroundColor: 'black', width: '100vw', border: 'none'}} className={styles.footer}     >Powered by stuff</footer>
    </Box>
  );
};

export default Layout;

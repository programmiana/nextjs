import Head from "next/head";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import ObjectCanvas from "./components/three-object";
import styles from "../styles/Home.module.css";
import PrimaryButton from "./components/button";
import { FC } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { useWallet } from "./components/wallet-context";
import SecondaryButton from "./components/secondary-button";
import { useRouter } from "next/router";
import {
  config,
  createNTTCollection,
  factoryContractMethods,
  fundAccount,
  FactoryContractWithMethods,
} from "./contracts";
import { Contract } from "near-api-js/lib/contract";

type WelcomePromptProps = {
  name?: string;
  address?: String;
};
const WelcomePrompt: FC<WelcomePromptProps> = ({ name = "stranger" }) => {
  const { wallet } = useWallet();
  const router = useRouter();

  const accountName = wallet._authData.accountId;
  return (
    <Box>
      <Stack gap={3}>
        <Typography variant="h5" noWrap>
          Hi {accountName ?? name},{" "}
          {accountName
            ? "get started by creating a collection"
            : " to create a collection please connect your wallet 🤠"}
        </Typography>
        {accountName && (
          <PrimaryButton
            label={"create collection"}
            onClick={() =>
              router.push("/create-collection", undefined, {
                shallow: true,
              })
            }
          />
        )}
        {accountName && (
          <PrimaryButton
            label={"Fund wallet"}
            onClick={() => {
              const userAccount = wallet!.account();
              const userUseFactoryContract = new Contract(
                userAccount,
                config.factoryContractAccount,
                factoryContractMethods
              ) as FactoryContractWithMethods;
              fundAccount(userUseFactoryContract, wallet.getAccountId());
            }}
          />
        )}
      </Stack>
    </Box>
  );
};

export default WelcomePrompt;

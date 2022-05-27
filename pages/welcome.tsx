import Head from "next/head";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import ObjectCanvas from "./components/three-object";
import styles from "../styles/Home.module.css";
import PrimaryButton from "./components/button";
import { FC } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

type WelcomePromptProps = {
  name?: string;
  address?: String;
};
const WelcomePrompt: FC<WelcomePromptProps> = ({
  name = "stranger",
  address,
}) => {
  return (
      <Box>
      <Typography variant="h5" noWrap>
        Hi {name}, to create a collection please connect your wallet 🤠
      </Typography>
      </Box>
  );
};

export default WelcomePrompt;

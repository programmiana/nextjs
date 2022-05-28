import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { FC, ReactNode } from "react";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import styled from "@emotion/styled";
import AppBar from "@mui/material/AppBar";
import ObjectCanvas from "./three-object";
import { Button, Stack } from "@mui/material";

type ButtonProps = {
  label: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset",
  disabled?: boolean
};

const StyledAppBar = styled(AppBar)`
  background-color: black;
  padding: 1rem;
`;

const StyledButton = styled(Button)`
  color: black;
  padding: 1rem;

  &:hover{
    color: deeppink;
  }
`;
const SecondaryButton: FC<ButtonProps> = ({ label, onClick, type, disabled }) => {
  return <StyledButton disabled={disabled} type={type} onClick={onClick} variant="text">{label}</StyledButton>;
};

export default SecondaryButton;

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
};

const StyledAppBar = styled(AppBar)`
  background-color: black;
  padding: 1rem;
`;

const StyledButton = styled(Button)`
  color: black;
  border: 1px solid black;
  padding: 1rem;
  font-size: 25px;

  &:hover{
    color: deeppink;
    border: 1px solid deeppink;
  }
`;
const PrimaryButton: FC<ButtonProps> = ({ label, onClick }) => {
  return <StyledButton onClick={onClick} variant="outlined">{label}</StyledButton>;
};

export default PrimaryButton;

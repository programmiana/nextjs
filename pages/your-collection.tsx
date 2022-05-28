import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FC, useContext } from "react";
import { WalletContext } from "./components/wallet-context";

const YourCollection: FC = ({}) => {
  const { wallet } = useContext(WalletContext)!;

  return (
    <Box alignItems={"center"}>
      <Typography variant="h4" noWrap>
        Your Templates
      </Typography>
    </Box>
  );
};

export default YourCollection;

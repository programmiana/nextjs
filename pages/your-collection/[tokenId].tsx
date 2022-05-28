import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Contract } from "near-api-js/lib/contract";
import {
  config,
  mintNTT,
  TokenContractWithMethods,
  tokenContractMethods,
} from "../contracts";
import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";
import UndrawSvgs from "../components/undrawSvgs";
import { WalletContext } from "../components/wallet-context";
import Button from "../components/button";
import TextField from "@mui/material/TextField";

const YourCollection: FC = ({}) => {
  const { wallet } = useContext(WalletContext)!;
  const router = useRouter();
  const [data, setData] = useState<any>();
  const [input, setInput] = useState("");
  // Todo load data from the chain.

  async function mint() {
    const useTokenContract = new Contract(
      wallet.account(),
      `${router.query.tokenId}.${config.factoryContractAccount}`,
      tokenContractMethods
    ) as TokenContractWithMethods;

    await mintNTT(useTokenContract, {}, "");
  }

  const templateData = sessionStorage.getItem("templateData");
  useEffect(() => {
    setData(JSON.parse(templateData!));
  }, [templateData]);
  console.log(data);

  if (!data) return <p>Loading...</p>;
  return (
    <Box alignItems={"center"}>
      <Typography variant="h4" noWrap color={"purple"}>
        {data.badgeTitle}
      </Typography>
      <div>
        <b>Mint a new NFT</b>
        <TextField
          id="collection-name"
          label={"near account name"}
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
        />
        <Button
          label={"Mint Soulbound token to address"}
          onClick={() => mint()}
        />
      </div>
      <UndrawSvgs option={data.svgName.replace(/\s/g, "")} />
    </Box>
  );
};

export default YourCollection;

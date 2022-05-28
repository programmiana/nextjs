import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Contract } from "near-api-js/lib/contract";
import {
  config,
  mintNTT,
  getToken,
  TokenContractWithMethods,
  tokenContractMethods,
  FactoryContractWithMethods,
  factoryContractMethods,
  getSouls,
} from "../contracts";
import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";
import UndrawSvgs from "../components/undrawSvgs";
import { WalletContext } from "../components/wallet-context";
import SecondaryButton from "../components/secondary-button";
import TextField from "@mui/material/TextField";
import { getArweaveImage } from "pages/api/bundlr";

const YourCollection: FC = ({}) => {
  const { wallet } = useContext(WalletContext)!;
  const router = useRouter();
  const [input, setInput] = useState("");
  // Todo load data from the chain.

  async function mint() {
    const useTokenContract = new Contract(
      wallet.account(),
      `${router.query.tokenId}.${config.factoryContractAccount}`,
      tokenContractMethods
    ) as TokenContractWithMethods;

    await mintNTT(useTokenContract, {}, input);
  }
  const [image, setImage] = useState("");
  const [data, setData] = useState(null);
  const [souls, setSouls] = useState(null);

  // Todo load data from the chain.

  async function fetchSouls() {
    const userAccount = wallet!.account();
    const userUseTokenContract = new Contract(
      userAccount,
      `${router.query.tokenId}.${config.factoryContractAccount}`,
      tokenContractMethods
    ) as TokenContractWithMethods;

    const newdata = await getSouls(userUseTokenContract, {
      from_index: "0",
      limit: 100,
    });
    setSouls(newdata);
    console.log(newdata);
  }

  async function fetchContractDetails() {
    if (!router.query.tokenId) return;
    const userAccount = wallet!.account();
    const userUseFactoryContract = new Contract(
      userAccount,
      config.factoryContractAccount,
      factoryContractMethods
    ) as FactoryContractWithMethods;
    const newdata = await getToken(userUseFactoryContract, {
      token_id: router.query.tokenId,
    });

    const image = newdata.metadata.icon.includes("https://arweave.net/")
      ? await getArweaveImage(
          newdata.metadata.icon
            .replace("https://arweave.net/", "")
            .replace("?ext=svg", "")
        )
      : "";
    setImage(image as string);
    setData(newdata);
    console.log(newdata);
    fetchSouls();
  }

  useEffect(() => {
    fetchContractDetails();
  }, [router.query.tokenId]);

  if (!data) return <div>Loading</div>;

  return (
    <Box alignItems={"center"}>
      <Typography variant="h4" noWrap color={"purple"}>
        {data.metadata.name}
      </Typography>
      <div dangerouslySetInnerHTML={{ __html: image }} />

      {/* <UndrawSvgs option={data.svgName.replace(/\s/g, "")} /> */}
      <hr />
      <div>
        <div>
          <h2>Mint a new NFT</h2>
        </div>
        <div>
          {" "}
          <TextField
            id="collection-name"
            label={"near account name"}
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
          />
        </div>
        <SecondaryButton
          label={"Mint Soulbound token to address"}
          onClick={() => mint()}
        />
      </div>
      <hr />
      <h2>Existing Souls of your collection</h2>
      {souls && (
        <ul>
          {souls.map((soul) => (
            <li>
              {soul.owner_id} id:{soul.token_id}
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
};

export default YourCollection;

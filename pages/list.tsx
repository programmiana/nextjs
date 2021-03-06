import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Contract } from "near-api-js/lib/contract";
import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";
import UndrawSvgs from "./components/undrawSvgs";
import { WalletContext } from "./components/wallet-context";
import Button from "./components/button";
import TextField from "@mui/material/TextField";
import {
  config,
  factoryContractMethods,
  createNTTCollection,
  FactoryContractWithMethods,
  getTokens,
} from "../contracts";
import Link from "next/link";
import { getArweaveImage } from "./api/bundlr";
import Image from "next/image";
import { resolve } from "node:path/win32";

const List: FC = ({}) => {
  const { wallet } = useContext(WalletContext)!;
  //   const router = useRouter();
  const [data, setData] = useState<any[] | null>(null);

  // Todo load data from the chain.

  async function fetchTokens() {
    const userAccount = wallet!.account();
    const userUseFactoryContract = new Contract(
      userAccount,
      config.factoryContractAccount,
      factoryContractMethods
    ) as FactoryContractWithMethods;

    let newdata = await getTokens(userUseFactoryContract, {
      from_index: 0,
      limit: 100,
    });
    const images = await Promise.all(
      newdata.map((data, i) => {
        try {
          return data.metadata.icon.includes("https://arweave.net/")
            ? getArweaveImage(
                data.metadata.icon
                  .replace("https://arweave.net/", "")
                  .replace("?ext=svg", "")
              )
            : "";
        } catch (err) {
          return "";
        }
      })
    );
    newdata = newdata.map((d, i) => ({ ...d, image: images[i] }));
    setData(newdata);
    console.log(newdata);
  }

  useEffect(() => {
    fetchTokens();
  }, []);

  if (!data) return <p>Loading...</p>;
  return (
    <Box alignItems={"center"}>
      <h1>My Created SBT Collections</h1>
      <ul style={{ listStyleType: "none" }}>
        {data.map((entry, i) => (
          <li key={entry.metadata.symbol}>
            <Link href={`/your-collection/${entry.metadata.symbol}`}>
              <span>
                <div dangerouslySetInnerHTML={{ __html: entry.image }} />
                {/* src={`${entry.metadata.icon}`}
                style={{ height: "50px", width: "50px" }}
                /> */}
                <h2>{entry.metadata.name}</h2>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default List;

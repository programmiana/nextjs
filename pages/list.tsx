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
} from "./contracts";
import Link from "next/link";

const List: FC = ({}) => {
  const { wallet } = useContext(WalletContext)!;
  //   const router = useRouter();
  const [data, setData] = useState(null);

  // Todo load data from the chain.

  async function fetchTokens() {
    const userAccount = wallet!.account();
    const userUseFactoryContract = new Contract(
      userAccount,
      config.factoryContractAccount,
      factoryContractMethods
    ) as FactoryContractWithMethods;

    const newdata = await getTokens(userUseFactoryContract, {
      from_index: 0,
      limit: 100,
    });
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
      <ul>
        {data.map((entry) => (
          <li>
            <Link href={`/your-collection/${entry.metadata.symbol}`}>
              <span>
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

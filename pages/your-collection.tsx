import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";
import UndrawSvgs from "./components/undrawSvgs";
import { WalletContext } from "./components/wallet-context";

const YourCollection: FC = ({}) => {
  const { wallet } = useContext(WalletContext)!;
  const router = useRouter();
  const [data, setData] = useState<any>();

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

      <UndrawSvgs option={data.svgName.replace(/\s/g, "")} />
    </Box>
  );
};

export default YourCollection;

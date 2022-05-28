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
    <Box flexDirection={"row"}>
      <Typography variant="h4">Your Template</Typography>
      <Box
        alignItems={"center"}
        justifyContent="center"
        justifyItems="center"
        border="7px solid orange"
        padding={[10, 5]}
        borderRadius={0.7}
        gap={2}
        textAlign="center"
      >
        <Box
          alignItems={"center"}
          justifyContent="center"
          border="1px solid lightgrey"
          padding={1}
          borderRadius={0.8}
          gap={2}
        >
          <UndrawSvgs option={data.svgName.replace(/\s/g, "")} />
        </Box>
        <Typography
          color={"black"}
          fontSize="20px"
          variant="button"
          display="block"
          gutterBottom
        >
          {data.badgeTitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default YourCollection;

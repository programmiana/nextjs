import Stack from "@mui/material/Stack";
import WelcomePrompt from "../pages/welcome";

export default function Home() {
  return (
    <Stack  direction="row" justifyContent={"space-between"}>
      <WelcomePrompt />
    </Stack>
  );
}



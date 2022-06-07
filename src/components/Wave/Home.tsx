import Info from "@comp/Info";
import Wave from "@comp/Wave/Wave";
import { Box } from "@chakra-ui/react";

const Home = () => {
  return (
    <Box className="home" position="relative">
      <Info />
      <Wave />
    </Box>
  );
};

export default Home;

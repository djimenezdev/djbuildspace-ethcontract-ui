import { useStateValue } from "@context/StateProvider";
import { Box, Text, useColorMode } from "@chakra-ui/react";
import { WaitTimeRenderer } from "@comp/Wave/conditionals";

const WaveInfo = ({ countDown }) => {
  const [{ totalWaves, userWaves, waveWaitTime, currentAccount }] =
    useStateValue();
  const { colorMode } = useColorMode();
  return (
    <Box my="10px" display="flex" justifyContent="center">
      <Text fontFamily="heading" mr="15px">
        Total Waves:{" "}
        <Box
          as="span"
          marginLeft="5px"
          fontWeight="bold"
          fontFamily="desc"
          color={colorMode === "light" ? "black" : "textBlue"}
        >
          {!currentAccount
            ? "Login to see"
            : currentAccount && typeof totalWaves !== "number"
            ? "wait..."
            : totalWaves}
        </Box>{" "}
      </Text>
      <Text fontFamily="heading" mr="15px">
        Your Waves:{" "}
        <Box
          as="span"
          marginLeft="5px"
          fontWeight="bold"
          fontFamily="desc"
          color={colorMode === "light" ? "black" : "textBlue"}
        >
          {!currentAccount
            ? "Login to see"
            : currentAccount && typeof userWaves !== "number"
            ? "wait..."
            : userWaves}
        </Box>
      </Text>
      {waveWaitTime > 0 && currentAccount && (
        <WaitTimeRenderer countDown={countDown} />
      )}
    </Box>
  );
};

export default WaveInfo;

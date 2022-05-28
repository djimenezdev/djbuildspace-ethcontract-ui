import { Box, Text, useColorMode } from "@chakra-ui/react";

export const WaitTimeRenderer = ({ countDown }) => {
  const { colorMode } = useColorMode();
  return (
    <Text>
      Wait Time:{" "}
      <Box
        as="span"
        marginLeft="5px"
        fontWeight="bold"
        fontFamily="desc"
        color={colorMode === "light" ? "black" : "textBlue"}
      >
        {Math.floor(countDown?.minutes) < 10 &&
        Math.floor(countDown?.minutes) > 0
          ? "0" + Math.floor(countDown?.minutes)
          : Math.floor(countDown?.minutes) > 10
          ? Math.floor(countDown?.minutes)
          : "00"}
        :
        {Math.floor(countDown?.seconds) < 10 &&
        Math.floor(countDown?.seconds) > 0
          ? "0" + Math.floor(countDown?.seconds)
          : Math.floor(countDown?.seconds) > 10
          ? Math.floor(countDown?.seconds)
          : "00"}
      </Box>{" "}
    </Text>
  );
};

import { Box, Text } from "@chakra-ui/react";
import WavesContainer from "@comp/Wave/WavesContainer";

const Waves = () => {
  return (
    <Box mt="20px" display="flex" flexDir="column" alignItems="center">
      <Text fontWeight="bold" fontFamily="heading">
        See Others who have waved so far:
      </Text>
      <WavesContainer />
    </Box>
  );
};

export default Waves;

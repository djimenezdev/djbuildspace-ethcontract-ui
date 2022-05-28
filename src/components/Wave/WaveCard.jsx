import { Box, Text } from "@chakra-ui/react";

const WaveCard = ({ address, timestamp, message, win }) => {
  return (
    <Box
      padding="12px"
      mr="5px"
      borderWidth={win !== "didn't win" ? "3px" : 0}
      borderColor={win !== "didn't win" ? "textBlue" : "none"}
      bg="infoMode"
      mb="16px"
      borderRadius="4px"
    >
      <Text color="white" fontFamily="desc">
        <Box as="span" mr="5px" color="textBlue" fontFamily="heading">
          Address:
        </Box>
        {address}
      </Text>
      <Text color="white" fontFamily="desc">
        <Box as="span" mr="5px" color="textBlue" fontFamily="heading">
          Time:
        </Box>
        {timestamp.toString()}
      </Text>
      <Text color="white" fontFamily="desc">
        <Box as="span" mr="5px" color="textBlue" fontFamily="heading">
          Message:
        </Box>
        {message}
      </Text>
      {win !== "didn't win" && (
        <Text color="white" fontFamily="desc">
          <Box as="span" mr="5px" color="textBlue" fontFamily="heading">
            Won:
          </Box>
          {win}
        </Text>
      )}
    </Box>
  );
};

export default WaveCard;

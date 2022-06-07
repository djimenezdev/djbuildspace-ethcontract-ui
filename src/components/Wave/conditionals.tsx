import { Box, Text, useColorMode } from '@chakra-ui/react';

export const WaitTimeRenderer = ({
  countDownMinutes,
  countDownSeconds,
}: {
  countDownMinutes: { minutes: number };
  countDownSeconds: { seconds: number };
}) => {
  const { colorMode } = useColorMode();
  return (
    <Text>
      Wait Time:{' '}
      <Box
        as='span'
        marginLeft='5px'
        fontWeight='bold'
        fontFamily='desc'
        color={colorMode === 'light' ? 'black' : 'textBlue'}
      >
        {Math.floor(countDownMinutes.minutes) < 10 &&
        Math.floor(countDownMinutes.minutes) > 0
          ? '0' + Math.floor(countDownMinutes.minutes)
          : Math.floor(countDownMinutes.minutes) >= 10
          ? Math.floor(countDownMinutes.minutes)
          : '00'}
        :
        {Math.floor(countDownSeconds.seconds) < 10 &&
        Math.floor(countDownSeconds.seconds) > 0
          ? '0' + Math.floor(countDownSeconds.seconds)
          : Math.floor(countDownSeconds.seconds) >= 10
          ? Math.floor(countDownSeconds.seconds)
          : '00'}
      </Box>{' '}
    </Text>
  );
};

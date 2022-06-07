import { Box } from '@chakra-ui/react';
// import { waveDummyData } from "@data/waveDummyData";
import { useStateValue } from '@context/StateProvider';
import WaveCard from '@comp/Wave/WaveCard';

const WavesContainer = () => {
  const [{ waveMessages }] = useStateValue();

  return (
    <Box
      mt='5px'
      maxW='919px'
      w='919px'
      mx='auto'
      height='300px'
      overflowY='scroll'
      sx={{
        '&::-webkit-scrollbar': {
          width: '5px',
          border: waveMessages.length > 0 ? '1px solid #444444' : '',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#000',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#444444',
        },
      }}
    >
      {waveMessages?.length > 0 &&
        waveMessages.map(
          (
            {
              address,
              timestamp,
              message,
              win,
            }: {
              address: string;
              timestamp: Date;
              message: string;
              win: string;
            },
            key: number
          ) => {
            return (
              <WaveCard
                address={address}
                timestamp={timestamp}
                message={message}
                win={win}
                key={key}
              />
            );
          }
        )}
    </Box>
  );
};

export default WavesContainer;

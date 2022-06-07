import { Box, Switch, useColorMode } from '@chakra-ui/react';
import Icon from '@mdi/react';
import { mdiWhiteBalanceSunny, mdiWeatherNight } from '@mdi/js';
import HomeButton from '@comp/HomeButton';

const ToggleMode = ({ home }: { home?: boolean }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      display='flex'
      justifyContent={home ? 'space-between' : 'flex-end'}
      mt='10px'
      mx='15px'
    >
      {home && <HomeButton />}
      <Box position='relative' display='flex'>
        <Switch
          id='colorMode-switch'
          onChange={toggleColorMode}
          size='lg'
          isChecked={colorMode === 'light'}
        />
        {colorMode === 'light' ? (
          <Box
            position='absolute'
            left='5px'
            top='7px'
            onClick={toggleColorMode}
            cursor='pointer'
          >
            <Icon path={mdiWhiteBalanceSunny} color='yellow' size='15px' />
          </Box>
        ) : (
          <Box
            position='absolute'
            right='5px'
            top='7px'
            onClick={toggleColorMode}
            cursor='pointer'
          >
            <Icon path={mdiWeatherNight} color='#FFEB38' size='15px' />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ToggleMode;

import { ListItem, Link, Text, Box } from '@chakra-ui/react';
import Icon from '@mdi/react';
import { mdiHandCoin } from '@mdi/js';

const WaveLinkItem = ({ title, link }: { title: string; link: string }) => {
  return (
    <ListItem display='flex' alignItems='center'>
      <Box mr='5px' mb='4px'>
        <Icon path={mdiHandCoin} size='20px' color='textBlue' />
      </Box>
      <Box as='span' display='flex' alignItems='center'>
        <Text fontWeight={700} fontFamily='heading'>
          {title}
        </Text>
        <Link
          href={link}
          target='_blank'
          mb='2px'
          ml='5px'
          textDecoration='underline'
          color='textBlue'
        >
          {link}
        </Link>
      </Box>
    </ListItem>
  );
};

export default WaveLinkItem;

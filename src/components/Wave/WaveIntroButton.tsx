import { Text, AccordionButton, Fade } from '@chakra-ui/react';
import Icon from '@mdi/react';
import { mdiMenuRight, mdiMenuDown } from '@mdi/js';

const WaveIntroButton = ({
  isExpanded,
  title,
}: {
  isExpanded: boolean;
  title: string;
}) => {
  return (
    <AccordionButton>
      {isExpanded ? (
        <Fade in={isExpanded ? true : false}>
          <Icon path={mdiMenuDown} size='20px' />
        </Fade>
      ) : (
        <Fade in={isExpanded ? false : true}>
          <Icon path={mdiMenuRight} size='20px' />
        </Fade>
      )}
      <Text fontFamily='desc' fontWeight={700}>
        {title}
      </Text>
    </AccordionButton>
  );
};

export default WaveIntroButton;

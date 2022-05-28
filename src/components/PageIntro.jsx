import React, { useEffect, useRef, useState } from "react";
import {
  Heading,
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionPanel,
  List,
  Spinner,
} from "@chakra-ui/react";
import WaveIntroButton from "@comp/Wave/WaveIntroButton";
import WaveLinkItem from "@comp/Wave/WaveLinkItem";
import { waveLinkInfo } from "@data/waveLink";

const PageIntro = ({ isAccordion, desc }) => {
  const [loading, setLoading] = useState(true);
  const ref = useRef();
  useEffect(() => {
    if (ref?.current) {
      setLoading(false);
    }
  }, []);

  return (
    <Box as="header" display="flex" flexDir="column" alignItems="center">
      <Heading fontSize="64px" fontFamily="heading">
        👋 Hey there!
      </Heading>
      <Box width="919px" maxWidth="919px" mt="20px">
        <Text fontFamily="desc" textAlign="center">
          {desc}
        </Text>
      </Box>
      {isAccordion && (
        <Accordion allowToggle mt="20px">
          <AccordionItem
            borderColor="textBlue"
            borderTopWidth="2px"
            _last={{
              borderBottomWidth: "2px",
            }}
          >
            {({ isExpanded }) => (
              <>
                <WaveIntroButton
                  isExpanded={isExpanded}
                  title="Click to learn how to Install/Configure Metamask:"
                />
                <AccordionPanel>
                  <div
                    style={{
                      position: "relative",
                      paddingBottom: "56.25%",
                      height: 0,
                    }}
                  >
                    {isExpanded && (
                      <>
                        {loading && (
                          <Box
                            width="490px"
                            height="276px"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Spinner color="textBlue" size="lg" />
                            <Text>loading video...</Text>
                          </Box>
                        )}
                        <iframe
                          src="https://www.loom.com/embed/c67f43f9362640b3817b5cd2344fa7bd"
                          frameBorder="0"
                          ref={ref}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                          }}
                        ></iframe>
                      </>
                    )}
                  </div>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
          <AccordionItem
            borderColor="textBlue"
            borderTopWidth="2px"
            _last={{
              borderBottomWidth: "2px",
            }}
          >
            {({ isExpanded }) => (
              <>
                <WaveIntroButton
                  isExpanded={isExpanded}
                  title="Resources to get Rinkeby ETH:"
                />
                <AccordionPanel>
                  {}
                  <List>
                    {waveLinkInfo.map(({ title, link }, i) => (
                      <WaveLinkItem title={title} link={link} key={i} />
                    ))}
                  </List>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        </Accordion>
      )}
    </Box>
  );
};

export default PageIntro;

import { Box, Image, Heading, Text } from "@chakra-ui/react";
import profilePic from "@img/portfolio-img.webp";
import Socials from "@comp/Socials";

const Info = () => {
  return (
    <Box
      className="info"
      display="flex"
      flexDir="column"
      alignItems="center"
      bg="infoMode"
      flexBasis="22%"
      height="100vh"
    >
      <Image
        src={profilePic}
        alt="Hello this is Daniel, creator of this DAPP!"
        boxSize="230px"
        objectFit="cover"
        borderRadius="full"
        mt="33px"
      />
      <Heading
        size="xl"
        color="#fff"
        mt="10px"
        fontFamily="heading"
        fontWeight={400}
      >
        Daniel Jimenez
      </Heading>
      <Text
        color="#fff"
        fontFamily="desc"
        fontSize="14px"
        fontWeight={400}
        mt="15px"
        mx="20px"
        textAlign="center"
      >
        Hello! As you can see my name is Daniel Jimenez. I am a web 3.0
        developer who loves to take on challenges and bring ideas to life. You
        send me a wave and you can get some free ETH! Well, Rinkeby eth not
        actual eth but its still awesome stuff lol.
      </Text>
      <Socials />
    </Box>
  );
};

export default Info;

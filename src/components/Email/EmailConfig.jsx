import { Box, useColorMode } from "@chakra-ui/react";
import ToggleMode from "@comp/ToggleMode";
import PageIntro from "@comp/PageIntro";
import EmailForm from "@comp/Email/EmailForm";

const EmailConfig = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      className="wave"
      flexBasis="78%"
      bg="waveMode"
      height="100vh"
      maxH="100vh"
      overflowY="scroll"
      mr="2px"
      sx={{
        "&::-webkit-scrollbar": {
          width: "10px",
          border: "1px solid #444444",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: colorMode === "light" ? "#000" : "#fff",
          borderRadius: "4px",
          transition: "backgroundColor 2s",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: colorMode === "light" ? "#444" : "#00EAFF",
        },
      }}
    >
      <ToggleMode home />
      <PageIntro
        desc={`Hey I see you landed on my contact page! Feel free to let me 
        know any questions/inquiries you may have on the application 
        I’d be more than happy to help. You can also checkout my socials 
        to see the other web development content I post to learn even more! `}
      />
      <EmailForm />
    </Box>
  );
};

export default EmailConfig;

import Info from "@comp/Info";
import EmailConfig from "@comp/Email/EmailConfig";
import { Box } from "@chakra-ui/react";

const Email = () => {
  return (
    <Box display="flex">
      <Info />
      <EmailConfig />
    </Box>
  );
};

export default Email;

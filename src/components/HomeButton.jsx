import { Box } from "@chakra-ui/react";
import Icon from "@mdi/react";
import { mdiHomeVariant } from "@mdi/js";
import { useNavigate } from "react-router";

const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <Box
      width="60px"
      height="60px"
      borderRadius="full"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgGradient="linear(135deg, #B2FEFA 0%, #0ED2F7 100%)"
      cursor="pointer"
      onClick={() => navigate("/")}
    >
      <Icon path={mdiHomeVariant} size="40px" color="white" />
    </Box>
  );
};

export default HomeButton;

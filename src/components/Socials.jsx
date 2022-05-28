import { Box, Tooltip, useColorMode } from "@chakra-ui/react";
import Icon from "@mdi/react";
import { useNavigate, useLocation } from "react-router-dom";
import { gradients } from "@data/socialsInfo";

const Socials = () => {
  const { colorMode } = useColorMode();
  let navigate = useNavigate();
  const pathLocation = useLocation();
  const { pathname } = pathLocation;

  return (
    <Box
      color="white"
      mt="25px"
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
    >
      {gradients.map((gradient, i) =>
        gradient.icon !== "github" && gradient.icon !== "email" ? (
          <Tooltip
            key={i}
            label={
              gradient.icon !== "discord"
                ? gradient.icon
                : "Discord: djimenezdev#3538"
            }
            hasArrow
            bgGradient={`linear(135deg, ${gradient.colorOne} 0%, ${gradient.colorTwo} 100%)`}
            color="white"
            placement={gradient.placement}
          >
            <Box
              cursor="pointer"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="3px"
              height="50px"
              width="50px"
              bgGradient={`linear(135deg, ${gradient.colorOne} 0%, ${gradient.colorTwo} 100%)`}
              mr="20px"
              mb="12px"
            >
              <a
                href={gradient.icon !== "discord" ? gradient.href : "#"}
                target="_blank"
              >
                {" "}
                <Icon
                  path={gradient.path}
                  size="30px"
                  color="white"
                  title={gradient.icon}
                  description={gradient.icon + " icon"}
                />
              </a>
            </Box>
          </Tooltip>
        ) : gradient.icon === "email" && pathname === "/" ? (
          <Tooltip
            key={i}
            label={gradient.icon}
            hasArrow
            bgGradient={`linear(135deg, ${gradient.colorOne} 0%, ${gradient.colorTwo} 100%)`}
            color="white"
            placement={gradient.placement}
          >
            <Box
              cursor="pointer"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="3px"
              height="50px"
              width="50px"
              bgGradient={`linear(135deg, ${gradient.colorOne} 0%, ${gradient.colorTwo} 100%)`}
              mr="20px"
              mb="12px"
            >
              <Box
                onClick={() => navigate(gradient.href)}
                height="50px"
                width="50px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                data-testid="email-nav"
              >
                <Icon
                  path={gradient.path}
                  size="30px"
                  color="white"
                  title={gradient.icon}
                  description={gradient.icon + " icon"}
                />
              </Box>
            </Box>
          </Tooltip>
        ) : gradient.icon === "github" ? (
          <Tooltip
            key={i}
            label={gradient.icon}
            hasArrow
            bg={colorMode === "light" ? "#444444" : "black"}
            color="white"
            placement={gradient.placement}
          >
            <Box
              cursor="pointer"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="3px"
              height="50px"
              width="50px"
              bg={colorMode === "light" ? "#444444" : "black"}
              mr="20px"
            >
              <a href={gradient.href} target="_blank">
                {" "}
                <Icon
                  path={gradient.path}
                  size="30px"
                  color="white"
                  title={gradient.icon}
                  description={gradient.icon + " icon"}
                />
              </a>
            </Box>
          </Tooltip>
        ) : null
      )}
    </Box>
  );
};

export default Socials;

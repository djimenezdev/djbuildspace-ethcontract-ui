// theme.js

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";

// 2. Add your color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({
  config,
  colors: {
    infoLight: "#000",
    infoDark: "#444444",
    waveLight: "#fff",
    waveDark: "#2C2C2C",
    textBlue: "#00EAFF",
  },
  fonts: {
    heading: `'Aleo', serif`,
    desc: `'Cousine', sans-serif`,
  },
  semanticTokens: {
    colors: {
      infoMode: {
        default: "infoLight",
        _dark: "infoDark",
      },
      waveMode: {
        default: "waveLight",
        _dark: "waveDark",
      },
    },
  },
});

export default theme;

import React, { useEffect, useState } from "react";
import ToggleMode from "@comp/ToggleMode";
import { Box, Button, useColorMode } from "@chakra-ui/react";
import PageIntro from "@comp/PageIntro";
import WaveInput from "@comp/Wave/WaveInput";
import Waves from "@comp/Wave/Waves";
import WaveInfo from "@comp/Wave/WaveInfo";
import {
  checkIfWalletIsConnected,
  connectWallet,
} from "@utils/walletFunctions.js";
import { useStateValue } from "@context/StateProvider";
import { contractAddress, contractABI } from "@utils/variables.js";

const Wave = () => {
  const [{ waveWaitTime, currentAccount, userWaves, totalWaves }, dispatch] =
    useStateValue();
  const [countDown, setCountDown] = useState({ minutes: null, seconds: null });
  const { colorMode } = useColorMode();

  //checks if user is connected on load
  useEffect(() => {
    checkIfWalletIsConnected(dispatch);
  }, []);

  // sets countdown for when user can wave again
  useEffect(() => {
    const calcTime = () => {
      let now = Math.floor(Date.now());
      let difference = waveWaitTime - now;
      if (difference > 0) {
        return {
          minutes: (difference / 1000 / 60) % 60,
          seconds: (difference / 1000) % 60,
        };
      } else {
        return { minutes: 0, seconds: 0 };
      }
    };
    let timeout;
    if (waveWaitTime > 0 && typeof waveWaitTime === "number") {
      timeout = setTimeout(() => {
        if (calcTime().minutes === 0 && calcTime().seconds === 0) {
          setCountDown({ minutes: null, seconds: null });
          // setWaveWaitTime(null);
          dispatch({ type: "SET_WAVE_WAIT", setWaveWaitTime: null });
          clearTimeout(timeout);
        } else {
          setCountDown(calcTime());
        }
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [waveWaitTime, countDown]);

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
      <ToggleMode />
      <PageIntro
        isAccordion={true}
        desc={`I’d love to get a wave from you! Make sure to have your metamask
          connected, you are on the Rinkeby Testnet & you have some rinkeby eth
          in your wallet. Check out some resources below if you need those
          things so we can talk on the blockchain😉`}
      />
      <WaveInput countDown={countDown} />
      {totalWaves >= 0 && userWaves >= 0 && <WaveInfo countDown={countDown} />}
      {!currentAccount && (
        <Box display="flex" justifyContent="center">
          <Button
            width="400px"
            mt="10px"
            className="waveButton"
            onClick={() =>
              connectWallet(
                /* 
                setTotalWaves,
                setUserWaves, */
                dispatch
                /*     setWaveWaitTime,
                setCurrentAccount */
              )
            }
          >
            Connect Wallet
          </Button>
        </Box>
      )}

      <Waves />
    </Box>
  );
};

export default Wave;

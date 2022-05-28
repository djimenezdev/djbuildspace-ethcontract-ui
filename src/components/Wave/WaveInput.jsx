import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Box,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useStateValue } from "@context/StateProvider";
import { contractABI, contractAddress } from "@utils/variables";

const WaveInput = ({ countDown }) => {
  const [message, setMessage] = useState("");
  const { colorMode } = useColorMode();
  const [{ currentAccount, txnWait, waveWaitTime, waveMessages }, dispatch] =
    useStateValue();

  const toast = useToast();
  // sets a listener for NewWave Event
  useEffect(() => {
    let wavePortalContract;
    const onNewWave = (from, message, timestamp, winWon) => {
      if (winWon === "didn't win") {
        toast({
          title: "New Message!",
          description: "Check it out along with the other amazing waves👋",
          status: "warning",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Congratulations🎉🎉🎉",
          description: "Not only did you wave but you won the prize!",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      }
    };

    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      wavePortalContract.on("NewWave", onNewWave);
    }

    return () => {
      if (wavePortalContract) {
        wavePortalContract.off("NewWave", onNewWave);
      }
    };
  }, [toast]);

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let count = await wavePortalContract.getTotalWaves();

        const waveTxn = await wavePortalContract.wave(message, {
          gasLimit: 300000,
        });

        setMessage("");
        dispatch({ type: "SET_TXN", setWait: true });
        dispatch({ type: "SET_TOTAL", setTotalWaves: null });
        dispatch({ type: "SET_USER_WAVES", setUserWaves: null });

        await waveTxn.wait();
        dispatch({ type: "SET_TXN", setWait: false });
        setTimeout(() => {
          dispatch({ type: "SET_TXN", setWait: null });
        }, 4000);

        count = await wavePortalContract.getTotalWaves();
        dispatch({ type: "SET_TOTAL", setTotalWaves: count.toNumber() });
        let userCount = await wavePortalContract.getWalletWaves();
        dispatch({
          type: "SET_USER_WAVES",
          setUserWaves: userCount.toNumber(),
        });

        const waveMessagesUpdate = await wavePortalContract.getWavesMessages();
        let wavesCleaned = [];
        waveMessagesUpdate.forEach((wave) => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message,
            win: wave.wonWave,
          });
        });
        dispatch({ type: "SET_WAVES", newWave: wavesCleaned });

        const waitWaveTime = await wavePortalContract.getWaveWaitTime();
        dispatch({
          type: "SET_WAVE_WAIT",
          setWaveWaitTime: waitWaveTime.toNumber() * 1000 + 240000,
        });
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box display="flex" mx="auto" maxW="919px" w="919px" mt="20px">
      <Input
        disabled={
          !currentAccount ||
          txnWait ||
          txnWait === false ||
          countDown?.minutes > 0 ||
          countDown?.seconds > 0
        }
        focusBorderColor="textBlue"
        type="text"
        id="waveInput"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Send your wave here"
        color={colorMode === "light" ? "#000" : "#fff"}
        borderRadius="4px"
        borderWidth="3px"
        borderColor="textBlue"
        height="50px"
        _hover={{ borderColor: "black" }}
        _placeholder={{
          color: colorMode === "light" ? "black" : "textBlue",
          fontWeight: "bold",
        }}
        flexBasis="70%"
      />
      <Button
        disabled={
          typeof waveWaitTime === "number" ||
          message?.length === 0 ||
          !currentAccount ||
          txnWait ||
          txnWait === false ||
          countDown?.minutes > 0 ||
          countDown?.seconds > 0
        }
        onClick={() =>
          txnWait || txnWait === false
            ? alert("Let me recieve first wave to enjoy before sending another")
            : wave()
        }
        type="button"
        bg="textBlue"
        height="50px"
        minWidth="150px"
        ml="8px"
        color="white"
        flexBasis="30%"
      >
        <Text fontSize="md">
          {txnWait
            ? "I can't wait to see your wave soon!"
            : txnWait === false
            ? "Thank you!"
            : "Send Wave"}
        </Text>
      </Button>
    </Box>
  );
};

export default WaveInput;

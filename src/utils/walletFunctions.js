import { ethers } from "ethers";
import { contractAddress, contractABI } from "@utils/variables.js";

export const checkIfWalletIsConnected = async (
  /*   setTotalWaves,
  setUserWaves, */
  dispatch
  /* setWaveWaitTime,
  setCurrentAccount */
) => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      let count = await wavePortalContract.getTotalWaves();
      // setTotalWaves(count?.toNumber());
      dispatch({
        type: "SET_TOTAL",
        setTotalWaves: count?.toNumber(),
      });
      let userCount = await wavePortalContract.getWalletWaves();
      // setUserWaves(userCount?.toNumber());
      dispatch({
        type: "SET_USER_WAVES",
        setUserWaves: userCount?.toNumber(),
      });
      // get wave messages
      const waveMessages = await wavePortalContract.getWavesMessages();
      let wavesCleaned = [];
      waveMessages.forEach((wave) => {
        wavesCleaned.push({
          address: wave.waver,
          timestamp: new Date(wave.timestamp * 1000),
          message: wave.message,
          win: wave.wonWave,
        });
      });
      dispatch({ type: "SET_WAVES", newWave: wavesCleaned });
      // check wait time if there is a wait time
      const waitWaveTime = await wavePortalContract.getWaveWaitTime();

      if (
        waitWaveTime.toNumber() === 0 ||
        waitWaveTime.toNumber() * 1000 + 240000 <= Math.floor(Date.now())
      ) {
        // setWaveWaitTime(null);
        dispatch({ type: "SET_WAVE_WAIT", setWaveWaitTime: null });
      } else {
        dispatch({
          type: "SET_WAVE_WAIT",
          setWaveWaitTime: waitWaveTime.toNumber() * 1000 + 240000,
        });
        // setWaveWaitTime(waitWaveTime.toNumber() * 1000 + 60000);
      }
    }

    /*
     * Check if we're authorized to access the user's wallet
     */
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      dispatch({ type: "SET_ACCOUNT", setAccount: account });
      // setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Implement your connectWallet method here
 */
export const connectWallet = async (
  /*   setTotalWaves,
  setUserWaves, */
  dispatch
  /*  setWaveWaitTime,
  setCurrentAccount */
) => {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Get MetaMask!");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    // setCurrentAccount(accounts[0]);
    dispatch({ type: "SET_ACCOUNT", setAccount: accounts[0] });
    checkIfWalletIsConnected(
      /*   setTotalWaves,
      setUserWaves, */
      dispatch
      /*     setWaveWaitTime,
      setCurrentAccount */
    );
  } catch (error) {
    console.log(error);
  }
};

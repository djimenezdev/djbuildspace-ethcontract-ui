import { ethers } from 'ethers';
import { contractAddress, contractABI } from '@utils/variables';

const ethereumExists = (toast: any) => {
  const { ethereum } = window;

  if (!ethereum) {
    toast({
      id: 'toast-noMetaMask',
      title: 'Metamask not detected',
      description: 'Make sure to have the chrome installed with valid wallet!',
      status: 'error',
      duration: 6000,
      isClosable: true,
      position: 'top',
    });
    return null;
  }
  return ethereum;
};

export const checkIfWalletIsConnected = async (dispatch: any, toast: any) => {
  try {
    const ethereum = ethereumExists(toast);
    if (!ethereum) return;
    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      dispatch({ type: 'SET_ACCOUNT', setAccount: account });
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      // one more check to see if they are connected to proper chain
      const currentChain = await ethereum.request({ method: 'eth_chainId' });
      dispatch({ type: 'SET_CHAIN', setChain: parseInt(currentChain, 16) });
      const toastId = 'chain-error';
      if (parseInt(currentChain, 16) !== 4) {
        if (!toast.isActive(toastId)) {
          toast({
            id: toastId,
            title: 'Wrong Chain',
            description: 'Make sure to be on the Rinkeby Testnet to Wave!',
            status: 'error',
            duration: 6000,
            isClosable: true,
            position: 'top',
          });
        }
        return;
      }

      let count = await wavePortalContract.getTotalWaves();
      // setTotalWaves(count?.toNumber());
      dispatch({
        type: 'SET_TOTAL',
        setTotalWaves: count?.toNumber(),
      });
      let userCount = await wavePortalContract.getWalletWaves();
      // setUserWaves(userCount?.toNumber());
      dispatch({
        type: 'SET_USER_WAVES',
        setUserWaves: userCount?.toNumber(),
      });
      // get wave messages
      const waveMessages = await wavePortalContract.getWavesMessages();
      let wavesCleaned: {
        address: string;
        timestamp: Date;
        message: string;
        win: string;
      }[] = [];

      waveMessages.forEach(
        (wave: {
          waver: string;
          timestamp: number;
          message: string;
          wonWave: string;
        }) => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message,
            win: wave.wonWave,
          });
        }
      );
      dispatch({ type: 'SET_WAVES', newWave: wavesCleaned });
      // check wait time if there is a wait time
      const waitWaveTime = await wavePortalContract.getWaveWaitTime();

      if (
        waitWaveTime.toNumber() === 0 ||
        waitWaveTime.toNumber() * 1000 + 240000 <= Math.floor(Date.now())
      ) {
        // setWaveWaitTime(null);
        dispatch({ type: 'SET_WAVE_WAIT', setWaveWaitTime: null });
      } else {
        dispatch({
          type: 'SET_WAVE_WAIT',
          setWaveWaitTime: waitWaveTime.toNumber() * 1000 + 240000,
        });
        // setWaveWaitTime(waitWaveTime.toNumber() * 1000 + 60000);
      }
    } else {
      toast({
        title: 'Wallet Not Connected!',
        description: 'Make sure to connect Metamask wallet',
        status: 'error',
        duration: 6000,
        isClosable: true,
        position: 'top',
      });
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Implement your connectWallet method here
 */
export const connectWallet = async (dispatch: any, toast: any) => {
  try {
    const ethereum = ethereumExists(toast);
    if (!ethereum) return;
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

    dispatch({ type: 'SET_ACCOUNT', setAccount: accounts[0] });
    checkIfWalletIsConnected(dispatch, toast);
  } catch (error) {
    console.log(error);
  }
};

export const changeChain = async (dispatch: any, toast: any) => {
  try {
    const ethereum = ethereumExists(toast);
    const chainId = await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [
        {
          chainId: '0x4',
        },
      ],
    });
    checkIfWalletIsConnected(dispatch, toast);
  } catch (error) {
    console.log(error);
  }
};

export const checkChain = async (
  dispatch: any,
  toast: any,
  currentAccount: string
) => {
  const ethereum = ethereumExists(toast);
  if (!ethereum) return;
  if (currentAccount) {
    ethereum.on('chainChanged', (chainId: string) => {
      const toastId = 'chain-error';
      if (parseInt(chainId, 16) !== 4) {
        if (!toast.isActive(toastId)) {
          toast({
            id: toastId,
            title: 'Wrong Chain',
            description: 'Make sure to be on the Rinkeby Testnet to Wave!',
            status: 'error',
            duration: 6000,
            isClosable: true,
            position: 'top',
          });
        }
        dispatch({ type: 'SET_CHAIN', setChain: parseInt(chainId, 16) });
        dispatch({ type: 'SET_WAVES', newWave: [] });
        dispatch({ type: 'SET_TOTAL', setTotalWaves: null });
        dispatch({ type: 'SET_USER_WAVES', setUserWaves: null });
        return;
      }
    });
  }
};

export const accountChange = async (
  dispatch: any,
  toast: any,
  currentAccount: string
) => {
  const ethereum = ethereumExists(toast);
  if (!ethereum) return;
  if (currentAccount) {
    ethereum.on('accountsChanged', (accounts: string[]) => {
      dispatch({ type: 'SET_ACCOUNT', setAccount: accounts[0] });
      checkIfWalletIsConnected(dispatch, toast);
    });
  }
};

export const initialState = {
  waveMessages: [],
  currentAccount: null,
  txnWait: null,
  totalWaves: null,
  userWaves: null,
  waveWaitTime: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_WAVES":
      return {
        ...state,
        waveMessages: [...action.newWave],
      };
    case "SET_ACCOUNT":
      return {
        ...state,
        currentAccount: action.setAccount,
      };
    case "SET_TXN":
      return {
        ...state,
        txnWait: action.setWait,
      };
    case "SET_TOTAL":
      return {
        ...state,
        totalWaves: action.setTotalWaves,
      };
    case "SET_USER_WAVES":
      return {
        ...state,
        userWaves: action.setUserWaves,
      };
    case "SET_WAVE_WAIT":
      return {
        ...state,
        waveWaitTime: action.setWaveWaitTime,
      };
  }
};

export default reducer;

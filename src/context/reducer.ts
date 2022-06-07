export const initialState = {
  waveMessages: [],
  currentAccount: null,
  currentChain: null,
  txnWait: null,
  totalWaves: null,
  userWaves: null,
  waveWaitTime: null,
};

export type IStateReducer = {
  waveMessages: string[];
  currentAccount: string | null;
  currentChain: number | null;
  txnWait: boolean | null;
  totalWaves: number | null;
  userWaves: number | null;
  waveWaitTime: number | null;
};

export type IActionsReducer = {
  type:
    | 'SET_WAVES'
    | 'SET_ACCOUNT'
    | 'SET_CHAIN'
    | 'SET_TXN'
    | 'SET_TOTAL'
    | 'SET_USER_WAVES'
    | 'SET_WAVE_WAIT';
  newWave: string[];
  setAccount: string | null;
  setChain: number | null;
  setWait: boolean | null;
  setTotalWaves: number | null;
  setUserWaves: number | null;
  setWaveWaitTime: number | null;
};

const reducer = (state: IStateReducer, action: IActionsReducer) => {
  switch (action.type) {
    case 'SET_WAVES':
      return {
        ...state,
        waveMessages: [...action.newWave],
      };
    case 'SET_ACCOUNT':
      return {
        ...state,
        currentAccount: action.setAccount,
      };
    case 'SET_CHAIN':
      return {
        ...state,
        currentChain: action.setChain,
      };
    case 'SET_TXN':
      return {
        ...state,
        txnWait: action.setWait,
      };
    case 'SET_TOTAL':
      return {
        ...state,
        totalWaves: action.setTotalWaves,
      };
    case 'SET_USER_WAVES':
      return {
        ...state,
        userWaves: action.setUserWaves,
      };
    case 'SET_WAVE_WAIT':
      return {
        ...state,
        waveWaitTime: action.setWaveWaitTime,
      };
  }
};

export default reducer;

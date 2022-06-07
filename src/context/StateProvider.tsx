import React, {
  createContext,
  Dispatch,
  Reducer,
  ReducerAction,
  ReducerState,
  useContext,
  useReducer,
} from 'react';
import { initialState, IStateReducer } from './reducer';

const StateContext = createContext<
  [ReducerState<Reducer<any, any>>, Dispatch<ReducerAction<Reducer<any, any>>>]
>([initialState, function () {}]);

export const StateProvider = ({
  reducer,
  initialState,
  children,
}: {
  reducer: any;
  initialState: IStateReducer;
  children?: React.ReactElement;
}) => (
  <StateContext.Provider value={useReducer(reducer, initialState) as any}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);

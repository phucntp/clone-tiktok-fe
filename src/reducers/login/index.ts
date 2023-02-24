import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  hasError: false,
  data: {}
};
export type TState = typeof initialState;

const loginReducer = createSlice({
  name: '[reducers/login]',
  initialState,
  reducers: {
    set(state: TState, action: PayloadAction<Omit<TState, 'hasError'>>) {
      return { ...state, data: action.payload, hasError: false };
    },
    clear(state: TState) {
      return { ...state, ...initialState };
    },
  },
});

export default loginReducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialState = {
  hasError: false,
  data: {}
};
export type TState = typeof initialState;

const loginReducer = createSlice({
  name: '[reducers/login]',
  initialState,
  reducers: {
    set(state: TState, action: PayloadAction<TState>) {
      return { ...state, data: action.payload.data, hasError: action.payload.hasError };
    },
    clear(state: TState) {
      return { ...state, ...initialState };
    },
  },
});

export default loginReducer;

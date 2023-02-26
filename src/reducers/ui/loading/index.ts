import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

type TState = typeof initialState;

const loadingModule = createSlice({
  name: '[store/ui/loading]',
  initialState,
  reducers: {
    on(state: TState) {
      return { ...state, isLoading: true };
    },
    off(state: TState) {
      return { ...state, isLoading: false };
    },
  },
});

export default loadingModule;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  hasError: false,
  showTitle: true,
  code: '',
  message: '',
  statusCode: '',
  name: '',
};
type TState = typeof initialState;

const errorDialogModule = createSlice({
  name: '[store/ui/errorDialog]',
  initialState,
  reducers: {
    set(state: TState, action: PayloadAction<Omit<TState, 'hasError'>>) {
      return { ...state, ...action.payload, hasError: true };
    },
    clear(state: TState) {
      return { ...state, ...initialState };
    },
  },
});

export default errorDialogModule;

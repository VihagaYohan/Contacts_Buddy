import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';

interface ContactState {
  loadingState: boolean;
  pass: boolean;
  fail: boolean;
  message: String;
}

const initialState: ContactState = {
  loadingState: true,
  pass: false,
  fail: false,
  message: '',
};

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    startLoading: state => {
      state.loadingState = true;
    },
    stopLoading: state => {
      state.loadingState = false;
    },
    setPass: (state, action: PayloadAction<boolean>) => {
      state.pass = action.payload;
    },
    setFail: (state, action: PayloadAction<boolean>) => {
      state.fail = action.payload;
    },
    setMessage: (state, action: PayloadAction<String>) => {
      state.message = action.payload;
    },
  },
});

export const {startLoading, stopLoading, setPass, setFail, setMessage} =
  contactSlice.actions;

export default contactSlice.reducer;

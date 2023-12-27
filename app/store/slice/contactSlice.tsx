import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';

interface LoadingState {
  loadingState: boolean;
  pass: boolean;
  fail: boolean;
}

const initialState: LoadingState = {
  loadingState: true,
  pass: false,
  fail: false,
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
    setPass: state => {
      state.pass = true;
    },
    setFail: state => {
      state.fail = true;
    },
  },
});

export const {startLoading, stopLoading, setPass, setFail} =
  contactSlice.actions;

export default contactSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface CounterState {
  isLogin: boolean;
}

const initialState: CounterState = {
  isLogin: false,
};

export const loginSlice: any = createSlice({
  name: 'Login',
  initialState,
  reducers: {
    isLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {isLogin} = loginSlice.actions;

export default loginSlice.reducer;

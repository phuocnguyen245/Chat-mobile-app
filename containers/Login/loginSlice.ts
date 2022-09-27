import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface CounterState {
  token: string;
}

const initialState: CounterState = {
  token: '',
};

export const loginSlice: any = createSlice({
  name: 'Login',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {loginSuccess} = loginSlice.actions;

export default loginSlice.reducer;

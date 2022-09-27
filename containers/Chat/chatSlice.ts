import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
interface Info {
  name: string;
  cid: string;
  image: string;
}
export interface CounterState {
  chatList: Info[];
}

const initialState: CounterState = {
  chatList: [],
};

export const chatReducer: any = createSlice({
  name: 'Chat',
  initialState,
  reducers: {
    getChatList: (state, action: PayloadAction<Info[]>) => {
      state.chatList = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {getChatList} = chatReducer.actions;

export default chatReducer.reducer;

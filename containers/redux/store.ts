import {configureStore} from '@reduxjs/toolkit';
import chatReducer from '../Chat/chatSlice';
import loginReducer from '../Login/loginSlice';
import {loginAPI} from '../services/login';

export const store = configureStore({
  reducer: {
    Login: loginReducer,
    Chat: chatReducer,

    [loginAPI.reducerPath]: loginAPI.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat([loginAPI.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

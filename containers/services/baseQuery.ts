import {fetchBaseQuery} from '@reduxjs/toolkit/query';
import {AsyncStorage} from 'react-native';

export const getToken = async () => {
  let token: string | null;
  try {
    token = await AsyncStorage.getItem('USER_TOKEN');
  } catch (error) {
    token = '';
  }
  return token;
};

export const baseQueryWithToken = fetchBaseQuery({
  baseUrl: 'https://reactnativechatapp.herokuapp.com/api/',
  prepareHeaders: headers => {
    const token = getToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithoutToken = fetchBaseQuery({
  baseUrl: 'https://reactnativechatapp.herokuapp.com/api/',
});

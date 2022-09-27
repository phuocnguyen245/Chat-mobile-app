import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithoutToken} from './baseQuery';

// Define a service using a base URL and expected endpoints
export const loginAPI = createApi({
  reducerPath: 'loginAPI',
  baseQuery: baseQueryWithoutToken,
  endpoints: builder => ({
    postLogin: builder.mutation<any, any>({
      query: (body: any) => ({
        url: 'login',
        body,
        method: 'POST',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {usePostLoginMutation} = loginAPI;

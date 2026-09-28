import { createApi } from "@reduxjs/toolkit/query/react";
import { logOut } from "./authSlice";
import { baseQuery } from "./baseQuery";


const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,

  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credential) => ({
        url: "/auth",
        method: "POST",
        body: { ...credential },
      }),
    }),
    sendLogOut: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled; //console.log data to make it show

          dispatch(logOut());

          /* dispatch(authApi.util.reset.ApiState()); */
          console.log(data);
          
        } catch (err) {
          console.log(err);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      })
    }),
  }),
});

export const { useLoginMutation, useSendLogOutMutation, useRefreshMutation } =
  authApi;

  export default authApi
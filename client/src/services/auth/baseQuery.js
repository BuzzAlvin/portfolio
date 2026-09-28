import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { logOut, setCredentials } from "./authSlice";

export const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_URL}/admin`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  //The Original request
  let result = await baseQuery(args, api, extraOptions);

  //if token has expired, try to refresh it
  if (result?.error?.status === 401 || result?.error?.status === 403) {
    console.log("Access token expired. Trying to refresh");

    // Ask backend for a new access token
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh",
        method: "GET",
      },
      api,
      extraOptions,
    );

    //if the refresh succeed
    if (refreshResult?.data) {
      const { accessToken } = refreshResult.data;

      //Put the token inside redux
      api.dispatch(setCredentials({ accessToken }));

      //Resend the original request again
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired. ";
        api.dispatch(logOut())
      }
      return refreshResult;
    }
  }

  return result;
};

export default baseQueryWithReauth;

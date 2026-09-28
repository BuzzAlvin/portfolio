import { configureStore } from "@reduxjs/toolkit";

import { projectApi } from "../services/projectApi";
import { userApi } from "../services/userApi";
import authApi from "../services/auth/authApi";
import authReducer from "../services/auth/authSlice";
import publicProjectApi from "../services/publicProjectApi";

export const store = configureStore({
  reducer: {
    /* Regular redux slice */
    auth: authReducer,

    /* RTK Query Data */
    [authApi.reducerPath]: authApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [publicProjectApi.reducerPath]: publicProjectApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      projectApi.middleware,
      userApi.middleware,
      authApi.middleware,
      publicProjectApi.middleware,
    ),
  devTools: false,
});

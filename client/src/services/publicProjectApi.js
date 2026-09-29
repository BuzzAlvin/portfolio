import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const publicProjectApi = createApi({
  reducerPath: "publicProjectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),

  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => "/",
    }),
  }),
});

export const { useGetProjectsQuery } = publicProjectApi;

export default publicProjectApi;

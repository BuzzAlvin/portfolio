import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const publicProjectApi = createApi({
  reducerPath: "publicProjectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),

  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => "/",
    }),
  }),
});

export const { useGetProjectsQuery } = publicProjectApi;

export default publicProjectApi;

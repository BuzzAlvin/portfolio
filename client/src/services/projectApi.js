import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./auth/baseQuery";


export const projectApi = createApi({
  reducerPath: "projectApi",

  baseQuery: baseQueryWithReauth,

  tagTypes: ["Project"],

  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => "/projects",
      providesTags: ["Project"],
    }),

    createProject: builder.mutation({
      query: (project) => ({
        url: "/projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Project"],
    }),

    updateProject: builder.mutation({
      query: ({ id, project }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: project,
      }),
      invalidatesTags: ["Project"],
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;

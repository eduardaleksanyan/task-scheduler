import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from "./Common";
import { FormFields, Task } from "../types/Tasks";

export const TASKS_API_REDUCER_KEY = 'tasksApi';
export const tasksApi = createApi({
  reducerPath: TASKS_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_URL,
  }),
  tagTypes: ['Tasks'],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query() {
        return {
          url: `/tasks`,
        };
      },
      providesTags: ['Tasks'],
    }),
    createTask: builder.mutation<Task, FormFields>({
      query(data) {
        return {
          url: '/tasks',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Tasks'],
    }),
    updateTask: builder.mutation<Task, FormFields>({
      query(data) {
        return {
          url: `/tasks/${data._id}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['Tasks'],
    }),
    deleteTask: builder.mutation<Task, string>({
      query(id) {
        return {
          url: `/tasks/${id}`,
          method: 'Delete',
        };
      },
      invalidatesTags: ['Tasks'],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;

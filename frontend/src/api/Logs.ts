import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from "./Common";
import { Logs } from "../types/Logs";

export const LOGS_API_REDUCER_KEY = 'logsApi';
export const logsApi = createApi({
  reducerPath: LOGS_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_URL,
  }),
  tagTypes: ['Logs'],
  endpoints: (builder) => ({
    getLogs: builder.query<Logs[], void>({
      query() {
        return {
          url: `/logs`,
        };
      },
    }),
  }),
});

export const { useGetLogsQuery } = logsApi;

import { configureStore } from "@reduxjs/toolkit"
import { tasksApi } from "../api/Tasks";
import { logsApi } from "../api/Logs";

export const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
    [logsApi.reducerPath]: logsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      tasksApi.middleware,
      logsApi.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
import { configureStore } from "@reduxjs/toolkit";
import { bankApi } from "./api/bankApi";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    [bankApi.reducerPath]: bankApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bankApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
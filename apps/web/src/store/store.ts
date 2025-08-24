import { configureStore } from "@reduxjs/toolkit";
import signUpSlice from "./authStore/signUpSlice";

export const store = configureStore({
  reducer: {
    signUp: signUpSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

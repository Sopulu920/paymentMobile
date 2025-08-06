import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Data } from "../api/bankApi";

interface AuthState {
  data: Data | null
}

const initialState: AuthState = {
  data: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ data: Data }>
    ) => {
      state.data = action.payload.data;
    },
    logout: (state) => {
      state.data = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
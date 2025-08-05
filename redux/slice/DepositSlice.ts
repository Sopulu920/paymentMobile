import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const VITE_BASE_URL = "http://127.0.0.1:4001/api/v1";

interface DepositState {
  loading: boolean;
  error: string | null;
  user: any | null; // Ideally replace 'any' with a proper user type
}

interface DepositParams {
  userId: string;
  amount: number;
}

export const deposit = createAsyncThunk<any, DepositParams, { rejectValue: string }>(
  "user/deposit",
  async ({ userId, amount }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${VITE_BASE_URL}/account/deposit`, { userId, amount });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const initialState: DepositState = {
  loading: false,
  error: null,
  user: null,
};

const depositSlice = createSlice({
  name: "deposit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deposit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deposit.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(deposit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default depositSlice.reducer;

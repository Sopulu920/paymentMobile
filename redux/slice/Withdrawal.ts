import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const VITE_BASE_URL = "http://127.0.0.1:4001/api/v1";

interface WithdrawParams {
  userId: string;
  amount: number;
}

// Define what the API returns on success
interface User {
  id: string;
  name: string;
  balance: number;
  // Add more fields if necessary based on your actual API response
}

interface WithdrawState {
  loading: boolean;
  error: string | null;
  user: User | null;
}

export const withdraw = createAsyncThunk<User, WithdrawParams, { rejectValue: string }>(
  "user/withdraw",
  async ({ userId, amount }, { rejectWithValue }) => {
    try {
      const response = await axios.post<User>(`${VITE_BASE_URL}/account/withdraw`, {
        userId,
        amount,
      });
      return response.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || "Withdrawal failed");
      } else {
        return rejectWithValue(error.message || "Network error");
      }
    }
  }
);

const initialState: WithdrawState = {
  loading: false,
  error: null,
  user: null,
};

const withdrawSlice = createSlice({
  name: "withdraw",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(withdraw.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(withdraw.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(withdraw.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default withdrawSlice.reducer;

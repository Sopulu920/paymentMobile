import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const VITE_BASE_URL = "http://127.0.0.1:4001/api/v1";

interface TransferParams {
  senderId: string;
  receiverAccountNumber: string;
  amount: number;
}

interface TransferState {
  loading: boolean;
  error: string | null;
  user: any | null; // Ideally replace 'any' with a proper user type
}

export const transfer = createAsyncThunk<any, TransferParams, { rejectValue: string }>(
  "user/transfer",
  async ({ senderId, receiverAccountNumber, amount }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${VITE_BASE_URL}/account/transfer`, { senderId, receiverAccountNumber, amount });
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

const initialState: TransferState = {
  loading: false,
  error: null,
  user: null,
};

const transferSlice = createSlice({
  name: "transfer",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(transfer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(transfer.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(transfer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export const { clearError } = transferSlice.actions;

export default transferSlice.reducer;

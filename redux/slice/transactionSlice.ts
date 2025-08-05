import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const VITE_BASE_URL = "http://127.0.0.1:4001/api/v1";

interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  // Add other transaction fields as needed
}

interface TransactionState {
  loading: boolean;
  error: string | null;
  transactions: Transaction[];
}

export const fetchTransactions = createAsyncThunk<Transaction[], string, { rejectValue: string }>(
  "transactions/fetchTransactions",
  async (userId, { rejectWithValue }) => {
    try {
      console.log("Fetching transactions for userId:", userId);
      const response = await axios.get(`${VITE_BASE_URL}/transactions`, {
        params: { user: userId }
      });
      console.log("Transactions fetched:", response.data);
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

const initialState: TransactionState = {
  loading: false,
  error: null,
  transactions: [],
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
        state.loading = false;
        state.transactions = action.payload;
        console.log(state.transactions);
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export default transactionSlice.reducer;

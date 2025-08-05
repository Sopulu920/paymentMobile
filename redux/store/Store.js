import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/UserSlice";
import loginReducer from "../slice/LoginSlice";
import depositReducer from "../slice/DepositSlice";
import withdrawReducer from "../slice/Withdrawal";
import transferReducer from "../slice/TransferSlice";
import transactionsReducer from "../slice/transactionSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,
    deposit: depositReducer,
    withdraw: withdrawReducer,
    transfer: transferReducer,
    transactions: transactionsReducer
  },
});

export default store;
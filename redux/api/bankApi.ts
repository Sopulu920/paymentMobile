import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@env"

export interface Data {
    authToken: string
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    accountNumber: string,
    accountBalance: number,
    isEmailVerified: boolean,
    phone: string,
    isPhoneVerified: boolean,
    role: string,
    isDeleted: boolean,
    createdAt: string,
}

// export interface Transaction {
//     _id: string;
//     fromUserId: string;
//     toUserId: string;
//     amount: number;
//     type: 'deposit' | 'withdraw' | 'transfer';
//     status: 'pending' | 'completed' | 'failed';
//     createdAt: string;
// }

// export interface GetTransactionsResponse {
//     data: Transaction[];
//     total: number;
// }

export const bankApi = createApi({
    reducerPath: "bankApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        login: builder.mutation<{ data: Data }, { email: string; password: string }>({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
        }),
        signup: builder.mutation<{ message: string }, { firstName: string; lastName: string; phone: string; email: string; password: string }>({
            query: (userData) => ({
                url: "/auth/register",
                method: "POST",
                body: userData,
            }),
        }),
        deposit: builder.mutation<{ message: string }, { amount: number }>({
            query: (data) => ({
                url: "/account/deposit",
                method: "POST",
                body: data,
            }),
        }),
        withdraw: builder.mutation<{ message: string }, { amount: number }>({
            query: (data) => ({
                url: "/account/withdraw",
                method: "POST",
                body: data,
            }),
        }),
        transfer: builder.mutation<{ message: string }, { toUserId: string; amount: number }>({
            query: (data) => ({
                url: "/account/transfer",
                method: "POST",
                body: data,
            }),
        }),
        getTransactions: builder.query<{/*GetTransactionsResponse*/}, { user?: string }>({
            query: (user) => ({
                url: `/transactions`,
                method: "GET",
                params: {user},
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useSignupMutation,
    useDepositMutation,
    useWithdrawMutation,
    useTransferMutation,
    useGetTransactionsQuery,
} = bankApi;

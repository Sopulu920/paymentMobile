import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@env"

export interface Data {
    authToken?: string
    _id?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    accountNumber?: string,
    accountBalance?: number,
    isEmailVerified?: boolean,
    phone?: string,
    isPhoneVerified?: boolean,
    role?: string,
    isDeleted?: boolean,
    createdAt?: string,
}

export interface Transaction {
    _id: string;
    amount: number;
    createdAt: string;
    isDeleted: boolean;
    modeOfTransaction: "deposit" | "withdraw" | "transfer";
    newBalance: number;
    prevBalance: number;
    transactionType: "credit" | "debit";
    updatedAt: string;
    user: string;
}

export interface GetTransactionsResponse {
    data: Transaction[];
    message: string;
    results: number;
    status: string;
}

export interface GetUserResponse {
    data: Data;
    message: string;
    // results: number;
    status: string;
}

export interface receiver {
    accountName?: string
    accountNumber?: number
}

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
        deposit: builder.mutation<{ message: string }, { amount: number, userId: string }>({
            query: (data) => ({
                url: "/account/deposit",
                method: "POST",
                body: data,
            }),
        }),
        withdraw: builder.mutation<{ message: string }, { amount: number, userId: string }>({
            query: (data) => ({
                url: "/account/withdraw",
                method: "POST",
                body: data,
            }),
        }),
        transfer: builder.mutation<{ message: string }, {
            senderId: string;
            receiverAccountNumber: number;
            amount: number
        }>({
            query: (data) => ({
                url: "/account/transfer",
                method: "POST",
                body: data,
            }),
        }),
        verifyTransfer: builder.mutation<receiver, {
            // senderId: string;
            accountNumber: number;
            // amount: number
        }>({
            query: (data) => ({
                url: "/account/verify-account",
                method: "POST",
                body: data,
            }),
        }),
        getTransactions: builder.query<GetTransactionsResponse, { user?: string }>({
            query: ({ user }) => {
                const params: Record<string, string> = {};
                if (user) params.user = user;

                return {
                    url: "/transactions",
                    method: "GET",
                    params,
                };
            },
        }),
        getUser: builder.query<GetUserResponse, { id?: string }>({
            query: ({ id }) => {
                const params: Record<string, string> = {};
                if (id) params.id = id;

                return {
                    url: `/users/${id}`,
                    method: "GET",
                    params,
                };
            },
        }),
    }),
});

export const {
    useLoginMutation,
    useSignupMutation,
    useDepositMutation,
    useWithdrawMutation,
    useTransferMutation,
    useVerifyTransferMutation,
    useGetTransactionsQuery,
    useGetUserQuery,
} = bankApi;

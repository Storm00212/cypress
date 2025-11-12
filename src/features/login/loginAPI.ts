/**
 * Login API using RTK Query
 *
 * This file defines the API endpoint for user authentication (login).
 * It uses RTK Query for efficient API calls with caching and state management.
 *
 * The login endpoint handles user authentication and returns a token and user data.
 */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";

// TypeScript interface for the login response from the server.
export type TLoginResponse = {
    token: string;
    user: {
        user_id: number;
        first_name: string;
        last_name: string;
        email: string;
        role: string;
    };
}

// TypeScript interface for login input data.
type LoginInputs = {
    email: string;
    password: string;
}

// Create the login API slice for authentication.
export const loginAPI = createApi({
    reducerPath: 'loginAPI', // Unique key in the Redux store
    baseQuery: fetchBaseQuery({ baseUrl: ApiDomain }), // Base query with API domain
    tagTypes: ['Login'], // Tags for cache management
    endpoints: (builder) => ({
        // Mutation for user login
        loginUser: builder.mutation<TLoginResponse, LoginInputs>({
            query: (loginData) => ({
                url: '/auth/login',
                method: 'POST',
                body: loginData // Send email and password
            }),
            invalidatesTags: ['Login'] // Invalidate login cache after successful login
        })
    })
});
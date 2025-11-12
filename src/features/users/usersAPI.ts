/**
 * Users API using RTK Query
 *
 * This file defines API endpoints for user management using Redux Toolkit Query (RTK Query).
 * It handles operations like user registration, verification, fetching users, and updates.
 *
 * RTK Query provides:
 * - Automatic caching and invalidation
 * - Auto-generated hooks for components
 * - Loading states and error handling
 * - Optimistic updates
 */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";
import type { RootState } from "../../app/store";

// TypeScript interface defining the structure of a User.
export type TUser = {
    id: number
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    isVerified: string;
    image_url?: string;

}

// Create the users API slice for managing user-related operations.
export const usersAPI = createApi({
    reducerPath: 'usersAPI', // Unique identifier for this API in the Redux store
    baseQuery: fetchBaseQuery({
        baseUrl: ApiDomain, // Base URL for all user API requests
        prepareHeaders: (headers, { getState }) => {
            // Prepare authentication headers for requests
            const token = (getState() as RootState).user.token; // Get auth token from Redux state
            if (token) {
                headers.set('Authorization', `Bearer ${token}`); // Add Bearer token
            }
            headers.set('Content-Type', 'application/json'); // Set JSON content type
            return headers;
        }
    }),

    // Tag types for cache invalidation - ensures data stays fresh after mutations
    tagTypes: ['Users'],
    endpoints: (builder) => ({ // Define API endpoints
        // Mutation for user registration
        createUsers: builder.mutation<TUser, Partial<TUser>>({
            query: (newUser) => ({
                url: '/auth/register',
                method: 'POST',
                body: newUser
            }),
            invalidatesTags: ['Users'] // Refresh user list cache after registration
        }),
        // Mutation for email verification
        verifyUser: builder.mutation<{ message: string }, { email: string; code: string }>({
            query: (data) => ({
                url: '/auth/verify',
                method: 'POST',
                body: data,
            }),
        }),
        // Query to fetch all users
        getUsers: builder.query<TUser[], void>({
            query: () => '/users',
            providesTags: ['Users'] // Cache this query
        }),
        // Mutation to update user details
        updateUser: builder.mutation<TUser, Partial<TUser> & { id: number }>({
            query: (user) => ({
                url: `/user/${user.id}`,
                method: 'PUT',
                body: user,
            }),
            invalidatesTags: ['Users'] // Invalidate cache after update
        }),
        // Query to fetch a specific user by ID
        getUserById: builder.query<TUser, number>({
            query: (id) => `/user/${id}`,
        }),

    })
})


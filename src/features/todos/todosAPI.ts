/**
 * Todos API using RTK Query
 *
 * This file defines API endpoints for todo management using Redux Toolkit Query (RTK Query).
 * RTK Query is a powerful data fetching and caching tool built on top of Redux Toolkit.
 *
 * Key concepts:
 * - API Slice: A collection of endpoints for a specific domain (todos).
 * - Endpoints: Define how to fetch, mutate, or subscribe to data.
 * - Base Query: Configures the base URL and default headers for requests.
 * - Tags: Used for cache invalidation when data changes.
 * - Hooks: Auto-generated hooks for using the API in components.
 */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";
import type { RootState } from "../../app/store";

// TypeScript interface defining the structure of a Todo item.
export type TTodo = {
    id: number;
    todoName: string;
    description: string;
    userId: number;
    dueDate: string;
    createdAt: string;
    isCompleted: boolean;
}

// Create the API slice using RTK Query's createApi.
// This generates the reducer, middleware, and hooks for todo operations.
export const todosAPI = createApi({
    reducerPath: 'todosAPI', // Unique key for this API in the Redux store
    baseQuery: fetchBaseQuery({
        baseUrl: ApiDomain, // Base URL for all API requests
        prepareHeaders: (headers, { getState }) => {
            // Function to prepare headers for each request
            const token = (getState() as RootState).user.token; // Retrieve auth token from Redux state
            if (token) {
                headers.set('Authorization', `Bearer ${token}`); // Add Bearer token for authentication
            }
            headers.set('Content-Type', 'application/json'); // Set content type for JSON requests
            return headers;
        }
    }),

    tagTypes: ['Todos'], // Tags for cache invalidation - used to refresh cached data
    endpoints: (builder) => ({ // Define API endpoints using the builder
        // Mutation for creating a new todo
        createTodo: builder.mutation<TTodo, Partial<TTodo>>({
            query: (newTodo) => ({
                url: '/todo',
                method: 'POST',
                body: newTodo
            }),
            invalidatesTags: ['Todos'] // Invalidate cache to refetch todos after creation
        }),
        // Query for fetching all todos
        getTodos: builder.query<{ data: TTodo[] }, void>({ // No parameters needed
            query: () => '/todos',
            providesTags: ['Todos'] // Mark this endpoint as providing 'Todos' data for caching
        }),
        // Mutation for updating an existing todo
        updateTodo: builder.mutation<TTodo, Partial<TTodo> & { id: number }>({ // Ensure id is always present
            query: (updatedTodo) => ({
                url: `/todo/${updatedTodo.id}`,
                method: 'PUT',
                body: updatedTodo
            }),
            invalidatesTags: ['Todos'] // Invalidate cache after update
        }),
        // Mutation for deleting a todo
        deleteTodo: builder.mutation<{ success: boolean, id: number }, number>({ // Returns success status and deleted id
            query: (id) => ({
                url: `/todo/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Todos'] // Invalidate cache after deletion
        }),
        // Query for fetching todos by user ID
        getTodosByUserId: builder.query<{ data: TTodo[] }, number>({
            query: (userId) => `/todo/user/${userId}`,
            providesTags: ['Todos'] // Cache this query result
        })
    })
})
/**
 * Redux Store Configuration
 *
 * This file sets up the Redux store using Redux Toolkit (RTK).
 * Redux is a predictable state container for JavaScript applications.
 * It helps manage the application's state in a centralized way.
 *
 * Key concepts:
 * - Store: Holds the entire state tree of the application.
 * - Reducers: Pure functions that specify how the state changes in response to actions.
 * - Actions: Plain objects that describe what happened (e.g., user login).
 * - Middleware: Functions that intercept actions before they reach the reducer.
 *
 * This setup includes:
 * - RTK Query APIs for handling API calls and caching.
 * - Redux Persist for storing state in localStorage.
 * - Custom middleware for token expiration checks.
 */

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { usersAPI } from '../features/users/usersAPI'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { loginAPI } from '../features/login/loginAPI'
import userSlice from '../features/login/userSlice'
import { todosAPI } from '../features/todos/todosAPI'
import tokenExpirationMiddleware from '../utils/tokenExpiryMiddleware'


// Configuration for Redux Persist
// Redux Persist allows the store to be persisted in localStorage,
// so state survives page refreshes.
const persistConfig = {
    key: 'root', //storage key for the persisted state
    version: 1, //version of the persisted state
    storage, // storage engine to use (localStorage in this case)
    whitelist: ['user'] // Only persist the user slice - this means only the user state will be saved in local storage
}

// Reducers are pure functions that specify how the application's state changes in response to actions.
// Here, we combine multiple reducers into a single root reducer.
// Each API (usersAPI, loginAPI, todosAPI) has its own reducer managed by RTK Query.
// The userSlice reducer handles user authentication state.

const rootReducer = combineReducers({ // Combining all reducers into one root reducer
    [usersAPI.reducerPath]: usersAPI.reducer,
    [loginAPI.reducerPath]: loginAPI.reducer,
    [todosAPI.reducerPath]: todosAPI.reducer,
    user: userSlice
})

// Wrap the combined reducers with persistReducer to enable persistence in localStorage.
// This ensures that specified state (like user data) survives page refreshes.
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configure the Redux store with the persisted reducer.
// The store is the central hub that holds the application's state.
export const store = configureStore({
    reducer: persistedReducer, // Use the persisted reducer to enable state persistence

    // Middleware configuration:
    // RTK Query APIs require middleware for features like caching, invalidation, and polling.
    // We customize the default middleware and add API-specific and custom middlewares.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false // Disable serializable check for persisted state.
        // Serializable values can be converted to JSON without loss. Disabled here because
        // RTK Query uses non-serializable values (like functions) in its internal state.
    })
        .concat(usersAPI.middleware) // Add usersAPI middleware for caching and invalidation
        .concat(loginAPI.middleware) // Add loginAPI middleware
        .concat(todosAPI.middleware) // Add todosAPI middleware
        .concat(tokenExpirationMiddleware) // Custom middleware to check token expiration before actions
})

// Create a persistor object needed for persisting the store to localStorage.
// This is used in the app to wrap components with PersistGate for rehydration.
export const persistedStore = persistStore(store)

// TypeScript type for the entire state tree in the store.
// This provides type safety when accessing state in components and selectors.
export type RootState = ReturnType<typeof store.getState>

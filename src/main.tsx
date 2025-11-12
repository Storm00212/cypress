/**
 * Main Application Entry Point
 *
 * This file bootstraps the React application with Redux state management and persistence.
 * It sets up the root component tree with necessary providers and renders the app.
 *
 * Key concepts:
 * - React.StrictMode: Enables additional development checks and warnings
 * - Redux Provider: Makes the Redux store available to all components
 * - PersistGate: Delays app rendering until persisted state is loaded from localStorage
 * - createRoot: New React 18 API for concurrent rendering
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from "react-redux"
import { persistedStore, store } from './app/store.ts'
import { PersistGate } from 'redux-persist/integration/react'

// Create the root React element and render the application
// The '!' asserts that getElementById will not return null (root element exists)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Redux Provider makes the store available to all components via React Context */}
    <Provider store={store}>
      {/* PersistGate delays rendering until Redux Persist loads saved state from localStorage */}
      {/* This prevents the app from showing empty state before persisted data is restored */}
      {/* loading={null} means no loading spinner; set to a component to show loading UI */}
      <PersistGate loading={null} persistor={persistedStore}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)

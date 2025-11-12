/**
 * Main Application Component with Routing
 *
 * This component sets up the application's routing structure using React Router.
 * It defines all available routes and implements role-based access control.
 *
 * Key concepts:
 * - React Router: Declarative routing for React applications
 * - Protected Routes: Routes that require authentication and specific roles
 * - Nested Routes: Child routes for dashboard sections
 * - Redux Integration: Access user state for role-based rendering
 * - Toast Notifications: Global notification system using Sonner
 */

import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'

// Page components for different routes
import LandingPage from './pages/LandingPage'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import AboutPage from './pages/AboutPage'
import AdminDashboard from './dashboard/AdminDashboard/AdminDashboard'
import Error from './components/error/Error'
import VerifyUser from './pages/auth/VerifyUser'
import { Toaster } from 'sonner'

// Dashboard components for admin and user roles
import Todos from './dashboard/AdminDashboard/todos/Todos'
import Users from './dashboard/AdminDashboard/manageUsers/Users'
import Profile from './dashboard/AdminDashboard/Profile'
import { type RootState } from './app/store'
import { useSelector } from 'react-redux'
import UserTodos from './dashboard/UserDashboard/todos/UserTodos'
import UserProfile from './dashboard/UserDashboard/UserProfile'
import UserDashboard from './dashboard/UserDashboard/UserDashboard'

function App() {
  // Access user role from Redux state for conditional rendering
  // These selectors determine which dashboard to show based on user permissions
  const isAdmin = useSelector((state: RootState) => state.user.user?.role === 'admin');
  const isUser = useSelector((state: RootState) => state.user.user?.role === 'user');

  // Define the application's routing configuration
  // createBrowserRouter creates a router that uses the HTML5 history API
  const router = createBrowserRouter([
    // Public routes - accessible without authentication
    {
      path: '/',
      element: <LandingPage />, // Main landing page with hero, services, testimonials
    },
    {
      path: '/about',
      element: <AboutPage /> // About page with company information
    },
    {
      path: '/register',
      element: <Register /> // User registration form
    },
    {
      path: '/register/verify',
      element: <VerifyUser /> // Email verification after registration
    },
    {
      path: '/login',
      element: <Login /> // User login form
    },

    // Protected Admin Dashboard Routes - only accessible to admin users
    // Role-based protection: redirects to login if user is not admin
    {
      path: '/admin/dashboard',
      element: isAdmin ? <AdminDashboard /> : <Login />, // Layout component with sidebar
      children: [ // Nested routes render inside the dashboard layout
        {
          path: 'analytics',
          element: <h1>Analytics</h1> // Placeholder for future analytics page
        },
        {
          path: 'todos',
          element: <Todos /> // Admin todo management interface
        },
        {
          path: 'users',
          element: <Users /> // User management for admins
        },
        {
          path: 'profile',
          element: <Profile /> // Admin profile management
        },
      ]
    },

    // Protected User Dashboard Routes - only accessible to regular users
    // Role-based protection: redirects to login if user is not authenticated as user
    {
      path: '/user/dashboard',
      element: isUser ? <UserDashboard /> : <Login />, // User dashboard layout
      children: [ // Nested routes for user-specific features
        {
          path: 'analytics',
          element: <h1>Analytics</h1> // Placeholder for user analytics
        },
        {
          path: 'todos',
          element: <UserTodos /> // User's personal todo list
        },
        {
          path: 'profile',
          element: <UserProfile /> // User profile settings
        },
      ]
    },

    // Catch-all route for 404 errors - renders error page for unknown paths
    {
      path: '*',
      element: <Error />
    }
  ])

  return (
    <>
      {/* RouterProvider makes the routing configuration available to the entire app */}
      {/* It handles navigation and renders the appropriate component based on the current URL */}
      <RouterProvider router={router} />

      {/* Global toast notification system using Sonner */}
      {/* Displays success, error, and info messages throughout the application */}
      <Toaster
        position='top-right' // Position toasts in top-right corner
        toastOptions={{
          // Custom CSS classes for different toast types
          classNames: {
            error: 'bg-red-500 text-white',    // Red background for errors
            success: 'bg-green-500 text-white', // Green background for success
            info: 'bg-blue-500 text-white',     // Blue background for info
          }
        }}
      />
    </>
  )
}

export default App

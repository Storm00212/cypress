/**
 * Login Page Component
 *
 * Handles user authentication with form validation and state management.
 * Integrates with Redux for global state and RTK Query for API calls.
 *
 * Key features:
 * - Form validation using React Hook Form + Yup
 * - Redux state management for authentication
 * - Role-based navigation after login
 * - Error handling and user feedback
 * - Email pre-population from registration flow
 */

import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router';
import { loginAPI } from '../../features/login/loginAPI';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../features/login/userSlice';

// TypeScript interface for form data structure
type LoginInputs = {
    email: string;
    password: string;
};

// Validation schema using Yup for form field validation
// Defines rules for email and password fields
const schema = yup.object({
    email: yup.string().email('Invalid email').max(100, 'Max 100 characters').required('Email is required'),
    password: yup.string().min(6, 'Min 6 characters').max(255, 'Max 255 characters').required('Password is required'),
});

function Login() {
    // React Router hooks for navigation and location state
    const navigate = useNavigate();
    const location = useLocation();

    // Redux hook for dispatching actions
    const dispatch = useDispatch();

    // Extract email from navigation state (passed from registration flow)
    // Allows pre-populating email field when coming from registration
    const emailFromState = location.state?.email || ''

    // RTK Query hook for login mutation
    // Provides loginUser function and loading state
    const [loginUser, { isLoading }] = loginAPI.useLoginUserMutation()

    // React Hook Form setup with Yup validation
    // register: connects form inputs to form state
    // handleSubmit: handles form submission
    // formState: provides validation errors and form status
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInputs>({
        resolver: yupResolver(schema), // Use Yup for validation
        defaultValues: {
            email: emailFromState, // Pre-populate email if available
        }
    });

    // Form submission handler - called when user submits login form
    const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
        console.log('Login data:', data); // Debug logging

        try {
            // Call RTK Query mutation to authenticate user
            // .unwrap() extracts the actual data from the mutation result
            const response = await loginUser(data).unwrap()
            console.log("Login response:", response);

            // Dispatch Redux action to update global auth state
            dispatch(loginSuccess(response))

            // Show success notification to user
            toast.success("Login successful!");

            // Role-based navigation after successful login
            // Admin users go to admin dashboard, regular users to user dashboard
            if (response.user.role === 'admin') {
                navigate('/admin/dashboard/todos');
            } else if (response.user.role === 'user') {
                navigate('/user/dashboard/todos');
            }

        } catch (error) {
            // Handle authentication errors
            console.log("Login error:", error);
            // Show error notification to user
            toast.error("Login failed. Please check your credentials and try again.");
        }
    }

    return (
        // Centered layout using flexbox for login form
        <div className="flex justify-center items-center min-h-screen bg-base-200 ">
            {/* Form container with max width, padding, and styling */}
            <div className="w-full max-w-lg p-8 rounded-xl shadow-lg bg-white">
                {/* Page title */}
                <h1 className="text-3xl font-bold mb-6 text-center">Login to Your Account</h1>

                {/* Login form with validation */}
                {/* handleSubmit wraps onSubmit and provides form validation */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Email input field with validation */}
                    <input
                        data-test="login-email-input" // Cypress test selector
                        type="email"
                        {...register('email')} // Connect to React Hook Form
                        placeholder="Email"
                        className='input border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg '
                        readOnly={!!emailFromState} // Make readonly if email passed from registration
                    />
                    {/* Display validation error for email field */}
                    {errors.email && (
                        <span className="text-sm  text-red-700">{errors.email.message}</span>
                    )}

                    {/* Password input field */}
                    <input
                        data-test="login-password-input" // Cypress test selector
                        type="password"
                        {...register('password')} // Connect to React Hook Form
                        placeholder="Password"
                        className='input border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg '
                    />
                    {/* Display validation error for password field */}
                    {errors.password && (
                        <span className="text-sm text-red-700">{errors.password.message}</span>
                    )}

                    {/* Submit button with loading state */}
                    <button
                        data-test="login-submit-button" // Cypress test selector
                        type="submit"
                        className="btn btn-primary w-full mt-4"
                        disabled={isLoading} // Disable during API call
                    >
                        {/* Show loading spinner and text when submitting */}
                        {isLoading ? (
                            <>
                                <span className="loading loading-spinner text-primary" /> Logining...
                            </>
                        ) : "Login"}
                    </button>
                </form>

                {/* Navigation links for users who don't have accounts or want to go back */}
                <div className="mt-6 flex flex-col items-center space-y-2">
                    {/* Link to registration page for new users */}
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        <a href="/register" className="text-blue-600 hover:underline">
                            Register
                        </a>
                    </p>
                    {/* Link back to homepage */}
                    <p className="text-gray-600">
                        <a href="/" className="text-blue-600 hover:underline">
                            Back to Home
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;

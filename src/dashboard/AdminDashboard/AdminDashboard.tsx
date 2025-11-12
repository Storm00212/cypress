/**
 * Admin Dashboard Layout Component
 *
 * Main layout component for the admin dashboard with responsive sidebar navigation.
 * Provides a consistent structure for all admin pages with collapsible drawer.
 *
 * Features:
 * - Responsive sidebar (collapsible on mobile, fixed on desktop)
 * - Top navigation bar with welcome message
 * - Drawer toggle functionality
 * - Outlet for rendering nested admin routes
 * - Consistent footer across all admin pages
 */

import { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/nav/Navbar";
import AdminDrawer from "./aside/AdminDrawer";
import { FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import Footer from "../../components/footer/Footer";

const AdminDashboard = () => {
    // State for controlling drawer/sidebar visibility on mobile
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Toggle function for opening/closing the drawer
    const handleDrawerToggle = () => {
        setDrawerOpen((prev) => !prev);
    };

    return (
        // Main dashboard container with full height layout
        <div className="flex flex-col min-h-screen">
            {/* Site navigation - consistent across all pages */}
            <Navbar />

            {/* Top bar with welcome message and mobile menu toggle */}
            <div className="flex px-4 py-4 bg-gray-700 items-center">
                {/* Mobile drawer toggle button - only visible on small screens */}
                <button
                    className="mr-4 text-white text-2xl lg:hidden"
                    onClick={handleDrawerToggle}
                >
                    {/* Show close icon when drawer is open, hamburger when closed */}
                    {drawerOpen ? <IoCloseSharp /> : <FaBars />}
                </button>
                {/* Welcome message for admin users */}
                <span className="text-white text-lg font-semibold">
                    Welcome to your Admin dashboard
                </span>
            </div>

            {/* Main content area with sidebar and page content */}
            <div className="flex flex-1">
                {/* Sidebar navigation drawer */}
                <aside
                    className={`
                        fixed top-0 z-40 w-64 bg-gray-600
                        ${drawerOpen ? "" : "hidden"}  // Hidden on mobile when closed
                        lg:static lg:block lg:w-64    // Always visible and static on desktop
                        `}
                    style={{ minHeight: "100vh" }}
                >
                    <div className="h-full">
                        {/* Mobile close button - positioned in top-right of drawer */}
                        <button
                            className="absolute top-4 right-4 text-white text-2xl lg:hidden"
                            onClick={handleDrawerToggle}
                        >
                            <IoCloseSharp />
                        </button>
                        {/* Admin navigation menu component */}
                        <AdminDrawer />
                    </div>
                </aside>

                {/* Main content area where nested routes are rendered */}
                <main className="flex-1 bg-green-200 min-h-screen">
                    {/* Outlet renders the matched child route component */}
                    <Outlet />
                </main>
            </div>
            {/* Site footer */}
            <Footer />
        </div>
    );
};

export default AdminDashboard;
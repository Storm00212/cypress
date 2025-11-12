
/**
 * Landing Page Component
 *
 * This is the main landing page that serves as the homepage of the application.
 * It combines multiple sections to create a complete marketing page experience.
 *
 * Layout structure:
 * - Navbar: Navigation header with links and branding
 * - Hero: Main banner section with call-to-action
 * - Services: Overview of services offered
 * - Testimonials: Customer reviews and social proof
 * - Footer: Site-wide footer with links and information
 *
 * This component composition approach allows for:
 * - Modular development and maintenance
 * - Reusable components across different pages
 * - Consistent layout and styling
 */

import Testimonials from "../components/about/Testimonials"
import Footer from "../components/footer/Footer"
import { Hero } from "../components/home/Hero"
import Services from "../components/home/Services"
import Navbar from "../components/nav/Navbar"

const LandingPage = () => {
    return (
        <div>
            {/* Site navigation - appears on all pages */}
            <Navbar />

            {/* Main hero section - primary call-to-action area */}
            <Hero />

            {/* Services overview - showcases what the app offers */}
            <Services />

            {/* Customer testimonials - builds trust and credibility */}
            <Testimonials />

            {/* Site footer - contact info, links, copyright */}
            <Footer />
        </div>
    )
}

export default LandingPage
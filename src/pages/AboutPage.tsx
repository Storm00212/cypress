/**
 * About Page Component
 *
 * Dedicated page for company/organization information and background.
 * Focuses on building trust and providing detailed information about the service.
 *
 * Layout structure:
 * - Navbar: Consistent navigation across the site
 * - About: Main content section with company story, mission, values
 * - Testimonials: Social proof and customer satisfaction
 * - Footer: Standard site footer
 *
 * This page serves important marketing purposes:
 * - Establishes credibility and trustworthiness
 * - Provides context about the company's background
 * - Reinforces the value proposition through testimonials
 * - Offers contact information and additional resources
 */

import About from "../components/about/About"
import Testimonials from "../components/about/Testimonials"
import Footer from "../components/footer/Footer"
import Navbar from "../components/nav/Navbar"

const AboutPage = () => {
  return (
    <div>
      {/* Consistent site navigation */}
      <Navbar />

      {/* Main about content - company story, mission, team */}
      <About />

      {/* Customer testimonials for social proof */}
      <Testimonials />

      {/* Site footer with additional links and info */}
      <Footer />
    </div>
  )
}

export default AboutPage
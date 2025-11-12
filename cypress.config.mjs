/**
 * Cypress Configuration
 *
 * This file configures Cypress for end-to-end (E2E) testing.
 * Cypress is a JavaScript-based testing framework for web applications.
 *
 * Key features:
 * - E2E testing: Tests the entire application flow from user perspective
 * - Real browser testing: Runs tests in actual browsers
 * - Automatic waiting: No need for explicit waits or sleeps
 * - Time travel debugging: Interactive test runner with snapshots
 */

import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // Setup function for Node.js event listeners (plugins, preprocessors, etc.)
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // This is where you can add plugins like code coverage, API mocking, etc.
    },
    // Base URL for the application under test
    // All cy.visit() calls will be relative to this URL
    baseUrl: "http://localhost:5173"
  },
});

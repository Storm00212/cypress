/**
 * Custom Cypress Commands
 *
 * This file defines custom commands that extend Cypress's functionality.
 * Custom commands allow you to create reusable test utilities and improve test readability.
 *
 * Key concepts:
 * - Cypress.Commands.add(): Registers a new custom command
 * - TypeScript declarations: Extend Cypress interfaces for type safety
 * - Command chaining: Commands return Chainable objects for fluent API
 */

/// <reference types="cypress" />

// Custom command to select elements by data-test attribute
// This promotes test stability by using semantic selectors instead of CSS classes
Cypress.Commands.add('getDataTest', (dataTestSelector) => {
    return cy.get(`[data-test="${dataTestSelector}"]`)
})

// Custom command to login as admin user
// This encapsulates the entire login flow for reuse across tests
Cypress.Commands.add('loginAsAdmin', (email = 'bkemboi590@gmail.com', password = 'mypassword123') => {
    // Navigate to login page
    cy.visit('/login')
    // Fill in credentials
    cy.getDataTest('login-email-input').type(email)
    cy.getDataTest('login-password-input').type(password)
    // Submit login form
    cy.getDataTest('login-submit-button').click()
    // Verify successful redirect to admin dashboard
    cy.url().should('include', '/admin/dashboard/todos')

    // Verify dashboard content is loaded
    cy.get('body').should('contain.text', 'Welcome to your Admin dashboard')
})




/* eslint-disable @typescript-eslint/no-namespace */

// Export empty object to make this a module
export { }

// Extend Cypress global namespace to add type definitions for custom commands
// This provides TypeScript IntelliSense and type checking for custom commands
declare global {
    namespace Cypress {
        interface Chainable {
            // Type definition for getDataTest command
            getDataTest(value: string): Chainable<JQuery<HTMLElement>>;
            // Type definition for loginAsAdmin command
            loginAsAdmin(email?: string, password?: string): Chainable<void>;
        }
    }
}

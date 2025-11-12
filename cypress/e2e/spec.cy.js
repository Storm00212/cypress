/**
 * Basic Cypress Test Example
 *
 * This is a template/spec file demonstrating the basic structure of a Cypress test.
 * Cypress tests are written using Mocha's BDD syntax with 'describe' and 'it' blocks.
 *
 * Key concepts:
 * - describe(): Groups related tests together (test suite)
 * - it(): Defines an individual test case
 * - cy: Cypress commands for interacting with the application
 * - visit(): Navigates to a URL
 */

describe('template spec', () => {
  it('passes', () => {
    // Visit the Cypress example website
    // This test simply checks that the page loads without errors
    cy.visit('https://example.cypress.io')
  })
})
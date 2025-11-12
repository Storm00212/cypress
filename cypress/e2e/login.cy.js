/**
 * Login Functionality Tests
 *
 * This test suite covers the login functionality of the application.
 * It tests both successful and failed login scenarios using Cypress.
 *
 * Cypress features demonstrated:
 * - beforeEach(): Setup code that runs before each test
 * - cy.visit(): Navigate to pages
 * - cy.get(): Select DOM elements
 * - cy.type(): Type into input fields
 * - cy.click(): Click buttons
 * - cy.contains(): Assert text content
 * - cy.url(): Assert current URL
 */

describe("login functionality", () => {
    // Setup that runs before each test in this suite
    beforeEach(() => {
        // Navigate to the login page
        cy.visit('/login')
        // Set viewport size for consistent testing
        cy.viewport(1280, 920)
    })

    it("should login with valid credentials", () => {
        // Verify we're on the login page
        cy.contains(/Login to Your Account/i).should("be.visible")

        // Fill in the email field using data-test attribute
        cy.getDataTest("login-email-input").as("login-emailInput")
        cy.get("@login-emailInput")
            .should("be.visible") // Assert the input is visible
            .should('have.attr', 'type', 'email') // Assert correct input type
            .type('bkemboi590@gmail.com') // Type the email

        // Fill in the password field
        cy.getDataTest('login-password-input').as('login-passwordInput')
        cy.get('@login-passwordInput')
            .should('be.visible')
            .should('have.attr', 'type', 'password')
            .type('mypassword123')

        // Click the login button
        cy.getDataTest('login-submit-button').as('login-submitButton')
        cy.get('@login-submitButton')
            .should('contain.text', 'Login') // Assert button text
            .should('not.be.disabled') // Assert button is enabled
            .click() // Perform the click

        // Verify successful login message appears
        cy.contains(/Login successful/i).should('be.visible')

        // Verify redirect to admin dashboard
        cy.url().should("include", '/admin/dashboard/todos')
    })


    it("should not login with invalid credentials", () => {
        // Verify login page is displayed
        cy.contains(/Login to Your Account/i).should('be.visible')

        // Enter valid email but wrong password
        cy.getDataTest('login-email-input').as('login-emailInput')
        cy.get('@login-emailInput')
            .type('bkemboi590@gmail.com')

        cy.getDataTest('login-password-input').as('login-passwordInput')
        cy.get('@login-passwordInput')
            .type('wrongpassword123')

        // Submit the login form
        cy.getDataTest('login-submit-button').as('login-submitButton')
        cy.get('@login-submitButton')
            .should('contain.text', 'Login')
            .click()

        // Verify error message is shown for invalid credentials
        cy.contains(/Login failed. Please check your credentials and try again./i).should('be.visible')
    })
})
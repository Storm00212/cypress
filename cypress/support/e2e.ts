/**
 * Cypress Support File (E2E)
 *
 * This file is automatically loaded before each test file.
 * It's the perfect place for:
 * - Global test configuration
 * - Custom commands (imported here)
 * - Test setup and teardown
 * - Global hooks and utilities
 *
 * Key concepts:
 * - Support files run once before all test files
 * - Import custom commands and utilities here
 * - Configure global test behavior
 * - Can be disabled via supportFile config option
 *
 * For more info: https://on.cypress.io/configuration
 */

// Import custom commands to make them available in all test files
import './commands'
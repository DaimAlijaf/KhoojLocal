# Backend Test Suite

This directory contains comprehensive backend tests for the KhoojLocal application.

## Test Categories

### 1. Unit Testing
Tests individual functions and models in isolation.
- User model validation
- Vendor model validation  
- JWT token generation
- Password hashing

### 2. Functional Testing
Tests API endpoints and their functionality.
- User authentication
- Vendor management
- Admin operations

### 3. Business Rule Testing
Tests business logic and rules.
- User account rules
- Vendor status workflow
- Category validation
- Rating constraints

### 4. Integration Testing
Tests complete workflows and system integration.
- End-to-end user journey
- Authorization and permissions
- Multi-component interactions

## Prerequisites

Before running tests, ensure you have:
- MongoDB running locally
- Node.js installed
- All dependencies installed (`npm install`)

## Installation

Install test dependencies:
```bash
npm install --save-dev jest supertest
```

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Specific Test Categories
```bash
# Unit tests only
npm run test:unit

# Functional tests only
npm run test:functional

# Business rule tests only
npm run test:business

# Integration tests only
npm run test:integration
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run with Coverage Report
```bash
npm test -- --coverage
```

## Test Structure

```
Test Cases/
└── Backend Tests/
    ├── Unit Testing/
    │   ├── user.model.test.js
    │   ├── vendor.model.test.js
    │   └── jwt.utils.test.js
    ├── Functional Testing/
    │   ├── user.auth.test.js
    │   ├── vendor.management.test.js
    │   └── admin.operations.test.js
    ├── Business Rule Testing/
    │   ├── user.rules.test.js
    │   └── vendor.rules.test.js
    └── Integration Testing/
        ├── user.vendor.flow.test.js
        └── auth.permissions.test.js
```

## Test Case Naming Convention

- **Unit Tests**: TC_UT### (TC_UT001, TC_UT002, etc.)
- **Functional Tests**: TC_FT### (TC_FT001, TC_FT002, etc.)
- **Business Rule Tests**: TC_BR### (TC_BR001, TC_BR002, etc.)
- **Integration Tests**: TC_IT### (TC_IT001, TC_IT002, etc.)

## Test Database

Tests use a separate test database: `khoojlocal_test`

The test database is automatically:
- Created before tests run
- Cleaned after each test
- Dropped after test suite completes

## Coverage Thresholds

Current test coverage targets:
- Statements: 80%
- Branches: 75%
- Functions: 80%
- Lines: 80%

## Writing New Tests

### Example Test Structure

```javascript
describe('Feature Name', () => {
  beforeAll(async () => {
    // Setup before all tests
  });

  afterAll(async () => {
    // Cleanup after all tests
  });

  beforeEach(async () => {
    // Setup before each test
  });

  afterEach(async () => {
    // Cleanup after each test
  });

  test('TC_XX###: Test description', async () => {
    // Test implementation
    expect(result).toBe(expected);
  });
});
```

## Troubleshooting

### MongoDB Connection Error
If tests fail with connection errors:
1. Ensure MongoDB is running: `mongosh`
2. Check connection string in `Test Cases/setup.js`

### Port Already in Use
If you get EADDRINUSE errors:
1. Stop the development server before running tests
2. Or use different ports in test environment

### Tests Timeout
If tests timeout:
1. Increase timeout in `jest.config.js`
2. Check MongoDB is responding

## Continuous Integration

These tests are designed to run in CI/CD pipelines. Ensure:
- MongoDB service is available
- Environment variables are set
- Test database permissions are configured

## Total Test Cases

- Unit Tests: 24 test cases
- Functional Tests: 21 test cases  
- Business Rule Tests: 19 test cases
- Integration Tests: 13 test cases

**Total: 77 comprehensive backend test cases**

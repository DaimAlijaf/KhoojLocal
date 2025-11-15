# Test Case TC001: User Login Flow

## Test Case Information
- **Test Case ID:** TC001
- **Test Case Name:** User Login Flow
- **Module:** Authentication
- **Priority:** High
- **Created Date:** November 16, 2025
- **Created By:** QA Team

---

## Objective
Verify that users can successfully log in to the KhoojLocal platform with valid credentials.

---

## Preconditions
1. User must have a registered account in the system
2. Application is accessible and running
3. User is on the login page (/)

---

## Test Data
- **Valid Username:** testuser@khoojlocal.com
- **Valid Password:** Test@123
- **Invalid Username:** invaliduser@test.com
- **Invalid Password:** wrongpass

---

## Test Steps

| Step # | Action | Expected Result |
|--------|--------|-----------------|
| 1 | Navigate to the application URL (http://localhost:3001/) | Login page is displayed with username/password fields |
| 2 | Enter valid username in the email/username field | Username is accepted and displayed in the field |
| 3 | Enter valid password in the password field | Password is masked and displayed as dots/asterisks |
| 4 | Click on the "Login" button | User is authenticated and redirected to Main Page (/main) |
| 5 | Verify user session | User remains logged in, navbar displays user options |

---

## Expected Results
- User successfully logs in with valid credentials
- User is redirected to the main page after successful login
- User session is maintained across page navigation
- Logout button is visible in the navbar

---

## Actual Results
_To be filled during test execution_

---

## Test Status
☐ Pass  
☐ Fail  
☐ Blocked  
☐ Not Executed

---

## Negative Test Cases

### TC001-N1: Login with Invalid Credentials
| Step # | Action | Expected Result |
|--------|--------|-----------------|
| 1 | Enter invalid username | Field accepts input |
| 2 | Enter invalid password | Field accepts input |
| 3 | Click Login button | Error message displayed: "Invalid credentials" |
| 4 | Verify user remains on login page | User is not authenticated, login page still visible |

### TC001-N2: Login with Empty Fields
| Step # | Action | Expected Result |
|--------|--------|-----------------|
| 1 | Leave username field empty | Field is empty |
| 2 | Leave password field empty | Field is empty |
| 3 | Click Login button | Validation error: "Please fill in all required fields" |

---

## Notes
- Browser compatibility should be tested across Chrome, Firefox, Safari, and Edge
- Test on both desktop and mobile viewports
- Verify password field security (masked input)
- Check for proper error handling and user-friendly error messages

---

## Attachments
_Add screenshots of test execution if applicable_

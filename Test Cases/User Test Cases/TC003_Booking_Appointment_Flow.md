# Test Case TC003: Booking Appointment Flow

## Test Case Information
- **Test Case ID:** TC003
- **Test Case Name:** Complete Booking Appointment Flow
- **Module:** Booking & Reservations
- **Priority:** Critical
- **Created Date:** November 16, 2025
- **Created By:** QA Team

---

## Objective
Verify that users can successfully browse a business, select a service, choose a date/time, and complete a booking appointment.

---

## Preconditions
1. User is logged into the application
2. User has navigated to a business details page
3. Business offers bookable services with available time slots
4. User has not exceeded maximum active bookings (if applicable)

---

## Test Data
- **Business:** Bella's Beauty Salon
- **Service:** Hair Color & Style
- **Preferred Date:** Tomorrow's date
- **Preferred Time:** 2:00 PM
- **Customer Details:**
  - Name: John Doe
  - Phone: +1-234-567-8900
  - Email: john.doe@example.com
  - Notes: "First-time customer, need consultation"

---

## Test Steps

| Step # | Action | Expected Result |
|--------|--------|-----------------|
| 1 | Navigate to Main Page and click on a business "View Details" | Business Details page (/business/:id) is displayed |
| 2 | Verify business information is displayed | Gallery, trust score, About, Reviews, Location, Hours are visible |
| 3 | Click "Book / Order Now" button | User is redirected to Booking page (/booking) |
| 4 | Review available services on booking page | List of services with prices and durations is displayed |
| 5 | Select "Hair Color & Style" service | Service card is highlighted with violet border/background |
| 6 | View the calendar component | Current month calendar is displayed with available dates |
| 7 | Click on tomorrow's date | Date is selected and highlighted in violet |
| 8 | View available time slots for selected date | Time slots grid appears showing available times |
| 9 | Select "2:00 PM" time slot | Time slot is highlighted in violet |
| 10 | Review Booking Summary card | Shows selected service, date, time, and total price |
| 11 | Enter customer name in the form | Name field accepts and displays input |
| 12 | Enter phone number | Phone field accepts and validates format |
| 13 | Enter email address | Email field accepts and validates format |
| 14 | Add special notes (optional) | Notes textarea accepts input |
| 15 | Click "Confirm Booking" button | Booking confirmation modal/message appears |
| 16 | Navigate to Bookings page via navbar | Bookings page (/bookings) displays new booking |
| 17 | Verify booking appears in "Upcoming" section | Booking card shows with status "Confirmed" or "Pending" |

---

## Expected Results
- **Booking Page Layout:**
  - Booking summary card is sticky on desktop, positioned at top on mobile
  - Service selection is radio-button style (only one selected at a time)
  - Calendar shows current month with navigation arrows
  - Disabled dates (past dates, unavailable dates) are grayed out
  - Time slots are displayed in a responsive grid
  - Form validation works for all required fields

- **Booking Summary Card Displays:**
  - Service name and duration
  - Selected date (formatted: "Mon, Dec 15, 2025")
  - Selected time (formatted: "2:00 PM")
  - Price breakdown
  - Total amount

- **After Booking Confirmation:**
  - Success message: "Your appointment has been confirmed!"
  - Booking ID is generated
  - Confirmation email sent (if implemented)
  - Booking appears in user's bookings list
  - Can view booking details from Bookings page

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

## Additional Test Scenarios

### TC003-A1: Booking Validation Errors
| Step # | Action | Expected Result |
|--------|--------|-----------------|
| 1 | Try to confirm booking without selecting a service | Error: "Please select a service" |
| 2 | Try to confirm without selecting a date | Error: "Please select a date" |
| 3 | Try to confirm without selecting a time | Error: "Please select a time slot" |
| 4 | Submit form with empty required fields | Validation errors displayed inline |
| 5 | Enter invalid email format | Error: "Please enter a valid email" |
| 6 | Enter invalid phone format | Error: "Please enter a valid phone number" |

### TC003-A2: Modify Booking Selection
| Step # | Action | Expected Result |
|--------|--------|-----------------|
| 1 | Select a service | Service is selected |
| 2 | Select a different service | Previous selection is cleared, new service selected |
| 3 | Select a date and time | Date and time are selected |
| 4 | Change to a different date | Time slots update for new date |
| 5 | Verify summary card updates | Summary reflects all current selections |

### TC003-A3: View Booking in Timeline View
| Step # | Action | Expected Result |
|--------|--------|-----------------|
| 1 | Navigate to Bookings page | List view is default |
| 2 | Click "Timeline" view toggle | View changes to timeline with vertical dots and lines |
| 3 | Locate the new booking | Booking appears in chronological order with violet dot |
| 4 | Verify booking details | Date label, business name, service, time all visible |

### TC003-A4: Mobile Booking Experience
| Step # | Action | Expected Result |
|--------|--------|-----------------|
| 1 | Open booking page on mobile (< 768px) | Layout stacks vertically |
| 2 | Verify summary card position | Summary card appears at top (order-first) |
| 3 | Test service selection | Touch-friendly cards (44px+ height) |
| 4 | Test calendar interaction | Calendar days are easily tappable |
| 5 | Test time slot selection | Time slots are large enough for touch |
| 6 | Submit booking | Form submission works on mobile |

---

## Responsive Design Checks
- ☐ Desktop: Summary card sticky on right side
- ☐ Mobile: Summary card at top, form below
- ☐ Calendar navigation arrows are visible and functional
- ☐ Time slots wrap properly on smaller screens
- ☐ All interactive elements have active:scale-95 feedback

---

## Integration Points to Verify
- Business details page "Book / Order Now" button navigates correctly
- State is passed correctly from business page (business ID, name)
- Bookings page correctly fetches and displays new booking
- Status badges display correct state (Confirmed/Pending)
- Expandable booking cards work (ChevronDown/Up toggle)

---

## Performance Metrics
- Booking page should load within 2 seconds
- Calendar should be interactive immediately
- Time slot selection should be instant
- Form submission should complete within 3 seconds

---

## Security Checks
- ☐ Verify user authentication before allowing bookings
- ☐ Check that users can only view their own bookings
- ☐ Validate that time slots cannot be double-booked
- ☐ Ensure form data is sanitized before submission

---

## Notes
- Test with multiple services to verify selection logic
- Verify that past dates cannot be selected in calendar
- Check timezone handling for booking times
- Test booking cancellation flow (if implemented)
- Verify notification system for booking confirmations
- Check violet theme (violet-600) is used consistently
- Test shared Navbar component on booking page

---

## Attachments
_Add screenshots of:_
- Business details page with "Book Now" button
- Booking page with service selection
- Calendar with date selected
- Time slots grid
- Booking summary card (desktop and mobile)
- Booking confirmation message
- Bookings page showing new booking
- Timeline view with booking

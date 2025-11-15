# Test Case TC002: Search and Filter Businesses

## Test Case Information
- **Test Case ID:** TC002
- **Test Case Name:** Search and Filter Businesses
- **Module:** Search & Discovery
- **Priority:** High
- **Created Date:** November 16, 2025
- **Created By:** QA Team

---

## Objective
Verify that users can search for local businesses and apply filters to refine their search results.

---

## Preconditions
1. User is logged into the application
2. User is on the Main Page (/main) or any page with the navbar
3. Multiple businesses exist in the database with different categories, ratings, and prices
4. Sample search term: "salon"

---

## Test Data
- **Search Query:** "salon"
- **Filter Options:**
  - Category: Beauty & Spa
  - Distance: Within 5 km
  - Price Range: $$ ($50-$100)
  - Rating: 4 stars and above
  - Open Now: Yes

---

## Test Steps

| Step # | Action | Expected Result |
|--------|--------|-----------------|
| 1 | Navigate to Main Page (/main) | Main page displays with navbar containing search bar |
| 2 | Enter "salon" in the search bar | Text is entered and visible in the search field |
| 3 | Click the "Search" button in navbar | User is redirected to Search Results page (/search?q=salon) |
| 4 | Verify search results are displayed | At least 3-6 businesses matching "salon" are shown |
| 5 | Click "Filters" button (mobile) or view sidebar filters (desktop) | Filter panel/drawer opens showing all filter options |
| 6 | Select "Beauty & Spa" category filter | Results update to show only Beauty & Spa businesses |
| 7 | Adjust distance slider to "Within 5 km" | Results update to show businesses within 5 km only |
| 8 | Set price range to $$ ($50-$100) | Results filter to show businesses in that price range |
| 9 | Select "4 stars and above" rating filter | Only businesses with 4+ star ratings are displayed |
| 10 | Toggle "Open Now" switch to ON | Results show only currently open businesses |
| 11 | Click on a business card | User is redirected to Business Details page (/business/:id) |

---

## Expected Results
- Search functionality works from navbar on all pages
- Search query parameter is reflected in URL (?q=salon)
- Results are filtered in real-time as filters are applied
- Business cards display:
  - Business name
  - Category badge
  - Rating (stars)
  - Distance from user
  - Price range indicator
  - "Open Now" badge (if applicable)
- Filter counts update dynamically
- Mobile view shows filters in a bottom drawer
- Desktop view shows filters in a left sidebar

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

### TC002-A1: Search with No Results
| Step # | Action | Expected Result |
|--------|--------|-----------------|
| 1 | Enter a search term with no matches (e.g., "xyzabc123") | Search executes |
| 2 | View results page | "No results found" message is displayed |
| 3 | Verify suggestions | System suggests alternative searches or shows all businesses |

### TC002-A2: Clear All Filters
| Step # | Action | Expected Result |
|--------|--------|-----------------|
| 1 | Apply multiple filters | Results are filtered |
| 2 | Click "Clear All" or reset filters | All filters are removed, full results shown |

### TC002-A3: Mobile Filter Drawer
| Step # | Action | Expected Result |
|--------|--------|-----------------|
| 1 | Open search results on mobile viewport (< 768px) | Filters are hidden by default |
| 2 | Click "Filters" button | Bottom drawer slides up with all filter options |
| 3 | Apply filters in drawer | Filters are applied |
| 4 | Close drawer | Results update, drawer closes, filter count badge shown |

---

## Responsive Design Checks
- ☐ Desktop (1920x1080): Sidebar filters visible, grid layout for results
- ☐ Tablet (768x1024): Filters in drawer, 2-column grid for results
- ☐ Mobile (375x667): Filters in drawer, single column for results
- ☐ Touch targets are at least 44x44px on mobile

---

## Performance Metrics
- Search results should load within 2 seconds
- Filter application should be instant (< 500ms)
- Page should handle 50+ business listings smoothly

---

## Notes
- Test with different search queries (food, plumbing, gym, cafe)
- Verify URL updates with search query
- Check if filters persist on browser back button
- Verify violet theme (violet-600) is used for active filters
- Test skeleton loaders appear during search

---

## Attachments
_Add screenshots of:_
- Search results page (desktop)
- Mobile filter drawer
- Applied filters state
- No results state

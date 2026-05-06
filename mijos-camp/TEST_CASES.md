# Mijos Tóxicos Camp — Test Cases

## Landing Page

| # | Test Case | Expected Result |
|---|---|---|
| 1 | Page loads without errors on desktop and mobile | No console errors, all sections render |
| 2 | Hero video carousel cycles through all 3 videos | Videos crossfade every 4-5 seconds |
| 3 | Countdown timer displays and ticks down | Counts down to July 11, 2026 7:30 AM |
| 4 | Stats bar shows correct date, location, ages, sports | Values match Supabase settings table |
| 5 | All nav links scroll to correct sections | Smooth scroll to anchored sections |
| 6 | "Register Now" buttons link to /register | Navigates to registration page |
| 7 | Sponsor marquee scrolls continuously | Logos scroll left in a loop |
| 8 | Gallery images load and zoom on hover (desktop) | Images scale up on hover |
| 9 | Shop cards are swipeable on mobile | Horizontal scroll with snap |
| 10 | All external links open in new tabs | Instagram, YouTube, shop links open new tab |
| 11 | "Buy" buttons link to correct product pages | Each hat/shirt links to correct URL |

## Registration Flow

| # | Test Case | Expected Result |
|---|---|---|
| 12 | /register shows "Registration Closed" when toggle is off | Closed message with back to home button |
| 13 | /register shows the form when registration is open | 4-step form loads |
| 14 | Step 1: Required fields show validation errors when empty | Error message appears |
| 15 | Step 1: Age validation rejects under 13 and over 18 | Error: "Athlete must be between 13 and 18" |
| 16 | Step 1: Sport selection works (football/soccer) | Dropdown changes value |
| 17 | Step 1: Scholarship checkbox can be toggled | Checkbox toggles on/off |
| 18 | Step 2: Email validation rejects invalid formats | Error: "Please enter a valid email" |
| 19 | Step 2: All required fields validated | Error if parent name, email, phone, emergency missing |
| 20 | Step 3: Optional fields can be left blank | Can proceed without filling optional fields |
| 21 | Step 4: Waiver must be accepted before proceeding | Error: "You must accept the waiver" |
| 22 | Form submits and redirects to Stripe checkout | Redirects to Stripe hosted checkout page |
| 23 | After payment, success page displays confirmation | Shows athlete name and confirmation |
| 24 | Registration saved in Supabase with correct data | All form fields stored in registrations table |
| 25 | Payment status updates to "paid" after webhook | Stripe webhook updates payment_status |

## Registration Caps

| # | Test Case | Expected Result |
|---|---|---|
| 26 | Registration rejected when total cap is reached | Error: "Registration is full" |
| 27 | Registration rejected when sport-specific cap is reached | Error: "[Sport] registration is full" |
| 28 | Error message displays clearly when cap is hit | User sees clear message before filling form |

## Admin Dashboard

| # | Test Case | Expected Result |
|---|---|---|
| 29 | /admin shows email input | Login screen with email field |
| 30 | Invalid email still shows "code sent" | Doesn't reveal valid emails |
| 31 | Valid email receives 6-digit OTP code | Email arrives via Resend |
| 32 | Invalid OTP code shows error | Error: "Invalid code" |
| 33 | Expired OTP code (after 10 min) shows error | Error: "Code expired" |
| 34 | Valid OTP grants access to dashboard | Dashboard loads with registrations |
| 35 | Registration table loads all registrations | Table shows athlete, sport, status, date |
| 36 | Sport filter works correctly | Table filters by football/soccer |
| 37 | Payment status filter works correctly | Table filters by paid/pending/refunded |
| 38 | CSV export downloads file | File downloads with all registration data |
| 39 | "Add Scholarship" creates registration | Saved with is_scholarship: true, payment_status: paid |
| 40 | Settings toggle opens/closes registration | Toggle reflects immediately on /register |
| 41 | Capacity cap changes save on blur | New values persist in Supabase |
| 42 | Site content changes reflect on landing page | Date, location, price update without redeploy |

## FAQ Page

| # | Test Case | Expected Result |
|---|---|---|
| 43 | /faq loads with all questions | 13 questions displayed |
| 44 | Accordion expand/collapse works | Click to expand, click again to collapse |
| 45 | "Back to home" link works | Navigates to / |
| 46 | "Register Now" button links to /register | Navigates to registration page |

## Security

| # | Test Case | Expected Result |
|---|---|---|
| 47 | Admin API routes return 401 without valid header | Unauthorized response |
| 48 | Supabase anon key cannot read registrations | RLS blocks access |
| 49 | Supabase anon key cannot read settings | RLS blocks access |
| 50 | Stripe secret key not exposed in client | Only server-side usage |

## Cross-browser / Responsive

| # | Test Case | Expected Result |
|---|---|---|
| 51 | Site renders correctly on Chrome, Safari, Firefox | No layout breaks |
| 52 | Mobile bottom nav appears on small screens only | Hidden on desktop, visible on mobile |
| 53 | All carousels are swipeable on touch devices | Horizontal swipe works |
| 54 | Form inputs are usable on mobile | No zoom issues, proper keyboard types |
| 55 | Dark mode doesn't flash on initial load | No white/light flash |

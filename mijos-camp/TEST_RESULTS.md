# Mijos Tóxicos Camp — Test Results (Code Audit)

**Date:** May 6, 2026  
**Method:** Code-level verification — confirming functionality exists in the codebase.  
**Note:** ❌ "Not testable" items require manual browser/device testing.

## Landing Page

| # | Test Case | Status | Notes |
|---|---|---|---|
| 1 | Page loads without errors | ❌ Not testable | Requires browser. No diagnostics errors in code. |
| 2 | Hero video carousel cycles through all 3 videos | ✅ Implemented | HeroCarousel.tsx: 3 videos, auto-advances every 4-5s with crossfade |
| 3 | Countdown timer displays and ticks down | ✅ Implemented | CountdownTimer.tsx: targets July 11, 2026 7:30 AM, ticks every 1s |
| 4 | Stats bar shows correct values from Supabase | ✅ Implemented | page.tsx fetches via getSettings(), falls back to "July 11, 2026" / "LA" / "99" |
| 5 | Nav links scroll to correct sections | ✅ Implemented | Anchor hrefs (#about, #details, #gallery, #register) + smooth scroll CSS |
| 6 | "Register Now" buttons link to /register | ✅ Implemented | 3 instances, all Link href="/register" |
| 7 | Sponsor marquee scrolls continuously | ✅ Implemented | SponsorMarquee.tsx: CSS animation 25s infinite, 5 sponsors tripled |
| 8 | Gallery images zoom on hover | ✅ Implemented | group-hover:scale-105 on gallery images |
| 9 | Shop cards are swipeable | ✅ Implemented | overflow-x-auto, snap-x, snap-mandatory, scrollbar-hide |
| 10 | External links open in new tabs | ✅ Implemented | All external links have target="_blank" rel="noopener noreferrer" |
| 11 | "Buy" buttons link to correct URLs | ✅ Implemented | 3 hats → mijoculture.com, 3 shirts → zumiez.com |

## Registration Flow

| # | Test Case | Status | Notes |
|---|---|---|---|
| 12 | Shows "Registration Closed" when toggle off | ✅ Implemented | Fetches /api/registration-status on mount, shows closed UI |
| 13 | Shows form when registration is open | ✅ Implemented | checking → false, closed → false renders form |
| 14 | Step 1: Required fields validation | ✅ Implemented | Checks 9 fields, returns "Please fill in all required fields" |
| 15 | Step 1: Age validation 13-18 | ✅ Implemented | parseInt check, returns specific error message |
| 16 | Step 1: Sport selection works | ✅ Implemented | Select with football/soccer options |
| 17 | Step 1: Scholarship checkbox toggles | ✅ Implemented | Checkbox with scholarship_interest state |
| 18 | Step 2: Email validation | ✅ Implemented | Regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ |
| 19 | Step 2: Required fields validated | ✅ Implemented | Checks parent_name, parent_email, parent_phone, emergency_name, emergency_phone |
| 20 | Step 3: Optional fields can be blank | ✅ Implemented | No validation on step 2 (medical step) |
| 21 | Step 4: Waiver must be accepted | ✅ Implemented | Checks form.waiver_accepted, returns error |
| 22 | Form submits and redirects to Stripe | ✅ Implemented | POST /api/register → returns checkoutUrl → window.location.href |
| 23 | Success page displays confirmation | ✅ Implemented | register/success/page.tsx exists with confirmation UI |
| 24 | Registration saved in Supabase | ✅ Implemented | API inserts all fields into registrations table |
| 25 | Payment status updates via webhook | ✅ Implemented | Webhook updates payment_status to "paid", stores payment_intent |

## Registration Caps

| # | Test Case | Status | Notes |
|---|---|---|---|
| 26 | Rejected when total cap reached | ✅ Implemented | API checks totalCount >= maxTotal |
| 27 | Rejected when sport cap reached | ✅ Implemented | API checks sportCount >= maxSport |
| 28 | Error message displays on cap hit | ⚠️ Partial | API returns error, but cap check on /register page only checks open/closed — doesn't show sport-full before form submission |

## Admin Dashboard

| # | Test Case | Status | Notes |
|---|---|---|---|
| 29 | /admin shows email input | ✅ Implemented | step === "email" renders email form |
| 30 | Invalid email still shows "code sent" | ✅ Implemented | send-code route returns { success: true } for invalid emails |
| 31 | Valid email receives OTP | ⚠️ Partial | Code exists but requires Resend domain verification to deliver |
| 32 | Invalid OTP shows error | ✅ Implemented | verify-code returns 401 "Invalid code" |
| 33 | Expired OTP shows error | ✅ Implemented | Checks Date.now() > stored.expires, returns "Code expired" |
| 34 | Valid OTP grants access | ✅ Implemented | Returns success, setStep("dashboard") |
| 35 | Registration table loads | ✅ Implemented | fetchRegistrations() on dashboard mount |
| 36 | Sport filter works | ✅ Implemented | Query param passed to API, Supabase .eq("sport", sport) |
| 37 | Payment status filter works | ✅ Implemented | Query param passed to API, Supabase .eq("payment_status", status) |
| 38 | CSV export downloads file | ✅ Implemented | /api/admin/export returns CSV with Content-Disposition header |
| 39 | Add Scholarship creates registration | ✅ Implemented | /api/admin/add-registration inserts with is_scholarship: true, payment_status: "paid" |
| 40 | Settings toggle opens/closes registration | ✅ Implemented | Updates "registration_open" key, checked by /api/register and /api/registration-status |
| 41 | Capacity cap changes save on blur | ✅ Implemented | onBlur triggers updateSetting() → PUT /api/admin/settings |
| 42 | Site content changes reflect on landing page | ✅ Implemented | Landing page uses force-dynamic + getSettings() on every request |

## FAQ Page

| # | Test Case | Status | Notes |
|---|---|---|---|
| 43 | /faq loads with all questions | ✅ Implemented | 13 FAQ items in array |
| 44 | Accordion expand/collapse works | ✅ Implemented | useState toggle, CSS grid-rows animation |
| 45 | "Back to home" link works | ✅ Implemented | href="/" link in nav |
| 46 | "Register Now" in nav links to /register | ✅ Implemented | Link href="/register" in FAQ nav |

## Security

| # | Test Case | Status | Notes |
|---|---|---|---|
| 47 | Admin API returns 401 without valid header | ✅ Implemented | isAdminEmail() check on all admin routes |
| 48 | Anon key cannot read registrations | ✅ Implemented | RLS enabled with deny-all policy (in schema.sql) |
| 49 | Anon key cannot read settings | ✅ Implemented | RLS enabled with deny-all policy (in schema.sql) |
| 50 | Stripe secret key not in client | ✅ Implemented | Only used in server-side API routes |

## Cross-browser / Responsive

| # | Test Case | Status | Notes |
|---|---|---|---|
| 51 | Renders on Chrome, Safari, Firefox | ❌ Not testable | Requires manual browser testing |
| 52 | Mobile bottom nav on small screens only | ✅ Implemented | sm:hidden class on mobile nav |
| 53 | Carousels swipeable on touch | ✅ Implemented | overflow-x-auto + snap-x + scrollbar-hide |
| 54 | Form inputs usable on mobile | ❌ Not testable | Requires device testing |
| 55 | No dark mode flash on load | ✅ Implemented | color-scheme: dark on html, hardcoded #080808 body background |

---

## Summary

| Category | ✅ Implemented | ⚠️ Partial | ❌ Not Testable |
|---|---|---|---|
| Landing Page | 10 | 0 | 1 |
| Registration Flow | 14 | 0 | 0 |
| Registration Caps | 2 | 1 | 0 |
| Admin Dashboard | 13 | 1 | 0 |
| FAQ Page | 4 | 0 | 0 |
| Security | 4 | 0 | 0 |
| Cross-browser | 3 | 0 | 2 |
| **Total** | **50** | **2** | **3** |

### Items needing attention:
1. **#28 (Cap error before form)** — The `/register` page checks if registration is open/closed but doesn't show sport-specific "full" messages until after form submission. Consider adding footballFull/soccerFull to the upfront check.
2. **#31 (OTP email delivery)** — Code works but Resend requires domain verification for `noreply@mijoculture.com` to deliver. Currently only works for the Resend account owner's email.
3. **#1, #51, #54** — Require manual browser/device testing.

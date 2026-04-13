# Mijos Tóxicos Camp — Technical Architecture

## Stack Overview

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router, v16) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Hosting | Vercel |
| Database | Supabase (Postgres) |
| Payments | Stripe Checkout |
| Email | Resend |
| Domain | GoDaddy (registrar) → Vercel (DNS target) |

---

## Frontend Architecture

- **Landing page (`/`)** — Server component. Fetches settings from Supabase at request time. No client-side loading flash. Renders camp date, location, and price dynamically from the database.
- **Registration page (`/register`)** — Client component. Multi-step form (4 steps: athlete info → parent/emergency → medical → waiver) with client-side validation. State managed with React `useState`.
- **FAQ page (`/faq`)** — Client component. Accordion with CSS grid animations for expand/collapse.
- **Admin page (`/admin`)** — Client component. Handles OTP login flow and full dashboard state.
- **Countdown timer** — Client component. Ticks every second. Renders a placeholder (`--`) on the server to avoid hydration mismatch.
- **Sponsor marquee** — Server component. CSS keyframe animation, no JavaScript needed.

---

## API Routes

All routes are under `/api` and run server-side on Vercel's edge/serverless functions.

### `POST /api/register`
- Receives the full registration form as JSON
- Validates required fields
- Reads `settings` table to check: is registration open? Is total cap hit? Is sport cap hit?
- If all checks pass, inserts a row into `registrations` with `payment_status: "pending"`
- Creates a Stripe Checkout session with the registration ID in metadata
- Updates the registration row with the Stripe session ID
- Returns the Stripe checkout URL to the client

### `POST /api/webhooks/stripe`
- Receives Stripe webhook events
- On `checkout.session.completed`, looks up the registration by Stripe session ID
- Updates `payment_status` to `"paid"` and stores the payment intent ID
- This is how payment is confirmed (not just visiting the success page)

### `GET /api/registration-status`
- Public endpoint (no auth needed)
- Reads settings for `registration_open` and capacity caps
- Counts current paid + pending registrations (total and by sport)
- Returns `{ open, reason, footballFull, soccerFull }`
- The register page calls this on load to show "Registration Closed" immediately if needed

### `POST /api/admin/send-code`
- Receives `{ email }`
- Checks if email is in the `ADMIN_EMAIL` list (doesn't reveal validity — always returns success)
- Generates a 6-digit OTP code, stores in an in-memory Map with 10-minute expiry
- Sends the code via Resend email

### `POST /api/admin/verify-code`
- Receives `{ email, code }`
- Checks against the in-memory OTP store
- If valid and not expired, returns success and deletes the code
- If invalid or expired, returns 401

### `GET /api/admin/registrations`
- Requires `x-admin-email` header matching an allowed admin email
- Accepts optional `sport` and `status` query params for filtering
- Returns all matching registrations ordered by newest first

### `GET /api/admin/export`
- Same auth as above
- Fetches all registrations from Supabase
- Builds a CSV string with headers and properly escaped values
- Returns as a file download with `Content-Disposition: attachment`

### `GET /api/admin/settings`
- Returns all key-value pairs from the `settings` table

### `PUT /api/admin/settings`
- Receives `{ key, value }`
- Upserts into the `settings` table
- Used by the admin panel to update caps, toggle registration, and edit site content

---

## Database Schema (Supabase Postgres)

### `registrations` table
~30 columns covering:
- Athlete info (name, age, DOB, gender, sport, position, school, grade, shirt size)
- Parent/guardian info (name, email, phone)
- Emergency contact (name, phone)
- Medical (notes, insurance provider)
- Optional fields (social handle, referral source)
- Scholarship interest (boolean)
- Waiver acceptance (boolean + timestamp)
- Payment (Stripe session ID, payment intent ID, payment status, amount paid)
- Admin fields (is_scholarship, notes)

Indexes on `payment_status`, `sport`, and `created_at DESC`.
Unique constraint on `stripe_session_id` to prevent duplicate payments.

### `settings` table
Simple key-value store:

| Key | Example Value | Purpose |
|---|---|---|
| `registration_open` | `true` | Toggle registration on/off |
| `max_registrations` | `1000` | Total registration cap |
| `max_football` | `500` | Football-specific cap |
| `max_soccer` | `500` | Soccer-specific cap |
| `camp_date` | `June 13, 2026` | Displayed on landing page |
| `camp_location` | `TBD` | Displayed on landing page |
| `camp_time` | `7:30 AM – 5:00 PM` | Displayed in admin |
| `registration_price` | `100` | Displayed on landing page |

---

## Security

- **Row Level Security (RLS)** enabled on both tables with deny-all policies for the anon key
- Only the `supabaseAdmin` client (service role key) can read/write — used exclusively in server-side API routes
- Stripe secret key is server-side only
- Stripe webhook should validate signatures (webhook secret)
- Admin auth uses email + OTP verification
- Multiple admin emails supported via comma-separated `ADMIN_EMAIL` env var
- The `isAdminEmail()` helper centralizes admin email checks across all routes

---

## Auth Model

- **Parents** — No accounts. They fill out the form and pay. No login required.
- **Admins** — Email + OTP. The OTP store is in-memory on the server (resets on redeploy). The `x-admin-email` header is checked on every admin API call. The OTP gate on the frontend is what authenticates; the header is a lightweight server-side check.

---

## Payment Flow

1. Client POSTs form data to `/api/register`
2. Server validates, checks caps, saves to DB with `payment_status: "pending"`
3. Server creates Stripe Checkout session, returns checkout URL
4. Client redirects to Stripe's hosted checkout page
5. Parent pays on Stripe's domain (PCI compliant — card data never touches our servers)
6. Stripe redirects to `/register/success?session_id=...`
7. Separately, Stripe fires a webhook to `/api/webhooks/stripe`
8. Webhook handler updates the registration to `"paid"`
9. Success page shows confirmation

---

## Deployment

- Vercel auto-deploys on every push to `main`
- Environment variables stored in Vercel dashboard (not in the repo)
- `.env.local` is gitignored — local dev only
- Domain: `mijostoxicos.com` via GoDaddy DNS → Vercel, with auto-provisioned SSL
- Old `.vercel.app` URL still works as a fallback

---

## Environment Variables

| Variable | Where Used | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Client + Server | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client | Supabase anon key (RLS blocks access) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Supabase admin key (bypasses RLS) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Client | Stripe public key |
| `STRIPE_SECRET_KEY` | Server only | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Server only | Stripe webhook signature validation |
| `RESEND_API_KEY` | Server only | Resend email API key |
| `NEXT_PUBLIC_APP_URL` | Server | Base URL for Stripe redirects |
| `ADMIN_EMAIL` | Server only | Comma-separated list of admin emails |
| `REGISTRATION_PRICE` | Server only | Price in cents (10000 = $100) |

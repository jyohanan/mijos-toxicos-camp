# Mijos Tóxicos Camp MVP Spec

## 1. Product overview

Build a premium, mobile-first web application for the **Mijos Tóxicos Dual Sports Camp** that allows parents/guardians to:

- learn about the camp
- register an athlete
- complete required information and acknowledgements
- pay online securely
- receive confirmation after successful registration/payment

This MVP should be optimized for speed, clarity, and conversion. It is not meant to solve every admin workflow yet. It should focus on a clean public-facing experience and a simple, reliable registration flow.

---

## 2. MVP goal

Launch a working registration and payment experience that is:

- premium-looking
- mobile-first
- easy for parents to use
- easy to deploy and manage
- simple enough to build quickly

Success for the MVP means:

1. A parent can visit the site.
2. A parent can read the camp details.
3. A parent can create/log into an account if needed.
4. A parent can complete the athlete registration form.
5. A parent can submit payment through Stripe.
6. The system stores the registration.
7. The parent sees a success/confirmation page.
8. Admin receives a notification or can view submitted registrations.

---

## 3. Recommended stack

### Frontend
- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**

### Hosting / infrastructure
- **Vercel** for deployment, hosting, previews, and environment variable management

### Authentication
- **Clerk** for parent/guardian account authentication

### Payments
- **Stripe** for registration payment checkout

### Database
- **Postgres** via **Neon** or **Supabase Postgres**

### ORM
- **Prisma**

### Email / notifications
- MVP option 1: simple admin email notification via server action / API route using Resend
- MVP option 2: defer email until phase 2 and show confirmation page only

### File storage
- Not required for MVP unless waiver PDFs or media uploads are needed immediately

---

## 4. MVP scope

### In scope
- premium landing page
- camp details page sections on homepage
- parent authentication with Clerk
- athlete registration form
- required acknowledgements / waiver acceptance checkbox
- Stripe checkout flow
- registration record saved in database
- success / confirmation page
- basic admin visibility into registrations
- responsive mobile-first UI

### Out of scope for MVP
- multi-athlete registration in one checkout
- discount codes
- scholarship workflows
- sponsorship workflows
- jersey number assignment
- advanced admin dashboard
- refunds/self-service cancellations
- SMS notifications
- staff portal
- volunteer portal
- live capacity counters
- waitlist logic
- document upload workflows
- complex role-based permissions

---

## 5. Core user roles

### Parent/guardian
Primary MVP user.

Can:
- create account / sign in
- fill out athlete registration
- complete waiver acknowledgement
- pay registration fee
- view confirmation page

### Admin
Internal user.

Can:
- receive notification of new registrations
- view submitted registration records
- verify payment status

For MVP, admin access can be basic and restricted by email address or Clerk role metadata later.

---

## 6. Core user flow

### Public flow
1. User lands on homepage.
2. User reads event details and clicks **Register Now**.
3. User is prompted to sign in / create account with Clerk if not already signed in.
4. User completes registration form.
5. User reviews summary.
6. User clicks to continue to Stripe checkout.
7. User completes payment.
8. Stripe redirects user to success page.
9. Application marks registration as paid after webhook confirmation.
10. User sees confirmation details.

### Admin flow
1. Admin is notified of a completed registration.
2. Admin can review registration data in database or admin page.

---

## 7. Pages required for MVP

### `/`
Homepage / landing page.

Sections:
- hero
- about the camp
- camp details
- highlights / value proposition
- CTA to register
- footer

### `/sign-in`
Clerk sign-in page.

### `/sign-up`
Clerk sign-up page.

### `/register`
Protected registration page for parents.

Contains:
- athlete info form
- guardian info form
- emergency contact form
- medical info
- acknowledgements / waiver acceptance
- continue to checkout CTA

### `/checkout/success`
Post-payment success page.

Shows:
- confirmation state
- summary of submitted registration
- next steps

### `/admin/registrations`
Basic internal page.

Can be very simple for MVP:
- table/list of registrations
- athlete name
- parent name
- sport
- payment status
- created date

---

## 8. Registration data requirements

### Athlete information
- first name
- last name
- age
- date of birth
- gender
- sport selection: football or soccer
- position (optional)
- school name
- grade
- jersey / shirt size

### Parent / guardian information
- full name
- email
- phone number

### Emergency contact
- name
- phone number

### Medical / safety
- medical conditions / allergies / injuries
- insurance provider (optional)

### Additional
- social media handle (optional)
- how did you hear about us?

### Required acknowledgement fields
- waiver accepted (checkbox)
- medical treatment consent acknowledgement (optional for MVP if you want separate field)
- photo/media release acknowledgement (optional for MVP if separate)

Recommendation for MVP: keep these as checkboxes with linked text rather than building full e-signature.

---

## 9. MVP functional requirements

### Authentication
- user can sign up/sign in with Clerk
- registration page requires authentication
- authenticated user email should be attached to registration record

### Registration form
- required fields validated client-side and server-side
- form must be mobile friendly
- user should not lose progress easily on accidental refresh if feasible
- form should clearly label required vs optional fields

### Payment
- Stripe Checkout session created from server-side route/action
- payment amount set from environment/config
- successful checkout should redirect to success page
- Stripe webhook should update registration status to `paid`

### Registration persistence
- registration saved to database before redirecting to Stripe
- payment status initially `pending`
- payment status updated to `paid` after successful webhook

### Confirmation
- success page confirms registration/payment state
- page should show athlete name, sport, and next steps

### Admin visibility
- basic internal route to review registrations
- admin route should be protected
- minimal filtering is acceptable for MVP

---

## 10. Non-functional requirements

### UX
- premium feel
- dark, modern sports aesthetic
- mobile-first
- clear CTA hierarchy
- fast page loads

### Performance
- deploy on Vercel
- pages should load quickly on mobile
- optimize large images/video later if added

### Security
- secrets stored in Vercel environment variables
- no Stripe secret keys in client code
- webhook signature validation required
- server-side validation for registration writes

### Reliability
- no duplicate paid registrations from accidental double submits
- webhook handling should be idempotent if possible

---

## 11. Suggested architecture

### Frontend
- Next.js App Router
- landing page in `app/page.tsx`
- protected registration page in `app/register/page.tsx`

### Backend
- Next.js route handlers / server actions
- Stripe webhook route
- Prisma for database access

### Auth
- Clerk middleware protects `/register` and `/admin/*`

### Payment flow
1. Authenticated user submits registration form.
2. App creates registration row in database with `paymentStatus = pending`.
3. App creates Stripe Checkout session.
4. Stripe checkout completes.
5. Stripe webhook updates registration row to `paid`.
6. User is redirected to success page.

---

## 12. Suggested database schema

### `users`
If relying on Clerk, this can be minimal or optional depending on approach.

Fields:
- id
- clerkUserId
- email
- createdAt

### `registrations`
Fields:
- id
- clerkUserId
- parentFullName
- parentEmail
- parentPhone
- athleteFirstName
- athleteLastName
- athleteAge
- athleteDob
- gender
- sport
- position
- schoolName
- grade
- shirtSize
- emergencyContactName
- emergencyContactPhone
- medicalNotes
- insuranceProvider
- socialHandle
- referralSource
- waiverAccepted
- mediaReleaseAccepted (optional)
- medicalConsentAccepted (optional)
- paymentStatus (`pending`, `paid`, `failed`, `refunded`)
- stripeCheckoutSessionId
- stripePaymentIntentId
- createdAt
- updatedAt

Recommendation: keep this as a single table for MVP to move faster.

---

## 13. Environment variables

### Vercel / app env vars
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
- `DATABASE_URL`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_APP_URL`
- `ADMIN_EMAILS` or similar allowlist for admin route protection

---

## 14. Folder structure recommendation

```txt
app/
  page.tsx
  layout.tsx
  globals.css
  sign-in/[[...sign-in]]/page.tsx
  sign-up/[[...sign-up]]/page.tsx
  register/page.tsx
  checkout/success/page.tsx
  admin/registrations/page.tsx
  api/
    stripe/checkout/route.ts
    stripe/webhook/route.ts
components/
  landing/
  registration/
  ui/
lib/
  auth.ts
  db.ts
  prisma.ts
  stripe.ts
  validations.ts
prisma/
  schema.prisma
middleware.ts

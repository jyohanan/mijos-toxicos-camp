This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Admin Dashboard

The admin dashboard is available at `/admin` and provides tools to manage camp registrations.

### Access

1. Navigate to `/admin` on the site
2. Enter the admin email address (must match the `ADMIN_EMAIL` value in your environment variables)
3. Click "Continue" to access the dashboard

### Features

- **Registration table** — View all athlete registrations with name, sport, age, school, parent info, payment status, and registration date
- **Stats overview** — Quick counts for paid, pending, football, and soccer registrations
- **Filters** — Filter the table by sport (football/soccer) and payment status (paid/pending/refunded)
- **CSV export** — Click "Export CSV" to download all registration data as a spreadsheet. The file includes all fields: athlete info, parent/guardian info, emergency contact, medical notes, payment status, and more.
- **Scholarship flag** — Athletes who opted into scholarship consideration are marked with a 🎓 icon

### Environment Variables

| Variable | Description |
|---|---|
| `ADMIN_EMAIL` | The email address allowed to access the admin dashboard |
| `SUPABASE_SERVICE_ROLE_KEY` | Required for the admin API to read registrations from the database |

### API Routes

| Route | Method | Description |
|---|---|---|
| `/api/admin/registrations` | GET | Returns all registrations (supports `sport` and `status` query params) |
| `/api/admin/export` | GET | Downloads all registrations as a CSV file |

Both routes require the `x-admin-email` header to match the `ADMIN_EMAIL` env var.

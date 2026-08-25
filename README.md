# CodeMeter — Landing Page & Project Request Form

A Next.js app for CodeMeter: a landing page (services + about) with a project
request form, backed by a Postgres database, email notifications via Resend,
and a password-protected admin dashboard to review and manage submissions.

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind CSS v4)
- **Prisma + PostgreSQL** for storing submissions
- **NextAuth (Auth.js) v5**, credentials provider, for admin login
- **Resend** for the "new submission" email notification
- **react-hook-form + zod** for form validation

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the env template and fill in real values:

   ```bash
   cp .env.example .env
   ```

   | Variable | Description |
   | --- | --- |
   | `DATABASE_URL` | Postgres connection string |
   | `NEXTAUTH_SECRET` | Random secret — generate with `openssl rand -base64 32` |
   | `NEXTAUTH_URL` | Public URL of the app (`http://localhost:3000` locally) |
   | `RESEND_API_KEY` | API key from [resend.com](https://resend.com) |
   | `RESEND_FROM_EMAIL` | Verified sending address, e.g. `CodeMeter <notifications@yourdomain.com>` |
   | `ADMIN_NOTIFICATION_EMAIL` | Where new-submission emails are sent |

   If `RESEND_API_KEY` / `RESEND_FROM_EMAIL` / `ADMIN_NOTIFICATION_EMAIL` are
   left unset, the app still works — it just skips sending the notification
   email (logged as a warning) instead of failing the submission.

3. Create the database schema:

   ```bash
   npx prisma migrate dev
   ```

4. Create your admin login (email/password):

   ```bash
   SEED_ADMIN_EMAIL=you@example.com SEED_ADMIN_PASSWORD='choose-a-strong-password' npm run db:seed
   ```

5. Run the dev server:

   ```bash
   npm run dev
   ```

   - Landing page + form: `http://localhost:3000`
   - Admin dashboard: `http://localhost:3000/admin` (redirects to login)

## Deploying (Vercel)

1. Create a Postgres database (Vercel Postgres, Neon, or Supabase all work)
   and set `DATABASE_URL` in the Vercel project's environment variables.
2. Set `NEXTAUTH_SECRET`, `NEXTAUTH_URL` (your production domain),
   `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `ADMIN_NOTIFICATION_EMAIL`.
3. Deploy. `npm install` runs `prisma generate` automatically via the
   `postinstall` script.
4. Apply the schema to the production database once:

   ```bash
   DATABASE_URL="<production-url>" npx prisma migrate deploy
   ```

5. Create the admin account on the production database:

   ```bash
   DATABASE_URL="<production-url>" SEED_ADMIN_EMAIL=you@example.com \
     SEED_ADMIN_PASSWORD='choose-a-strong-password' npm run db:seed
   ```

## Project structure

- `src/app/page.tsx` — landing page (hero, services, about, contact form)
- `src/components/ContactForm.tsx` — the project request form
- `src/app/api/contact/route.ts` — validates + stores a submission, sends
  the notification email
- `src/app/admin/*` — password-protected dashboard (list + detail view,
  status + internal notes editing)
- `prisma/schema.prisma` — data model

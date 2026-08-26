# Mina Bekheet — Landing Page & Project Request Form

A Next.js app for Mina Bekheet's solo developer site: a landing page (services
+ about) with a project request form, backed by a Postgres database, email
notifications via Resend, and a password-protected admin dashboard to review
and manage submissions.

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
   | `DATABASE_URL` | Postgres connection string used at runtime (pooled endpoint, if your provider has one) |
   | `DIRECT_URL` | Direct, non-pooled connection string, used only by `prisma migrate`. On Neon: same as `DATABASE_URL` minus `-pooler` in the hostname — pooled connections can't run migrations |
   | `NEXTAUTH_SECRET` | Random secret — generate with `openssl rand -base64 32` |
   | `NEXTAUTH_URL` | Public URL of the app (`http://localhost:3000` locally) |
   | `RESEND_API_KEY` | API key from [resend.com](https://resend.com) |
   | `RESEND_FROM_EMAIL` | Verified sending address, e.g. `Mina Bekheet <notifications@yourdomain.com>` |
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

1. Import the GitHub repo at [vercel.com/new](https://vercel.com/new).
2. In the project's **Environment Variables**, set (all Environments):
   `DATABASE_URL`, `DIRECT_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` (your
   production domain), `RESEND_API_KEY`, `RESEND_FROM_EMAIL`,
   `ADMIN_NOTIFICATION_EMAIL`, and `SETUP_SECRET` (see below). Set these in
   the Vercel dashboard only — never commit real values to the repo.
3. In **Build & Development Settings**, override the Build Command to:

   ```
   npx prisma migrate deploy && next build
   ```

   This applies the committed migrations to the production database on
   every deploy. (`npm install` already runs `prisma generate` via the
   `postinstall` script.)
4. Deploy.
5. Create your admin login by calling the one-time setup endpoint once
   (needs `SETUP_SECRET` to match what you set in step 2):

   ```bash
   curl -X POST https://<your-domain>/api/setup \
     -H "Content-Type: application/json" \
     -H "x-setup-secret: <SETUP_SECRET>" \
     -d '{"email":"you@example.com","password":"choose-a-strong-password"}'
   ```

   You can call it again later with the same secret to reset the password.
   Remove `SETUP_SECRET` from the project's environment variables once you
   no longer need it — the endpoint 404s when it's unset.

For local development against a database this machine can reach directly,
`npx prisma migrate dev` and `npm run db:seed` (see above) work as usual.

## Project structure

- `src/app/page.tsx` — landing page (hero, services, about, contact form)
- `src/components/ContactForm.tsx` — the project request form
- `src/app/api/contact/route.ts` — validates + stores a submission, sends
  the notification email
- `src/app/admin/*` — password-protected dashboard (list + detail view,
  status + internal notes editing)
- `prisma/schema.prisma` — data model

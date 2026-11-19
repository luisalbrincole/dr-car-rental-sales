# DR Car Rental & Sales

Next.js App Router starter for a Dominican Republic car rental and vehicle sales website.

## Features

- Next.js App Router with TypeScript
- Tailwind CSS responsive UI
- Local sample vehicle array ready to replace with Supabase data
- Home, rentals, sales, vehicle detail, contact request, and admin dashboard pages
- English-first copy with Spanish-ready structure

## Getting Started

Install dependencies, then run the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Staff inventory and Google sign-in

The public catalog can be browsed without signing in. A Google account is required to request a rental and view its status on **My rentals**. Staff can add and edit vehicle listings, upload photos, set availability, and review requests at `/admin`. Approving a request blocks overlapping approvals for the same vehicle.

### Configure the backend

1. Open the Supabase project SQL Editor and run [supabase/schema.sql](supabase/schema.sql) once. It installs the inventory, rental request, and staff permissions and loads the existing sample listings. Review the sample listings and their photos before accepting real requests.
2. Configure [Google sign-in in Supabase](https://supabase.com/docs/guides/auth/social-login/auth-google). Enter the Google OAuth client ID and secret in Supabase under the Google provider. Use the Supabase callback shown there as the authorized redirect URI in Google Cloud.
3. Set the Supabase Auth Site URL to the production website origin. Add the website OAuth callback to the Supabase [redirect allowlist](https://supabase.com/docs/guides/auth/redirect-urls), for example `https://dr-car-rental-sales.vercel.app/auth/callback`. Add `http://localhost:3000/auth/callback` for local development if needed.
4. Configure the three variables in [.env.example](.env.example) in Vercel and use the production website origin for `APP_ORIGIN`. For local development, copy the example to `.env.local` and fill in the Supabase values. The application uses the **publishable key**.
5. Deploy from the existing Vercel project. Have the main administrator sign in with Google once. In **Supabase Authentication → Users**, verify the email and copy the user's UUID. In the SQL Editor, assign that verified account the owner role:

   ```sql
   insert into public.staff_accounts (user_id, role)
   values ('REPLACE_WITH_VERIFIED_USER_UUID', 'owner')
   on conflict (user_id) do update set role = excluded.role;
   ```

6. The main administrator can grant or revoke staff access in **Staff → Staff access**. Staff members sign in with Google once before the administrator adds their email.
7. Verify that the staff member can open `/admin`, an ordinary Google account cannot edit inventory, a guest can browse rentals, and a renter can submit and track a request. Keep Google OAuth secrets in Supabase.

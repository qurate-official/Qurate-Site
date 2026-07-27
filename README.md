# Qurate

A student-to-student marketplace for buying and selling second-hand goods across Delhi NCR college campuses (DTU, NSIT, Jamia Millia, and more).

**🔗 Live site:** [qurate-official.github.io/Qurate-Site](https://qurate-official.github.io/Qurate-Site/)

> First load may take a few seconds while images and graphics render.

## What is Qurate?

Qurate makes it easy for students to resell things like textbooks, cycles, hostel furniture, and electronics to other students on their own campus — instead of dealing with strangers on generic marketplaces. Every listing goes through automated checks before it's trusted:

- **AI condition scoring** — listing photos are scored for physical condition and cross-checked against the title/description for honesty (e.g. flags a listing that doesn't disclose visible damage).
- **Date/EXIF validation** — helps confirm photos are genuine and recent, not stock/reused images.
- **Campus-scoped listings** — built around specific colleges so buyers and sellers can actually meet up.

## Pages

| Page | Purpose |
|---|---|
| `index.html` (root) | Static marketing landing page |
| `Qurate/index.html` | Auth (sign in / sign up) |
| `Qurate/dashboard.html` | Campus dashboard — browse listings |
| `Qurate/add-listing.html` | Create a new listing (photo upload + AI scoring) |
| `Qurate/listing.html` | Single listing detail view |
| `Qurate/chat.html` | Buyer–seller chat |
| `Qurate/view-account.html` | User account/profile |

## Architecture

Qurate is a static site (hosted on GitHub Pages) backed by [Supabase](https://supabase.com):

- **Auth** — Supabase Auth handles sign-up/sign-in and session checks (`supabaseClient.js` redirects unauthenticated users to the auth page).
- **Database & Storage** — listings, images, and user data are stored in Supabase, gated by Row Level Security (RLS) policies.
- **Payments** — checkout is handled via **Razorpay**, called through a Supabase Edge Function so no payment secrets touch the client.
- **AI listing scoring** — a Supabase Edge Function sends listing photos + title/description to Gemini via OpenRouter, using the prompt in [`scoring-prompt`](./scoring-prompt), and returns a `score,flag` pair (condition score 0–100, and whether the listing is honest about that condition).

Keeping payment keys and the scoring prompt/API key inside Edge Functions (rather than in the frontend JS) means they can't be lifted by opening a browser's dev tools — only the Supabase anon key (safe to expose, protected by RLS) ships to the client.

## Tech stack

- HTML / CSS / vanilla JS (no framework, no build step)
- [Supabase](https://supabase.com) — Auth, Postgres DB, Storage, Edge Functions
- [Razorpay](https://razorpay.com) — payments
- [OpenRouter](https://openrouter.ai) (Gemini) — AI image/listing scoring
- GitHub Pages — hosting

## Running locally

Since this is a static site with no build step, just serve the folder:

```bash
git clone https://github.com/qurate-official/Qurate-Site.git
cd Qurate-Site
python3 -m http.server 8000
```

Then open `http://localhost:8000`. You'll need your own Supabase project (with the schema/RLS policies set up) and Edge Functions deployed for auth, payments, and AI scoring to work end-to-end.

## Status

Actively in development.

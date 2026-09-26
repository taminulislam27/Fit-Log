# FitLog — Workout Library

A dark, no-nonsense gym companion built with Next.js. Browse a twelve-lift
workout library, drill into detailed instructions and stats for each lift,
then lock exercises into **Today's Plan** or **Save** them for later — all
tracked live in the navbar and persisted across reloads.

## Live Links

- **Live site:** _add your deployed URL here_
- **Repository:** _add your GitHub repo URL here_

## Description

FitLog lets a lifter pick a workout from the library, review its equipment,
difficulty, sets/reps and step-by-step instructions, and either add it to
today's plan (capped at five lifts) or save it for later. The My Plan page
tracks live totals for exercises, minutes and calories, and lets you mark
lifts as done, remove them, sort the list, and switch between the Today's
Plan and Saved tabs.

## Technologies Used

- **Next.js 14** (App Router) — routing, server components and data fetching
- **React 18** + **TypeScript**
- **Tailwind CSS** — styling and full responsiveness
- **lucide-react** — icon set
- **next/font** (Oswald + Inter) — typography
- **Browser `localStorage`** — persists Today's Plan / Saved / Done state across reloads
- Deployed on Vercel / Netlify / Cloudflare Pages

## Key Features

1. **Workout library grid** — all twelve lifts fetched live from the FitLog
   API, shown as responsive cards (3 columns on desktop, collapsing to 2 and
   1 on tablet/mobile) with category tags, equipment, and a duration /
   calories / rating stats row.
2. **Sort by Duration, Calories or Rating** — a "Sort By" dropdown re-orders
   the library grid and the My Plan lists instantly.
3. **Detailed workout pages** — a two-column detail view with a large hero
   image, key-specs panel (equipment, difficulty, sets, reps, duration,
   calories, rating) and numbered instructions, with "Add to today's plan"
   and "Save for later" actions.
4. **Live navbar badges** — the "Plan" and "Saved" pill counters in the
   navbar update instantly and link straight to `/my-plan`.
5. **My Plan dashboard** — Exercises / Minutes / Calories summary cards that
   total live from whatever is currently in Today's Plan, plus Today's Plan
   / Saved tabs with a loading state and a "Nothing Here Yet" empty state.
6. **Mark as Done & Remove** — each planned lift can be marked done (with a
   confirmation toast) or removed with the X action, and the 5-lift cap
   disables "Add to today's plan" once it's reached.
7. **Persisted state** — Today's Plan, Saved and Done status are stored in
   `localStorage`, so your plan survives a page reload or a return visit.
8. **Toast notifications, custom 404, and loading states** — every mutating
   action confirms itself with a toast, unknown routes render a themed 404
   page, and the home page shows a loading state while the library fetches.

## Project Structure

```
app/
  layout.tsx            Root layout: fonts, providers, navbar, footer
  page.tsx               Home page (hero + library)
  loading.tsx             Home page loading state
  error.tsx                Route-level error boundary
  not-found.tsx             Custom 404 page
  workout/[id]/page.tsx      Workout detail page
  my-plan/page.tsx            My Plan page (tabs, metrics, sort)
components/                    Navbar, Footer, Hero, Library, WorkoutCard,
                                 SortDropdown, SpecsTable, DetailActions,
                                 PlanItemCard
context/                       PlanContext (plan/saved/done + localStorage),
                                 ToastContext (toast notifications)
lib/                           Shared types + API helpers
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## API

Data is fetched from the FitLog API:

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`

## Deployment

Deploy to Vercel, Netlify, Cloudflare Pages, or any Next.js-compatible host.
For Vercel: push this repo to GitHub, import it in Vercel, and deploy with
the default Next.js build settings — no environment variables are required.

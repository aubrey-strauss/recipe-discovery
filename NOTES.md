# NOTES — for README.md and REFLECTION.md

Raw material to copy from when writing the final README and reflection.
(Learning notes are in STUDY_GUIDE.md. Tasks are in TODO.md.)

---

## README notes

**App name:** Recipe Discovery App

**Description (draft):**
A single-page React app where users can browse recipe categories, search recipes by name,
view full recipe details, and save favorites that stay saved after closing the browser.
Data comes from TheMealDB, a free public recipe API.

**Tech used:**
- React
- TypeScript
- Vite
- React Router (react-router-dom)
- TheMealDB API (free, no key needed)

**Features built so far:**
- _(add as each phase is finished)_

**Install & run (for the README):**
```bash
git clone https://github.com/aubrey-strauss/recipe-discovery.git
cd recipe-discovery
npm install
npm run dev
```
Then open the localhost link shown in the terminal.

---

## Reflection notes

The reflection needs: (1) the most challenging part, (2) one design decision and why.
Jot things down as they happen. Raw notes are fine.

### Challenges
- Phase 1: got a black screen after cleanup. Cause: when changing the page title, I replaced the
  *whole* `index.html` with just the `<title>` line. That deleted `<div id="root">` (where React draws
  the app) and the `<script>` tag that loads React, so the browser had nothing to show.
  Fix: restored the full `index.html`. Lesson: when told to change one line, change only that line.
- Phase 4: the Seafood API data had 5 fields per meal, not the 3 I was told (`strArea`, `strCountry` were new, and `strArea` was `null`).
  Lesson: the real data is the source of truth. Look at it in the browser before writing the type.
- Phase 4: VS Code showed no red squiggles and didn't auto-close tags, so my typos (`jason()` instead of `json()`,
  a missing `=`, `(` instead of `{`, `;` instead of `,`, extra brackets at the end) went unnoticed.
  Fix: turned the built-in "TypeScript and JavaScript Language Features" back on / restarted the TS server.
  Lesson: if the editor isn't flagging anything, check the editor before trusting the code.

### Design decisions
- **Top-down build order, components first, routes last** (instructor's guidance): built the whole
  component structure first as placeholders (App → Navbar → pages → cards/spinner), then filled in
  each page with real data, creating hooks when pages needed them, and added routing last.
  Reason: I could see the full component tree working before adding details, and each page could be
  built and tested on its own (using a hardcoded category/ID) before wiring up URLs.
- **TypeScript:** chose it to catch mistakes with API data (wrong field names, missing values) while coding.
- **CategoryCard shows the description too:** chose to show name (h2), image, and description on each card, so users know what a category includes before clicking. Passed the whole `category` object as one prop instead of separate props, since the card needs several fields from it. (May shorten long descriptions during styling.)
- **Loading/error messages as props with defaults:** `Spinner` and `ErrorMessage` take an optional `message` prop with a default, so each page can show a specific message but doesn't have to.
- **`useFetch` custom hook:** the Home page fetch code (state + useEffect + try/catch) would have been copied into
  4 more pages, so I moved it into one generic hook, `useFetch<T>(url)`, that returns `{ data, loading, error }`.
  HomePage went from ~45 lines to ~25. The `<T>` lets each page say what shape of data it expects.
  It re-fetches when the URL changes (`[url]`) and ignores old answers if the user leaves the page (cleanup).
- **Folder structure:** split code into `pages`, `components`, `hooks`, `context`, and `types` so each kind of code has one home.

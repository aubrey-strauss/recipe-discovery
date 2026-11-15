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
- Phase 5: one-letter typos caused real bugs. `RecipeResonse` (missing p and s) made an import point at nothing, and
  `ingredients` vs `ingredient` (an extra s) made the empty-slot check test the wrong thing, so `null` slots showed as "null".
  Lesson: names have to match exactly. A red squiggle on an import usually means a misspelled name.
- Phase 5: pasted the detail-page code into FavoritesPage by mistake, which covered it in errors.
  Lesson: check the tab name at the top of VS Code before pasting.
- Phase 5: the page "didn't look right" (giant images, everything stacked), but it was all working. It just has no styling yet.
  Lesson: check whether something is broken or just unstyled. Get it working first, then make it pretty (Phase 10).
- Phase 6: a new file showed a green "U" and was empty. "U" = untracked (Git hasn't seen it yet, which is normal for new files).
  The real problem was that the code never got pasted. Lesson: check that a file actually has code and is saved (× not ●).
- Phase 6: an extra `}` closed the hook function too early, leaving `useEffect` outside the function where `key` and `value`
  don't exist. Plus `useEffect() =>` was missing a `(`. Lesson: click next to a brace to see its match.
- Phase 6: typo `funtion`, and forgot to write `removeFavorite` even though the Provider's value used it.
- Phase 6: on the Favorites button, I put the add/remove *actions* in the button's label instead of the words.
  Calling a function that changes state while drawing the page causes an endless redraw loop ("Too many re-renders").
  Lesson: `onClick` = what happens on click. Between the tags = the words to show.
- Phase 7: after the "Too many re-renders" crash, the page kept showing the broken version even after the code was fixed.
  Lesson: if the code looks right but the page doesn't, refresh (F5) first. Vite's auto-update doesn't always recover from a crash.
- Phase 7: running `npm run dev` again started a second server on 5174 (then 5175) because the old one was still on 5173.
  Lesson: run only one dev server. Stop old ones with Ctrl + C (or close VS Code), then start one fresh.
- Phase 7: "no button, no Teriyaki" was really just "it's at the very bottom." All 6 pages are stacked on one screen
  until routing, so the detail page sits under ~80 seafood recipes. Lesson: Ctrl + F to find things. This is also why routing matters.
- Phase 7: favorites saved in one browser didn't show in another, or on a different port. localStorage belongs to one browser
  AND one address, so `localhost:5173` and `localhost:5174` are separate storage boxes.
- Phase 9: red squiggles on `value={searchText}` because I named the state `SearchText` (capital S). JavaScript is
  case-sensitive, so those are two different names. Lesson: camelCase for variables, PascalCase only for components.
- Phase 9: `FormEvent` showed with a line through it, meaning *deprecated* (still works, but outdated). Switched to `SyntheticEvent`.

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
- **`getIngredients` helper in `utils/`:** the API sends 20 ingredient + 20 measure fields with empty ones mixed in.
  A small helper loops 1–20, pairs them up, and skips empties, so the page just gets a clean list. Kept it out of the
  page file so the page only handles showing things.
- **Two response types:** `RecipesResponse` (a list of short recipes from category/search) and `RecipeResponse`
  (one full recipe from lookup), because the two endpoints send different amounts of data.
- **Favorites = Context + useLocalStorage:** the detail page (button) and the favorites page (list) both need the same list,
  so it lives in `FavoritesContext` instead of being passed through props. The context stores only recipe **IDs**
  (small, never out of date) and saves them with `useLocalStorage`, so favorites survive a refresh. It shares exactly
  4 things: `favorites`, `addFavorite`, `removeFavorite`, `isFavorite`. A `useFavorites()` shortcut hook throws a clear
  error if a page is used outside the Provider.
- **FavoriteItem component:** favorites only store IDs, so each one needs its own lookup. Hooks can't go inside a `.map()`
  loop (Rules of Hooks), so I made a small `FavoriteItem` that calls `useFetch` for one ID and reuses `RecipeCard`.
  It returns nothing (`null`) if a recipe can't be found, so one bad ID doesn't break the page.
- **Search reuses everything:** search.php sends the same `meals` list as filter.php, so SearchPage reuses `useFetch`,
  `RecipesResponse`, and `RecipeCard`. It shows a "no recipes found" message when `meals` is null, and uses
  `encodeURIComponent` so searches with spaces work in the URL.
- **Routing last, hardcoded values first:** each page was built and tested with a fixed value ("Seafood", "52772",
  "Arrabiata"), then in Phase 9 each fixed value became one line that reads the URL (`useParams` for `/category/:categoryName`
  and `/recipe/:recipeId`, `useSearchParams` for `/search?query=`). The pages didn't need any other changes.
- **Search bar in the Navbar:** the Navbar shows on every page, so search is always available. It's a controlled input
  plus a form that navigates to `/search?query=...` with `useNavigate`, and it ignores empty searches. Putting the word
  in the URL means search results can be bookmarked, shared, and refreshed.
- **Whole cards are links:** CategoryCard and RecipeCard wrap everything in a `Link`, so the picture and name are both
  clickable. Recipe links use the ID (unique), not the name. Because RecipeCard is reused, the Category, Search, and
  Favorites pages all became clickable from one change.
- **404 catch-all:** `path="*"` listed last shows NotFoundPage for any unknown address.
- **One toggle button:** instead of two buttons, one button flips its words and action based on `isFavorite`.
- **Folder structure:** split code into `pages`, `components`, `hooks`, `context`, `types`, and `utils` so each kind of code has one home.

### Styling and help from Claude (AI)
- **What I started with:** I had basic CSS for the page. I asked Claude (an AI assistant) for help with
  the parts below, and Claude made these changes for me.
- **Chicken category image:** the API's Chicken photo showed raw chicken, which I didn't like. Claude cut
  the plate out of a photo of cooked chicken I chose (removed the table, fork and knife), added a soft plate
  shadow, and saved it as `public/chicken.png` with a see-through background so it blends into the cards.
  Claude also changed `CategoryCard.tsx` so it checks a `customImages` list first, then falls back to the
  API's photo (`??`), so only the Chicken card uses my picture.
- **Descriptions expand on hover:** Claude changed the CSS so each category card shows only the first
  3 lines of its description (`-webkit-line-clamp: 3`), and on hover (or keyboard focus) the full
  description fades in on a dark panel over the card (`position: absolute; inset: 0`), so the grid
  doesn't jump around.
- **Also made with Claude's help:** the line-art hero banner image (`public/elegant-hero.svg`), the
  matching navbar/search box styles, the card grid, and the page colors and fonts. Claude also helped
  me debug: a blank page caused by `imageSrc` being placed outside the component function, where
  `category` doesn't exist.

# TODO — Recipe Discovery App (SBA 416)

Just the tasks. The "why" lives in STUDY_GUIDE.md. Check things off as you go: change `[ ]` to `[x]`.

**Approach (instructor's guidance): top-down, components first, routes later.**
1. Build the component structure (App → Navbar → pages → small pieces) as placeholders.
2. Fill in each page with real data, creating hooks/components as pages need them.
3. Add routing last to connect everything.

## Phase 0: Setup
- [x] Check Node version
- [x] Clone the GitHub repo
- [x] Scaffold a Vite + React + TypeScript project
- [x] `npm install` + `npm install react-router-dom`
- [x] First commit + push

## Phase 1: Clean up + folders
- [x] Fix the black screen (restore full `index.html`)
- [x] Delete the Vite demo code
- [x] Create folders: `components/`, `pages/`, `hooks/`, `context/`, `types/`
- [ ] Delete leftover demo images: `src/assets/hero.png`, `src/assets/vite.svg`
- [ ] Commit + push

## Phase 2: Component structure (placeholders, no routes yet)
- [ ] Create a branch: `feature/component-structure`
- [ ] Create page placeholders: HomePage, CategoryPage, RecipeDetailPage, FavoritesPage, SearchPage, NotFoundPage
- [ ] Create component placeholders: Navbar, CategoryCard, RecipeCard, Spinner, ErrorMessage
- [ ] Pages use their child components (e.g., HomePage shows a few CategoryCards)
- [ ] App shows Navbar + all pages stacked (temporary, so you can see the whole tree)
- [ ] Commit, push, merge into main

## Phase 3: Home page (real data)
- [ ] Fetch categories inside HomePage with `useState` + `useEffect`
- [ ] Add loading + error states using `Spinner` and `ErrorMessage`
- [ ] Write TypeScript types for categories
- [ ] Pass real category data into `CategoryCard` with props
- [ ] Commit

## Phase 4: Category page (real data)
- [ ] Fetch recipes for one category (hardcoded `"Seafood"` for now; routes come later)
- [ ] Notice the fetch code repeats → pull it into the `useFetch` custom hook
- [ ] Update HomePage to use `useFetch` too
- [ ] Pass real recipe data into `RecipeCard` with props
- [ ] Commit

## Phase 5: Recipe detail page (real data)
- [ ] Fetch one recipe with `useFetch` (hardcoded ID `52772` for now)
- [ ] Turn the 20 ingredient/measure fields into a clean list
- [ ] Show image, category, area, ingredients, instructions
- [ ] Commit

## Phase 6: Favorites (global state)
- [ ] Add a Favorite button on the detail page (not working yet)
- [ ] Create `useLocalStorage` custom hook
- [ ] Create `FavoritesContext` + provider (list of IDs, add, remove, isFavorite) using `useLocalStorage`
- [ ] Wrap the app in the provider and connect the button
- [ ] Commit

## Phase 7: Favorites page
- [ ] Show each favorited recipe (reuse `RecipeCard`)
- [ ] Empty-state message
- [ ] Commit

## Phase 8: Search page (real data)
- [ ] Fetch search results with `useFetch` (hardcoded `"Arrabiata"` for now)
- [ ] Handle "no results"
- [ ] Commit

## Phase 9: Routing (connect everything)
- [ ] Wrap the app in `BrowserRouter` (main.tsx)
- [ ] Set up the 5 routes + a catch-all 404 in `App.tsx` (replaces the stacked pages)
- [ ] Navbar links (`Link`) + search form that navigates to `/search?query=...`
- [ ] Swap hardcoded values for URL values: `useParams` (category, recipe ID), `useSearchParams` (search)
- [ ] Make CategoryCard and RecipeCard link to their pages
- [ ] Test every URL, including refreshing the page on each one
- [ ] Commit

## Phase 10: Styling + polish
- [ ] Responsive grid (works on phone width)
- [ ] Consistent look across pages
- [ ] Commit

## Phase 11: Submission
- [ ] README.md (description, features, install/run steps)
- [ ] REFLECTION.md (hardest part + one design decision)
- [ ] Make sure the repo is public
- [ ] Final push, submit the link

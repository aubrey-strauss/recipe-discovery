# Aubrey's Apron: Recipe Discovery App

A single-page React app for browsing recipe categories, searching recipes by name, viewing full recipe
details, and saving favorites that stay saved after you close the browser. Recipe data comes from
[TheMealDB](https://www.themealdb.com/api.php), a free public recipe API.

## Features

- **Browse categories:** the home page shows every recipe category (Beef, Chicken, Dessert, and more) as a card
  with a photo and a short description. Hover over a card to read the full description.
- **Category pages:** click a category to see all of its recipes.
- **Recipe details:** click a recipe to see its photo, category, cuisine, ingredient list, and step-by-step instructions.
- **Search:** the search bar in the navbar is on every page. Results have their own URL
  (`/search?query=chicken`), so they can be bookmarked, shared, and refreshed.
- **Favorites:** add or remove a recipe with one button on its detail page. Favorites are saved in the browser
  (localStorage), so they're still there after a refresh or after closing the browser.
- **Loading and error messages** on every page that fetches data, plus a "no results" message for searches.
- **404 page** for any address that doesn't exist.
- **Responsive design:** works on desktop, tablet, and phone screens.

## Tech used

- React
- TypeScript
- Vite
- React Router (`react-router-dom`)
- TheMealDB API (free, no key needed)
- Context API + a custom `useLocalStorage` hook for favorites
- A custom `useFetch` hook shared by every page that loads data
- Claude Pro (not Claude Code)

## Install & run

```bash
git clone https://github.com/aubrey-strauss/recipe-discovery.git
cd recipe-discovery
npm install
npm run dev
```

Then open the localhost link shown in the terminal (usually http://localhost:5173).

## Project structure

```
src/
  components/   Navbar, CategoryCard, RecipeCard, FavoriteItem, Spinner, ErrorMessage
  pages/        HomePage, CategoryPage, RecipeDetailPage, FavoritesPage, SearchPage, NotFoundPage
  hooks/        useFetch, useLocalStorage
  context/      FavoritesContext
  types/        TypeScript types for the API data
  utils/        getIngredients (turns the API's 20 ingredient fields into one clean list)
public/         hero banner image and the custom Chicken category image
```

## Images and credits

- Recipe and category photos come from TheMealDB, except for the Chicken category.
- **Chicken category image:** I didn't like the API's photo for Chicken because it showed raw chicken, so I found a different image of a cooked chicken dish. Claude (an AI assistant) removed the background and added a plate
  shadow so it matches the other category photos. The app uses it through a small `customImages` list in `CategoryCard.tsx`, and every other category still uses the API's photo.
- The hero banner illustration (`public/elegant-hero.svg`) and the styling were made with help from Claude.

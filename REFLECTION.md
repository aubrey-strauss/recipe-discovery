# Reflection: Aubrey's Apron (Recipe Discovery App)

## The most challenging part

The hardest part of this project wasn't one big feature. It was learning to track down small mistakes that broke things in confusing ways.

The best example was the Favorites button. I put the add and remove _functions_ between the button tags, where the button's words should go, instead of in `onClick`. That meant React called a function that changes state every time it drew the page, which made it draw the page again, over and over, until it crashed with "Too many re-renders." Even after I fixed the code, the browser kept showing the broken version until I refreshed. From that I learned two things: `onClick` is _what happens_ when you click, and the text between the tags is _what the button says_. And if the code looks right but the page doesn't, refresh before assuming the code is still wrong.

Lots of other bugs came from one wrong character: `RecipeResonse` instead of `RecipeResponse`, `SearchText` with a capital S, an extra `}` that closed a function too early, and later a line placed outside a component where `category` didn't exist, which made the whole page go blank. I got much better at slowing down, checking names letter by letter, and opening the browser console (F12) to read the actual error message instead of
guessing.

## One design decision: Favorites store only recipe IDs

Two different pages need the same favorites list: the recipe detail page (to show the Add/Remove button) and the Favorites page (to list them). Instead of passing the list through props from page to page, I put it in a `FavoritesContext` so any page can use it, and I saved it with a custom `useLocalStorage` hook so favorites survive a refresh.

I chose to store **only the recipe IDs**, not the whole recipe. IDs are small, they never go out of date, and they're all you need to look a recipe up again. Because of that, the Favorites page needed a small `FavoriteItem` component that fetches each recipe by its ID. Hooks can't be called inside a `.map()` loop, so giving each favorite its own component was the clean way to let each one use `useFetch`. It also reuses `RecipeCard`, so favorites look exactly like recipes everywhere else in the app.

## Use of AI

I built the app's structure, pages, hooks, and context step by step with tutoring help from Claude but did not use Claude Code. For the styling, I started with basic CSS to meet the requirements but was unhappy with how boring it was. Claude helped create the hero banner, the hover descriptions, and the edited Chicken category photo.

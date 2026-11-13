// The short version of a recipe that list endpoints (category, search) send back
export interface RecipeSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string | null;
  strCountry: string | null;
}

// A LIST of recipes (category, search) wrapped in "meals" (null when nothing matches)
export interface RecipesResponse {
  meals: RecipeSummary[] | null;
}

// The full recipe that lookup.php sends back
export interface Recipe extends RecipeSummary {
  strCategory: string | null;
  strInstructions: string | null;
  // Lets us read strIngredient1–20 and strMeasure1–20 without typing all 40
  [key: string]: string | null;
}

// ONE recipe (lookup) wrapped in a "meals" list
export interface RecipeResponse {
  meals: Recipe[] | null;
}

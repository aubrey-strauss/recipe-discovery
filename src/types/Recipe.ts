// The short version of a recipe that list endpoints (category, search) send back
export interface RecipeSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string | null;
  strCountry: string | null;
}

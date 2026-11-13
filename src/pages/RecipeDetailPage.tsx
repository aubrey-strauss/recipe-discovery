import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import useFetch from "../hooks/useFetch";
import type { RecipeResponse } from "../types/Recipe";
import getIngredients from "../utils/getIngredients";
import { useFavorites } from "../context/FavoritesContext";

function RecipeDetailPage() {
  // Hardcoded for now; the URL will supply this once routes are added
  const recipeId = "52772";

  // Ask the API for one recipe by its ID
  const { data, loading, error } = useFetch<RecipeResponse>(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`,
  );

  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  if (loading) return <Spinner message="Loading recipe..." />;
  if (error) return <ErrorMessage message={error} />;

  // The one recipe is the first (and only) item in the list
  const recipe = data?.meals?.[0];

  // A wrong ID gives meals: null, so show a message instead of crashing
  if (!recipe) return <ErrorMessage message="Recipe not found" />;

  // Turn the 40 ingredient/measure fields into one clean list
  const ingredients = getIngredients(recipe);
  // Is this recipe already saved? (true or false)
  const saved = isFavorite(recipe.idMeal);

  return (
    <section>
      <h1>{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <p>
        Category: {recipe.strCategory} · Area: {recipe.strArea}
      </p>
      <button
        onClick={() =>
          saved ? removeFavorite(recipe.idMeal) : addFavorite(recipe.idMeal)
        }
      >
        {saved ? "Remove from Favorites" : "Add to Favorites"}
      </button>
      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((item, index) => (
          // This list never reorders, so its position is a safe key
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h2>Instructions</h2>
      {/* pre-line keeps the API's line breaks so steps don't run together */}
      <p style={{ whiteSpace: "pre-line" }}>{recipe.strInstructions}</p>
    </section>
  );
}

export default RecipeDetailPage;

import RecipeCard from "../components/RecipeCard";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import useFetch from "../hooks/useFetch";
import type { RecipesResponse } from "../types/Recipe";
import { useSearchParams } from "react-router-dom";

function SearchPage() {
  const [searchParams] = useSearchParams();
  // Read ?query= from the address (e.g. /search?query=chicken → "chicken")
  const query = searchParams.get("query") ?? "";
  const { data, loading, error } = useFetch<RecipesResponse>(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`,
  );
  if (loading) return <Spinner message="Searching..." />;
  if (error) return <ErrorMessage message={error} />;
  // No matches comes back as meals: null, so fall back to an empty list
  const recipes = data?.meals ?? [];

  if (recipes.length === 0) {
    return (
      <section>
        <h1>Search results for "{query}"</h1>
        <p>No recipes found for "{query}". Try a different word.</p>
      </section>
    );
  }
  return (
    <section>
      <h1>Search results for "{query}"</h1>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} />
      ))}
    </section>
  );
}
export default SearchPage;

import RecipeCard from "../components/RecipeCard";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import useFetch from "../hooks/useFetch";
import type { RecipesResponse } from "../types/Recipe";
import { useParams } from "react-router-dom";

function CategoryPage() {
  // Read :categoryName from the address (e.g. /category/Dessert → "Dessert")
  const { categoryName = "" } = useParams();
  const { data, loading, error } = useFetch<RecipesResponse>(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`, //backticks ` make a template literal, a string with a “fill-in-the-blank”
  );
  if (loading) return <Spinner message="Loading recipes..." />;
  if (error) return <ErrorMessage message={error} />;
  const recipes = data?.meals ?? [];

  return (
    <section>
      <h1>{categoryName}</h1>
      <div className="card-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>
    </section>
  );
}

export default CategoryPage;

import RecipeCard from "./RecipeCard";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import useFetch from "../hooks/useFetch";
import type { RecipeResponse } from "../types/Recipe";

interface FavoriteItemProps {
  id: string;
}

function FavoriteItem({ id }: FavoriteItemProps) {
  const { data, loading, error } = useFetch<RecipeResponse>(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
  );
  if (loading) return <Spinner message="Loading favorite..." />;
  if (error) return <ErrorMessage message={error} />;

  const recipe = data?.meals?.[0];
  // If the recipe no longer exists, show nothing for it
  if (!recipe) return null;

  return <RecipeCard recipe={recipe} />;
}

export default FavoriteItem;

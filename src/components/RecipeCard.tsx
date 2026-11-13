import type { RecipeSummary } from "../types/Recipe";

interface RecipeCardProps {
  recipe: RecipeSummary;
}

function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h2>{recipe.strMeal}</h2>
    </div>
  );
}

export default RecipeCard;

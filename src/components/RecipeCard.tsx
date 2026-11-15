import type { RecipeSummary } from "../types/Recipe";
import { Link } from "react-router-dom";

interface RecipeCardProps {
  recipe: RecipeSummary;
}

function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    // The whole card is a link to that recipe's detail page
    <Link to={`/recipe/${recipe.idMeal}`} className="card">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h2>{recipe.strMeal}</h2>
    </Link>
  );
}

export default RecipeCard;

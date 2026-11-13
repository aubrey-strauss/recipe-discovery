import type { Recipe } from "../types/Recipe";

function getIngredients(recipe: Recipe): string[] {
  const ingredients: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`]; //builds the field name on the fly
    const measure = recipe[`strMeasure${i}`];
    // Skip empty slots (unused ones are "" or null)
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${measure ?? ""} ${ingredient}`.trim());
    }
  }
  return ingredients;
}

export default getIngredients;

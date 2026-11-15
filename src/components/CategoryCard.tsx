import type { Category } from "../types/Category";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  category: Category;
}

// Our own pictures for categories whose API photo we don't like.
// The name on the left must match the category name exactly (capital letters count).
// The path on the right points to a file in the public folder.
const customImages: Record<string, string> = {
  Chicken: "/chicken.png",
};

function CategoryCard({ category }: CategoryCardProps) {
  // ?? means "if there's no custom picture for this category, use the API's picture"
  const imageSrc = customImages[category.strCategory] ?? category.strCategoryThumb;

  return (
    // The whole card is a link to that category's page
    <Link to={`/category/${category.strCategory}`} className="card category-card">
      <h2>{category.strCategory}</h2>
      <img src={imageSrc} alt={category.strCategory} />
      <p>{category.strCategoryDescription}</p>
    </Link>
  );
}

export default CategoryCard;

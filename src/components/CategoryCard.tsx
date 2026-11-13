import type { Category } from "../types/Category";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  category: Category;
}

function CategoryCard({ category }: CategoryCardProps) {
  return (
    // The whole card is a link to that category's page
    <Link to={`/category/${category.strCategory}`}>
      <h2>{category.strCategory}</h2>
      <img src={category.strCategoryThumb} alt={category.strCategory} />
      <p>{category.strCategoryDescription}</p>
    </Link>
  );
}

export default CategoryCard;

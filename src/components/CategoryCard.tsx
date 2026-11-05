import type { Category } from "../types/Category";

interface CategoryCardProps {
  category: Category;
}

function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div>
      <h2>{category.strCategory}</h2>
      <img src={category.strCategoryThumb} alt={category.strCategory} />
      <p>{category.strCategoryDescription}</p>
    </div>
  );
}

export default CategoryCard;

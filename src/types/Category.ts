// Copied them from the JSON I looked at in the browser.
// The interface has to match the real data, or it’s describing something that doesn’t exist.
export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

// The API wraps the list in a "categories" key
export interface CategoriesResponse {
  categories: Category[];
}

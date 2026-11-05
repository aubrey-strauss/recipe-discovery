// Copied them from the JSON I looked at in the browser.
// Each category object the API sends back has exactly those four keys.
// The interface has to match the real data, or it’s describing something that doesn’t exist.
export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

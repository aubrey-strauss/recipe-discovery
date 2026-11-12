import CategoryCard from "../components/CategoryCard";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import useFetch from "../hooks/useFetch";
import type { CategoriesResponse } from "../types/Category";

function HomePage() {
  // One line replaces all the old fetch code
  const { data, loading, error } = useFetch<CategoriesResponse>(
    "https://www.themealdb.com/api/json/v1/1/categories.php",
  );

  // Show the spinner or the error instead of the page when needed
  if (loading) return <Spinner message="Loading categories..." />;
  if (error) return <ErrorMessage message={error} />;

  // Pull the list out of the answer; use an empty list if it's missing
  const categories = data?.categories ?? [];

  return (
    <section>
      <h1>Home Page</h1>
      {/* .map() goes through a list one item at a time and turns each item into something new */}
      {categories.map((category) => (
        // key = React's name tag for each card; must be unique, so we use the ID
        <CategoryCard key={category.idCategory} category={category} />
      ))}
    </section>
  );
}

export default HomePage;

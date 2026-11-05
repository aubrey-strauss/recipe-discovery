import { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import type { Category } from "../types/Category";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

function HomePage() {
  // 3 pieces of state: the data, "still loading?", and "did it fail?"
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        // Ask the API for the list of categories and wait for the answer

        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php",
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        // The list lives inside the "categories" key of the response
        setCategories(data.categories);
      } catch (err) {
        // Save the real reason if it's an Error, otherwise a backup message
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      } finally {
        // Stop loading whether it worked or failed
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);
  // Show the spinner or the error instead of the page when needed
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <h1>Home Page</h1>
      {/* .map() goes through a list one item at a time and turns each item into
      something new */}
      {categories.map((category) => (
        // When the list changes, React uses the keys to tell the cards apart
        // It has to be unique, which is why we use the ID
        // the left side is the prop name, and the right side is the variable from .map()
        <CategoryCard key={category.idCategory} category={category} />
      ))}
    </section>
  );
}

export default HomePage;

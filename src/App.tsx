// Import a component in the file that uses it. App only uses Navbar and the pages directly.
// The smaller pieces get imported by the pages that use them:
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import SearchPage from "./pages/SearchPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Navbar />
      <main>
        {/* TEMPORARY: showing every page stacked. Routing will replace this later. */}
        <HomePage />
        <CategoryPage />
        <RecipeDetailPage />
        <FavoritesPage />
        <SearchPage />
        <NotFoundPage />
      </main>
    </>
  );
}

export default App;

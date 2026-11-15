import FavoriteItem from "../components/FavoriteItem";
import { useFavorites } from "../context/FavoritesContext";

function FavoritesPage() {
  const { favorites } = useFavorites();
  if (favorites.length === 0) {
    return (
      <section>
        <h1>Favorites</h1>
        <p>
          You haven't saved any recipes yet. Browse a category and click "Add to
          Favorites" to see them here.
        </p>
      </section>
    );
  }
  return (
    <section>
      <h1>Favorites</h1>
      <div className="card-grid">
        {/* favorites is a list of saved recipe IDs; each FavoriteItem looks up its own recipe */}
        {favorites.map((id) => (
          <FavoriteItem key={id} id={id} />
        ))}
      </div>
    </section>
  );
}

export default FavoritesPage;

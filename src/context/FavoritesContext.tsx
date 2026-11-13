import { createContext, useContext, type ReactNode } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}
const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);

  function addFavorite(id: string) {
    if (!favorites.includes(id)) setFavorites([...favorites, id]);
  }
  function removeFavorite(id: string) {
    setFavorites(favorites.filter((favId) => favId !== id));
  }
  function isFavorite(id: string) {
    return favorites.includes(id);
  }
  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("UseFavorites must be used inside FavoritesProvider");
  return context;
}

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";

import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../Utils/localStorage";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorite = favorites.some((p) => p._id === product._id);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, []);

  const toggleFavorites = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      dispatch(removeFromFavorites(product));
      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      addFavoriteToLocalStorage(product);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleFavorites}
      aria-label={isFavorite ? "Remove from saved" : "Save for later"}
      aria-pressed={isFavorite}
      className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-sand-400/70 bg-sand-50/85 text-ink-soft shadow-soft backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:border-clay-300 active:scale-95"
    >
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill={isFavorite ? "#B8552F" : "none"}
        stroke={isFavorite ? "#B8552F" : "currentColor"}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-200"
      >
        <path d="M12 20s-7-4.4-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7 2.8C19 15.6 12 20 12 20Z" />
      </svg>
    </button>
  );
};

export default HeartIcon;

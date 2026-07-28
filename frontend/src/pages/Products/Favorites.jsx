import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct) || [];

  return (
    <div className="u-container py-14">
      <div className="border-b border-sand-400 pb-8">
        <p className="u-label">Saved</p>
        <h1 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.2rem)] font-semibold leading-tight">
          Pieces you're keeping an eye on
        </h1>
        {favorites.length > 0 && (
          <p className="mt-4 text-[15px] text-ink-soft tnum">
            {favorites.length} saved · stored on this device
          </p>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="py-28 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-sand-400 bg-sand-50 text-ink-faint">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 20s-7-4.4-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7 2.8C19 15.6 12 20 12 20Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="mt-7 font-display text-[26px]">Nothing saved yet</p>
          <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-ink-soft">
            Tap the heart on anything you're thinking about — it'll wait here
            while you decide.
          </p>
          <Link to="/shop" className="btn-primary mt-9">
            Browse the shop
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/features/cart/cartSlice";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import { money, truncate } from "../../Utils/format";

/* Shop-grid tile — same language as Product, plus a quick-add that
   slides up over the photograph on hover. */
const ProductCard = ({ p }) => {
  const dispatch = useDispatch();
  const soldOut = p?.countInStock === 0;

  const addToCartHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ ...p, qty: 1 }));
    toast.success(`${p.name} added to your bag`);
  };

  return (
    <article className="group">
      <div className="relative overflow-hidden rounded-lg bg-sand-300">
        <Link to={`/product/${p._id}`} className="block">
          <div className="aspect-[4/5] w-full overflow-hidden">
            <img
              src={p.image}
              alt={p.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
            />
          </div>
        </Link>

        <HeartIcon product={p} />

        {soldOut ? (
          <span className="pill absolute bottom-3 left-3 bg-ink/85 text-sand-50">
            Sold out
          </span>
        ) : (
          <div className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
            <button
              onClick={addToCartHandler}
              className="w-full rounded-full bg-sand-50/95 py-2.5 text-[13px] font-semibold uppercase tracking-wider text-ink shadow-soft backdrop-blur-sm transition-colors hover:bg-ink hover:text-sand-50"
            >
              Add to bag
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-1.5">
        {p?.brand && <p className="u-label">{p.brand}</p>}

        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-[17px] font-medium leading-snug">
            <Link
              to={`/product/${p._id}`}
              className="transition-colors hover:text-clay-500"
            >
              {p?.name}
            </Link>
          </h3>
          <span className="shrink-0 text-[15px] text-ink-soft tnum">
            {money(p?.price)}
          </span>
        </div>

        {p?.description && (
          <p className="text-[14px] leading-relaxed text-ink-faint">
            {truncate(p.description, 74)}
          </p>
        )}

        {p?.numReviews > 0 && (
          <Ratings value={p.rating} text={`(${p.numReviews})`} size={12} />
        )}
      </div>
    </article>
  );
};

export default ProductCard;

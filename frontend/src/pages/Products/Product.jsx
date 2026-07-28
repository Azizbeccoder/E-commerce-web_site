import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import { money } from "../../Utils/format";

/* The primary storefront tile: photograph first, type quiet and beneath it. */
const Product = ({ product }) => {
  const soldOut = product?.countInStock === 0;

  return (
    <article className="group">
      <div className="relative overflow-hidden rounded-lg bg-sand-300">
        <Link to={`/product/${product._id}`} className="block">
          <div className="aspect-[4/5] w-full overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
            />
          </div>
        </Link>

        <HeartIcon product={product} />

        {soldOut && (
          <span className="pill absolute bottom-3 left-3 bg-ink/85 text-sand-50">
            Sold out
          </span>
        )}
      </div>

      <div className="mt-4 space-y-1.5">
        {product.brand && <p className="u-label">{product.brand}</p>}

        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-[17px] font-medium leading-snug">
            <Link
              to={`/product/${product._id}`}
              className="transition-colors hover:text-clay-500"
            >
              {product.name}
            </Link>
          </h3>
          <span className="shrink-0 text-[15px] text-ink-soft tnum">
            {money(product.price)}
          </span>
        </div>

        {product.numReviews > 0 && (
          <Ratings value={product.rating} text={`(${product.numReviews})`} size={12} />
        )}
      </div>
    </article>
  );
};

export default Product;

import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import { money } from "../../Utils/format";

/* Compact tile used in the home sidebar column and in "you may also like". */
const SmallProduct = ({ product }) => (
  <article className="group">
    <div className="relative overflow-hidden rounded-md bg-sand-300">
      <Link to={`/product/${product._id}`} className="block">
        <div className="aspect-square w-full overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      </Link>
      <HeartIcon product={product} />
    </div>

    <div className="mt-3 flex items-baseline justify-between gap-3">
      <h4 className="truncate text-[14px] font-medium">
        <Link
          to={`/product/${product._id}`}
          className="transition-colors hover:text-clay-500"
        >
          {product.name}
        </Link>
      </h4>
      <span className="shrink-0 text-[13px] text-ink-faint tnum">
        {money(product.price)}
      </span>
    </div>
  </article>
);

export default SmallProduct;

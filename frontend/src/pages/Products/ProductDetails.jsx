import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { money } from "../../Utils/format";

const Spec = ({ label, value }) => (
  <div className="flex items-baseline justify-between gap-4 border-b border-sand-400 py-3.5">
    <dt className="text-[13px] uppercase tracking-wider text-ink-faint">
      {label}
    </dt>
    <dd className="text-right text-[15px] text-ink tnum">{value}</dd>
  </div>
);

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      setRating(0);
      setComment("");
      toast.success("Thank you — your review is up");
    } catch (err) {
      toast.error(err?.data?.message || err?.data || err.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  if (isLoading) return <Loader full label="Loading piece" />;

  if (error) {
    return (
      <div className="u-container py-20">
        <Message variant="danger">
          {error?.data?.message || error.message || "Could not load this product"}
        </Message>
        <Link to="/shop" className="btn-secondary mt-8">
          Back to the shop
        </Link>
      </div>
    );
  }

  const soldOut = product.countInStock === 0;

  return (
    <div className="u-container py-10">
      {/* breadcrumb */}
      <nav className="flex items-center gap-2 text-[13px] text-ink-faint">
        <Link to="/" className="transition-colors hover:text-clay-500">
          Home
        </Link>
        <span>/</span>
        <Link to="/shop" className="transition-colors hover:text-clay-500">
          Shop
        </Link>
        <span>/</span>
        <span className="truncate text-ink-soft">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* image */}
        <div className="relative">
          <div className="overflow-hidden rounded-xl bg-sand-300 shadow-soft lg:sticky lg:top-28">
            <div className="aspect-[4/5] w-full">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <HeartIcon product={product} />
          </div>
        </div>

        {/* detail */}
        <div className="animate-fade-up">
          {product.brand && <p className="u-label">{product.brand}</p>}

          <h1 className="mt-4 font-display text-[clamp(2rem,4.4vw,3rem)] font-semibold leading-[1.05]">
            {product.name}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <p className="text-[26px] font-semibold tnum">
              {money(product.price)}
            </p>
            <Ratings
              value={product.rating}
              text={`${product.numReviews} review${
                product.numReviews === 1 ? "" : "s"
              }`}
            />
          </div>

          <p className="mt-7 max-w-prose text-[16px] leading-relaxed text-ink-soft">
            {product.description}
          </p>

          {/* purchase block */}
          <div className="mt-9 rounded-lg border border-sand-400 bg-sand-50 p-6">
            <div className="flex flex-wrap items-end gap-4">
              {!soldOut && (
                <div>
                  <label htmlFor="qty" className="field-label">
                    Quantity
                  </label>
                  <select
                    id="qty"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="field w-28 cursor-pointer"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                onClick={addToCartHandler}
                disabled={soldOut}
                className="btn-primary flex-1"
              >
                {soldOut ? "Sold out" : "Add to bag"}
              </button>
            </div>

            <p className="mt-4 flex items-center gap-2 text-[13px] text-ink-faint">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  soldOut ? "bg-rust" : "bg-sage"
                }`}
              />
              {soldOut
                ? "This run has sold through — no restock date yet"
                : `${product.countInStock} left from this run · ships in 2–4 days`}
            </p>
          </div>

          {/* specs */}
          <dl className="mt-10 border-t border-sand-400">
            <Spec label="Maker" value={product.brand || "—"} />
            <Spec label="Added" value={moment(product.createdAt).fromNow()} />
            <Spec label="In stock" value={product.countInStock} />
            <Spec label="Reviews" value={product.numReviews} />
          </dl>
        </div>
      </div>

      {/* tabs */}
      <div className="mt-24">
        <ProductTabs
          loadingProductReview={loadingProductReview}
          userInfo={userInfo}
          submitHandler={submitHandler}
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
          product={product}
        />
      </div>
    </div>
  );
};

export default ProductDetails;

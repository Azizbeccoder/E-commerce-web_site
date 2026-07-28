import { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Ratings from "./Ratings";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";

const RATING_OPTIONS = [
  [5, "Exceptional"],
  [4, "Excellent"],
  [3, "Great"],
  [2, "Decent"],
  [1, "Poor"],
];

const TABS = [
  { id: 1, label: "Write a review" },
  { id: 2, label: "Reviews" },
  { id: 3, label: "You may also like" },
];

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();
  const [activeTab, setActiveTab] = useState(2);

  const reviews = product?.reviews || [];

  return (
    <section>
      {/* tab bar */}
      <div className="flex flex-wrap gap-8 border-b border-sand-400">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative -mb-px pb-4 text-[15px] transition-colors ${
                isActive
                  ? "font-semibold text-ink"
                  : "text-ink-faint hover:text-ink-soft"
              }`}
            >
              {tab.label}
              {tab.id === 2 && reviews.length > 0 && (
                <span className="ml-1.5 text-[13px] text-ink-faint tnum">
                  {reviews.length}
                </span>
              )}
              <span
                className={`absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-clay-500 transition-opacity duration-200 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      <div className="pt-10">
        {/* --- write a review --- */}
        {activeTab === 1 &&
          (userInfo ? (
            <form onSubmit={submitHandler} className="max-w-xl space-y-6">
              <div>
                <label htmlFor="rating" className="field-label">
                  How was it?
                </label>
                <select
                  id="rating"
                  required
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="field cursor-pointer"
                >
                  <option value="">Choose a rating</option>
                  {RATING_OPTIONS.map(([v, label]) => (
                    <option key={v} value={v}>
                      {"★".repeat(v)} — {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="comment" className="field-label">
                  Your notes
                </label>
                <textarea
                  id="comment"
                  rows="5"
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="How does it feel in the hand? Would you buy it again?"
                  className="field resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={loadingProductReview}
                className="btn-primary"
              >
                {loadingProductReview ? "Posting…" : "Post review"}
              </button>
            </form>
          ) : (
            <div className="max-w-xl rounded-lg border border-dashed border-sand-500 px-6 py-10 text-center">
              <p className="text-[16px] text-ink-soft">
                Reviews come from people who bought the piece.
              </p>
              <Link to="/login" className="btn-secondary btn-sm mt-6">
                Sign in to write one
              </Link>
            </div>
          ))}

        {/* --- reviews --- */}
        {activeTab === 2 &&
          (reviews.length === 0 ? (
            <div className="max-w-xl rounded-lg border border-dashed border-sand-500 px-6 py-14 text-center">
              <p className="font-display text-[22px]">No reviews yet</p>
              <p className="mt-3 text-[15px] text-ink-soft">
                Be the first to say something about this one.
              </p>
              <button
                onClick={() => setActiveTab(1)}
                className="btn-secondary btn-sm mt-6"
              >
                Write a review
              </button>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {reviews.map((review) => (
                <article
                  key={review._id}
                  className="rounded-lg border border-sand-400 bg-sand-50 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-clay-100 text-[13px] font-bold text-clay-600">
                        {review.name?.[0]?.toUpperCase() || "?"}
                      </span>
                      <div>
                        <p className="text-[15px] font-semibold leading-tight">
                          {review.name}
                        </p>
                        <p className="mt-0.5 text-[12px] text-ink-faint">
                          {moment(review.createdAt).format("D MMMM YYYY")}
                        </p>
                      </div>
                    </div>
                    <Ratings value={review.rating} size={13} />
                  </div>

                  <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
                    {review.comment}
                  </p>
                </article>
              ))}
            </div>
          ))}

        {/* --- related --- */}
        {activeTab === 3 &&
          (isLoading ? (
            <Loader label="Finding pieces" />
          ) : (
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
              {data
                ?.filter((p) => p._id !== product._id)
                .slice(0, 4)
                .map((p) => (
                  <SmallProduct key={p._id} product={p} />
                ))}
            </div>
          ))}
      </div>
    </section>
  );
};

export default ProductTabs;

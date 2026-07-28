import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";
import { ProductGridSkeleton } from "../components/Skeleton";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError, error } = useGetProductsQuery({ keyword });

  const products = data?.products || data || [];

  return (
    <>
      {!keyword && <Header />}

      <section className="u-container py-20">
        {/* section head */}
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-sand-400 pb-7">
          <div>
            <p className="u-label">
              {keyword ? "Search results" : "Currently in the shop"}
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,2.9rem)] font-semibold leading-tight">
              {keyword ? (
                <>
                  Pieces matching{" "}
                  <span className="text-clay-500">“{keyword}”</span>
                </>
              ) : (
                "This season's selection"
              )}
            </h2>
          </div>

          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 text-[15px] font-medium text-ink transition-colors hover:text-clay-500"
          >
            See everything
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <div className="mt-12">
          {isLoading ? (
            <ProductGridSkeleton count={8} />
          ) : isError ? (
            <Message variant="danger">
              {error?.data?.message || error?.error || "An error occurred"}
            </Message>
          ) : products.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-display text-[26px] text-ink">
                Nothing here yet
              </p>
              <p className="mt-3 text-[15px] text-ink-soft">
                {keyword
                  ? "Try a different word, or browse the full shop."
                  : "New pieces go up as the studios finish them."}
              </p>
              <Link to="/shop" className="btn-secondary mt-8">
                Browse the shop
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* editorial break */}
      {!keyword && (
        <section className="border-y border-sand-400 bg-sand-100">
          <div className="u-container grid gap-12 py-20 lg:grid-cols-3 lg:gap-16">
            {[
              [
                "01",
                "We visit every studio",
                "Nothing is listed sight-unseen. If we haven't stood in the workshop, it isn't here.",
              ],
              [
                "02",
                "Small runs, honest stock",
                "When a maker finishes twenty bowls, we list twenty bowls. Sold out means sold out.",
              ],
              [
                "03",
                "Mended before replaced",
                "Send a chipped piece back and we'll put you in touch with someone who can fix it.",
              ],
            ].map(([n, title, body]) => (
              <div key={n} className="border-t border-sand-500 pt-7">
                <p className="font-display text-[15px] text-clay-500">{n}</p>
                <h3 className="mt-4 text-[21px] font-semibold leading-snug">
                  {title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Home;

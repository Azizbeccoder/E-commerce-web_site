import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import { Shimmer } from "../../components/Skeleton";
import { money, truncate } from "../../Utils/format";

const settings = {
  dots: true,
  infinite: true,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 5200,
  pauseOnHover: true,
  fade: true,
  cssEase: "cubic-bezier(0.22, 1, 0.36, 1)",
};

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Shimmer className="aspect-[4/5] w-full rounded-xl sm:aspect-[5/6]" />;
  }

  if (error) {
    return (
      <Message variant="danger">
        {error?.data?.message || error.error || "Could not load featured pieces"}
      </Message>
    );
  }

  if (!products?.length) return null;

  return (
    <div className="w-full min-w-0 overflow-hidden rounded-xl bg-sand-300 shadow-lift">
      <Slider {...settings}>
        {products.map((p) => (
          <div key={p._id}>
            <Link to={`/product/${p._id}`} className="relative block">
              <div className="aspect-[4/5] w-full overflow-hidden sm:aspect-[5/6]">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* caption plate */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/35 to-transparent px-6 pb-14 pt-24 sm:px-8">
                <div className="flex items-end justify-between gap-6">
                  <div className="min-w-0">
                    {p.brand && (
                      <p className="text-[11px] font-semibold uppercase tracking-label text-sand-300">
                        {p.brand}
                      </p>
                    )}
                    <h3 className="mt-1.5 truncate font-display text-[26px] font-semibold text-sand-50 sm:text-[30px]">
                      {p.name}
                    </h3>
                    <p className="mt-1.5 hidden max-w-md text-[14px] leading-relaxed text-sand-200/90 sm:block">
                      {truncate(p.description, 96)}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-sand-50 px-4 py-2 text-[14px] font-semibold text-ink tnum">
                    {money(p.price)}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;

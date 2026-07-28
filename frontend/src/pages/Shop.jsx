import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import ProductCard from "./Products/ProductCard";
import { ProductGridSkeleton } from "../components/Skeleton";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading && categoriesQuery.data) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, categoriesQuery.isLoading, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading && filteredProductsQuery.data) {
        const rawProducts = filteredProductsQuery.data || [];

        const filteredProducts = rawProducts.filter((product) => {
          return (
            product.price.toString().includes(priceFilter) ||
            product.price === parseInt(priceFilter, 10)
          );
        });

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [
    checked,
    radio,
    filteredProductsQuery.data,
    filteredProductsQuery.isLoading,
    dispatch,
    priceFilter,
  ]);

  const handleBrandClick = (brand) => {
    const rawProducts = filteredProductsQuery.data || [];
    const productsByBrand = rawProducts.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const rawProductsForBrands = filteredProductsQuery.data || [];
  const uniqueBrands = [
    ...Array.from(
      new Set(
        rawProductsForBrands
          .map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => setPriceFilter(e.target.value);

  const activeCount = checked.length + (priceFilter ? 1 : 0);
  const loading = filteredProductsQuery.isLoading;

  const FilterPanel = (
    <div className="space-y-9">
      <div>
        <h3 className="u-label">Category</h3>
        <div className="mt-4 space-y-3">
          {categories?.length ? (
            categories.map((c) => {
              const isOn = checked.includes(c._id);
              return (
                <label
                  key={c._id}
                  htmlFor={`checkbox-${c._id}`}
                  className="group flex cursor-pointer items-center gap-3"
                >
                  <input
                    type="checkbox"
                    id={`checkbox-${c._id}`}
                    checked={isOn}
                    onChange={(e) => handleCheck(e.target.checked, c._id)}
                    className="peer sr-only"
                  />
                  <span
                    className={`grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[5px] border transition-colors ${
                      isOn
                        ? "border-clay-500 bg-clay-500 text-sand-50"
                        : "border-sand-500 bg-sand-50 group-hover:border-clay-300"
                    }`}
                  >
                    {isOn && (
                      <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M2.5 7.5 5.5 10.5 11.5 4"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span
                    className={`text-[15px] transition-colors ${
                      isOn ? "text-ink" : "text-ink-soft group-hover:text-ink"
                    }`}
                  >
                    {c.name}
                  </span>
                </label>
              );
            })
          ) : (
            <p className="text-[14px] text-ink-faint">No categories yet</p>
          )}
        </div>
      </div>

      <div className="border-t border-sand-400 pt-7">
        <h3 className="u-label">Maker</h3>
        <div className="mt-4 space-y-3">
          {uniqueBrands.length ? (
            uniqueBrands.map((brand) => (
              <label
                key={brand}
                htmlFor={`brand-${brand}`}
                className="group flex cursor-pointer items-center gap-3"
              >
                <input
                  type="radio"
                  id={`brand-${brand}`}
                  name="brand"
                  onChange={() => handleBrandClick(brand)}
                  className="peer sr-only"
                />
                <span className="grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full border border-sand-500 bg-sand-50 transition-colors group-hover:border-clay-300 peer-checked:border-clay-500 peer-checked:[&>span]:bg-clay-500">
                  <span className="h-2 w-2 rounded-full bg-transparent transition-colors" />
                </span>
                <span className="text-[15px] text-ink-soft transition-colors group-hover:text-ink peer-checked:text-ink">
                  {brand}
                </span>
              </label>
            ))
          ) : (
            <p className="text-[14px] text-ink-faint">No makers listed</p>
          )}
        </div>
      </div>

      <div className="border-t border-sand-400 pt-7">
        <h3 className="u-label">Price</h3>
        <input
          type="text"
          inputMode="numeric"
          placeholder="e.g. 45"
          value={priceFilter}
          onChange={handlePriceChange}
          className="field mt-4"
        />
      </div>

      <button
        onClick={() => window.location.reload()}
        className="w-full border-t border-sand-400 pt-6 text-left text-[14px] text-ink-soft transition-colors hover:text-clay-500"
      >
        Clear all filters
      </button>
    </div>
  );

  return (
    <div className="u-container py-14">
      {/* page head */}
      <div className="border-b border-sand-400 pb-8">
        <p className="u-label">The shop</p>
        <h1 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.4rem)] font-semibold leading-tight">
          Everything we currently keep
        </h1>
        <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink-soft">
          Stock is what the studios have actually finished. When a run sells
          through, it leaves this page until the next one arrives.
        </p>
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14">
        {/* filter rail */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className="flex w-full items-center justify-between border-b border-sand-400 pb-4 text-left lg:hidden"
          >
            <span className="text-[15px] font-semibold">
              Filters{activeCount > 0 && ` (${activeCount})`}
            </span>
            <span
              className={`text-ink-faint transition-transform duration-200 ${
                filtersOpen ? "rotate-180" : ""
              }`}
            >
              ▾
            </span>
          </button>

          <div className={`mt-7 ${filtersOpen ? "block" : "hidden"} lg:block`}>
            {FilterPanel}
          </div>
        </aside>

        {/* results */}
        <section>
          <div className="mb-8 flex items-center justify-between">
            <p className="text-[14px] text-ink-soft tnum">
              {loading
                ? "Loading…"
                : `${products?.length || 0} ${
                    products?.length === 1 ? "piece" : "pieces"
                  }`}
            </p>
            {activeCount > 0 && (
              <span className="pill bg-clay-50 text-clay-600">
                {activeCount} filter{activeCount > 1 ? "s" : ""} on
              </span>
            )}
          </div>

          {loading ? (
            <ProductGridSkeleton count={6} />
          ) : !products || products.length === 0 ? (
            <div className="rounded-lg border border-dashed border-sand-500 py-24 text-center">
              <p className="font-display text-[24px]">Nothing matches that</p>
              <p className="mt-3 text-[15px] text-ink-soft">
                Try loosening a filter — most of the shop is quite small.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="btn-secondary btn-sm mt-8"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-6 gap-y-14 xl:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p._id} p={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Shop;

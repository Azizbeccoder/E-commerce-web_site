import { Link } from "react-router-dom";
import ProductCarousel from "../pages/Products/ProductCarousel";

const FACTS = [
  ["12", "makers"],
  ["No. 04", "collection"],
  ["2019", "since"],
];

const Header = () => (
  <section className="relative overflow-hidden">
    <div className="u-container pb-20 pt-14 lg:pb-28 lg:pt-20">
      {/* grid-cols-1 (minmax(0,1fr)) is load-bearing: an auto-sized track lets
          the slick carousel's measured width feed back and blow the row up. */}
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        {/* copy */}
        <div className="min-w-0 animate-fade-up">
          <p className="u-label">Autumn collection · Small batch</p>

          <h1 className="mt-6 font-display text-[clamp(2.6rem,6.2vw,4.4rem)] font-semibold leading-[0.98]">
            Made slowly,
            <br />
            <span className="text-clay-500">meant to last</span>
          </h1>

          <p className="mt-7 max-w-md text-[17px] leading-relaxed text-ink-soft">
            Everyday objects from a dozen studios we visit in person — thrown,
            woven and turned in quantities small enough to count. No trends, no
            restock treadmill.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link to="/shop" className="btn-primary">
              Browse the shop
            </Link>
            <Link to="/favorite" className="btn-secondary">
              Your saved pieces
            </Link>
          </div>

          <dl className="mt-14 flex max-w-md items-start gap-10 border-t border-sand-400 pt-7">
            {FACTS.map(([value, label]) => (
              <div key={label}>
                <dt className="font-display text-[26px] font-semibold leading-none">
                  {value}
                </dt>
                <dd className="mt-2 text-[12px] uppercase tracking-label text-ink-faint">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* featured carousel */}
        <div className="min-w-0 animate-fade-in lg:pl-4">
          <ProductCarousel />
        </div>
      </div>
    </div>

    {/* running strip — cheap to build, hard to mistake for a stock template */}
    <div className="overflow-hidden border-y border-sand-400 bg-sand-100 py-3.5">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {Array.from({ length: 2 }).map((_, dupe) => (
          <div key={dupe} className="flex shrink-0 gap-10">
            {[
              "Hand-thrown stoneware",
              "Undyed European linen",
              "Turned ash + walnut",
              "Repaired, not replaced",
              "Shipped in paper, never plastic",
              "Meet the makers",
            ].map((t) => (
              <span
                key={t}
                className="flex items-center gap-10 text-[12px] uppercase tracking-label text-ink-soft"
              >
                {t}
                <span className="h-1 w-1 rounded-full bg-clay-400" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Header;

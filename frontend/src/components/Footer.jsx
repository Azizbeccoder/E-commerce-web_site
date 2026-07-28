import { Link } from "react-router-dom";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      ["/shop", "All goods"],
      ["/favorite", "Saved items"],
      ["/cart", "Your bag"],
    ],
  },
  {
    title: "Studio",
    links: [
      ["/shop", "Our makers"],
      ["/shop", "Materials"],
      ["/shop", "Care guide"],
    ],
  },
  {
    title: "Help",
    links: [
      ["/profile", "Your account"],
      ["/user-orders", "Order history"],
      ["/shop", "Shipping & returns"],
    ],
  },
];

const Footer = () => (
  <footer className="mt-24 border-t border-sand-400 bg-sand-100">
    <div className="u-container py-16">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
        <div className="max-w-sm">
          <p className="font-display text-[28px] font-semibold leading-none">
            Maison
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
            A small shop of everyday things — thrown, woven and turned by people
            we know, in quantities we can count.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex max-w-sm items-center gap-2 border-b border-sand-500 pb-2"
          >
            <input
              type="email"
              placeholder="Email for the occasional letter"
              className="w-full bg-transparent text-[14px] text-ink placeholder:text-ink-faint focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 text-[13px] font-semibold uppercase tracking-wider text-clay-500 transition-colors hover:text-clay-600"
            >
              Join
            </button>
          </form>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="u-label">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map(([to, label]) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-[15px] text-ink-soft transition-colors hover:text-clay-500"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-3 border-t border-sand-400 pt-7 text-[13px] text-ink-faint sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Maison Goods. All rights reserved.</p>
        <div className="flex gap-6">
          <span className="cursor-default transition-colors hover:text-ink-soft">
            Privacy
          </span>
          <span className="cursor-default transition-colors hover:text-ink-soft">
            Terms
          </span>
          <span className="cursor-default transition-colors hover:text-ink-soft">
            Stockists
          </span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

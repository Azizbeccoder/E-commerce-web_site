import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import "./Navigation.css";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/shop", label: "Shop" },
  { to: "/favorite", label: "Saved" },
];

/* ---------- small inline icons (stroke-matched to the type) ---------- */

const Icon = ({ d, size = 19, fill = "none" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {d}
  </svg>
);

const SearchIcon = () => (
  <Icon
    d={
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.2-3.2" />
      </>
    }
  />
);

const BagIcon = () => (
  <Icon
    d={
      <>
        <path d="M4.5 8h15l-1.1 11.2a2 2 0 0 1-2 1.8H7.6a2 2 0 0 1-2-1.8L4.5 8Z" />
        <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
      </>
    }
  />
);

const HeartOutline = () => (
  <Icon d={<path d="M12 20s-7-4.4-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7 2.8C19 15.6 12 20 12 20Z" />} />
);

const UserIcon = () => (
  <Icon
    d={
      <>
        <circle cx="12" cy="8.5" r="3.5" />
        <path d="M5 20c1.2-3.4 3.8-5 7-5s5.8 1.6 7 5" />
      </>
    }
  />
);

/* -------------------------------------------------------------------- */

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const favorites = useSelector((state) => state.favorites) || [];

  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [term, setTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const accountRef = useRef(null);
  const searchRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [logoutApiCall] = useLogoutMutation();

  const cartCount = cartItems.reduce((a, c) => a + c.qty, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close every overlay on navigation
  useEffect(() => {
    setAccountOpen(false);
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // Click-outside for the account menu
  useEffect(() => {
    const onDown = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setAccountOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const submitSearch = (e) => {
    e.preventDefault();
    const q = term.trim();
    setSearchOpen(false);
    navigate(q ? `/search/${encodeURIComponent(q)}` : "/shop");
    setTerm("");
  };

  const navLinkClass = ({ isActive }) =>
    `relative py-1 text-[15px] transition-colors ${
      isActive ? "text-clay-500" : "text-ink-soft hover:text-ink"
    } after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-clay-500 after:transition-[width] after:duration-300 ${
      isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
    }`;

  const Count = ({ n }) =>
    n > 0 ? (
      <span className="absolute -right-1.5 -top-1.5 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-clay-500 px-1 text-[10px] font-bold leading-none text-sand-50">
        {n}
      </span>
    ) : null;

  return (
    <>
      {/* Announcement */}
      <div className="bg-ink text-sand-100">
        <div className="u-container flex h-9 items-center justify-center overflow-hidden">
          <p className="truncate text-[12px] tracking-wide">
            Complimentary shipping on orders over $75 · Made in small batches
          </p>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-sand-400 bg-sand-200/85 backdrop-blur-md"
            : "border-transparent bg-sand-200"
        }`}
      >
        <div className="u-container flex h-[72px] items-center justify-between gap-6">
          {/* left: mobile toggle + wordmark */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="-ml-2 grid h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-sand-300 md:hidden"
            >
              <span className="space-y-[5px]">
                <span className="block h-px w-[19px] bg-current" />
                <span className="block h-px w-[19px] bg-current" />
                <span className="block h-px w-[13px] bg-current" />
              </span>
            </button>

            <Link to="/" className="group flex items-baseline gap-2">
              <span className="font-display text-[26px] font-semibold leading-none tracking-tight text-ink">
                Maison
              </span>
              <span className="hidden text-[10px] uppercase tracking-label text-ink-faint transition-colors group-hover:text-clay-500 sm:inline">
                est. 2019
              </span>
            </Link>
          </div>

          {/* center: nav */}
          <nav className="hidden items-center gap-9 md:flex">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={navLinkClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* right: actions */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-sand-300"
            >
              <SearchIcon />
            </button>

            <Link
              to="/favorite"
              aria-label="Saved items"
              className="relative hidden h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-sand-300 sm:grid"
            >
              <HeartOutline />
              <Count n={favorites.length} />
            </Link>

            {/* account */}
            <div className="relative" ref={accountRef}>
              {userInfo ? (
                <button
                  type="button"
                  onClick={() => setAccountOpen((v) => !v)}
                  className="flex h-10 items-center gap-2 rounded-full px-2.5 text-ink transition-colors hover:bg-sand-300"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-clay-500 text-[12px] font-bold text-sand-50">
                    {userInfo.username?.[0]?.toUpperCase() || "U"}
                  </span>
                  <span className="hidden max-w-[9rem] truncate text-[14px] lg:inline">
                    {userInfo.username}
                  </span>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 12 12"
                    fill="none"
                    className={`transition-transform duration-200 ${
                      accountOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M2.5 4.5 6 8l3.5-3.5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ) : (
                <Link
                  to="/login"
                  aria-label="Sign in"
                  className="grid h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-sand-300"
                >
                  <UserIcon />
                </Link>
              )}

              {accountOpen && userInfo && (
                <div className="absolute right-0 top-[calc(100%+10px)] w-60 origin-top-right animate-fade-up overflow-hidden rounded-lg border border-sand-400 bg-sand-50 shadow-lift">
                  <div className="border-b border-sand-300 px-4 py-3">
                    <p className="truncate text-[14px] font-semibold text-ink">
                      {userInfo.username}
                    </p>
                    <p className="truncate text-[12px] text-ink-faint">
                      {userInfo.email}
                    </p>
                  </div>

                  {userInfo.isAdmin && (
                    <div className="border-b border-sand-300 py-1.5">
                      <p className="u-label px-4 pb-1 pt-2">Manage</p>
                      {[
                        ["/admin/dashboard", "Dashboard"],
                        ["/admin/allproductslist", "Products"],
                        ["/admin/categorylist", "Categories"],
                        ["/admin/orderlist", "Orders"],
                        ["/admin/userlist", "Customers"],
                      ].map(([to, label]) => (
                        <Link
                          key={to}
                          to={to}
                          className="block px-4 py-2 text-[14px] text-ink-soft transition-colors hover:bg-sand-200 hover:text-ink"
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  )}

                  <div className="py-1.5">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-[14px] text-ink-soft transition-colors hover:bg-sand-200 hover:text-ink"
                    >
                      Your account
                    </Link>
                    <Link
                      to="/user-orders"
                      className="block px-4 py-2 text-[14px] text-ink-soft transition-colors hover:bg-sand-200 hover:text-ink"
                    >
                      Order history
                    </Link>
                    <button
                      onClick={logoutHandler}
                      className="block w-full px-4 py-2 text-left text-[14px] text-rust transition-colors hover:bg-sand-200"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/cart"
              aria-label="Shopping bag"
              className="relative ml-1 grid h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-sand-300"
            >
              <BagIcon />
              <Count n={cartCount} />
            </Link>
          </div>
        </div>

        {/* search drawer */}
        <div
          className={`overflow-hidden border-sand-400 transition-[max-height,opacity] duration-300 ${
            searchOpen ? "max-h-24 border-t opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <form onSubmit={submitSearch} className="u-container py-4">
            <div className="flex items-center gap-3">
              <span className="text-ink-faint">
                <SearchIcon />
              </span>
              <input
                ref={searchRef}
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search ceramics, linens, lighting…"
                className="w-full bg-transparent py-1 text-[16px] text-ink placeholder:text-ink-faint focus:outline-none"
              />
              <button type="submit" className="btn-primary btn-sm">
                Search
              </button>
            </div>
          </form>
        </div>
      </header>

      {/* mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] md:hidden ${
          mobileOpen ? "" : "pointer-events-none"
        }`}
      >
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          className={`absolute inset-y-0 left-0 flex w-[82%] max-w-xs flex-col bg-sand-100 shadow-lift transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-sand-400 px-6 py-5">
            <span className="font-display text-[22px] font-semibold">Maison</span>
            <button
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="grid h-9 w-9 place-items-center rounded-full text-ink-soft hover:bg-sand-300"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 3l10 10M13 3L3 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-6">
            {[...LINKS, { to: "/cart", label: "Bag" }].map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `block border-b border-sand-300 py-4 font-display text-[24px] ${
                    isActive ? "text-clay-500" : "text-ink"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-sand-400 px-6 py-6">
            {userInfo ? (
              <button onClick={logoutHandler} className="btn-secondary w-full">
                Sign out
              </button>
            ) : (
              <div className="space-y-3">
                <Link to="/login" className="btn-primary w-full">
                  Sign in
                </Link>
                <Link to="/register" className="btn-secondary w-full">
                  Create account
                </Link>
              </div>
            )}
          </div>
        </aside>
      </div>
    </>
  );
};

export default Navigation;

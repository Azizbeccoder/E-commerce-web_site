import { useState } from "react";
import { Link } from "react-router-dom";
import AdminMenu from "./AdminMenu";

/* Shared chrome for every admin screen: quiet sidebar, one page title,
   content column that never runs edge to edge. */
const AdminShell = ({ title, subtitle, actions, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="u-container py-10">
      <div className="grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-14">
        {/* sidebar */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="mb-6 flex items-center justify-between lg:mb-8">
            <Link
              to="/"
              className="flex items-center gap-2 text-[13px] text-ink-faint transition-colors hover:text-clay-500"
            >
              ← Back to shop
            </Link>

            <button
              onClick={() => setOpen((v) => !v)}
              className="text-[14px] font-semibold text-ink-soft lg:hidden"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>

          <div className={`${open ? "block" : "hidden"} lg:block`}>
            <AdminMenu onNavigate={() => setOpen(false)} />
          </div>
        </aside>

        {/* content */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-end justify-between gap-5 border-b border-sand-400 pb-7">
            <div>
              <p className="u-label">Admin</p>
              <h1 className="mt-3 font-display text-[clamp(1.8rem,3.6vw,2.4rem)] font-semibold leading-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-2 text-[15px] text-ink-soft">{subtitle}</p>
              )}
            </div>
            {actions}
          </div>

          <div className="pt-9">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminShell;

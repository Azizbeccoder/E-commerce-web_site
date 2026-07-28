import { NavLink } from "react-router-dom";

const ITEMS = [
  { to: "/admin/dashboard", label: "Overview" },
  { to: "/admin/allproductslist", label: "Products" },
  { to: "/admin/productlist", label: "New product" },
  { to: "/admin/categorylist", label: "Categories" },
  { to: "/admin/orderlist", label: "Orders" },
  { to: "/admin/userlist", label: "Customers" },
];

const AdminMenu = ({ onNavigate }) => (
  <nav className="space-y-1">
    <p className="u-label mb-4 px-3">Manage</p>

    {ITEMS.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        onClick={onNavigate}
        className={({ isActive }) =>
          `relative block rounded-md px-3 py-2.5 text-[15px] transition-colors ${
            isActive
              ? "bg-sand-200 font-semibold text-ink"
              : "text-ink-soft hover:bg-sand-200/60 hover:text-ink"
          }`
        }
      >
        {({ isActive }) => (
          <>
            <span
              className={`absolute inset-y-2 left-0 w-[3px] rounded-full bg-clay-500 transition-opacity ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            />
            {item.label}
          </>
        )}
      </NavLink>
    ))}
  </nav>
);

export default AdminMenu;

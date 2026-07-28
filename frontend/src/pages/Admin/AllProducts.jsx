import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminShell from "./AdminShell";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { money, truncate } from "../../Utils/format";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  return (
    <AdminShell
      title="Products"
      subtitle={
        products ? `${products.length} in the catalogue` : "Loading catalogue"
      }
      actions={
        <Link to="/admin/productlist" className="btn-primary btn-sm">
          New product
        </Link>
      }
    >
      {isLoading ? (
        <Loader label="Loading products" />
      ) : isError ? (
        <Message variant="danger">Could not load products</Message>
      ) : !products?.length ? (
        <div className="rounded-lg border border-dashed border-sand-500 py-20 text-center">
          <p className="font-display text-[22px]">Nothing listed yet</p>
          <Link to="/admin/productlist" className="btn-primary mt-6">
            Add the first product
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {products.map((product) => (
            <li key={product._id}>
              <Link
                to={`/admin/product/update/${product._id}`}
                className="flex gap-5 rounded-lg border border-sand-400 bg-sand-50 p-4 transition-all hover:border-sand-500 hover:shadow-soft"
              >
                <div className="h-28 w-24 shrink-0 overflow-hidden rounded bg-sand-300">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-[17px] font-semibold leading-snug">
                        {product.name}
                      </h3>
                      <span className="shrink-0 text-[12px] text-ink-faint">
                        {moment(product.createdAt).format("D MMM YYYY")}
                      </span>
                    </div>

                    <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
                      {truncate(product.description, 150)}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <span className="text-[16px] font-semibold tnum">
                      {money(product.price)}
                    </span>
                    {product.brand && (
                      <span className="pill bg-sand-200 text-ink-soft">
                        {product.brand}
                      </span>
                    )}
                    <span
                      className={`pill ${
                        product.countInStock > 0
                          ? "bg-sage-50 text-sage-600"
                          : "bg-rust-50 text-rust-600"
                      }`}
                    >
                      {product.countInStock > 0
                        ? `${product.countInStock} in stock`
                        : "Sold out"}
                    </span>
                    <span className="ml-auto text-[14px] text-clay-500">
                      Edit →
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </AdminShell>
  );
};

export default AllProducts;

import { Link } from "react-router-dom";
import moment from "moment";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminShell from "./AdminShell";
import { money } from "../../Utils/format";

const Pill = ({ ok, okLabel, pendingLabel }) => (
  <span
    className={`pill ${ok ? "bg-sage-50 text-sage-600" : "bg-clay-50 text-clay-600"}`}
  >
    {ok ? okLabel : pendingLabel}
  </span>
);

const Table = ({ orders }) => (
  <div className="overflow-x-auto rounded-lg border border-sand-400 bg-sand-50">
    <table className="w-full min-w-[46rem] text-left">
      <thead>
        <tr className="border-b border-sand-400">
          {["Item", "Order", "Customer", "Date", "Total", "Paid", "Delivered", ""].map(
            (h) => (
              <th
                key={h}
                className="whitespace-nowrap px-4 py-3.5 text-[11px] font-semibold uppercase tracking-label text-ink-faint"
              >
                {h}
              </th>
            )
          )}
        </tr>
      </thead>

      <tbody className="divide-y divide-sand-300">
        {orders.map((order) => (
          <tr key={order._id} className="transition-colors hover:bg-sand-100">
            <td className="px-4 py-3">
              <div className="h-12 w-10 overflow-hidden rounded bg-sand-300">
                <img
                  src={order.orderItems[0]?.image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </td>
            <td className="max-w-[9rem] truncate px-4 py-3 text-[13px] text-ink-faint tnum">
              {order._id}
            </td>
            <td className="whitespace-nowrap px-4 py-3 text-[14px]">
              {order.user ? order.user.username : "—"}
            </td>
            <td className="whitespace-nowrap px-4 py-3 text-[14px] text-ink-soft">
              {order.createdAt
                ? moment(order.createdAt).format("D MMM YYYY")
                : "—"}
            </td>
            <td className="whitespace-nowrap px-4 py-3 text-[14px] font-semibold tnum">
              {money(order.totalPrice)}
            </td>
            <td className="px-4 py-3">
              <Pill ok={order.isPaid} okLabel="Paid" pendingLabel="Pending" />
            </td>
            <td className="px-4 py-3">
              <Pill
                ok={order.isDelivered}
                okLabel="Sent"
                pendingLabel="Pending"
              />
            </td>
            <td className="px-4 py-3 text-right">
              <Link
                to={`/order/${order._id}`}
                className="whitespace-nowrap text-[14px] text-clay-500 underline underline-offset-4 transition-colors hover:text-clay-600"
              >
                View
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const OrderList = ({ embedded = false }) => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  const body = isLoading ? (
    <Loader label="Loading orders" />
  ) : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : !orders?.length ? (
    <div className="rounded-lg border border-dashed border-sand-500 py-20 text-center">
      <p className="font-display text-[22px]">No orders yet</p>
      <p className="mt-2 text-[15px] text-ink-soft">
        They'll appear here as customers check out.
      </p>
    </div>
  ) : (
    <Table orders={embedded ? orders.slice(0, 6) : orders} />
  );

  if (embedded) return body;

  return (
    <AdminShell
      title="Orders"
      subtitle={
        orders?.length
          ? `${orders.length} order${orders.length === 1 ? "" : "s"} to date`
          : undefined
      }
    >
      {body}
    </AdminShell>
  );
};

export default OrderList;

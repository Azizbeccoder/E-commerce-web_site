import { Link } from "react-router-dom";
import moment from "moment";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";
import { money } from "../../Utils/format";

const Pill = ({ ok, okLabel, pendingLabel }) => (
  <span
    className={`pill ${ok ? "bg-sage-50 text-sage-600" : "bg-clay-50 text-clay-600"}`}
  >
    {ok ? okLabel : pendingLabel}
  </span>
);

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="u-container py-14">
      <div className="border-b border-sand-400 pb-8">
        <p className="u-label">History</p>
        <h1 className="mt-3 font-display text-[clamp(2rem,4.4vw,2.8rem)] font-semibold leading-tight">
          Your orders
        </h1>
      </div>

      <div className="mt-10">
        {isLoading ? (
          <Loader label="Loading orders" />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.error || error?.data?.message || error.error}
          </Message>
        ) : !orders?.length ? (
          <div className="rounded-lg border border-dashed border-sand-500 py-24 text-center">
            <p className="font-display text-[24px]">No orders yet</p>
            <p className="mt-3 text-[15px] text-ink-soft">
              When you buy something it'll show up here.
            </p>
            <Link to="/shop" className="btn-primary mt-8">
              Browse the shop
            </Link>
          </div>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li
                key={order._id}
                className="rounded-lg border border-sand-400 bg-sand-50 p-5 transition-shadow hover:shadow-soft"
              >
                <div className="flex flex-wrap items-center gap-5">
                  <div className="h-20 w-16 shrink-0 overflow-hidden rounded bg-sand-300">
                    <img
                      src={order.orderItems[0]?.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] text-ink-faint">
                      {moment(order.createdAt).format("D MMMM YYYY")}
                    </p>
                    <p className="mt-1 truncate text-[15px] font-medium">
                      {order.orderItems[0]?.name}
                      {order.orderItems.length > 1 &&
                        ` + ${order.orderItems.length - 1} more`}
                    </p>
                    <p className="mt-1 break-all text-[12px] text-ink-faint tnum">
                      #{order._id}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Pill
                      ok={order.isPaid}
                      okLabel="Paid"
                      pendingLabel="Unpaid"
                    />
                    <Pill
                      ok={order.isDelivered}
                      okLabel="Delivered"
                      pendingLabel="In transit"
                    />
                  </div>

                  <p className="w-24 shrink-0 text-right text-[17px] font-semibold tnum">
                    {money(order.totalPrice)}
                  </p>

                  <Link
                    to={`/order/${order._id}`}
                    className="btn-secondary btn-sm shrink-0"
                  >
                    Details
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserOrder;

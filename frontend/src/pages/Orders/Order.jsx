import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";
import { money } from "../../Utils/format";

const StatusPill = ({ ok, okLabel, pendingLabel }) => (
  <span
    className={`pill ${
      ok ? "bg-sage-50 text-sage-600" : "bg-clay-50 text-clay-600"
    }`}
  >
    <span
      className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
        ok ? "bg-sage" : "bg-clay-400"
      }`}
    />
    {ok ? okLabel : pendingLabel}
  </span>
);

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPaPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPaPal && paypal?.clientId) {
      const loadingPaPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: { "client-id": paypal.clientId, currency: "USD" },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) loadingPaPalScript();
      }
    }
  }, [errorPayPal, loadingPaPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Payment received — thank you");
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    });
  }

  function createOrder(data, actions) {
    return actions.order
      .create({ purchase_units: [{ amount: { value: order.totalPrice } }] })
      .then((orderID) => orderID);
  }

  function onError(err) {
    toast.error(err.message);
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  if (isLoading) return <Loader full label="Loading order" />;

  if (error) {
    return (
      <div className="u-container py-20">
        <Message variant="danger">
          {error?.data?.message || "Could not load this order"}
        </Message>
      </div>
    );
  }

  return (
    <div className="u-container py-14">
      {/* head */}
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-sand-400 pb-8">
        <div>
          <p className="u-label">Order</p>
          <h1 className="mt-3 font-display text-[clamp(1.9rem,4vw,2.6rem)] font-semibold leading-tight">
            {order.isDelivered
              ? "Delivered"
              : order.isPaid
              ? "Paid — on its way"
              : "Awaiting payment"}
          </h1>
          <p className="mt-3 break-all text-[13px] text-ink-faint tnum">
            #{order._id}
          </p>
        </div>

        <div className="flex gap-2">
          <StatusPill ok={order.isPaid} okLabel="Paid" pendingLabel="Unpaid" />
          <StatusPill
            ok={order.isDelivered}
            okLabel="Delivered"
            pendingLabel="In transit"
          />
        </div>
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_23rem] lg:gap-16">
        {/* items */}
        <div>
          {order.orderItems.length === 0 ? (
            <Message>This order is empty</Message>
          ) : (
            <ul className="divide-y divide-sand-400 border-y border-sand-400">
              {order.orderItems.map((item, index) => (
                <li key={index} className="flex items-center gap-5 py-5">
                  <div className="h-20 w-16 shrink-0 overflow-hidden rounded bg-sand-300">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/product/${item.product}`}
                      className="text-[16px] font-medium transition-colors hover:text-clay-500"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 text-[13px] text-ink-faint tnum">
                      {item.qty} × {money(item.price)}
                    </p>
                  </div>

                  <p className="shrink-0 text-[16px] font-semibold tnum">
                    {money(item.qty * item.price)}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-sand-400 bg-sand-50 p-6">
              <h3 className="u-label">Shipping to</h3>
              <p className="mt-4 text-[15px] font-medium">
                {order.user?.username}
              </p>
              <p className="mt-1 text-[14px] text-ink-faint">
                {order.user?.email}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                {order.shippingAddress.address}
                <br />
                {order.shippingAddress.city} {order.shippingAddress.postalCode}
                <br />
                {order.shippingAddress.country}
              </p>
            </div>

            <div className="rounded-lg border border-sand-400 bg-sand-50 p-6">
              <h3 className="u-label">Payment</h3>
              <p className="mt-4 text-[15px] text-ink-soft">
                {order.paymentMethod}
              </p>
              <div className="mt-5">
                {order.isPaid ? (
                  <Message variant="success">
                    Paid {moment(order.paidAt).format("D MMMM YYYY")}
                  </Message>
                ) : (
                  <Message variant="danger">Not paid yet</Message>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-lg border border-sand-400 bg-sand-50 p-7">
            <h2 className="text-[19px] font-semibold">Summary</h2>

            <dl className="mt-6 space-y-3 text-[15px]">
              {[
                ["Items", order.itemsPrice],
                ["Shipping", order.shippingPrice],
                ["Tax", order.taxPrice],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <dt className="text-ink-soft">{label}</dt>
                  <dd className="tnum">{money(value)}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex items-baseline justify-between border-t border-sand-400 pt-5">
              <span className="text-[16px] font-semibold">Total</span>
              <span className="font-display text-[26px] font-semibold tnum">
                {money(order.totalPrice)}
              </span>
            </div>

            {!order.isPaid && (
              <div className="mt-7">
                {loadingPay || isPending ? (
                  <Loader label="Preparing payment" />
                ) : (
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  />
                )}
              </div>
            )}

            {loadingDeliver && <Loader label="Updating" />}

            {userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
              <button
                type="button"
                className="btn-secondary mt-6 w-full"
                onClick={deliverHandler}
              >
                Mark as delivered
              </button>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Order;

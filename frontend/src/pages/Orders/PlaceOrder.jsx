import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import { money } from "../../Utils/format";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err?.error || "Could not place order");
    }
  };

  const { shippingAddress: addr } = cart;

  return (
    <div className="u-container py-14">
      <ProgressSteps step1 step2 step3 />

      <div className="mt-14">
        <p className="u-label">Step three</p>
        <h1 className="mt-3 font-display text-[clamp(2rem,4.4vw,2.8rem)] font-semibold leading-tight">
          One last look
        </h1>
      </div>

      {cart.cartItems.length === 0 ? (
        <div className="mt-10 max-w-xl">
          <Message>Your bag is empty</Message>
          <Link to="/shop" className="btn-secondary mt-6">
            Browse the shop
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_23rem] lg:gap-16">
          <div>
            <ul className="divide-y divide-sand-400 border-y border-sand-400">
              {cart.cartItems.map((item, index) => (
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

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg border border-sand-400 bg-sand-50 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="u-label">Shipping to</h3>
                  <Link
                    to="/shipping"
                    className="text-[13px] text-clay-500 underline underline-offset-4"
                  >
                    Edit
                  </Link>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                  {addr.address}
                  <br />
                  {addr.city} {addr.postalCode}
                  <br />
                  {addr.country}
                </p>
              </div>

              <div className="rounded-lg border border-sand-400 bg-sand-50 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="u-label">Paying with</h3>
                  <Link
                    to="/shipping"
                    className="text-[13px] text-clay-500 underline underline-offset-4"
                  >
                    Edit
                  </Link>
                </div>
                <p className="mt-4 text-[15px] text-ink-soft">
                  {cart.paymentMethod}
                </p>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-lg border border-sand-400 bg-sand-50 p-7">
              <h2 className="text-[19px] font-semibold">Order total</h2>

              <dl className="mt-6 space-y-3 text-[15px]">
                {[
                  ["Items", cart.itemsPrice],
                  ["Shipping", cart.shippingPrice],
                  ["Tax", cart.taxPrice],
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
                  {money(cart.totalPrice)}
                </span>
              </div>

              {error && (
                <div className="mt-5">
                  <Message variant="danger">
                    {error?.data?.message || "Something went wrong"}
                  </Message>
                </div>
              )}

              <button
                type="button"
                className="btn-primary mt-7 w-full"
                disabled={cart.cartItems.length === 0 || isLoading}
                onClick={placeOrderHandler}
              >
                {isLoading ? "Placing order…" : "Place order"}
              </button>

              {isLoading && <Loader label="Sending it through" />}

              <p className="mt-5 text-[13px] leading-relaxed text-ink-faint">
                By placing this order you agree to our terms. Nothing is charged
                until payment is confirmed.
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;

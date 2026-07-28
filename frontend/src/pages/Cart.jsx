import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { money } from "../Utils/format";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  const itemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );
  const freeShippingAt = 75;
  const toFreeShipping = Math.max(0, freeShippingAt - subtotal);

  if (cartItems.length === 0) {
    return (
      <div className="u-container py-28 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-sand-400 bg-sand-50 text-ink-faint">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4.5 8h15l-1.1 11.2a2 2 0 0 1-2 1.8H7.6a2 2 0 0 1-2-1.8L4.5 8ZM9 8V6.5a3 3 0 0 1 6 0V8"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="mt-7 font-display text-[30px] font-semibold">
          Your bag is empty
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-ink-soft">
          Nothing in here yet. The shop is small — it won't take long to see it
          all.
        </p>
        <Link to="/shop" className="btn-primary mt-9">
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="u-container py-14">
      <div className="border-b border-sand-400 pb-8">
        <p className="u-label">Your bag</p>
        <h1 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.2rem)] font-semibold leading-tight">
          {itemCount} {itemCount === 1 ? "piece" : "pieces"}, ready when you are
        </h1>
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
        {/* line items */}
        <div>
          <ul className="divide-y divide-sand-400 border-y border-sand-400">
            {cartItems.map((item) => (
              <li key={item._id} className="flex gap-5 py-6">
                <Link
                  to={`/product/${item._id}`}
                  className="h-28 w-24 shrink-0 overflow-hidden rounded-md bg-sand-300"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      {item.brand && <p className="u-label">{item.brand}</p>}
                      <h3 className="mt-1.5 text-[17px] font-medium leading-snug">
                        <Link
                          to={`/product/${item._id}`}
                          className="transition-colors hover:text-clay-500"
                        >
                          {item.name}
                        </Link>
                      </h3>
                    </div>

                    <p className="shrink-0 text-[16px] font-semibold tnum">
                      {money(item.qty * item.price)}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <label
                        htmlFor={`qty-${item._id}`}
                        className="text-[13px] text-ink-faint"
                      >
                        Qty
                      </label>
                      <select
                        id={`qty-${item._id}`}
                        className="cursor-pointer rounded-md border border-sand-400 bg-sand-50 py-1.5 pl-3 pr-7 text-[14px] text-ink focus:border-clay-400 focus:outline-none focus:ring-2 focus:ring-clay-500/15"
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                      <span className="text-[13px] text-ink-faint tnum">
                        {money(item.price)} each
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCartHandler(item._id)}
                      className="text-[13px] text-ink-faint underline underline-offset-4 transition-colors hover:text-rust"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-2 text-[15px] text-ink-soft transition-colors hover:text-clay-500"
          >
            ← Keep looking
          </Link>
        </div>

        {/* summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-lg border border-sand-400 bg-sand-50 p-7">
            <h2 className="text-[19px] font-semibold">Summary</h2>

            <dl className="mt-6 space-y-3 text-[15px]">
              <div className="flex justify-between">
                <dt className="text-ink-soft">
                  Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                </dt>
                <dd className="tnum">{money(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Shipping</dt>
                <dd className="text-ink-faint">Calculated at checkout</dd>
              </div>
            </dl>

            <div className="mt-6 flex items-baseline justify-between border-t border-sand-400 pt-5">
              <span className="text-[16px] font-semibold">Total</span>
              <span className="font-display text-[26px] font-semibold tnum">
                {money(subtotal)}
              </span>
            </div>

            <button onClick={checkoutHandler} className="btn-primary mt-7 w-full">
              Continue to checkout
            </button>

            {toFreeShipping > 0 ? (
              <div className="mt-5">
                <p className="text-[13px] text-ink-soft">
                  {money(toFreeShipping)} more for complimentary shipping
                </p>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-sand-300">
                  <div
                    className="h-full rounded-full bg-clay-400 transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        100,
                        (subtotal / freeShippingAt) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            ) : (
              <p className="mt-5 flex items-center gap-2 text-[13px] text-sage-600">
                <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                Shipping is on us
              </p>
            )}

            <p className="mt-6 border-t border-sand-300 pt-5 text-[13px] leading-relaxed text-ink-faint">
              Everything ships wrapped in paper and packed in a reused box.
              Returns accepted within 30 days.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;

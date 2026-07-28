import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";
import { money } from "../../Utils/format";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const subtotal = cartItems.reduce((a, i) => a + i.qty * i.price, 0);

  return (
    <div className="u-container py-14">
      <ProgressSteps step1 step2 />

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
        <div>
          <p className="u-label">Step two</p>
          <h1 className="mt-3 font-display text-[clamp(2rem,4.4vw,2.8rem)] font-semibold leading-tight">
            Where should it go?
          </h1>

          <form onSubmit={submitHandler} className="mt-10 max-w-xl space-y-5">
            <div>
              <label className="field-label" htmlFor="address">
                Street address
              </label>
              <input
                id="address"
                type="text"
                className="field"
                placeholder="12 Rue des Artisans"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="field-label" htmlFor="city">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  className="field"
                  placeholder="Lyon"
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div>
                <label className="field-label" htmlFor="postal">
                  Postal code
                </label>
                <input
                  id="postal"
                  type="text"
                  className="field"
                  placeholder="69001"
                  value={postalCode}
                  required
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="field-label" htmlFor="country">
                Country
              </label>
              <input
                id="country"
                type="text"
                className="field"
                placeholder="France"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <fieldset className="pt-4">
              <legend className="field-label">Payment</legend>
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-md border px-4 py-4 transition-colors ${
                  paymentMethod === "PayPal"
                    ? "border-clay-400 bg-clay-50"
                    : "border-sand-400 bg-sand-50 hover:border-sand-500"
                }`}
              >
                <input
                  type="radio"
                  className="peer sr-only"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span
                  className={`grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full border ${
                    paymentMethod === "PayPal"
                      ? "border-clay-500"
                      : "border-sand-500"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      paymentMethod === "PayPal" ? "bg-clay-500" : "bg-transparent"
                    }`}
                  />
                </span>
                <span className="text-[15px]">
                  PayPal or credit card
                  <span className="mt-0.5 block text-[13px] text-ink-faint">
                    You'll confirm on the next screen
                  </span>
                </span>
              </label>
            </fieldset>

            <button type="submit" className="btn-primary mt-4 w-full sm:w-auto">
              Continue to review
            </button>
          </form>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-lg border border-sand-400 bg-sand-50 p-6">
            <h2 className="text-[17px] font-semibold">In your bag</h2>

            <ul className="mt-5 space-y-4">
              {cartItems.slice(0, 4).map((item) => (
                <li key={item._id} className="flex items-center gap-3">
                  <div className="h-14 w-12 shrink-0 overflow-hidden rounded bg-sand-300">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-medium">
                      {item.name}
                    </p>
                    <p className="text-[13px] text-ink-faint tnum">
                      {item.qty} × {money(item.price)}
                    </p>
                  </div>
                </li>
              ))}
              {cartItems.length > 4 && (
                <li className="text-[13px] text-ink-faint">
                  + {cartItems.length - 4} more
                </li>
              )}
            </ul>

            <div className="mt-6 flex items-baseline justify-between border-t border-sand-400 pt-5">
              <span className="text-[15px] text-ink-soft">Subtotal</span>
              <span className="text-[18px] font-semibold tnum">
                {money(subtotal)}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Shipping;

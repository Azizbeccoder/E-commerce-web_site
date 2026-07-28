import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [navigate, redirect, userInfo]);

  const mismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await register({ username, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("Welcome to Maison");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="grid min-h-[calc(100vh-108px)] lg:grid-cols-2">
      {/* photograph */}
      <div className="relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-12">
          <p className="max-w-sm font-display text-[26px] leading-snug text-sand-50">
            Twelve studios. A few hundred pieces a season. That's the whole shop.
          </p>
          <p className="mt-4 text-[13px] uppercase tracking-label text-sand-300">
            Since 2019
          </p>
        </div>
      </div>

      {/* form */}
      <div className="flex items-center justify-center px-6 py-16 sm:px-12">
        <div className="w-full max-w-sm animate-fade-up">
          <p className="u-label">Join us</p>
          <h1 className="mt-4 font-display text-[38px] font-semibold leading-tight">
            Create an account
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
            Faster checkout, saved pieces, and a note when a maker restocks.
          </p>

          <form onSubmit={submitHandler} className="mt-10 space-y-5">
            <div>
              <label className="field-label" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="field"
                placeholder="Your name"
                autoComplete="name"
                value={username}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="field-label" htmlFor="email">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="field"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="field-label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="field"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="field-label" htmlFor="confirmPassword">
                  Confirm
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className={`field ${
                    mismatch ? "border-rust focus:border-rust" : ""
                  }`}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            {mismatch && (
              <p className="text-[13px] text-rust">Passwords don't match yet</p>
            )}

            <button
              disabled={isLoading}
              type="submit"
              className="btn-primary w-full"
            >
              {isLoading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="mt-8 text-[15px] text-ink-soft">
            Already have one?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="link-underline font-medium text-clay-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

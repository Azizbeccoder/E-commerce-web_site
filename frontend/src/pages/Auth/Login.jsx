import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="grid min-h-[calc(100vh-108px)] lg:grid-cols-2">
      {/* form */}
      <div className="flex items-center justify-center px-6 py-16 sm:px-12">
        <div className="w-full max-w-sm animate-fade-up">
          <p className="u-label">Welcome back</p>
          <h1 className="mt-4 font-display text-[38px] font-semibold leading-tight">
            Sign in
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
            Your bag, saved pieces and order history are waiting.
          </p>

          <form onSubmit={submitHandler} className="mt-10 space-y-5">
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

            <div>
              <label className="field-label" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="field pr-16"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-semibold uppercase tracking-wider text-ink-faint transition-colors hover:text-clay-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="btn-primary w-full"
            >
              {isLoading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-8 text-[15px] text-ink-soft">
            New here?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              className="link-underline font-medium text-clay-500"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* photograph */}
      <div className="relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
        <blockquote className="absolute inset-x-0 bottom-0 p-12">
          <p className="max-w-sm font-display text-[26px] leading-snug text-sand-50">
            “We'd rather sell you one bowl you keep for twenty years.”
          </p>
          <footer className="mt-4 text-[13px] uppercase tracking-label text-sand-300">
            Elise, founder
          </footer>
        </blockquote>
      </div>
    </div>
  );
};

export default Login;

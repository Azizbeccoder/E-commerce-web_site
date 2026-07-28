import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await updateProfile({
        _id: userInfo._id,
        username,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      setPassword("");
      setConfirmPassword("");
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="u-container py-14">
      <div className="border-b border-sand-400 pb-8">
        <p className="u-label">Your account</p>
        <h1 className="mt-3 font-display text-[clamp(2rem,4.4vw,2.8rem)] font-semibold leading-tight">
          Hello, {userInfo.username}
        </h1>
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
        <form onSubmit={submitHandler} className="max-w-xl">
          <h2 className="text-[19px] font-semibold">Details</h2>
          <p className="mt-2 text-[14px] text-ink-soft">
            Leave the password fields empty to keep your current one.
          </p>

          <div className="mt-8 space-y-5">
            <div>
              <label className="field-label" htmlFor="p-name">
                Name
              </label>
              <input
                id="p-name"
                type="text"
                placeholder="Your name"
                className="field"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div>
              <label className="field-label" htmlFor="p-email">
                Email address
              </label>
              <input
                id="p-email"
                type="email"
                placeholder="you@example.com"
                className="field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="field-label" htmlFor="p-pass">
                  New password
                </label>
                <input
                  id="p-pass"
                  type="password"
                  placeholder="••••••••"
                  className="field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="field-label" htmlFor="p-confirm">
                  Confirm
                </label>
                <input
                  id="p-confirm"
                  type="password"
                  placeholder="••••••••"
                  className="field"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loadingUpdateProfile}
            className="btn-primary mt-8"
          >
            {loadingUpdateProfile ? "Saving…" : "Save changes"}
          </button>
        </form>

        <aside className="space-y-5">
          <div className="rounded-lg border border-sand-400 bg-sand-50 p-6">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-clay-500 text-[17px] font-bold text-sand-50">
                {userInfo.username?.[0]?.toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[16px] font-semibold">
                  {userInfo.username}
                </p>
                <p className="truncate text-[13px] text-ink-faint">
                  {userInfo.email}
                </p>
              </div>
            </div>

            {userInfo.isAdmin && (
              <span className="pill mt-5 bg-clay-50 text-clay-600">
                Store administrator
              </span>
            )}
          </div>

          <div className="rounded-lg border border-sand-400 bg-sand-50 p-6">
            <h3 className="u-label">Shortcuts</h3>
            <div className="mt-4 space-y-3">
              <Link
                to="/user-orders"
                className="block text-[15px] text-ink-soft transition-colors hover:text-clay-500"
              >
                Order history →
              </Link>
              <Link
                to="/favorite"
                className="block text-[15px] text-ink-soft transition-colors hover:text-clay-500"
              >
                Saved pieces →
              </Link>
              <Link
                to="/cart"
                className="block text-[15px] text-ink-soft transition-colors hover:text-clay-500"
              >
                Your bag →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Profile;

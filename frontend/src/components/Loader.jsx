const Loader = ({ label = "Loading", full = false }) => (
  <div
    role="status"
    aria-live="polite"
    className={`flex items-center justify-center gap-3 ${
      full ? "min-h-[50vh] w-full" : "py-6"
    }`}
  >
    <span className="relative block h-5 w-5">
      <span className="absolute inset-0 rounded-full border-2 border-sand-400" />
      <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-clay-500" />
    </span>
    <span className="text-[13px] tracking-wide text-ink-faint">{label}</span>
  </div>
);

export default Loader;

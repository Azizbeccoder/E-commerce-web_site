const VARIANTS = {
  success: {
    wrap: "border-sage/25 bg-sage-50 text-sage-600",
    dot: "bg-sage",
  },
  danger: {
    wrap: "border-rust/25 bg-rust-50 text-rust-600",
    dot: "bg-rust",
  },
  info: {
    wrap: "border-sand-400 bg-sand-50 text-ink-soft",
    dot: "bg-clay-400",
  },
};

const Message = ({ variant, children }) => {
  const key =
    variant === "success" || variant === "succcess"
      ? "success"
      : variant === "danger" || variant === "error"
      ? "danger"
      : "info";

  const v = VARIANTS[key];

  return (
    <div
      role={key === "danger" ? "alert" : "status"}
      className={`flex items-start gap-3 rounded-md border px-4 py-3.5 text-[14px] leading-relaxed ${v.wrap}`}
    >
      <span className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${v.dot}`} />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
};

export default Message;

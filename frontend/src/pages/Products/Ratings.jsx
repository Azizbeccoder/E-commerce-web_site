const Star = ({ fill = 0, size = 14 }) => {
  // fill: 0 = empty, 0.5 = half, 1 = full
  const id = `half-${Math.random().toString(36).slice(2, 9)}`;
  const path =
    "M8 1.6l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.4 4.2 13.4l.7-4.3-3.1-3 4.3-.6L8 1.6Z";

  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
      {fill === 0.5 && (
        <defs>
          <linearGradient id={id}>
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
      )}
      <path
        d={path}
        fill={fill === 1 ? "currentColor" : fill === 0.5 ? `url(#${id})` : "none"}
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const Ratings = ({ value = 0, text, size = 14 }) => {
  const v = Number(value) || 0;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5 text-clay-400">
        {[0, 1, 2, 3, 4].map((i) => {
          const diff = v - i;
          const fill = diff >= 1 ? 1 : diff >= 0.5 ? 0.5 : 0;
          return <Star key={i} fill={fill} size={size} />;
        })}
      </div>

      {text && (
        <span className="text-[13px] text-ink-faint tnum">{text}</span>
      )}
    </div>
  );
};

export default Ratings;

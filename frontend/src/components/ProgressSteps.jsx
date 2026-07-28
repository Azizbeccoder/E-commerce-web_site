const Check = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
    <path
      d="M2.5 7.5 5.5 10.5 11.5 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ProgressSteps = ({ step1, step2, step3 }) => {
  const steps = [
    { label: "Sign in", done: !!step1 },
    { label: "Shipping", done: !!step2 },
    { label: "Review", done: !!step3 },
  ];

  // The furthest completed step is the one we highlight as current.
  const currentIndex = steps.reduce((acc, s, i) => (s.done ? i : acc), 0);

  return (
    <ol className="mx-auto flex w-full max-w-xl items-center">
      {steps.map((step, i) => {
        const isCurrent = i === currentIndex;
        const isDone = step.done && i < currentIndex;

        return (
          <li
            key={step.label}
            className={`flex items-center ${i === steps.length - 1 ? "" : "flex-1"}`}
          >
            <div className="flex flex-col items-center gap-2">
              <span
                className={`grid h-8 w-8 place-items-center rounded-full border text-[12px] font-semibold transition-colors ${
                  isDone
                    ? "border-clay-500 bg-clay-500 text-sand-50"
                    : isCurrent
                    ? "border-clay-500 bg-sand-50 text-clay-500"
                    : "border-sand-500 bg-sand-50 text-ink-faint"
                }`}
              >
                {isDone ? <Check /> : i + 1}
              </span>
              <span
                className={`text-[12px] font-medium tracking-wide ${
                  isDone || isCurrent ? "text-ink" : "text-ink-faint"
                }`}
              >
                {step.label}
              </span>
            </div>

            {i < steps.length - 1 && (
              <span
                className={`mx-3 mb-6 h-px flex-1 transition-colors ${
                  steps[i + 1].done ? "bg-clay-500" : "bg-sand-400"
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
};

export default ProgressSteps;

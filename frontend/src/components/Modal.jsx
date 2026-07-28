import { useEffect } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 animate-fade-in bg-ink/45 backdrop-blur-[2px]"
      />

      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md animate-fade-up overflow-hidden rounded-xl border border-sand-400 bg-sand-50 shadow-lift"
      >
        <div className="flex items-center justify-between border-b border-sand-300 px-6 py-4">
          <h3 className="text-[18px] font-semibold">{title || "Edit"}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-8 w-8 place-items-center rounded-full text-ink-faint transition-colors hover:bg-sand-200 hover:text-ink"
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 3l10 10M13 3L3 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

export const money = (value) => {
  const n = Number(value);
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: n % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
};

export const truncate = (text = "", max = 90) =>
  text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;

export const Shimmer = ({ className = "" }) => (
  <span
    className={`block animate-pulse rounded bg-sand-300/80 ${className}`}
    aria-hidden="true"
  />
);

export const ProductCardSkeleton = () => (
  <div className="space-y-4">
    <Shimmer className="aspect-[4/5] w-full rounded-lg" />
    <div className="space-y-2">
      <Shimmer className="h-3 w-20" />
      <Shimmer className="h-4 w-3/4" />
      <Shimmer className="h-4 w-16" />
    </div>
  </div>
);

export const ProductGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export default Shimmer;

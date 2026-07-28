import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites) || [];
  const count = favorites.length;

  if (count === 0) return null;

  return (
    <span className="ml-2 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-clay-500 px-1 text-[10px] font-bold leading-none text-sand-50">
      {count}
    </span>
  );
};

export default FavoritesCount;

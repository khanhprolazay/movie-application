import { IconButton } from "@material-tailwind/react";
import { useAppSelector } from "@/redux/hooks";
import { useSlider } from "@/hooks/use-slider.hook";
import SkeletonCard from "@/components/SkeletonCard";
import MovieCard from "./MovieCard";

export function RecentlyMovie() {
  const { data, loading } = useAppSelector((state) => state.movie.day);
  const { current, handlePrev, handleNext, disablePrev, disableNext } =
    useSlider(data.length);

  return (
    <div className="relative grid h-auto grid-cols-1 items-end gap-8 lg:grid-cols-[1fr_5px]">
      <div className="no-scrollbar w-full max-w-full overflow-x-auto scroll-smooth md:overflow-hidden">
        <div
          className="flex gap-5 transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${current * (125 + 19.5)}px)` }}
        >
          {loading
            ? Array.from({ length: 10 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : data.map((item) => <MovieCard movie={item} key={item.id} />)}
        </div>
      </div>

      <div className="absolute -top-12 right-0 hidden md:flex">
        <IconButton
          variant="text"
          color="white"
          size="md"
          onClick={handlePrev}
          disabled={disablePrev}
          className="h-10 w-10 cursor-pointer rounded-full text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </IconButton>
        <IconButton
          variant="text"
          color="white"
          size="md"
          onClick={handleNext}
          disabled={disableNext}
          className="h-10 w-10 cursor-pointer rounded-full text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </IconButton>
      </div>
    </div>
  );
}

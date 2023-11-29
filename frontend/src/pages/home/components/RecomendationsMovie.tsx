import { IconButton } from "@material-tailwind/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import moviesActions from "@/actions/movie.action";
import { useSlider } from "@/hooks/use-slider.hook";
import SkeletonCard from "@/components/SkeletonCard";
import MovieCard from "./MovieCard";

export function RecomendationsMovie() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.movie.search);
  const { current, handlePrev, handleNext, disablePrev, disableNext } =
    useSlider(data.length);

  useEffect(() => {
    dispatch(moviesActions.getMovieByYear(2020, 0, 20));
  }, []);

  return (
    <div className="relative ml-12 grid h-auto grid-cols-1 items-end gap-8 lg:grid-cols-[1fr_5px]">
      <div className="w-full max-w-full overflow-hidden">
        <div
          className="flex gap-5 transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${current * (125 + 19.5)}px)` }}
        >
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : data.map((item) => <MovieCard movie={item} key={item.id} />)}
        </div>
      </div>

      <div className="absolute -top-12 right-0 flex">
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

    // <Carousel
    //     className="h-64 w-full content-center"
    //     navigation={({ setActiveIndex, activeIndex, length }) => (
    //         <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
    //             {new Array(length).fill("").map((_, i) => (
    //                 <span
    //                     key={i}
    //                     className={`hidden h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"}`}
    //                     onClick={() => setActiveIndex(i)}
    //                 />
    //             ))}
    //         </div>
    //     )}

    //     prevArrow={({ handlePrev }) => (
    //         <IconButton
    //             variant="text"
    //             color="white"
    //             size="md"
    //             onClick={handlePrev}
    //             className="!absolute top-2/4 left-4 -translate-y-2/4 -ml-3 border-none hover:text-cred "
    //         >
    //             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    //                 <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    //             </svg>

    //         </IconButton>
    //     )}
    //     nextArrow={({ handleNext }) => (
    //         <IconButton
    //             variant="text"
    //             color="white"
    //             size="md"
    //             onClick={handleNext}
    //             className="!absolute top-2/4 !right-4 -translate-y-2/4 -mr-3 border-none hover:text-cred"
    //         >
    //             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    //                 <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    //             </svg>

    //         </IconButton>
    //     )}
    //     loop
    // >
    //     <div className="flex space-x-5 mx-12">
    //         <PosterFilm image={imageFilm2} name="Strays" rating={8.4} year={2023} />
    //         <PosterFilm image={imageFilm2} name="Strays" rating={8.4} year={2023} />
    //         <PosterFilm image={imageFilm2} name="Strays" rating={8.4} year={2023} />
    //         <PosterFilm image={imageFilm2} name="Strays" rating={8.4} year={2023} />
    //         <PosterFilm image={imageFilm2} name="Strays" rating={8.4} year={2023} />
    //     </div>

    //     <div className="flex space-x-5 mx-12">
    //         <PosterFilm image={imageFilm1} name="Puan" rating={8.7} year={2023} />
    //         <PosterFilm image={imageFilm1} name="Puan" rating={8.7} year={2023} />
    //         <PosterFilm image={imageFilm1} name="Puan" rating={8.7} year={2023} />
    //         <PosterFilm image={imageFilm1} name="Puan" rating={8.7} year={2023} />
    //         <PosterFilm image={imageFilm1} name="Puan" rating={8.7} year={2023} />
    //     </div>

    //     <div className="flex space-x-5 mx-12">
    //         <PosterFilm image={imageFilm} name="Blue Beetle" rating={9.1} year={2023} />
    //         <PosterFilm image={imageFilm} name="Blue Beetle" rating={9.1} year={2023} />
    //         <PosterFilm image={imageFilm} name="Blue Beetle" rating={9.1} year={2023} />
    //         <PosterFilm image={imageFilm} name="Blue Beetle" rating={9.1} year={2023} />
    //         <PosterFilm image={imageFilm} name="Blue Beetle" rating={9.1} year={2023} />
    //     </div>

    // </Carousel >
  );
}

import SkeletonCard from "@/components/SkeletonCard";
import PosterFilmRow from "@/pages/home/components/PosterFilmRow";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import AppFallback from "@/components/AppFallback"
import moviesActions from "@/actions/movie.action";
import { useEffect } from "react";

export function ListPosterFilmRow() {

  const dispatch = useAppDispatch()

  // useEffect(() => {
  //   dispatch(moviesActions.getMovieByRandom(0, 5));
  // }, []);

  const MovieByYear = useAppSelector((state) => state.movie.rating.data);
  const loading = false;
  // const MovieByRandom = useAppSelector((state) => state.movie.random.data);

  // Kiểm tra nếu listRecentlyMovies là null hoặc rỗng
  // if (MovieByYear === null || MovieByYear.length === 0) {
  //   return (
  //     <AppFallback />
  //   );
  // }

  const dataMovie = MovieByYear.slice(0, 5);
  // console.log("dataMovie", dataMovie)

  return (
    <div className="mt-2 flex flex-col gap-2">
      {loading
        ? Array.from([1, 2, 3, 4, 5], (index) => (
          <SkeletonCard imageClassname="w-[82.22px] h-[110.22px]" bodyClassname="" key={index} direction="row" />
        ))
        : dataMovie.map((movie, index: number) => (
          <PosterFilmRow
            key={index}
            image={movie.imageUrl}
            name={movie.title}
            rating={movie.rating}
            date={movie.release}
            duration={movie.movieLength ? movie.movieLength : 120} // Kiểm tra và sử dụng một giá trị mặc định nếu movieLength là undefined
            genres="Biography, Psychology, Drama"
          // genres={movie.genres}
          />
        ))}
    </div>
  );
}

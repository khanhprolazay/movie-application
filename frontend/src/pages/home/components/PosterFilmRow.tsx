import { Movie } from "@/type";
import stringUtils from "@/utils/stringUtils";
import urlUtils from "@/utils/urlUtils";
import { FC } from "react";
import { Typography } from "@material-tailwind/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

interface PosterFilmmovie {
  movie: Movie;
}

const PosterFilmRow: FC<PosterFilmmovie> = ({ movie }) => {
  const navigate = useNavigate();
  console.log(movie)

  return (
    <div
      className="group relative flex h-28 w-auto cursor-pointer bg-cblack-300 object-cover transition duration-300 ease-in-out hover:opacity-50"
      onClick={() => navigate(urlUtils.getDetailUrl(movie.id))}
    >
      <LazyLoadImage
        src={urlUtils.getImageUrl(movie)}
        alt="image 1"
        width={84}
        height={112}
        wrapperClassName="flex-2 border"
      />
      <div className="grow font-manrope">
        <div className="ml-5 mt-3 line-clamp-1 pr-20">
          <Typography
            variant="h5"
            className="text-base font-normal text-gray-300"
          >
            {movie.title}
          </Typography>
        </div>
        {movie.rating !== null && (
          <div className="absolute right-7 top-0 mt-3 hidden w-12 items-center rounded-md border px-2 py-0.5 text-xs font-semibold text-slate-100 xl:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mr-1 h-3 w-3 text-coral"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.760-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            {stringUtils.formatRating(movie.rating)}
          </div>
        )}
        <Typography className="ml-5 mt-1 text-xs font-normal text-gray-400">
          Release Date:{" "}
          <span className="text-gray-400/70">{movie.release}</span>
        </Typography>
        <Typography className="ml-5 mt-1 text-xs font-normal text-slate-400">
          Duration:{" "}
          <span className="text-gray-400/70">{movie.movieLength} minutes</span>
        </Typography>
        <Typography className="ml-5 mt-1 text-xs font-normal text-slate-400">
          Genres:{" "}
          <span className="text-gray-400/70">
            {movie.genres?.map((genre) => genre.genre.name).join(',')}
          </span>
        </Typography>
      </div>
    </div>
  );
};

export default PosterFilmRow;

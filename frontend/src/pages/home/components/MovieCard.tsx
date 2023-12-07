import { Movie } from "@/type"
import stringUtils from "@/utils/stringUtils";
import urlUtils from "@/utils/urlUtils";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { FC } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

type Props = {
  movie: Movie;
}

const MovieCard: FC<Props> = ({movie}) => {
  const navigate = useNavigate();

  return (
    <Card
    className="rounded-lg bg-transparent"
    onClick={() => navigate(urlUtils.getDetailUrl(movie.id))}
  >
    <CardBody className="w-[125px] transform p-0 duration-300 ease-in-out hover:scale-95 hover:cursor-pointer disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
      <LazyLoadImage
        effect="blur"
        className="border-2 border-slate-700"
        wrapperClassName="h-[205px] w-full"
        src={urlUtils.getImageUrl(movie)}
      />
      {movie.rating !== null && (
        <div className="absolute right-1 top-1 flex cursor-pointer items-center rounded-lg bg-black px-2 py-0.5 text-sm text-white">
          {stringUtils.formatRating(movie.rating)}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="ml-0.5 h-4 w-4 text-yellow-500"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      <div className="mt-1 line-clamp-1">
        <Typography
          variant="h5"
          className="font-manrope text-sm font-extrabold capitalize text-slate-200"
        >
          {movie.title}
        </Typography>
      </div>
      <div className="line-clamp-1">
        <Typography className="font-manrope text-xs capitalize text-slate-300/70">
          {movie.release}
        </Typography>
      </div>
    </CardBody>
  </Card>
  )
}

export default MovieCard;
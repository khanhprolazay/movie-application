import { Typography } from "@material-tailwind/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

interface PosterFilmProps {
  image: string;
  name: string;
  rating: number;
  date: string;
  duration: number;
  genres: string;
}

const PosterFilmRow = (props: PosterFilmProps) => {
  const navigate = useNavigate();

  const handleDetail = () => {
    navigate("/detail");
  };

  const maxCharacters = 18; // Độ dài tối đa trước khi cắt

  // Hàm để kiểm tra và cắt `name` khi cần thiết
  const truncateText = (text: string) => {
    if (text.length > maxCharacters) {
      return text.slice(0, maxCharacters - 2) + "...";
    }
    return text;
  };

  const formattedRating = (item: number) => {
    return (Number.isInteger(item) ? `${item}.0` : item)
  }


  return (
    <div
      className="group relative flex h-28 w-auto bg-cblack-300 object-cover cursor-pointer transition duration-300 ease-in-out hover:opacity-50"
      onClick={handleDetail}
    >
      <LazyLoadImage src={props.image} alt="image 1" width={84} height={112} wrapperClassName="flex-2 border" />
      <div className="grow font-manrope">
        <Typography
          variant="h5"
          className="ml-5 mt-3 text-base font-normal text-gray-300"
        >
          {truncateText(props.name)}
        </Typography>
        {props.rating !== null && (
          <div className="hidden xl:flex absolute right-7 top-0 mt-3 w-12 items-center rounded-md border px-2 py-0.5 text-xs font-semibold text-slate-100">
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
            {formattedRating(props.rating)}
          </div>
        )}
        <Typography className="ml-5 mt-1 text-xs font-normal text-gray-400">
          Release Date: <span className="text-gray-400/70">{props.date}</span>
        </Typography>
        <Typography className="ml-5 mt-1 text-xs font-normal text-slate-400">
          Duration: <span className="text-gray-400/70">{props.duration} minutes</span>
        </Typography>
        <Typography className="ml-5 mt-1 text-xs font-normal text-slate-400">Genres: <span className="text-gray-400/70">{props.genres}</span></Typography>
      </div>
    </div>
  );
};

export default PosterFilmRow;

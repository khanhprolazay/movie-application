import {
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { ListPosterFilmRow } from "./ListPosterFilmRow";
import { LazyLoadImage } from "react-lazy-load-image-component";

const MovieAside = () => {
  return (
    <aside className="relative col-span-1 mb-4 hidden bg-transparent pl-4 lg:block">
      <Typography
        variant="h1"
        className="mb-3 mt-5 font-manrope text-lg font-semibold text-slate-300"
      >
        Release Year
      </Typography>
      <Menu>
        <MenuHandler>
          <IconButton
            variant="text"
            color="white"
            size="md"
            className="!absolute top-9 mx-28 -translate-y-2/4 border-none hover:text-cred "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                clipRule="evenodd"
              />
            </svg>
          </IconButton>
        </MenuHandler>
        <MenuList className="no-scrollbar grid max-h-[400px] grid-cols-3 gap-2 overflow-y-auto border-none bg-cblack-700 p-4">
          {Array.from({ length: 123 }, (_, i) => {
            const year = 2023 - i;
            return (
              <Link
                key={year}
                to={`/search?year=${year}&page=${1}`}
                className="flex h-8 w-28 cursor-pointer items-center justify-evenly rounded !bg-input font-manrope text-sm text-slate-400 transition-colors ease-in-out hover:!border-transparent hover:!bg-cred hover:!text-slate-200"
              >
                {year}
              </Link>
            );
          })}
        </MenuList>
      </Menu>
      <ul className="mb-10 grid grid-cols-3 gap-1">
        {Array.from({ length: 12 }, (_, i) => {
          const year = 2023 - i;
          return (
            <Link
              key={year}
              to={`/search?year=${year}&page=${1}`}
              className="flex h-8 w-full cursor-pointer items-center justify-evenly rounded bg-input font-manrope text-sm text-slate-400 transition-colors ease-in-out hover:bg-cred hover:text-slate-200"
            >
              {year}
            </Link>
          );
        })}
      </ul>

      <Link
        to="/movie/7255"
        className="relative h-auto w-auto transform object-cover duration-300 ease-in-out hover:cursor-pointer hover:opacity-50 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        <LazyLoadImage
          src="https://image.tmdb.org/t/p/w500/cHkhb5A4gQRK6zs6Pv7zorHs8Nk.jpg"
          alt="image 2"
          effect="blur"
          wrapperClassName="h-36 xl:h-44 w-full"
          className="rounded"
        />
        <Typography className="absolute bottom-6 left-3 font-manrope text-xl font-semibold text-slate-200 hover:cursor-pointer">
          Fast And Furios 7
        </Typography>
        <Typography className="absolute bottom-1 left-3 font-manrope text-sm font-semibold text-slate-300 hover:cursor-pointer">
          2015
        </Typography>
      </Link>

      <ListPosterFilmRow />
    </aside>
  );
};

export default MovieAside;

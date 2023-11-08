import AppContainer from "@/components/AppContainer";
import { FC, useEffect } from "react";
import {
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { BannerCarousel } from "./components/BannerCarousel";
import { PopularMovie } from "./components/PopularMovie";
import { RecentlyMovie } from "./components/RecentlyMovie";
import { RecomendationsMovie } from "./components/RecomendationsMovie";
import { ListPosterFilmRow } from "./components/ListPosterFilmRow";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";


const HomePage: FC = () => {

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleReleaseYear = (year: number) => {
    // console.log(year);
    navigate(`/search/${year}`);
    window.location.reload();
  };

  return (
    <AppContainer>
      {/* --------------------------------Body----------------------------------- */}
      <div className="grid grid-cols-3 bg-cblack-100">
        {/* Content  */}
        <div className="col-span-full lg:col-span-2 border-r border-r-divider px-4 pb-5">
          <Typography
            variant="h1"
            className="mb-3 mt-5 font-manrope text-xl font-extrabold text-slate-200"
          >
            Movies
          </Typography>
          <BannerCarousel />

          <hr className="mt-5 border-divider"></hr>

          <Typography
            variant="h1"
            className="mb-3 mt-5 font-manrope text-xl font-extrabold text-slate-200"
          >
            Popular
          </Typography>
          <PopularMovie />

          <hr className="mt-5 border-divider"></hr>

          <Typography
            variant="h1"
            className="mb-3 mt-5 font-manrope text-xl font-extrabold text-slate-200"
          >
            Recently Added
          </Typography>
          <RecentlyMovie />

          <hr className="mt-5 border-divider"></hr>

          <Typography
            variant="h1"
            className="mb-3 mt-5 font-manrope text-xl font-extrabold text-slate-200"
          >
            Recommend
          </Typography>
          <RecomendationsMovie />
        </div>

        {/* Sidebar */}
        <div className="relative col-span-1 bg-cblack-100 px-4 lg:block hidden">
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
            <MenuList className="no-scrollbar grid max-h-[200px] grid-cols-3 gap-1 overflow-y-auto bg-cblack-100">
              {Array.from({ length: 123 }, (_, i) => {
                const year = 2023 - i;
                return (
                  <MenuItem
                    key={year}
                    className="h-8 w-28 cursor-pointer rounded bg-cblack-600 py-1 text-center font-manrope text-sm text-slate-400 transition-colors ease-in-out hover:!bg-cred hover:!border-transparent hover:!text-slate-200"
                    onClick={() => handleReleaseYear(year)}
                  >
                    {year}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
          <ul className="grid grid-cols-3 gap-1 mb-10">
            {Array.from({ length: 12 }, (_, i) => {
              const year = 2023 - i;
              return (
                <li
                  key={year}
                  className="flex h-8 w-full cursor-pointer items-center justify-evenly rounded bg-cblack-600 font-manrope text-sm text-slate-400 transition-colors ease-in-out hover:bg-cred hover:text-slate-200"
                  onClick={() => handleReleaseYear(year)}
                >
                  {year}
                </li>
              );
            })}
          </ul>

          <a
            // href="https://phimmoiyyy.net/phim-le/qua-nhanh-qua-nguy-hiem-7"
            className="relative h-auto w-auto transform object-cover duration-300 ease-in-out hover:opacity-50 hover:cursor-pointer disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            <img
              src="https://image.tmdb.org/t/p/w500/cHkhb5A4gQRK6zs6Pv7zorHs8Nk.jpg"
              alt="image 2"
              className="h-44 w-full rounded"
            />
            <text className="absolute bottom-6 left-3 font-manrope text-xl font-semibold text-slate-200 hover:cursor-pointer">
              Quá Nhanh Quá Nguy Hiểm 7
            </text>
            <text className="absolute bottom-1 left-3 font-manrope text-sm font-semibold text-slate-300 hover:cursor-pointer">
              2015
            </text>
          </a>

          <ListPosterFilmRow />
        </div>
      </div>
    </AppContainer>
  );
};

export default HomePage;

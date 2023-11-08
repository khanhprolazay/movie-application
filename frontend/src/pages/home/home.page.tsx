import AppContainer from "@/components/AppContainer";
import { FC, useEffect } from "react";
import {
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { BannerCarousel } from "./components/BannerCarousel";
import { PopularMovie } from "./components/PopularMovie";
import { RecentlyMovie } from "./components/RecentlyMovie";
import { RecomendationsMovie } from "./components/RecomendationsMovie";
import { ListPosterFilmRow } from "./components/ListPosterFilmRow";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import MovieAside from "./components/MovieAside";


const HomePage: FC = () => {

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

        < MovieAside />
      </div>
    </AppContainer>
  );
};

export default HomePage;

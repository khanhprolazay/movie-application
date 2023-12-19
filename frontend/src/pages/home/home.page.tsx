import AppContainer from "@/components/AppContainer";
import { FC } from "react";
import { Typography } from "@material-tailwind/react";
import { BannerCarousel } from "./components/BannerCarousel";
import { PopularMovie } from "./components/PopularMovie";
import { RecentlyMovie } from "./components/RecentlyMovie";
import { UpcomingMovie } from "./components/UpcomingMovie";
import MovieAside from "./components/MovieAside";

const HomePage: FC = () => {
  // const { loading, data } = useAppSelector((state) => state.user);

  return (
    <AppContainer>
      {/* --------------------------------Body----------------------------------- */}
      <div className="grid grid-cols-3 bg-transparent">
        {/* Content  */}
        <div className="col-span-full border-r-divider pb-5 lg:col-span-2 lg:border-r lg:pr-4">
          <div className="hidden xs:block">
            <Typography
              variant="h1"
              className="mb-3 mt-5 font-manrope text-xl font-extrabold text-slate-200"
            >
              Movies
            </Typography>
            <BannerCarousel />
            <hr className="mt-5 border-divider" />
          </div>

          <Typography
            variant="h1"
            className="mb-3 mt-5 font-manrope text-xl font-extrabold text-slate-200"
          >
            Popular
          </Typography>
          <PopularMovie />

          <hr className="mt-5 border-divider" />

          {/* Check LogIn để Recommend */}
          {/* {loading && <Spinner color="red" className="h-10 w-10" />}
          {!loading && data !== null && (
            <>
              <Typography
                variant="h1"
                className="mb-3 mt-5 font-manrope text-xl font-extrabold text-slate-200"
              >
                Recommend
              </Typography>
              <RecomendationsMovie />
              <hr className="mt-5 border-divider"/>
            </>
          )} */}

          <Typography
            variant="h1"
            className="mb-3 mt-5 font-manrope text-xl font-extrabold text-slate-200"
          >
            Recently Added
          </Typography>
          <RecentlyMovie />

          <hr className="mt-5 border-divider" />

          <Typography
            variant="h1"
            className="mb-3 mt-5 font-manrope text-xl font-extrabold text-slate-200"
          >
            Coming Soon
          </Typography>
          <UpcomingMovie />
        </div>

        {/* Sidebar  */}
        <MovieAside />
      </div>
    </AppContainer>
  );
};

export default HomePage;

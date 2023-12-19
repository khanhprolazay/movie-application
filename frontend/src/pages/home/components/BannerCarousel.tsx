import { useAppSelector } from "@/redux/hooks";
import urlUtils from "@/utils/url.util";
import { Carousel, IconButton, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const CarouselItem = (props: {
  id: number;
  title: string;
  image: string;
  year: number;
}) => {
  return (
    <Link
      to={urlUtils.getDetailUrl(props.id)}
      style={{ backgroundImage: `url('${props.image}')` }}
      className={`relative h-32 w-1/2 transform rounded-lg bg-black bg-opacity-60 bg-cover  duration-300 ease-in-out hover:cursor-pointer hover:opacity-50 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none sm:h-40 xl:h-48`}
    >
      {/* <img src={props.image} alt="image 1" className="h-full w-full rounded" /> */}
      <div className="absolute bottom-0 h-auto w-full bg-gradient-to-b from-transparent to-black px-2 pt-4 pb-2">
        <Typography
          variant="h3"
          className="font-manrope text-xs sm:text-sm font-medium text-white hover:cursor-pointer md:text-base"
        >
          {props.title}
        </Typography>
        <Typography
          variant="h3"
          className="font-manrope text-xs font-normal text-white hover:cursor-pointer md:text-sm"
        >
          {props.year}
        </Typography>
      </div>
    </Link>
  );
};

export function BannerCarousel() {
  const { data, loading } = useAppSelector(
    (state) => state.movie.randomBackdrop,
  );
  return (
    <Carousel
      // loop
      // autoplay
      // autoplayDelay={6000}
      className="h-36 w-full rounded sm:h-44 xl:h-52"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-0 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="white"
          size="md"
          onClick={handlePrev}
          className="!absolute left-4 top-2/4 ml-1 hidden -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12Typography8"
            />
          </svg>
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="white"
          size="md"
          onClick={handleNext}
          className="!absolute !right-4 top-2/4 mr-1 hidden -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </IconButton>
      )}
    >
      {loading ? (
        <div className="mx-auto flex h-full space-x-5">
          <div className="h-full w-1/2 animate-pulse rounded bg-gray-300">
            <div className="h-full w-full"></div>
          </div>
          <div className="h-full w-1/2 animate-pulse rounded bg-gray-300">
            <div className="h-full w-full"></div>
          </div>
        </div>
      ) : (
        data.map(
          (movie, index) =>
            index % 2 === 1 && (
              <div
                key={`banner-${index}`}
                className="mx-auto flex space-x-3 lg:space-x-5"
              >
                <CarouselItem
                  id={movie.id}
                  title={movie.title}
                  year={new Date(movie.release).getFullYear()}
                  image={`https://image.tmdb.org/t/p/w500${movie.backdropPath}`}
                />
                <CarouselItem
                  id={data[index - 1].id}
                  title={data[index - 1].title}
                  year={new Date(data[index - 1].release).getFullYear()}
                  image={`https://image.tmdb.org/t/p/w500${
                    data[index - 1].backdropPath
                  }`}
                />
              </div>
            ),
        )
      )}
    </Carousel>
  );
}

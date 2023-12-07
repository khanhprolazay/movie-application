import { useAppSelector } from "@/redux/hooks";
import urlUtils from "@/utils/urlUtils";
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
      className="relative h-28 w-1/2 transform object-cover duration-300 ease-in-out hover:cursor-pointer hover:opacity-50 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none sm:h-36 md:h-44"
    >
      <img
        src={props.image}
        alt="image 1"
        className="h-28 w-full rounded sm:h-36 md:h-44"
      />
      <Typography
        variant="h3"
        className="absolute bottom-6 left-3 font-manrope text-xs font-semibold text-white hover:cursor-pointer sm:text-sm md:text-base lg:text-xl"
      >
        {props.title}
      </Typography>
      <Typography
        variant="h3"
        className="absolute bottom-1 left-3 font-manrope text-xs font-medium text-white hover:cursor-pointer md:text-sm lg:text-base"
      >
        {props.year}
      </Typography>
    </Link>
  );
};

export function BannerCarousel() {
  const { data, loading } = useAppSelector(
    (state) => state.movie.randomBackdrop,
  );
  return (
    <Carousel
      className="h-32 w-full content-center rounded sm:h-44 md:h-48"
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
      loop
      autoplay
      autoplayDelay={6000}
    >
      {loading ? (
        <div className="mx-auto flex h-full w-[95%] space-x-5">
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
                className="mx-auto flex w-[95%] space-x-5"
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
                  image={`https://image.tmdb.org/t/p/w500${data[index - 1].backdropPath}`}
                />
              </div>
            ),
        )
      )}
      {/* <div className="mx-auto flex w-[95%] space-x-5">
        <CarouselItem
          id={91332}
          image="https://image.tmdb.org/t/p/w500/69d8whnfJJnuxocrSLSdnqE38zV.jpg"
          title="A Haunting In Venice"
          year={2023}
        />
        <CarouselItem
          id={90867}
          image="https://i.ytimg.com/vi/5JdiuqgVuiU/maxresdefault.jpg"
          title="Oppenheimer"
          year={2023}
        />
      </div>

      <div className="mx-auto flex w-[95%] space-x-5">
        <CarouselItem
          id={109544}
          image="https://image.tmdb.org/t/p/w500/oXn36crGvHQMTg33o417FVhrtYK.jpg"
          title="Sharktopus"
          year={2023}
        />
        <CarouselItem
          id={4801}
          image="https://image.tmdb.org/t/p/w500/qgSlGJurPzgSHKYlqBiDmr3vjrc.jpg"
          title="The Thing"
          year={2011}
        />
      </div>

      <div className="mx-auto flex w-[95%] space-x-5">
        <CarouselItem
          id={90976}
          image="https://maxblizz.com/wp-content/uploads/2023/05/Guardians-of-the-Galaxy-Vol.-3.png"
          title="Guardians of the Galaxy Vol. 3"
          year={2023}
        />
        <CarouselItem
          id={91398}
          image="https://image.tmdb.org/t/p/w500/vcNXzOfACCXZA7vb8SNde0LUC9o.jpg"
          title="Power Rangers: Once and always"
          year={2023}
        />
      </div>

      <div className="mx-auto flex w-[95%] space-x-5">
        <CarouselItem
          id={109545}
          image="https://image.tmdb.org/t/p/w500/eF6pkcpzxDCaQnJhaRlKdhhQebB.jpg"
          title="Sister Deadth"
          year={2023}
        />
        <CarouselItem
          id={73953}
          image="https://image.tmdb.org/t/p/w500/azD31DjpV3PJfjF3h72LVw2WCSD.jpg"
          title="The Exorcist: Believer"
          year={2023}
        />
      </div> */}
    </Carousel>
  );
}

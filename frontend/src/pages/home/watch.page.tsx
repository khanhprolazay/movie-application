import { FC } from "react";
import AppContainer from "@/components/AppContainer";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { PlusIcon } from "@heroicons/react/24/outline";
import imdb from "@/assets/images/imdb-logo.svg";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useMovie } from "@/hooks/use-movie.hook";
import { useSlider } from "@/hooks/use-slider.hook";
import { LazyLoadImage } from "react-lazy-load-image-component";
import urlUtils from "@/utils/urlUtils";
import timeUtils from "@/utils/timeUtils";
import SkeletonCard from "@/components/SkeletonCard";
import { useNavigate } from "react-router-dom";

const WatchPage: FC = () => {
  const navigate = useNavigate();
  const { loading, data, related, relatedLoading } = useMovie();
  const { current, handlePrev, handleNext } = useSlider(related.length);

  return (
    data &&
    !loading && (
      <>
        <AppContainer
          className="z-0 flex h-full items-center"
          containerProps={{
            className: "sticky h-[calc(100vh-60px)] right-0 left-0 top-[60px]",
          }}
        >
          <div className="h-[424px] w-full bg-[url('@/assets/images/loading.gif')] bg-center bg-no-repeat sm:h-[548px] md:h-[596px] lg:h-[636px]">
            <iframe
              allowFullScreen
              className="z-0 h-full w-full rounded-lg"
              src={`https://www.2embed.cc/embed/${data.imdbId}`}
            />
          </div>
        </AppContainer>
        <div className="relative z-10 w-full bg-[url('@/assets/images/pricing_bg.jpg')]">
          <AppContainer className="py-[100px]">
            <section className="grid grid-cols-1 border-b border-b-divider lg:grid-cols-[1fr_auto]">
              <div className=" mb-6 border-r-0 border-r-divider lg:mb-4 lg:border-r lg:pl-4 xl:mb-6 xl:pr-8">
                <Typography
                  variant="h1"
                  className="mb-6 font-manrope text-slate-200"
                >
                  {data.title}
                </Typography>
                <div className="mb-8 flex flex-wrap items-center gap-y-2">
                  {data.rating && (
                    <>
                      <div className="mr-3 flex h-10 w-10">
                        <CircularProgressbar
                          value={data.rating * 10}
                          text={`${data.rating}`}
                          styles={{
                            text: {
                              fill: "#fff",
                              fontSize: "30px",
                              fontWeight: "700",
                            },
                            path: {
                              stroke: "#4ade80",
                              strokeLinecap: "butt",
                            },
                            trail: {
                              stroke: "#fff",
                              strokeLinecap: "butt",
                            },
                          }}
                        />
                      </div>
                      <img src={imdb} alt="imdb" className="mr-2 flex h-5" />
                      <Typography className="mr-7 inline-flex text-lg font-thin text-slate-200">
                        Score
                      </Typography>
                    </>
                  )}

                  <div className="flex">
                    {data.release && (
                      <Typography
                        variant="h4"
                        className="mr-7 text-lg font-bold text-slate-200"
                      >
                        {data.release}
                      </Typography>
                    )}

                    {data.movieLength && (
                      <Typography className="mr-7 text-lg font-thin text-slate-200">
                        {timeUtils.formatMovieDuration(data.movieLength)}
                      </Typography>
                    )}
                  </div>

                  <div className="flex">
                    <div className="mr-7 flex h-[24px] items-center rounded-sm bg-slate-100 px-2">
                      <Typography className="text-xs font-medium text-slate-900">
                        CC
                      </Typography>
                    </div>
                    <div className="line-clamp-1">
                      <Typography className="font-manrope font-medium text-cred">
                        {data.genres.reduce(
                          (acc, genre, index) =>
                            index > 0
                              ? `${acc}, ${genre.genre.name}`
                              : genre.genre.name,
                          "",
                        )}
                      </Typography>
                    </div>
                  </div>
                </div>

                <Typography className="mb-6 font-manrope text-slate-400">
                  {data.description ||
                    data.plot ||
                    "No description about this movie"}
                </Typography>

                {data.casts.length >= 1 && (
                  <div className="mb-2 line-clamp-2 font-manrope">
                    <Typography
                      variant="h5"
                      className="inline-flex w-24 justify-between text-lg font-normal tracking-wide text-slate-200"
                    >
                      Director
                      <span className="text-slate-400">:&nbsp;&nbsp;</span>
                    </Typography>
                    <Typography className="inline text-slate-400">
                      {data.casts[0].actor.name}
                    </Typography>
                  </div>
                )}

                {data.casts.length >= 2 && (
                  <div className="mb-2 line-clamp-2 font-manrope">
                    <Typography
                      variant="h5"
                      className="inline-flex w-24 justify-between text-lg font-normal tracking-wide text-slate-200"
                    >
                      Casting
                      <span className="text-slate-400">:&nbsp;&nbsp;</span>
                    </Typography>
                    <Typography className="inline text-slate-400">
                      {data.casts
                        .slice(1, 5)
                        .reduce(
                          (acc, cast, index) =>
                            index > 0
                              ? `${acc}, ${cast.actor.name}`
                              : cast.actor.name,
                          "",
                        )}
                    </Typography>
                  </div>
                )}
              </div>
              <div className="pb-6 lg:pb-4 lg:pl-4 xl:pb-8 xl:pl-8">
                <LazyLoadImage
                  effect="blur"
                  src={urlUtils.getImageUrl(data, "DESC")}
                  alt="film"
                  wrapperClassName="h-[612px] w-full md:h-[696px] lg:h-[440px] lg:w-[272px] xl:w-[285px]"
                />
              </div>
            </section>

            <Button
              variant="outlined"
              className="mt-6 flex items-center gap-4 rounded-full bg-cred px-5 py-5 font-manrope text-base font-bold text-slate-200"
            >
              <PlusIcon className="h-5 w-5" />
              ADD YOUR LIST
            </Button>
          </AppContainer>
        </div>
        <section className="relative z-10 w-full bg-[url('@/assets/images/services_bg.jpg')] bg-contain py-[100px] lg:py-[150px] lg:pt-[100px]">
          <AppContainer>
            <div className="grid h-auto grid-cols-1 items-end gap-8 lg:grid-cols-[1fr_275px]">
              <div className="w-full max-w-full overflow-hidden">
                <div
                  className="flex gap-4 transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(-${current * (165 + 16)}px)`,
                  }}
                >
                  {relatedLoading
                    ? Array.from<number>({ length: 7 }).map((index) => (
                        <SkeletonCard
                          bodyClassname="!w-auto"
                          imageClassname="!w-[165px] !h-[251px]"
                          key={index}
                        />
                      ))
                    : related.map((movie, index) => (
                        <Card
                          key={`like-${index}`}
                          onClick={() => navigate(urlUtils.getDetailUrl(movie.id))}
                          className='rounded-none bg-transparent cursor-pointer'
                        >
                          <CardBody className="w-[165px] p-0">
                            <LazyLoadImage
                              wrapperClassName="h-[251px] w-full"
                              src={urlUtils.getImageUrl(movie)}
                            />
                            <div className="mt-1 line-clamp-1">
                              <Typography className="font-manrope text-xs capitalize text-slate-300/70">
                                {movie.genres
                                  .map((genre) => genre.genre.name)
                                  .join(", ")}
                              </Typography>
                            </div>
                            <div className="line-clamp-1">
                              <Typography
                                variant="h5"
                                className="font-manrope text-sm font-extrabold capitalize text-slate-200"
                              >
                                {movie.title}
                              </Typography>
                            </div>
                          </CardBody>
                        </Card>
                      ))}
                </div>
              </div>
              <div className="order-first before:mb-6 before:block before:h-[1px] before:w-[48px] before:bg-divider after:mt-6 after:block after:h-[1px] after:w-full after:bg-divider lg:order-last">
                <Typography
                  variant="h2"
                  className="mb-4 inline-block font-roboto text-4xl capitalize leading-10 tracking-wide text-slate-200"
                >
                  Also like <br /> this <span className="text-cred">movie</span>
                </Typography>
                <div className="flex gap-4">
                  <ChevronLeftIcon
                    onClick={handlePrev}
                    className="h-10 w-10 cursor-pointer rounded-full border-2 border-slate-600 text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-400"
                  />
                  <ChevronRightIcon
                    onClick={handleNext}
                    className="h-10 w-10 cursor-pointer rounded-full border-2 border-slate-600 text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-400"
                  />
                </div>
              </div>
            </div>
          </AppContainer>
        </section>
      </>
    )
  );
};

export default WatchPage;

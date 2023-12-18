import { useState } from "react";
import AppContainer from "@/components/AppContainer";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import urlUtils from "@/utils/url.util";
import PosterFilmResult from "./components/PosterFilmResult";
import { useMovie } from "@/hooks/use-movie.hook";
import TabContent, { TabType, TabValues } from "./components/Tab";
import SkeletonCard from "@/components/SkeletonCard";
import AppFallback from "@/components/AppFallback";
import { useSlider } from "@/hooks/use-slider.hook";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const MoviePage = () => {
  const { loading, data, related, relatedLoading } = useMovie();
  const [activeTab, setActiveTab] = useState<TabValues>("video");
  const { current, handlePrev, handleNext } = useSlider(related.length);

  const tabs: TabType[] = [
    {
      label: "Videos",
      value: "video",
      videos: data?.videos,
    },
    {
      label: "Casts",
      value: "cast",
      casts: data?.casts ? data.casts.slice(1, 16) : [],
    },
    {
      label: "Description",
      value: "description",
      desc: data?.description,
    },
  ];

  return (
    data && (
      <AppContainer className="z-10 pt-8">
        <div className="relative grid min-h-[735.5px] w-full gap-4 sm:grid-cols-1 md:grid-cols-[294px_1fr]">
          {loading ? (
            <AppFallback />
          ) : (
            <>
              <Card className="w-auto bg-form">
                <CardHeader floated={false} className="rounded-md">
                  <img
                    src={urlUtils.getImageUrl(data)}
                    alt="movie-picture"
                    className="h-96 w-full"
                  />
                </CardHeader>
                <CardBody className="p-4 font-manrope">
                  {data.directors.length !== 0 && (
                    <>
                      <Typography
                        variant="h5"
                        className="text-base font-bold text-slate-200/90"
                      >
                        Director
                      </Typography>
                      <Typography className="mb-2 text-[13.6px] text-slate-400">
                        {data.directors[0].actor.name}
                      </Typography>
                    </>
                  )}

                  <Typography
                    variant="h5"
                    className="text-base font-bold text-slate-200/90"
                  >
                    Release Date
                  </Typography>
                  <Typography className="mb-2 text-[13.6px] text-slate-400">
                    {data.release}
                  </Typography>

                  <Typography
                    variant="h5"
                    className="text-base font-bold text-slate-200/90"
                  >
                    Genres
                  </Typography>
                  <Typography className="mb-2 text-[13.6px] text-slate-400">
                    {data.genres.map((genre) => genre.genre.name).join(", ")}
                  </Typography>

                  {data.plot && (
                    <div>
                      <Typography
                        variant="h5"
                        className="text-base font-bold text-slate-200/90"
                      >
                        Plot
                      </Typography>
                      <div className="line-clamp-5">
                        <Typography className=" text-[13.6px] text-slate-400">
                          {data.plot}
                        </Typography>
                      </div>
                    </div>
                  )}
                </CardBody>
              </Card>

              <div className="grid w-full grid-rows-[auto_1fr] gap-4">
                <Card className="bg-form">
                  <CardBody className="flex items-center justify-between p-4 font-manrope">
                    <div>
                      <Typography
                        variant="h2"
                        className="text-[28px] font-bold text-slate-200/90"
                      >
                        {data.title}
                      </Typography>
                    </div>

                    <Link to={urlUtils.getWatchUrl(data.id)}>
                      <Button className="rounded bg-cred px-3 py-[6px] text-base font-medium capitalize hover:border-cred/80 hover:bg-cred/80">
                        Watch
                      </Button>
                    </Link>
                  </CardBody>
                </Card>
                <Tabs
                  value={activeTab}
                  className="flex h-full flex-col rounded-xl bg-form"
                >
                  <TabsHeader
                    className="rounded-none border-b border-divider bg-form bg-opacity-100 px-4"
                    indicatorProps={{
                      className:
                        "bg-transparent border-b-2 border-sky-400 shadow-none rounded-none",
                    }}
                  >
                    {tabs.map(({ label, value }) => (
                      <Tab
                        key={`tab-${value}`}
                        value={value}
                        onClick={() => setActiveTab(value)}
                        className={`${
                          activeTab === value
                            ? "text-sky-400"
                            : "text-slate-100"
                        } mr-6 w-auto px-0 py-2 text-sm`}
                      >
                        {label}
                      </Tab>
                    ))}
                  </TabsHeader>
                  <TabsBody className="h-full min-h-[336px]">
                    {tabs.map((tab) => (
                      <TabPanel
                        key={tab.value}
                        value={tab.value}
                        className="h-full rounded-b-xl"
                      >
                        <TabContent tab={tab} />
                      </TabPanel>
                    ))}
                  </TabsBody>
                </Tabs>
              </div>
            </>
          )}
        </div>

        {(related.length || relatedLoading) && (
          <>
            <div className="mb-3 mt-12 flex items-center justify-between">
              <Typography className="font-manrope text-3xl font-bold text-slate-200">
                More like this
              </Typography>
              <div className="flex items-end gap-4">
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
            <hr className="full-width-underline mb-5 mt-4" />
          </>
        )}

        <div className="w-full max-w-full overflow-hidden">
          <div
            className="mb-10 flex gap-4 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${current * (204.4 + 16)}px)`,
            }}
          >
            {relatedLoading
              ? Array.from<number>({ length: 7 }).map((_, index) => (
                  <SkeletonCard
                    bodyClassname="!w-auto"
                    imageClassname="!w-[204px] !h-[318px]"
                    key={`skeleton-${index}`}
                  />
                ))
              : related.map((movie) => (
                  <PosterFilmResult key={movie.id} movie={movie} />
                ))}
          </div>
        </div>
      </AppContainer>
    )
  );
};

export default MoviePage;

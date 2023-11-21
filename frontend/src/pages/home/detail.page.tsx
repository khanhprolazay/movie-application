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
import urlUtils from "@/utils/urlUtils";
import PosterFilmResult from "./components/PosterFilmResult";
import { useMovie } from "@/hooks/use-movie.hook";
import TabContent, { TabType, TabValues } from "./components/Tab";
import SkeletonCard from "@/components/SkeletonCard";

const DetailPage = () => {
  const { loading, data, related, relatedLoading } = useMovie();
  const [activeTab, setActiveTab] = useState<TabValues>("trailer");

  const tabs: TabType[] = [
    {
      label: "Trailer",
      value: "trailer",
      trailers: data?.trailers,
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
        <div className="grid h-[675px] w-full grid-cols-[294px_1fr] gap-4">
          {!loading && (
            <>
              <Card className="w-auto bg-cblack-600">
                <CardHeader floated={false} className="rounded-md">
                  <img
                    src={urlUtils.getImageUrl(data, "DESC")}
                    alt="movie-picture"
                    className="h-96 w-full"
                  />
                </CardHeader>
                <CardBody className="p-4 font-manrope">
                  {data.casts !== undefined && data.casts.length !== 0 && (
                    <>
                      <Typography
                        variant="h5"
                        className="text-base font-bold text-slate-200/90"
                      >
                        Director
                      </Typography>
                      <Typography className="mb-2 text-[13.6px] text-slate-400">
                        {data.casts[0].actor.name}
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
                <Card className="bg-cblack-600">
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
                  className="flex h-full flex-col rounded-xl bg-cblack-600"
                >
                  <TabsHeader
                    className="rounded-none border-b border-divider bg-cblack-600 bg-opacity-100 px-4"
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
                  <TabsBody className="h-full">
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

        <Typography className="mb-3 mt-12 font-manrope text-3xl font-bold text-slate-200">
          More like this
        </Typography>
        <hr className="full-width-underline mb-5 mt-4" />

        <div className="no-scrollbar mx-5 mb-10 flex gap-4 overflow-x-scroll">
          {relatedLoading
            ? Array.from<number>({ length: 7 }).map((index) => (
                <SkeletonCard
                  bodyClassname="!w-auto"
                  imageClassname="!w-[204px] !h-[318px]"
                  key={index}
                />
              ))
            : related.map((movie, index: number) => (
                <PosterFilmResult
                  key={index}
                  movie={movie}
                />
              ))}
        </div>
      </AppContainer>
    )
  );
};

export default DetailPage;

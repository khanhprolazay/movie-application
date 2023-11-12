import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import AppContainer from "@/components/AppContainer";
import {
  Avatar,
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
import { Link, useParams } from "react-router-dom";
import { Cast, Trailer } from "@/type";
import strintUtils from "@/utils/stringUtils";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import urlUtils from "@/utils/urlUtils";
import moviesActions from "@/actions/movie.action";
import PosterFilmResult from "./components/PosterFilmResult";
import { useMovie } from "@/hooks/use-movie.hook";

const defaultAvatar =
  "https://media.istockphoto.com/id/1300845620/vi/vec-to/bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-ng%C6%B0%E1%BB%9Di-d%C3%B9ng-ph%E1%BA%B3ng-b%E1%BB%8B-c%C3%B4-l%E1%BA%ADp-tr%C3%AAn-n%E1%BB%81n-tr%E1%BA%AFng-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-ng%C6%B0%E1%BB%9Di-d%C3%B9ng-minh-h%E1%BB%8Da-vector.jpg?s=612x612&w=0&k=20&c=MyAgwZm-Ct_rQpQGYh0Wb0N7KeAaFsY_WrZJ89EAiIw=";

type TabValues = "description" | "cast" | "trailer";

type Tab = {
  label: string;
  value: TabValues;
  desc?: string;
  casts?: Cast[];
  trailers?: Trailer[];
};

const TabContent: FC<{ tab: Tab }> = ({ tab }) => {
  const { value, desc, casts, trailers } = tab;

  switch (value) {
    case "description":
      return (
        <>
          {desc &&
            desc.split("\n").map((content, index) => (
              <Typography
                key={`desc-${index}`}
                className={`${
                  index && "mt-4"
                } inline-block font-manrope text-sm text-slate-400`}
              >
                {content}
              </Typography>
            ))}
        </>
      );

    case "cast":
      return (
        <div className="flex flex-wrap gap-x-12 gap-y-6">
          {casts &&
            casts.map((cast) => (
              <div
                key={cast.actor.id}
                className="flex min-w-[200px] max-w-[200px] items-center gap-3"
              >
                <LazyLoadComponent>
                  <Avatar
                    src={cast.actor.imageUrl || defaultAvatar}
                    className="min-w-[48px]"
                  />
                </LazyLoadComponent>
                <div className="font-manrope">
                  <div className="line-clamp-1">
                    <Typography
                      variant="h6"
                      className="text-sm font-medium text-slate-400"
                    >
                      {cast.actor.name}
                    </Typography>
                  </div>
                  <Typography className="text-xs font-normal text-slate-400/70">
                    {cast.role}
                  </Typography>
                </div>
              </div>
            ))}
        </div>
      );

    case "trailer":
      return (
        trailers &&
        trailers?.length > 0 && (
          <iframe
            loading="lazy"
            allowFullScreen
            className="h-full w-full rounded-lg"
            src={`http://www.imdb.com/video/imdb/${trailers[0].imdbId}/imdb/embed?autoplay=false`}
          />
        )
      );

    default:
      return <></>;
  }
};

const DetailPage = () => {
  const { loading, data, related } = useMovie();
  const [activeTab, setActiveTab] = useState<TabValues>("trailer");

  const casts = data?.casts.slice(1, 16);

  const tabs: Tab[] = [
    {
      label: "Trailer",
      value: "trailer",
      trailers: data?.trailers,
    },
    {
      label: "Casts",
      value: "cast",
      casts: casts,
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
                  {data.casts.length > 0 && (
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
          {related.map((movie, index: number) => (
            <PosterFilmResult key={index} movie={movie} />
          ))}
        </div>
      </AppContainer>
    )
  );
};

export default DetailPage;

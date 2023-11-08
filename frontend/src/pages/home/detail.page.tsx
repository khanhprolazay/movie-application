import { FC, useEffect, useState } from "react";
import { ListMovieResult } from "@/pages/home/components/ListMovieResult";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import detailsActions from "@/actions/detail.action";
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
import { useParams } from "react-router-dom";
import AppFallback from "@/components/AppFallback";
import { Trailer } from "@/type";
import { cParseInt } from "@/utils/stringUtils";

const defaultAvatar =
  "https://media.istockphoto.com/id/1300845620/vi/vec-to/bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-ng%C6%B0%E1%BB%9Di-d%C3%B9ng-ph%E1%BA%B3ng-b%E1%BB%8B-c%C3%B4-l%E1%BA%ADp-tr%C3%AAn-n%E1%BB%81n-tr%E1%BA%AFng-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-ng%C6%B0%E1%BB%9Di-d%C3%B9ng-minh-h%E1%BB%8Da-vector.jpg?s=612x612&w=0&k=20&c=MyAgwZm-Ct_rQpQGYh0Wb0N7KeAaFsY_WrZJ89EAiIw=";

type TabValues = "description" | "cast" | "trailer";
type Actor = {
  name: string;
  avatar: string;
  role: string;
};

type Tab = {
  label: string;
  value: TabValues;
  desc?: string;
  actors?: Actor[];
  trailers?: Trailer[];
};

const TabContent: FC<{ tab: Tab }> = ({ tab }) => {
  const { value, desc, actors, trailers } = tab;

  switch (value) {
    case "description":
      return (
        <>
          {desc &&
            desc.split("\n").map((content, index) => (
              <Typography
                key={index}
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
          {actors &&
            actors.map((actor) => (
              <div className="flex min-w-[200px] max-w-[200px] items-center gap-3">
                <Avatar src={actor.avatar || defaultAvatar} className="min-w-[48px]" />
                <div className="font-manrope">
                  <div className="line-clamp-1">
                    <Typography
                      variant="h6"
                      className="text-sm font-medium text-slate-400"
                    >
                      {actor.name}
                    </Typography>
                  </div>
                  <Typography className="text-xs font-normal text-slate-400/70">
                    {actor.role}
                  </Typography>
                </div>
              </div>
            ))}
        </div>
      );

    case "trailer":
      if (trailers && trailers?.length !== 0)
        return (
          <iframe
            loading="lazy"
            allowFullScreen
            className="h-full w-full rounded-lg"
            src={`http://www.imdb.com/video/imdb/${trailers[0].imdbId}/imdb/embed?autoplay=false`}
          />
        );

    default:
      return <></>;
  }
};

// export const DetailPage = (props: DetailsFilmProps) => {
const DetailPage = () => {
  const [activeTab, setActiveTab] = useState<TabValues>("trailer");

  const dispatch = useAppDispatch();
  const { id } = useParams();

  const dataDetail = useAppSelector((state) => state.DetailMovie.data);
  const dataRelatedMovie = useAppSelector((state) => state.movie.search.data);

  useEffect(() => {
    const idInt = cParseInt(id, 10);
    if (idInt) dispatch(detailsActions.getDetailMovie(idInt));
  }, [id]);


  // // Kiểm tra nếu dataRelatedMovie là null
  if (dataRelatedMovie === null) {
    return (
      <div>
        <AppFallback />
      </div>
    );
  }

  // Kiểm tra nếu dataDetail là null
  if (dataDetail === null) {
    return (
      <div>
        <AppFallback />
      </div>
    );
  }

  for (let i = 0; i < dataRelatedMovie.length; i++) {
    if (dataRelatedMovie[i].id == dataDetail.id) {
      dataRelatedMovie.splice(i, 1);
      break; // Dừng sau khi loại bỏ phần tử đầu tiên
    }
  }

  const actors = dataDetail.actors.slice(1, 16).map((actorInfo) => {
    return {
      name: actorInfo.actor.name,
      avatar: actorInfo.actor.imageUrl,
      role: actorInfo.role,
    };
  });

  const tabs: Tab[] = [
    {
      label: "Trailer",
      value: "trailer",
      trailers: dataDetail.trailers,
    },
    {
      label: "Casts",
      value: "cast",
      actors: actors,
    },
    {
      label: "Description",
      value: "description",
      desc: dataDetail.description,
    },
  ];



  return (
    <AppContainer className="z-10 pt-8">
      <div className="grid h-[675px] w-full grid-cols-[294px_1fr] gap-4">
        <Card className="w-auto bg-cblack-600">
          <CardHeader floated={false} className="rounded-md">
            <img
              src={dataDetail.imageUrl}
              alt="movie-picture"
              className="h-96 w-full"
            />
          </CardHeader>
          <CardBody className="p-4 font-manrope">
            {dataDetail.actors.length > 0 && (
              <>
                <Typography
                  variant="h5"
                  className="text-base font-bold text-slate-200/90"
                >
                  Director
                </Typography>
                <Typography className="mb-2 text-[13.6px] text-slate-400">
                  {dataDetail.actors[0].actor.name}
                </Typography>{" "}
              </>
            )}

            <Typography
              variant="h5"
              className="text-base font-bold text-slate-200/90"
            >
              Release Date
            </Typography>
            <Typography className="mb-2 text-[13.6px] text-slate-400">
              {dataDetail.release}
            </Typography>

            <Typography
              variant="h5"
              className="text-base font-bold text-slate-200/90"
            >
              Genres
            </Typography>
            <Typography className="mb-2 text-[13.6px] text-slate-400">
              {dataDetail.genres.map((genre) => genre.name).join(", ")}
            </Typography>

            {dataDetail.plot && (
              <div>
                <Typography
                  variant="h5"
                  className="text-base font-bold text-slate-200/90"
                >
                  Plot
                </Typography>
                <div className="line-clamp-5">
                  <Typography className=" text-[13.6px] text-slate-400">
                    {dataDetail.plot}
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
                  {dataDetail.title}
                </Typography>
              </div>

              <Button
                // <Button onClick={() => handleWatch(dataDetail.id)}
                className="rounded bg-cred px-3 py-[6px] text-base font-medium capitalize hover:border-cred/80 hover:bg-cred/80"
              >
                Watch
              </Button>
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
                  key={value}
                  value={value}
                  onClick={() => setActiveTab(value)}
                  className={`${
                    activeTab === value ? "text-sky-400" : "text-slate-100"
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
      </div>

      <Typography className="mb-3 mt-12 font-manrope text-3xl font-bold text-slate-200">
        More like this
      </Typography>
      <hr className="full-width-underline mb-5 mt-4" />

      <ListMovieResult data={dataRelatedMovie} />
    </AppContainer>
  );
};

export default DetailPage;

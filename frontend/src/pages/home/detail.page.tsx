import { FC, useEffect, useState } from "react";
import { ListMovieResult } from "@/pages/home/components/ListMovieResult";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import detailsActions from "@/actions/detail.action"
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
import { useNavigation, useParams } from "react-router-dom";
import AppFallback from "@/components/AppFallback";
import moviesActions from "@/actions/movie.action";

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
  trailer?: string;
};


const TabContent: FC<{ tab: Tab }> = ({ tab }) => {
  switch (tab.value) {
    case "description":
      return (
        <>
          {tab.desc &&
            tab.desc.split("\n").map((content, index) => (
              <Typography
                key={index}
                className={`${index && "mt-4"
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
          {tab.actors &&
            tab.actors.map((actor) => (
              <div className="flex min-w-[200px] max-w-[200px] items-center gap-3">
                <Avatar src={actor.avatar} className="min-w-[48px]" />
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
      return <iframe className="h-full w-full rounded-lg" src={tab.trailer} />;

    default:
      return <></>;
  }
};

// export const DetailPage = (props: DetailsFilmProps) => {
const DetailPage = () => {
  const [activeTab, setActiveTab] = useState<TabValues>("description");

  const dispatch = useAppDispatch();
  const movieID = useParams()

  useEffect(() => {
    if (movieID.id) {
      const idNumber = parseInt(movieID.id, 10); // Chuyển đổi thành số
      if (!isNaN(idNumber)) {
        dispatch(detailsActions.getDetailMovie(idNumber));
      }
    }
  }, []);

  const dataDetail = useAppSelector((state) => state.DetailMovie.data);
  // console.log(dataDetail?.genres);


  // Get Ralated Movies
  useEffect(() => {
    if (dataDetail?.genres) {
      dispatch(moviesActions.getMovieByGenres(dataDetail.genres, 0, 31));
    }
  }, [dataDetail]);


  const dataRelatedMovie = useAppSelector((state) => state.MovieByGenres.search.data);
  console.log("dataRelatedMovie", dataRelatedMovie)

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

  console.log("dataRelatedMovie", dataRelatedMovie)

  const actors = dataDetail.actors.slice(1, 16).map(actorInfo => {
    return {
      name: actorInfo.actor.name,
      avatar: actorInfo.actor.imageUrl,
      role: actorInfo.role,
    };
  });

  const tabs: Tab[] = [
    {
      label: "Description",
      value: "description",
      desc: dataDetail.description
    },
    {
      label: "Casts",
      value: "cast",
      actors: actors
    },
    {
      label: "Trailer",
      value: "trailer",
      trailer: dataDetail.trailer
    },
  ];

  return (
    <AppContainer className="z-10 pt-8">
      <div className="grid w-full grid-cols-[294px_1fr] h-[675px] gap-4">
        <Card className="w-auto bg-cblack-600">
          <CardHeader floated={false} className="rounded-md">
            <img
              src={dataDetail.imageUrl}
              alt="movie-picture"
              className="h-96 w-full"
            />
          </CardHeader>
          <CardBody className="p-4 font-manrope">
            <Typography
              variant="h5"
              className="text-base font-bold text-slate-200/90"
            >
              Director
            </Typography>
            <Typography className="mb-2 text-[13.6px] text-slate-400">
              {dataDetail.actors[0].actor.name}
            </Typography>

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

            {dataDetail.plot !== null && (
              <div>
                <Typography
                  variant="h5"
                  className="text-base font-bold text-slate-200/90"
                >
                  Plot
                </Typography>
                <Typography className="line-clamp-3 text-[13.6px] text-slate-400">
                  {dataDetail.plot}
                </Typography>
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
                className="rounded bg-cred px-3 py-[6px] text-base font-medium capitalize hover:border-cred/80 hover:bg-cred/80">
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
                  className={`${activeTab === value ? "text-sky-400" : "text-slate-100"
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
        Ralated Movies
      </Typography>
      <hr className="full-width-underline mb-5 mt-4" />

      <ListMovieResult data={dataRelatedMovie} />
    </AppContainer>
  );
};

export default DetailPage;

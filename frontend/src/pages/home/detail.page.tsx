import { FC, useState } from "react";
import { ListMovieResult } from "@/pages/home/components/ListMovieResult";

import imageFilmDetail from "@/assets/imageMovie/oppenheimer_ver3.jpg";

import actor1 from "@/assets/imageActor/DetailFilm/1.jpg";
import actor2 from "@/assets/imageActor/DetailFilm/2.jpg";
import actor3 from "@/assets/imageActor/DetailFilm/3.jpg";
import actor4 from "@/assets/imageActor/DetailFilm/4.jpg";
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

type TabValues = "summary" | "cast" | "trailer";
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

const tabs: Tab[] = [
  {
    label: "Summary",
    value: "summary",
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  },
  {
    label: "Casts",
    value: "cast",
    actors: [
      {
        name: "Cillian Murphy",
        avatar: actor1,
        role: "Abc Xyz",
      },
      {
        name: "Cillian Murphy",
        avatar: actor2,
        role: "Abc Xyz",
      },
      {
        name: "Cillian Murphy",
        avatar: actor3,
        role: "Abc Xyz",
      },
      {
        name: "Cillian Murphyyy Cillian Murphyyy",
        avatar: actor4,
        role: "Abc Xyz",
      },
      {
        name: "Cillian Murphy",
        avatar: actor4,
        role: "Abc Xyz",
      },
      {
        name: "Cillian Murphy",
        avatar: actor4,
        role: "Abc Xyz",
      },
    ],
  },
  {
    label: "Trailer",
    value: "trailer",
    trailer: "https://www.youtube.com/embed/0UXPIa5cNws?si=T9Q6_Lhhhvqqln6z",
  },
];

const TabContent: FC<{ tab: Tab }> = ({ tab }) => {
  switch (tab.value) {
    case "summary":
      return (
        <>
          {tab.desc &&
            tab.desc.split("\n").map((content, index) => (
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
  const [activeTab, setActiveTab] = useState<TabValues>("summary");

  return (
    <AppContainer className="z-10 pt-8">
      <div className="grid w-full grid-cols-[294px_1fr] gap-4">
        <Card className="w-auto bg-cblack-600">
          <CardHeader floated={false}>
            <img
              src={imageFilmDetail}
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
              Jon Watts
            </Typography>

            <Typography
              variant="h5"
              className="text-base font-bold text-slate-200/90"
            >
              Cast
            </Typography>
            <Typography className="mb-2 text-[13.6px] text-slate-400">
              Tom Holland, Jake Gyllenhaal, Zendaya
            </Typography>

            <Typography
              variant="h5"
              className="text-base font-bold text-slate-200/90"
            >
              Plot
            </Typography>
            <Typography className="line-clamp-3 text-[13.6px] text-slate-400">
              Peter Parker and his friends go on a summer trip to Europe.
              However, they will hardly be able to rest - Peter.
            </Typography>
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
                  Openheimmer &nbsp;
                  <small className="text-lg font-light">2023</small>
                </Typography>
                <Typography className="text-xs text-slate-400/80">
                  Action / Adventure / Science Fiction
                </Typography>
              </div>

              <Button className="rounded bg-cred px-3 py-[6px] text-base font-medium capitalize hover:border-cred/80 hover:bg-cred/80">
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
        Ralated Movies
      </Typography>
      <hr className="full-width-underline mb-5 mt-4" />

      <ListMovieResult />
    </AppContainer>
  );
};

export default DetailPage;

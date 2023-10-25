import { FC, ReactNode, useState } from "react";
import AppContainer from "@/components/AppContainer";
import {
  Button,
  Card,
  CardBody,
  Carousel,
  Typography,
} from "@material-tailwind/react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const colors: string[] = [
  "bg-red-100",
  "bg-red-200",
  "bg-red-300",
  "bg-red-400",
  "bg-red-500",
  "bg-red-600",
  "bg-red-700",
  "bg-red-800",
  "bg-red-900",
  "bg-red-100",
  "bg-red-200",
  "bg-red-300",
];

const WatchPage: FC = () => {
  const [current, setCurrent] = useState<number>(0);

  const handlePrev = () => current !== 0 && setCurrent((cur) => cur - 1);
  const handleNext = () =>
    current < colors.length - 1 && setCurrent((cur) => cur + 1);

  return (
    <>
      <AppContainer
        className="z-0 flex h-full items-center"
        containerProps={{
          className: "sticky h-[calc(100vh-60px)] right-0 left-0 top-[60px]",
        }}
      >
        <div className="h-[636px] w-full bg-[url('@/assets/images/loading.gif')] bg-center bg-no-repeat">
          <iframe
            allowFullScreen
            className="z-0 h-full w-full rounded-lg"
            src="https://www.2embed.cc/embed/tt4633694"
          />
        </div>
      </AppContainer>
      <div className="relative z-10 w-full bg-[url('@/assets/images/pricing_bg.jpg')]">
        <AppContainer className="py-[100px]">
          <section className="grid grid-cols-[1fr_auto] border-b border-b-divider">
            <div className="border-r border-r-divider pr-8">
              <Typography
                variant="h1"
                className="mb-6 font-manrope text-slate-200"
              >
                Spiderman: Into the spider verse
              </Typography>
              <div className="mb-8 flex items-center">
                <div className="mr-3 h-10 w-10">
                  <CircularProgressbar
                    value={75}
                    text={`${75 / 10}`}
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
                <img
                  src="http://digiflex.themezinho.net/wp-content/themes/digiflex/images/imdb-logo.svg"
                  alt="imdb"
                  className="mr-2 h-5"
                />
                <Typography className="mr-7 text-lg font-thin text-slate-200">
                  Score
                </Typography>
                <Typography
                  variant="h4"
                  className="mr-7 text-lg font-bold text-slate-200"
                >
                  2018
                </Typography>
                <Typography className="mr-7 text-lg font-thin text-slate-200">
                  1 hr 24 min
                </Typography>

                <div className="mr-7 flex h-[24px] items-center rounded-sm bg-slate-100 px-2">
                  <Typography className="text-xs font-medium text-slate-900">
                    CC
                  </Typography>
                </div>
                <Typography className="font-manrope font-medium text-cred">
                  Action, Adventure, Animation
                </Typography>
              </div>

              <Typography className="mb-6 font-manrope text-slate-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </Typography>

              <div className="mb-2 font-manrope">
                <Typography
                  variant="h5"
                  className="inline-block w-36 text-lg font-normal tracking-wide text-slate-200"
                >
                  Director
                </Typography>
                <Typography className="inline-block text-slate-400">
                  : Chris Milewski
                </Typography>
              </div>

              <div className="mb-2 font-manrope">
                <Typography
                  variant="h5"
                  className="inline-block w-36 text-lg font-normal tracking-wide text-slate-200"
                >
                  Casting
                </Typography>
                <Typography className="inline-block text-slate-400">
                  : Andrea Autullo, Jeffrey Voice, Chiara Pavoni
                </Typography>
              </div>
            </div>
            <div className="pb-8 pl-8">
              <img
                src="https://musicart.xboxlive.com/7/99f75000-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080"
                alt="film"
                className="h-[440px] w-[285px]"
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
      <section className="relative z-10 w-full bg-[url('@/assets/images/services_bg.jpg')] bg-contain pt-[100px] py-[150px]">
        <AppContainer>
          <div className="grid h-auto grid-cols-[1fr_275px] items-end gap-8">
            <div className="w-full max-w-full overflow-hidden">
              <div
                className="transition-transform flex gap-4 duration-500 ease-out"
                style={{ transform: `translateX(-${current * (165 + 16)}px)` }}
              >
                {colors.map((color, index) => (
                  <Card className={`rounded-none bg-transparent`}>
                    <CardBody className="w-[165px] p-0">
                      <img
                        className="h-[251px] w-full"
                        src="https://musicart.xboxlive.com/7/99f75000-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080"
                      />
                      <div className="mt-1 line-clamp-1">
                        <Typography className="font-manrope text-xs capitalize text-slate-300/70">
                          2018, Action, Comedy, Animation
                        </Typography>
                      </div>
                      <div className="line-clamp-1">
                        <Typography
                          variant="h5"
                          className="font-manrope text-sm font-extrabold capitalize text-slate-200"
                        >
                          Spiderman: Into the spider verse
                        </Typography>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
            <div className="before:mb-6 before:block before:h-[1px] before:w-[48px] before:bg-divider after:mt-6 after:block after:h-[1px] after:w-full after:bg-divider">
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
  );
};

export default WatchPage;

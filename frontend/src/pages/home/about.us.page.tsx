import AppContainer from "@/components/AppContainer";
import { FC } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import {
  CheckIcon,
  PlayIcon,
  VideoCameraIcon,
} from "@heroicons/react/20/solid";
import {
  CalendarDaysIcon,
  ClockIcon,
  FilmIcon,
} from "@heroicons/react/24/outline";
import slider from "@/assets/images/slider_img02.jpg";
import service from "@/assets/images/services_img.jpg";

interface DonationType {
  type: string;
  amount: string;
  main?: boolean;
  contents: string[];
}

const contents: string[] = [
  "4K resolution",
  "Award medal",
  "Unlimited movie",
  "24/7 technical support",
];

const donations: DonationType[] = [
  {
    type: "Begin",
    amount: "3.99",
    contents: contents,
  },
  {
    type: "Standard",
    amount: "7.99",
    main: true,
    contents: contents,
  },
  {
    type: "Premium",
    amount: "15.99",
    contents: contents,
  },
];

const DonationCard: FC<DonationType> = ({ type, amount, contents, main }) => {
  return (
    <Card
      variant="gradient"
      className={`${main && "ring ring-coral"} w-full max-w-[20rem] bg-cblack-300 p-8 hover:ring hover:ring-coral`}
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
      >
        <Typography
          variant="small"
          color="white"
          className="font-normal uppercase"
        >
          {type}
        </Typography>
        <Typography
          variant="h1"
          color="white"
          className="mt-6 flex justify-center gap-1  text-6xl font-normal text-slate-100"
        >
          <span className="mt-2 text-4xl">$</span>
          {amount}
        </Typography>
      </CardHeader>
      <CardBody className="p-0">
        <ul className="flex flex-col gap-4">
          {contents.map((content, index) => (
            <li key={`donation-${index}`} className="flex items-center gap-4">
              <span className="rounded-full">
                <CheckIcon className="h-5 w-5 text-xl text-teal-500" />
              </span>
              <Typography className="font-normal text-slate-400">
                {content}
              </Typography>
            </li>
          ))}
        </ul>
      </CardBody>
      <CardFooter className="mt-12 p-0">
        <Button
          size="lg"
          variant="outlined"
          className="rounded-3xl border-2 border-coral text-slate-300 hover:scale-[1.02] hover:border-coral focus:scale-[1.02] active:scale-100"
          ripple={false}
          fullWidth={true}
        >
          Donate
        </Button>
      </CardFooter>
    </Card>
  );
};

const AboutUsPage: FC = () => {
  return (
    <>
      <section className=" h-auto bg-[url('@/assets/images/banner.jpg')]">
        <AppContainer className="flex flex-col-reverse items-center justify-between py-36 gap-8 lg:flex-row">
          <div className="font-manrope text-slate-200 lg:w-1/2">
            <Typography
              variant="h2"
              className="mb-3 text-xl font-bold capitalize sm:text-2xl lg:text-2xl"
            >
              TMT Movies
            </Typography>
            <Typography className="mb-7 text-4xl font-extrabold sm:text-5xl  xl:text-6xl">
              Unlimited <strong className="!text-cred">Movie</strong>, TV Shows,
              & More
            </Typography>
            <div className="mb-9 flex flex-wrap items-center gap-4 font-manrope">
              <div className="flex">
                <Chip
                  value="PG 18"
                  className="flex items-center rounded  bg-slate-200 text-xs text-slate-900 xl:text-sm"
                />
                <Chip
                  value="HD"
                  className="ml-2 box-border flex h-7 items-center rounded  border-2 border-slate-200 bg-transparent text-xs text-slate-200 xl:h-8 xl:text-sm"
                />
              </div>

              <Typography className="block text-sm font-semibold text-slate-200 xl:text-base">
                Action, &nbsp;Fantasy
              </Typography>

              <div className="flex">
                <CalendarDaysIcon className="h-5 w-5 text-cred" />
                <Typography className="ml-1 text-sm font-medium xl:text-base">
                  2021
                </Typography>
                <ClockIcon className="ml-2 h-5 w-5 text-cred" />
                <Typography className="ml-1 text-sm font-medium xl:text-base">
                  120min
                </Typography>
              </div>
            </div>

            <Button
              variant="outlined"
              className="text-slate hover:border-cred flex items-center gap-3 border-2 border-cred text-sm font-bold text-slate-200 xl:text-base"
            >
              <PlayIcon className="h-5 w-5 text-cred" />
              WATCH NOW
            </Button>
          </div>
          <img
            src={slider}
            className="h-auto w-full md:w-5/6 lg:w-[448px] xl:h-[450px] xl:w-1/2"
          />
        </AppContainer>
      </section>

      <section className="h-full bg-[url('@/assets/images/services_bg02.jpg')] bg-contain py-36">
        <AppContainer className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="lg:pr-24 xl:pr-52">
            <Typography
              variant="h5"
              className="font-manrope text-sm sm:text-base font-extrabold text-cred"
            >
              Movie Platform
            </Typography>
            <Typography
              variant="h2"
              className="mb-6 sm:mb-8 font-manrope text-2xl md:text-3xl font-extrabold text-slate-200"
            >
              Download Your Shows <br />
              Watch Offline.
            </Typography>

            <div>
              <div className="flex gap-4">
                <IconButton className="rounded-full border border-dashed border-cred bg-transparent md:p-8 lg:p-12 transition-colors duration-300 ease-in-out hover:border-cred hover:bg-cred">
                  <FilmIcon className="h-6 w-6 lg:h-9 lg:w-9" />
                </IconButton>
                <div>
                  <Typography
                    variant="h5"
                    className="mb-2 md:text-lg lg:text-xl font-manrope font-bold text-slate-200"
                  >
                    Enjoy Your Film
                  </Typography>
                  <Typography className="font-manrope font-normal text-slate-300">
                    Lorem ipsum dolor sit amet, consecetur adipiscing elit, sed
                    do eiusmod tempor.
                  </Typography>
                </div>
              </div>

              <hr className="my-6 border-dashed" />

              <div className="flex gap-4">
                <IconButton className="rounded-full border border-dashed border-cred bg-transparent md:p-8 lg:p-12 transition-colors duration-300 ease-in-out hover:border-cred hover:bg-cred">
                  <VideoCameraIcon className="h-6 w-6 lg:h-9 lg:w-9" />
                </IconButton>
                <div>
                  <Typography
                    variant="h5"
                    className="mb-2 md:text-lg lg:text-xl font-manrope font-bold text-slate-200"
                  >
                    Watch Everywhere
                  </Typography>
                  <Typography className="font-manrope font-normal text-slate-300">
                    Lorem ipsum dolor sit amet, consecetur adipiscing elit, sed
                    do eiusmod tempor.
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          <img src={service} alt="services_img02" className=" md:w-72 lg:w-96 xl:w-auto xl:h-auto" />
        </AppContainer>
      </section>

      <section className="h-auto bg-[url('@/assets/images/pricing_bg.jpg')] py-36">
        <Typography
          variant="h2"
          className="mb-8 text-center font-manrope text-4xl font-extrabold text-slate-200"
        >
          Support Us
        </Typography>
        <div className="flex justify-evenly">
          <div className="flex flex-wrap lg:flex-nowrap justify-evenly gap-12">
            {donations.map((donate, index) => <DonationCard key={`donation-${index}`} {...donate}/>)}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUsPage;

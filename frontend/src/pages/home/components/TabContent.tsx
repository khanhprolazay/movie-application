import Empty from "@/components/Empty";
import { Cast, Video } from "@/type";
import urlUtils from "@/utils/url.util";
import { Avatar, Carousel, IconButton, Typography } from "@material-tailwind/react";
import { FC } from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";

export type TabValues = "description" | "cast" | "video";

export type TabType = {
  label: string;
  value: TabValues;
  desc?: string;
  casts?: Cast[];
  videos?: Video[];
};

const TabContent: FC<{ tab: TabType }> = ({ tab }) => {
  const { value, desc, casts, videos } = tab;

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
                    src={urlUtils.getActorImage(cast.actor)}
                    className="min-w-[48px]"
                    loading="lazy"
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

    case "video":
      return (
        <Carousel
          loop
          navigation={() => <></>}
          prevArrow={({ handlePrev }) => (
            <IconButton
              variant="text"
              color="white"
              size="md"
              onClick={handlePrev}
              className="!absolute left-4 top-2/4 ml-1 -translate-y-2/4"
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
              className="!absolute !right-4 top-2/4 mr-1 -translate-y-2/4"
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
        >
          {videos?.length === 0 ? (
            <Empty />
          ) : (
            videos
              ?.sort((a, b) => {
                const aType = a.type;
                const bType = b.type;
                const aOfficial = a.official;
                const bOfficial = b.official;

                if (aType === "Trailer" && bType !== "Trailer") return -1;
                if (aType !== "Trailer" && bType === "Trailer") return 1;
                if (aOfficial && !bOfficial) return -1;
                if (!aOfficial && bOfficial) return 1;
                return 0;
              })
              .slice(0, 3)
              .map((video) => (
                <iframe
                  key={video.key}
                  loading="lazy"
                  allowFullScreen
                  className="h-full w-full rounded-lg"
                  src={urlUtils.getYoutubeEmbedUrl(video.key)}
                />
              ))
          )}
        </Carousel>
      );

    default:
      return <></>;
  }
};

export default TabContent;

import { Cast, Trailer } from "@/type";
import urlUtils from "@/utils/urlUtils";
import { Avatar, Typography } from "@material-tailwind/react";
import { FC } from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";

export type TabValues = "description" | "cast" | "trailer";

export type TabType = {
  label: string;
  value: TabValues;
  desc?: string;
  casts?: Cast[];
  trailers?: Trailer[];
};

const TabContent: FC<{ tab: TabType }> = ({ tab }) => {
  const { value, desc, casts, trailers } = tab;

  switch (value) {
    case "description":
      return (
        <>
          {desc &&
            desc.split("\n").map((content, index) => (
              <Typography
                key={`desc-${index}`}
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

export default TabContent;
import { FC } from "react";
import logo from "@/assets/images/logo.png";
import { Typography } from "@material-tailwind/react";

type AppLogoProps = {
  hidden?: boolean;
  containerProps?: {
    className: string;
  };
  imageProps?: {
    className: string;
  };
  textProps?: {
    className: string;
  };
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "paragraph";
};

const AppLogo: FC<AppLogoProps> = ({
  hidden = false,
  textProps,
  imageProps,
  containerProps,
  variant = "paragraph",
}) => {
  return (
    <div className={`${containerProps && containerProps.className} h-auto`}>
      <div className="relative flex min-h-[60px] items-center">
        <img
          src={logo}
          alt="logo"
          className={`h-8 w-8 ${imageProps && imageProps.className}`}
        />
        <div
          className={`${
            textProps && textProps.className
          } absolute my-auto flex h-full w-56 flex-col justify-evenly`}
        >
          <Typography
            variant={variant}
            className={` ${hidden ? "hidden" : "block"}  text-slate-200`}
          >
            <span className="text-cred">TMT</span> Movie
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default AppLogo;

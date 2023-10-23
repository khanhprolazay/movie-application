import { Spinner } from "@material-tailwind/react";
import { FC } from "react";

const AppFallback: FC = () => {
  return (
    <Spinner className="absolute bottom-0 left-0 right-0 top-0 m-auto h-16 w-16 text-cred" />
  );
};

export default AppFallback;

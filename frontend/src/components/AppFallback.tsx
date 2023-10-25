import { FC } from "react";

const AppFallback: FC = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 m-auto bg-[url('@/assets/images/loading.gif')] bg-center bg-no-repeat" />
  );
};

export default AppFallback;

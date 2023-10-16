import { ReactNode } from "react";

interface ComponentProps {
  children: ReactNode;
}

export const Container = (props: ComponentProps) => {
  return (
    <div className="flex w-screen justify-around bg-gradient-to-b from-black via-green-900 to-black">
      <div className="relative w-full min-w-[360px] max-w-7xl md:px-9">
        {props.children}
      </div>
    </div>
  );
};

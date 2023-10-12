import { ReactNode } from "react";

interface ComponentProps {
  children: ReactNode;
}

export const Container = (props: ComponentProps) => {
  return (
    <div className="flex w-screen justify-around">
      <div className="relative w-full min-w-[360px] max-w-7xl px-8 md:px-24">
        {props.children}
      </div>
    </div>
  );
};

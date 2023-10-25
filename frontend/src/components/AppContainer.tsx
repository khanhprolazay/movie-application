import { ReactNode } from "react";

interface ComponentProps {
  className?: string;
  children: ReactNode;
  containerProps?: {
    className: string
  }
}

const AppContainer = (props: ComponentProps) => {
  return (
    <div className={`container mx-auto xl:max-w-7xl ${props.containerProps?.className}`}>
      <div className={`mx-4 ${props.className}`}>{props.children}</div>
    </div>
  );
};

export default AppContainer;

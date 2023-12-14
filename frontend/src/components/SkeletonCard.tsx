import { FC, ReactNode } from "react";

type Props = {
  bodyClassname?: string;
  imageClassname?: string;
  direction?: "row" | "column";
  content?: ReactNode;
};

const ColumnContent = () => {
  return (
    <div className="flex w-full flex-col space-y-2">
      <div className="h-2 w-4/5 rounded-md bg-gray-300 "></div>
      <div className="h-2 w-3/5 rounded-md bg-gray-300 "></div>
    </div>
  );
};

const RowContent = () => {
  return (
    <div className="flex flex-col">
      <div className="my-[10px] w-32 h-[10px] rounded-md bg-gray-300" />
      <div className="h-2 w-28 mt-2 rounded-md bg-gray-300" />
      <div className="h-2 w-24 mt-2 rounded-md bg-gray-300" />
      <div className="h-2 w-40 mt-2 rounded-md bg-gray-300 " />
    </div>
  );
};

const SkeletonCard: FC<Props> = ({
  bodyClassname = "w-[125px]",
  imageClassname = "h-[205px]",
  direction = "column",
  content = null,
}) => {
  const getContent = () => {
    if (content) {
      return content;
    }

    if (direction === "column") {
      return <ColumnContent />;
    }

    return <RowContent />;
  };

  return (
    <div>
      <div
        className={`${bodyClassname} flex h-full animate-pulse ${
          direction === "column" ? "flex-col space-y-2" : "flex-row gap-2"
        }`}
      >
        <div className={`${imageClassname} w-full bg-gray-300 rounded`}></div>
        {getContent()}
      </div>
    </div>
  );
};

export default SkeletonCard;

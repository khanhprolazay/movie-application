import React from "react";

type Props = {
  children: React.ReactNode;
};

const List: React.FC<Props> = (props) => {
  return (
    <div className="grid w-full max-w-full gap-x-3 gap-y-6 overflow-hidden grid-cols-2 xs:grid-cols-3 sm:!grid-cols-4 xl:!grid-cols-5">
      {props.children}
    </div>
  );
};

export default List;

import React from 'react';

type Props = {
  children: React.ReactNode;
}

const List: React.FC<Props> = (props) => {
  return (
    <div className="grid w-full max-w-full grid-cols-3 gap-x-0 gap-y-8 overflow-hidden sm:grid-cols-4 xl:grid-cols-5">
      {props.children}
    </div>
  );
};

export default List;

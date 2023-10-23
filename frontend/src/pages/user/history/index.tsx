import { FC } from "react";
import MovieCard from "./components/MovieCard";
import { Button, Typography } from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import AppContainer from "@/components/AppContainer";

const HistoryPage: FC = () => {
  return (
    <AppContainer className="pt-8">
      <div className="mx-0 w-full xl:mx-4 xl:w-auto">
        <div className="mb-6 flex w-full justify-between">
          <Typography
            variant="h2"
            className="inline-flex items-center border-l-4 border-l-cred pl-2 text-center font-manrope text-2xl font-bold text-slate-200"
          >
            Your History
          </Typography>
          <Button
            variant="outlined"
            color="red"
            className="flex items-center gap-3"
          >
            <TrashIcon className="h-4 w-4 text-[#EF4444]" />
            Delete
          </Button>
        </div>
        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
 
        </div>
      </div>
    </AppContainer>
  );
};

export default HistoryPage;
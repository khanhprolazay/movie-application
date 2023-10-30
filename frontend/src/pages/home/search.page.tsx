import { FC } from "react";
import AppContainer from "@/components/AppContainer";
import { ListMovieResult } from "./components/ListMovieResult";

const SearchPage: FC = () => {
  return (
    <AppContainer className="pt-8">
      <h1 className="mb-3 pt-5 font-manrope text-2xl font-bold text-slate-200">
        Search Results
      </h1>

      <hr className="full-width-underline border-divider mb-5 mt-4" />

      <ListMovieResult />

      {/* <Typography className="text-xl font-manrope h-96 mt-5">No Search Results.</Typography> */}
    </AppContainer>
  );
};

export default SearchPage;

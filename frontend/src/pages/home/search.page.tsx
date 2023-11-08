import AppContainer from "@/components/AppContainer";
import { ListMovieResult } from "./components/ListMovieResult";
import { useParams } from "react-router-dom";
import { FC, useEffect } from "react";
import {
  Card,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { ListPosterFilmRow } from "./components/ListPosterFilmRow";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import AppFallback from "@/components/AppFallback";
import moviesActions from "@/actions/movie.action";


const SearchPage: FC = () => {

  const navigate = useNavigate();
  const keyword = useParams().string
  const dispatch = useAppDispatch();

  const handleReleaseYear = (year: number) => {
    navigate(`/search/${year}`);
    window.location.reload();
  };

  const keywordNumber = parseInt(keyword, 10);

  useEffect(() => {
    dispatch(moviesActions.getMovieByYear(keywordNumber, 0, 30));
  }, []);

  const MovieByYear = useAppSelector((state) => state.MovieByYear.search.data);

  // Kiểm tra nếu listRecentlyMovies là null hoặc rỗng
  // if (MovieByYear === null || MovieByYear.length === 0) {
  //   return (
  //     <div>
  //       <AppFallback />
  //       <div>Không có dữ liệu</div>
  //     </div>
  //   );
  // }

  const handleDetail = (id: number) => {
    navigate(`/detail/${id}`);
  };

  const formattedRating = (item: number) => {
    return (Number.isInteger(item) ? `${item}.0` : item)
  }

  return (
    <AppContainer>
      {/* --------------------------------Body----------------------------------- */}
      <div className="grid grid-cols-3 bg-cblack-100">
        {/* Content  */}

        <div className="col-span-full lg:col-span-2 border-r border-r-divider px-4 pb-5">
          <hr className="full-width-underline border-gray-500 mb-1 mt-20 border-2" />
          <div className="-my-12 font-manrope text-4xl font-extrabold text-slate-200 flex justify-center ">
            {keyword}
          </div>

          <div className="mt-[52px] mb-5 font-manrope text-xl font-semibold text-slate-200">
            Search Results
          </div>

          <div className="w-full h-auto items-end lg:grid-cols-[1fr_5px] relative">
            {MovieByYear && MovieByYear.length > 0 ? (
              <div className="w-full max-w-full overflow-hidden grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-5 gap-x-0 gap-y-8">
                {MovieByYear.map((item, index) => (
                  <Card
                    key={`like-${index}`}
                    className={`rounded-none bg-transparent items-center`}
                    onClick={() => handleDetail(item.id)}
                  >
                    <CardBody
                      className="w-[105px] md:w-[125px] p-0 hover:scale-95 hover:cursor-pointer ease-in-out duration-300 transform disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none">
                      <img
                        className="h-[170px] md:h-[200px] w-full border"
                        src={item.imageUrl}
                      />
                      <div className="flex items-center absolute text-white text-sm bg-black rounded-lg px-2 py-0.5 right-1 top-1 cursor-pointer">
                        {formattedRating(item.rating)}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500 ml-0.5">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                      </div>

                      <div className="mt-1 line-clamp-1">
                        <Typography
                          variant="h5"
                          className="font-manrope text-sm font-extrabold capitalize text-slate-200"
                        >
                          {item.title}
                        </Typography>
                      </div>
                      <div className="line-clamp-1">
                        <Typography className="font-manrope text-xs capitalize text-slate-300/70">
                          {item.release}
                        </Typography>
                      </div>
                    </CardBody>
                  </Card>))}
              </div>
            ) : (
              <div className="text-center text-red-500 font-bold text-3xl ">
                Dữ liệu chưa được cập nhật!
              </div>
            )}
          </div>

          {/* <div className="w-full h-auto items-end lg:grid-cols-[1fr_5px] relative">
            <div className="w-full max-w-full overflow-hidden grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-5 gap-x-0 gap-y-8">
              {MovieByYear.map((item, index) => (
                <Card
                  key={`like-${index}`}
                  className={`rounded-none bg-transparent items-center`}
                  onClick={() => handleDetail(item.id)}
                >
                  <CardBody
                    className="w-[105px] md:w-[125px] p-0 hover:scale-95 hover:cursor-pointer ease-in-out duration-300 transform disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none">
                    <img
                      className="h-[170px] md:h-[200px] w-full border"
                      src={item.imageUrl}
                    />
                    <div className="flex items-center absolute text-white text-sm bg-black rounded-lg px-2 py-0.5 right-1 top-1 cursor-pointer">
                      {formattedRating(item.rating)}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500 ml-0.5">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    </div>

                    <div className="mt-1 line-clamp-1">
                      <Typography
                        variant="h5"
                        className="font-manrope text-sm font-extrabold capitalize text-slate-200"
                      >
                        {item.title}
                      </Typography>
                    </div>
                    <div className="line-clamp-1">
                      <Typography className="font-manrope text-xs capitalize text-slate-300/70">
                        {item.release}
                      </Typography>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div> */}
        </div>

        {/* Sidebar */}
        <div className="relative col-span-1 bg-cblack-100 px-4 lg:block hidden">
          <Typography
            variant="h1"
            className="mb-3 mt-5 font-manrope text-lg font-semibold text-slate-300"
          >
            Release Year
          </Typography>
          <Menu>
            <MenuHandler>
              <IconButton
                variant="text"
                color="white"
                size="md"
                className="!absolute top-9 mx-28 -translate-y-2/4 border-none hover:text-cred "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </IconButton>
            </MenuHandler>
            <MenuList className="no-scrollbar grid max-h-[200px] grid-cols-3 gap-1 overflow-y-auto bg-cblack-100">
              {Array.from({ length: 123 }, (_, i) => {
                const year = 2023 - i;
                return (
                  <MenuItem
                    key={year}
                    className="h-8 w-28 cursor-pointer rounded bg-cblack-600 py-1 text-center font-manrope text-sm text-slate-400 transition-colors ease-in-out hover:!bg-cred hover:!border-transparent hover:!text-slate-200"
                    onClick={() => handleReleaseYear(year)}
                  >
                    {year}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
          <ul className="grid grid-cols-3 gap-1 mb-10">
            {Array.from({ length: 12 }, (_, i) => {
              const year = 2023 - i;
              return (
                <li
                  key={year}
                  className="flex h-8 w-full cursor-pointer items-center justify-evenly rounded bg-cblack-600 font-manrope text-sm text-slate-400 transition-colors ease-in-out hover:bg-cred hover:text-slate-200"
                  onClick={() => handleReleaseYear(year)}
                >
                  {year}
                </li>
              );
            })}
          </ul>

          <a
            // href="https://phimmoiyyy.net/phim-le/qua-nhanh-qua-nguy-hiem-7"
            className="relative h-auto w-auto transform object-cover duration-300 ease-in-out hover:opacity-50 hover:cursor-pointer disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            <img
              src="https://image.tmdb.org/t/p/w500/cHkhb5A4gQRK6zs6Pv7zorHs8Nk.jpg"
              alt="image 2"
              className="h-44 w-full rounded"
            />
            <text className="absolute bottom-6 left-3 font-manrope text-xl font-semibold text-slate-200 hover:cursor-pointer">
              Quá Nhanh Quá Nguy Hiểm 7
            </text>
            <text className="absolute bottom-1 left-3 font-manrope text-sm font-semibold text-slate-300 hover:cursor-pointer">
              2015
            </text>
          </a>

          <ListPosterFilmRow />
        </div>
      </div>
    </AppContainer>
    // <AppContainer className="pt-8">
    //   <h1 className="mb-3 pt-5 font-manrope text-2xl font-semibold text-slate-200">
    //     Search Results
    //   </h1>

    //   <hr className="full-width-underline border-divider mb-3 mt-4" />

    //   <h1 className="mx-auto font-manrope text-3xl font-bold text-slate-200">
    //     {keyword}
    //   </h1>

    //   {/* <ListMovieResult data={null}/> */}

    //   {/* <Typography className="text-xl font-manrope h-96 mt-5">No Search Results.</Typography> */}
    // </AppContainer>
  );
};

export default SearchPage;

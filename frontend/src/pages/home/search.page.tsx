import AppContainer from "@/components/AppContainer";
import { useParams, useSearchParams } from "react-router-dom";
import { FC, useEffect } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import moviesActions from "@/actions/movie.action";
import MovieAside from "./components/MovieAside";
import { cParseInt } from "@/utils/stringUtils";
import { LazyLoadImage } from "react-lazy-load-image-component";

const SearchPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const movies = useAppSelector((state) => state.movie.search.data);

  const year = cParseInt(searchParams.get("year"), 10);
  const keyword = searchParams.get("keyword");
  const genres = searchParams.get("genres");

  useEffect(() => {
    if (year)
      dispatch(moviesActions.getMovieByYear(year, 0, 30));

    // if (keyword)
    //   dispatch theo keyword

    // if (genres)
    //   dispatch theo genres
  }, [year, keyword, genres]);

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
    return Number.isInteger(item) ? `${item}.0` : item;
  };

  return (
    <AppContainer>
      {/* --------------------------------Body----------------------------------- */}
      <div className="grid grid-cols-3 bg-cblack-100">
        {/* Content  */}

        <div className="col-span-full border-r border-r-divider px-4 pb-5 lg:col-span-2">
          <hr className="full-width-underline mb-1 mt-20 border-2 border-gray-500" />
          <div className="-my-12 flex justify-center font-manrope text-4xl font-extrabold text-slate-200 ">
            {keyword || year || genres}
          </div>

          <div className="mb-5 mt-[52px] font-manrope text-xl font-semibold text-slate-200">
            Search Results
          </div>

          <div className="relative h-auto w-full items-end lg:grid-cols-[1fr_5px]">
            {movies && movies.length > 0 ? (
              <div className="grid w-full max-w-full grid-cols-3 gap-x-0 gap-y-8 overflow-hidden sm:grid-cols-4 xl:grid-cols-5">
                {movies.map((item: any, index: number) => (
                  <Card
                    key={`like-${index}`}
                    className={`items-center shadow-none rounded-none bg-transparent`}
                    onClick={() => handleDetail(item.id)}
                  >
                    <CardBody className="w-[105px] transform p-0 duration-300 ease-in-out hover:scale-95 hover:cursor-pointer disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none md:w-[125px]">
                      <LazyLoadImage
                        loading="lazy"
                        src={item.imageUrl}
                        wrapperClassName="h-[170px] w-full border md:h-[200px]"
                      />
                      <div className="absolute right-1 top-1 flex cursor-pointer items-center rounded-lg bg-black px-2 py-0.5 text-sm text-white">
                        {formattedRating(item.rating)}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="ml-0.5 h-4 w-4 text-yellow-500"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
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
            ) : (
              <div className="text-center text-3xl font-bold text-red-500 ">
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
        <MovieAside />
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

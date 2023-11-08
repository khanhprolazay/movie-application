import {
  Typography,
  Button,
  IconButton,
  Input,
  Select,
  Option,
  Spinner,
  Avatar,
} from "@material-tailwind/react";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { FC, memo, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import sidebarActions from "@/actions/sidebar.action";
import AppContainer from "./AppContainer";
import genreActions from "@/actions/genre.action"


const AppHeader: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, data } = useAppSelector((state) => state.user);
  const triggerOpen = () => dispatch(sidebarActions.trigger());

  // Call API get Genres
  useEffect(() => {
    dispatch(genreActions.getGenres());
  }, []);
  const listGenres = useAppSelector((state) => state.genre.data);

  // const handleGenre = (genre: string) => {
  //   // console.log("genre", genre)
  //   navigate(`/search/${genre}`);
  //   window.location.reload();
  // }

  return (
    <header className="flex items-center justify-between box-border sticky z-40 top-0 right-0 left-0 h-[60px] border-b border-divider bg-cblack-100">
      <AppContainer className="flex h-full items-center justify-between">
        <div className="flex w-3/5 items-center gap-4">
          <IconButton
            onClick={triggerOpen}
            className="border-cred bg-transparent hover:border-cred"
          >
            <AdjustmentsHorizontalIcon className="h-6 w-6 text-slate-200" />
          </IconButton>

          <Input
            variant="outlined"
            autoComplete="off"
            type="search"
            role="search"
            color="blue-gray"
            aria-autocomplete="none"
            icon={<MagnifyingGlassIcon className="text-cred" />}
            label="Find movie"
            labelProps={{
              className: "before:border-none after:border-none",
            }}
            containerProps={{
              className: "!w-[478px]",
            }}
            className="border-none !bg-cblack-600 text-slate-400"
          />

          <Select
            label="Select genre"
            color="blue-gray"
            containerProps={{
              className: "!min-w-[152px] !w-[124px] -ml-2",
            }}
            menuProps={{
              className: "bg-cblack-600 no-scrollbar"
            }}
            labelProps={{
              className: "before:border-none after:border-none",
            }}
            arrow={<ChevronDownIcon className="text-cred" />}
            className="border-none !bg-cblack-600 text-slate-400 hover:border-none"
          >
            {listGenres.map((genre, index) => (
              <Option key={index} className="truncate bg-cblack-600 text-slate-400 px-2 py-1 m-1 rounded"
              // onClick={() => handleGenre(genre.name)}
              >
                {genre.name}
              </Option>
            ))}
          </Select>
        </div>

        {loading && <Spinner color="red" className="h-10 w-10" />}
        {!loading &&
          (!data ? (
            <div className="flex items-center gap-5">
              <Button
                size="sm"
                onClick={() => navigate("/auth/login")}
                className="rounded-3xl !border-none bg-transparent  font-manrope text-sm font-semibold normal-case text-slate-400 transition-colors  hover:text-slate-200 "
              >
                LOG IN
              </Button>

              <Button
                size="sm"
                onClick={() => navigate("/auth/register")}
                className="hidden h-10 rounded-lg border-none bg-cred px-5 font-manrope text-sm font-extrabold normal-case text-slate-200 transition-colors duration-300 ease-in-out hover:bg-cred/80 hover:text-slate-100 md:block "
              >
                SIGN UP
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-3xl bg-cblack-600 py-1 pl-2 pr-4">
              <Avatar src={data.avatar} className="h-9 w-9" />
              <Typography className="font-manrope text-sm font-bold text-slate-200">
                {data.firstName} &nbsp; {data.lastName}
              </Typography>
            </div>
          ))}
      </AppContainer>
    </header>
  );
};

export default memo(AppHeader, () => true);

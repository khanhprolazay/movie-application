import {
  Typography,
  Button,
  IconButton,
  Input,
  Select,
  Option,
  Avatar,
  Drawer,
} from "@material-tailwind/react";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { FC, memo } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import sidebarActions from "@/actions/sidebar.action";
import AppContainer from "./AppContainer";
import { useState } from "react";

const AppHeader: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loading, data } = useAppSelector((state) => state.user);
  const listGenres = useAppSelector((state) => state.genre.data);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const triggerOpen = () => dispatch(sidebarActions.trigger());

  const handleSearch = () => {
    if (searchKeyword.trim() !== "") {
      navigate(`/search?keyword=${searchKeyword}&page=${1}`);
    }
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    } else if (event.key === "Backspace" && searchKeyword === "") {
      console.log("Input null");
    }
  };

  return (
    <>
      <Drawer
        className="flex !h-auto !w-screen flex-col gap-4 p-4 xs:flex-row bg-[#2E323F]"
        placement="top"
        open={showSearch}
        onClose={() => setShowSearch(false)}
      >
        <Input
          variant="outlined"
          autoComplete="off"
          type="search"
          role="search"
          aria-autocomplete="none"
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={handleEnter}
          icon={
            <MagnifyingGlassIcon
              className="text-cred hover:cursor-pointer"
              onClick={handleSearch}
            />
          }
          label="Find movie"
          labelProps={{
            className: "before:border-none after:border-none !text-slate-400",
          }}
          className="border-none !bg-input !text-slate-100"
        />

        <Select
          label="Select genre"
          containerProps={{
            className: "w-full xs:!min-w-[145px] xs:!w-[124px]",
          }}
          menuProps={{
            className: "bg-cblack-700 no-scrollbar",
          }}
          labelProps={{
            className: "before:border-none after:border-none !text-slate-400",
          }}
          arrow={<ChevronDownIcon className="text-cred" />}
          className="border-none !bg-input !text-slate-100 hover:border-none"
        >
          {listGenres.map((genre) => (
            <Option key={genre.name} className="mx-2 my-1 p-0 border-none">
              <Link
                key={genre.name}
                to={`/search?genre=${genre.name}&page=${1}`}
              >
                <Typography className="rounded px-2 text-base font-normal text-slate-100 hover:text-cblack-300">
                  {genre.name}
                </Typography>
              </Link>
            </Option>
          ))}
        </Select>
      </Drawer>
      <header className="sticky left-0 right-0 top-0 z-40 box-border flex h-[60px] items-center justify-between border-b border-divider bg-[#2E323F]">
        <AppContainer className="flex h-full items-center justify-between">
          <div className="flex w-3/5 items-center gap-4">
            <IconButton
              onClick={triggerOpen}
              className="border-cred bg-transparent hover:border-cred"
            >
              <AdjustmentsHorizontalIcon className="h-6 w-6 text-slate-200" />
            </IconButton>

            <IconButton
              onClick={() => setShowSearch(true)}
              className="block bg-transparent hover:border-transparent hover:bg-cblack-300 sm:hidden"
            >
              <MagnifyingGlassIcon className="h-6 w-6 text-cred hover:cursor-pointer" />
            </IconButton>

            <Input
              variant="outlined"
              autoComplete="off"
              type="search"
              role="search"
              aria-autocomplete="none"
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={handleEnter}
              icon={
                <MagnifyingGlassIcon
                  className="text-cred hover:cursor-pointer"
                  onClick={handleSearch}
                />
              }
              label="Find movie"
              labelProps={{
                className:
                  "before:border-none after:border-none !text-slate-400",
              }}
              containerProps={{
                className: "hidden sm:block !w-[478px]",
              }}
              className="border-none !bg-input !text-slate-100"
            />

            <Select
              label="Select genre"
              containerProps={{
                className: "hidden sm:block !min-w-[145px] !w-[124px] -ml-2",
              }}
              menuProps={{
                className: "bg-cblack-700 border-none no-scrollbar",
              }}
              labelProps={{
                className: "before:border-none after:border-none !text-slate-400",
              }}
              arrow={<ChevronDownIcon className="text-cred" />}
              className="border-none !bg-input !text-slate-100 hover:border-none"
            >
              {listGenres.map((genre) => (
                <Option key={genre.name} className="mx-2 my-1 p-0 ">
                  <Link
                    key={genre.name}
                    to={`/search?genre=${genre.name}&page=${1}`}
                  >
                    <Typography className="rounded px-2 text-base font-normal text-slate-100 hover:text-cblack-300">
                      {genre.name}
                    </Typography>
                  </Link>
                </Option>
              ))}
            </Select>
          </div>

          {!loading &&
            (!data ? (
              <div className="flex items-center gap-5">
                <Button
                  size="sm"
                  onClick={() => navigate("/auth/login")}
                  className="rounded-lg !border-none bg-transparent font-manrope text-sm font-semibold normal-case text-slate-400 transition-colors  hover:text-slate-200 "
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
              <div>
                <div
                  className={`hidden w-auto items-center rounded-3xl bg-cblack-600 py-1 pl-2 md:flex ${
                    data.firstName || data.lastName
                      ? "gap-2 pr-4"
                      : "gap-0 pr-2"
                  }`}
                >
                  <Avatar src={data.avatar} className="h-9 w-9" />
                  <Typography className="font-manrope text-sm font-medium text-slate-200">
                    {data.lastName} {data.firstName}
                  </Typography>
                </div>
                <div
                  className={`"pr-4 gap-2" : "pr-2 gap-0"} flex w-auto items-center rounded-3xl bg-cblack-600 px-1 py-1 md:hidden`}
                >
                  <Avatar src={data.avatar} className="h-9 w-9" />
                </div>
              </div>
            ))}
        </AppContainer>
      </header>
    </>
  );
};

export default memo(AppHeader, () => true);

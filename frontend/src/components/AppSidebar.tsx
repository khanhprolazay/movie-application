import authenticationActions from "@/actions/authentication.action";
import sidebarActions from "@/actions/sidebar.action";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TypedDispatch } from "@/redux/store";
import {
  ClockIcon,
  CreditCardIcon,
  HeartIcon,
  HomeIcon,
  IdentificationIcon,
  InformationCircleIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import {
  Card,
  Drawer,
  List,
  ListItem,
  ListItemPrefix,
  Popover,
  PopoverContent,
  PopoverHandler,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { memo, FC, ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AppLogo from "./AppLogo";

const icon = "h-5 w-6";

const locations = [
  "/home",
  "/about-us",
  "/user/profile",
  "/user/favorite",
  "/user/history",
  "/user/subcription",
  "/user/change-password",
];

interface SidebarItemProps {
  to?: string;
  name: string;
  icon: ReactNode;
  selected?: boolean;
  action?: () => void;
  open: boolean;
}

const SidebarItem: FC<SidebarItemProps> = (props) => {
  const [openPopover, setOpentPopver] = useState<boolean>(false);
  const { to, icon, name, selected, open, action } = props;

  const background = selected
    ? `!bg-cred !hover:bg-cred`
    : "!bg-trasparent hover:!bg-transparent";

  const trigger = {
    onMouseEnter: () => !open && setOpentPopver(true),
    onMouseLeave: () => setOpentPopver(false),
  };

  const item = (
    <Popover open={openPopover} placement="left">
      <PopoverHandler {...trigger} onClick={action}>
        <ListItem
          className={`${background} ${selected && "!text-slate-200"
            } transition-color mb-2 w-full flex-1 py-2 font-manrope text-slate-400 ring-cred transition-all duration-300 ease-in-out hover:text-slate-200 hover:ring-[1px] focus:bg-transparent focus:text-slate-400 active:bg-cred/90 active:text-slate-200`}
        >
          <ListItemPrefix className="mr-0 min-h-[26px]">{icon}</ListItemPrefix>
          <Typography
            className={`${!open && "hidden"
              } ml-4 truncate text-sm font-medium  `}
          >
            {name}
          </Typography>
        </ListItem>
      </PopoverHandler>
      <PopoverContent {...trigger} className="z-10 bg-slate-200 py-2">
        {name}
      </PopoverContent>
    </Popover>
  );

  return to ? <Link to={to}>{item}</Link> : item;
};

type SidebarProps = {
  open: boolean;
  currentMenu: number;
  dispatch: TypedDispatch;
};

const Sidebar: FC<SidebarProps> = ({ open, currentMenu }) => {
  const dispatch = useAppDispatch();
  const { loading, data } = useAppSelector((state) => state.user);

  return (
    <Card className="no-scrollbar relative z-10 flex h-screen max-h-screen flex-col overflow-x-hidden rounded-none border-r  border-r-divider bg-cblack-100 shadow-none">
      <Link to="/home">
        <AppLogo
          hidden={!open}
          variant="h5"
          imageProps={{ className: "ml-3 " }}
          textProps={{ className: "left-[54px] top-[6px]" }}
          containerProps={{
            className: "mb-2 !h-[60px] box-border border-b border-divider px-2",
          }}
        />
      </Link>
      <List className={` mx-2 !min-w-0 gap-0 px-1 py-0 `}>
        <SidebarItem
          name="Home"
          to="/home"
          open={open}
          selected={currentMenu === 0}
          icon={<HomeIcon className={icon} />}
        />

        <SidebarItem
          name="About us"
          to="/about-us"
          open={open}
          selected={currentMenu === 1}
          icon={<InformationCircleIcon className={icon} />}
        />

        {/* Check LogIn để show Sidebar */}
        {!loading && data !== null && (
          <>

            <hr className="mb-2 border-divider" />
            
            <SidebarItem
              name="Profile"
              open={open}
              to="/user/profile"
              selected={currentMenu === 2}
              icon={<UserCircleIcon className={icon} />}
            />

            <SidebarItem
              name="Favorite"
              open={open}
              to="/user/favorite"
              selected={currentMenu === 3}
              icon={<HeartIcon className={icon} />}
            />

            <SidebarItem
              name="History"
              open={open}
              to="/user/history"
              selected={currentMenu === 4}
              icon={<ClockIcon className={icon} />}
            />

            <SidebarItem
              open={open}
              name="Subcription"
              to="/user/subcription"
              selected={currentMenu === 5}
              icon={<CreditCardIcon className={icon} />}
            />

            <SidebarItem
              name="Password"
              open={open}
              to="/user/change-password"
              selected={currentMenu === 6}
              icon={<IdentificationIcon className={icon} />}
            />

            <SidebarItem
              to="/home"
              name="Logout"
              open={open}
              action={() => dispatch(authenticationActions.logout())}
              icon={<PowerIcon className={icon} />}
            />
          </>
        )}
      </List>
    </Card>
  );
};

const AppSideBar: FC = () => {
  const dispatch = useAppDispatch();
  const { open } = useAppSelector((state) => state.sidebar);
  const [absolute, setAbsolute] = useState<boolean>(window.innerWidth < 992);

  const { pathname } = useLocation();
  let currentMenu = locations.findIndex((location) => location === pathname);
  if (currentMenu === -1) currentMenu = 0;

  useEffect(() => {
    const handleAbsolute = () => {
      if (window.innerWidth >= 1280) setAbsolute(false);
      else setAbsolute(true);
    };

    window.addEventListener("resize", handleAbsolute);
    return () => window.removeEventListener("resize", handleAbsolute);
  }, []);

  return (
    <aside id="sidebar">
      {absolute ? (
        <Drawer
          className="w-[196px]"
          open={open}
          onClose={() => dispatch(sidebarActions.close())}
        >
          <Sidebar open={true} dispatch={dispatch} currentMenu={currentMenu} />
        </Drawer>
      ) : (
        <div
          className={`${open ? "min-w-[196px] max-w-[196px]" : "min-w-[72px] max-w-[72px]"
            } transition-all`}
        >
          <Sidebar open={open} dispatch={dispatch} currentMenu={currentMenu} />
        </div>
      )}
    </aside>
  );
};

export default memo(AppSideBar, () => true);

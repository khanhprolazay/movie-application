import authenticationActions from "@/actions/authentication.action";
import sidebarActions from "@/actions/sidebar.action";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  ClockIcon,
  CreditCardIcon,
  HeartIcon,
  HomeIcon,
  IdentificationIcon,
  InformationCircleIcon,
  PowerIcon,
  PresentationChartBarIcon,
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
  Typography,
} from "@material-tailwind/react";
import { memo, FC, ReactNode, useState, useRef, useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AppLogo from "./AppLogo";
import useWindowSize from "@/hooks/use-window-size.hook";

const icon = "h-5 w-6";

const locations = [
  "/home",
  "/about-us",
  "/reports",
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
      <PopoverContent {...trigger} className="z-10 py-2">
        {name}
      </PopoverContent>
    </Popover>
  );

  return to ? <Link to={to}>{item}</Link> : item;
};

type SidebarProps = {
  open: boolean;
  currentMenu: number;
};

const Sidebar: FC<SidebarProps> = ({ open, currentMenu }) => {
  const dispatch = useAppDispatch();
  const { loading, data } = useAppSelector((state) => state.user);

  return (
    <Card className="no-scrollbar relative z-10 flex h-screen max-h-screen flex-col overflow-x-hidden rounded-none border-r  border-r-divider bg-transparent shadow-none">
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
              name="Report"
              open={open}
              to="/reports"
              selected={currentMenu === 2}
              icon={<PresentationChartBarIcon className={icon} />}
            />
            
            <SidebarItem
              name="Profile"
              open={open}
              to="/user/profile"
              selected={currentMenu === 3}
              icon={<UserCircleIcon className={icon} />}
            />

            <SidebarItem
              name="Favorite"
              open={open}
              to="/user/favorite"
              selected={currentMenu === 4}
              icon={<HeartIcon className={icon} />}
            />

            <SidebarItem
              name="History"
              open={open}
              to="/user/history"
              selected={currentMenu === 5}
              icon={<ClockIcon className={icon} />}
            />

            <SidebarItem
              open={open}
              name="Subcription"
              to="/user/subcription"
              selected={currentMenu === 6}
              icon={<CreditCardIcon className={icon} />}
            />

            <SidebarItem
              name="Password"
              open={open}
              to="/user/change-password"
              selected={currentMenu === 7}
              icon={<IdentificationIcon className={icon} />}
            />

            <SidebarItem
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
  const size = useWindowSize();
  const firstMountRef = useRef(true);
  const dispatch = useAppDispatch();
  const { open } = useAppSelector((state) => state.sidebar);

  const { pathname } = useLocation();
  let currentMenu = locations.findIndex((location) => location === pathname);
  if (currentMenu === -1) currentMenu = 0;

  useLayoutEffect(() => {
    if (firstMountRef.current) {
      dispatch(sidebarActions.close());
      firstMountRef.current = false;
    }
  }, [])

  return (
    <aside id="sidebar">
      {size.width < 992 ? (
        <Drawer
          className="w-[196px]"
          open={open}
          onClose={() => dispatch(sidebarActions.close())}
        >
          <Sidebar open={true} currentMenu={currentMenu} />
        </Drawer>
      ) : (
        <div
          className={`${open ? "min-w-[196px] max-w-[196px]" : "min-w-[72px] max-w-[72px]"
            } transition-all`}
        >
          <Sidebar open={open} currentMenu={currentMenu} />
        </div>
      )}
    </aside>
  );
};

export default memo(AppSideBar, () => true);

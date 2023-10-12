import { FC, ReactNode, useState, useLayoutEffect } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Avatar,
  Card,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import {
  BookmarkIcon,
  ChevronDoubleRightIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ClockIcon,
  Cog8ToothIcon,
  CreditCardIcon,
  HeartIcon,
  PowerIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import "./animation.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";

const icon = "w-5 h-5";
const text =
  "text-slate-200/95 active:text-white hover:!text-white focus:text-white";

const locations = [
  "/user/save",
  "/user/favorite",
  "/user/history",
  "/user/profile",
  "/user/change-password",
  "/user/subcription",
];

type Level = 1 | 2;
interface SidebarItemProps {
  to?: string;
  name: string;
  icon: ReactNode;
  level?: Level;
  selected?: boolean;
}

const SidebarItem: FC<SidebarItemProps> = (props) => {
  const { to, icon, name, level, selected } = props;

  const background = selected
    ? `bg-teal-500/90 focus:bg-teal-500/90 hover:bg-teal-400`
    : "!bg-[#18191A] hover:bg-[#18191A]";

  const item = (
    <ListItem
      className={`${background} ${text} hover:ring-[1px] hover:ring-teal-400/95 focus:bg-teal-500/95 active:bg-teal-500/90`}
    >
      <ListItemPrefix>{icon}</ListItemPrefix>
      {level === 2 ? <span>{name}</span> : <Typography>{name}</Typography>}
    </ListItem>
  );

  return to ? <Link to={to}>{item}</Link> : item;
};

const Sidebar: FC = () => {
  const navigate = useNavigate();
  const { data, loading } = useAppSelector((state) => state.user);

  // Handle open menu when on mobile
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen((current) => !current);

  // For caculating what menu should open
  const { pathname } = useLocation();
  const currentMenu = locations.findIndex((location) => location === pathname);

  // Handle opening sidebar when on the mobile or tablet
  useLayoutEffect(() => {
    const width = window.innerWidth;
    const main = document.getElementById("main");
    const sidebar = document.getElementById("sidebar");

    const opacity = "opacity-50";
    const appear = "sidebar-appear";
    const hidden = "hidden";
    const disappear = "sidebar-disappear";

    if (width >= 1280) {
      sidebar?.classList.remove(appear);
      sidebar?.classList.remove(disappear);
      return;
    }

    sidebar?.classList.remove(hidden);
    if (open) {
      main?.classList.add(opacity);
      sidebar?.classList.add(appear);
      sidebar?.classList.remove(disappear);
    } else {
      main?.classList.remove(opacity);
      sidebar?.classList.remove(appear);
      sidebar?.classList.add(disappear);
    }
  }, [open]);

  return (
    <>
      <div className="absolute left-0 top-8 block xl:hidden">
        <IconButton onClick={handleOpen} color="teal">
          <ChevronDoubleRightIcon className="h-4 w-4 text-white" />
        </IconButton>
      </div>

      <aside
        id="sidebar"
        className={`fixed top-0 z-20 mb-4 hidden xl:static xl:block`}
      >
        <div className="absolute right-2 top-2 z-20 block xl:hidden">
          <XMarkIcon
            onClick={handleOpen}
            className="h-6 w-6 text-slate-200/50 hover:text-white"
          />
        </div>
        <Card className="no-scrollbar h-screen max-h-screen rounded-none bg-[#18191A] py-4 shadow-none xl:h-[80vh] xl:max-h-[80vh]">
          <List className="min-w-[240px] px-1 pt-0">
            <div className="flex flex-col items-center truncate pb-3 xl:flex-row">
              {loading ? (
                <Spinner className="h-12 w-12" />
              ) : (
                <>
                  <Avatar src={data?.avatar} alt="avatar" />
                  <div className="ml-3">
                    <Typography
                      className="font-manrope text-slate-200"
                      variant="h6"
                    >
                      {`${data?.firstName} ${data?.lastName}`}
                    </Typography>
                    <Typography
                      className="truncate font-manrope font-normal text-slate-200/50"
                      variant="small"
                    >
                      {data?.email}
                    </Typography>
                  </div>
                </>
              )}
            </div>

            <hr className="my-2 border-slate-50/[0.06]" />

            <SidebarItem
              name="Save"
              to="/user/save"
              selected={currentMenu === 0}
              icon={<BookmarkIcon className={icon} />}
            />

            <SidebarItem
              name="Favorite"
              to="/user/favorite"
              selected={currentMenu === 1}
              icon={<HeartIcon className={icon} />}
            />

            <SidebarItem
              name="History"
              to="/user/history"
              selected={currentMenu === 2}
              icon={<ClockIcon className={icon} />}
            />

            <hr className="my-2 border-slate-50/[0.06]" />

            <Accordion open={currentMenu === 3 || currentMenu === 4}>
              <AccordionHeader
                onClick={() => navigate("/user/profile")}
                className={`border-b-transparent p-0 hover:!border-teal-400 hover:border-b-teal-400`}
              >
                <ListItem
                  selected={currentMenu === 3 || currentMenu === 4}
                  className={`-mr-4 bg-transparent hover:!border-transparent hover:!bg-transparent focus:bg-transparent ${text}`}
                >
                  <ListItemPrefix>
                    <UserCircleIcon className={icon} />
                  </ListItemPrefix>

                  <Typography className={`mr-auto ${text}`}>Account</Typography>
                  <ListItemSuffix>
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${
                        currentMenu === 3 || currentMenu === 4
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </ListItemSuffix>
                </ListItem>
              </AccordionHeader>

              <AccordionBody className="py-0">
                <List className="w-[200px] !min-w-[200px] p-1 lg:w-auto lg:min-w-[240px]">
                  <SidebarItem
                    level={2}
                    name="Profile"
                    to="/user/profile"
                    selected={currentMenu === 3}
                    icon={<ChevronRightIcon className={icon} />}
                  />
                  <SidebarItem
                    level={2}
                    name="Password"
                    to="/user/change-password"
                    selected={currentMenu === 4}
                    icon={<ChevronRightIcon className={icon} />}
                  />
                </List>
              </AccordionBody>
            </Accordion>

            <SidebarItem
              name="Subcription"
              to="/user/subcription"
              selected={currentMenu === 5}
              icon={<CreditCardIcon className={icon} />}
            />

            <SidebarItem
              name="Setting"
              icon={<Cog8ToothIcon className={icon} />}
            />

            <SidebarItem name="Logout" icon={<PowerIcon className={icon} />} />
          </List>
        </Card>
      </aside>
    </>
  );
};

export default Sidebar;
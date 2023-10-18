import React from "react";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
    List,
    ListItem,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Chip,
} from "@material-tailwind/react";
import {
    ChevronDownIcon,
    UserCircleIcon,
    CubeTransparentIcon,
    Bars3Icon,
    XMarkIcon,
    FlagIcon,
    ChatBubbleOvalLeftIcon,
    UsersIcon,
    FolderIcon,
    Square3Stack3DIcon,
    RocketLaunchIcon,
    FaceSmileIcon,
    PuzzlePieceIcon,
    GiftIcon,
    GiftTopIcon,
} from "@heroicons/react/24/outline";
import { HomeIcon, InformationCircleIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

const colors = {
    blue: "bg-blue-50 text-blue-500",
    orange: "bg-orange-50 text-orange-500",
    green: "bg-green-50 text-green-500",
    "blue-gray": "bg-blue-gray-50 text-blue-gray-500",
    purple: "bg-purple-50 text-purple-500",
    teal: "bg-teal-50 text-teal-500",
    cyan: "bg-cyan-50 text-cyan-500",
    pink: "bg-pink-50 text-pink-500",
};

const navListMenuItems = [
    {
        color: "pink",
        icon: GiftIcon,
        title: "Top",
        description: "Top 10 Best Movies."
    },
    {
        color: "blue",
        icon: FlagIcon,
        title: "Action",
        description: "Top 10 Action Movies.",
    },
    {
        color: "orange",
        icon: ChatBubbleOvalLeftIcon,
        title: "Adventure",
        description: "Top 10 Adventure Movies.",
    },
    {
        color: "green",
        icon: UsersIcon,
        title: "Science Fiction",
        description: "Top 10 Adventure Movies.",
    },
    {
        color: "blue-gray",
        icon: FolderIcon,
        title: "Romantic",
        description: "Top 10 Romantic Movies.",
    },
    {
        color: "purple",
        icon: RocketLaunchIcon,
        title: "Comedy",
        description: "Top 10 Comedy Movies.",
    },
    {
        color: "teal",
        icon: FaceSmileIcon,
        title: "Thriller",
        description: "Top 10 Thriller Movies.",
    },
    {
        color: "cyan",
        icon: PuzzlePieceIcon,
        title: "Detective",
        description: "Top 10 Detective Movies.",
    },
];

function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const renderItems = navListMenuItems.map(
        ({ icon, title, description, color }, key) => (
            <a href="#" key={key}>
                <MenuItem className="flex items-center gap-3 rounded-lg bg-white">
                    <div className={`rounded-lg p-5 ${(colors as any)[color]}`}>
                        {React.createElement(icon, {
                            strokeWidth: 2,
                            className: "h-6 w-6",
                        })}
                    </div>
                    <div>
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="flex items-center text-sm"
                        >
                            {title}
                        </Typography>
                        <Typography variant="small" color="gray" className="font-normal">
                            {description}
                        </Typography>
                    </div>
                </MenuItem>
            </a>
        )
    );

    return (
        <React.Fragment>
            <Menu
                open={isMenuOpen}
                handler={setIsMenuOpen}
                offset={{ mainAxis: 20 }}
                placement="bottom"
                allowHover={true}
            >
                <MenuHandler>
                    <Typography as="div" variant="small" className=" text-orange-500 text-xl font-semibold font-manrope hover:text-white">
                        <ListItem
                            className="flex items-center gap-2 py-2 pr-4"
                            selected={isMenuOpen || isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen((cur) => !cur)}
                        >
                            <Square3Stack3DIcon className="h-[20px] w-[20px] font-semibold" />
                            Top Movies
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
                                    }`}
                            />
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </ListItem>
                    </Typography>
                </MenuHandler>
                <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
                    <ul className="grid grid-cols-4 gap-y-2">{renderItems}</ul>
                </MenuList>
            </Menu>
            <div className="block lg:hidden">
                <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
            </div>
        </React.Fragment>
    );
}

function NavList() {


    return (
        <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1 gap-7">
            {/* <Typography
                as="a"
                href="/"
                variant="small"
                color="blue-gray"
                className="font-normal"
            >
                <ListItem className="flex items-center gap-2 py-2 pr-4 text-orange-500 text-xl font-semibold font-manrope hover:text-white">
                    <HomeIcon className="h-[20px] w-[20px] font-semibold" />
                    Home
                </ListItem>
            </Typography> */}
            <NavListMenu />
            <Typography
                as="a"
                href="/aboutus"
                variant="small"
                color="blue-gray"
                className="font-normal"
            >
                <ListItem className="flex items-center gap-2 py-2 pr-4 text-orange-500 text-xl font-semibold font-manrope hover:text-white">
                    <InformationCircleIcon className="h-[20px] w-[20px] font-semibold" />
                    About us
                </ListItem>
            </Typography>
        </List>
    );
}

export function Header() {
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    const navigate = useNavigate()

    const hanldeSignIn = () => {
        navigate("/auth/login")
    }

    const hanldeSignUp = () => {
        navigate("/auth/register")
    }

    const handleHome = () => {
        navigate("/")
    }

    return (
        <Navbar className="max-w-screen-2xl px-16 py-1 bg-green-800 rounded-none border-none z-10">
            <div className="flex items-center justify-between">
                <a className="text-2xl font-manrope font-extrabold hover:cursor-pointer text-red-600" onClick={handleHome}>
                    T.M.T Movies
                </a>
                <div className="hidden lg:block">
                    <NavList />
                </div>
                <div className="hidden gap-5 lg:flex mr-5">
                    <Button size="sm" className="text-gray-800 bg-slate-200 text-sm font-manrope px-2" onClick={hanldeSignIn}>
                        Sign In
                    </Button>
                    <Button size="sm" className="text-white bg-slate-800 text-sm font-manrope px-2" onClick={hanldeSignUp}>
                        Sign Up
                    </Button>
                </div>
                <IconButton
                    variant="text"
                    color="blue-gray"
                    className="lg:hidden"
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}
                </IconButton>
            </div>
        </Navbar>
    );
}
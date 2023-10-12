

// export const Navbar = () => {
//     return (
//         <div className="w-full h-14 bg-green-700 flex items-center z-10" >
//             <a href="#" className="hover:cursor-pointer hover:text-red-600 text-white text-sm lg:text-lg xl:text-xl 2xl:text-2xl" style={{ marginLeft: "10%" }}>Home</a>
//             <a href="#" className="hover:cursor-pointer hover:text-red-600 text-white text-sm lg:text-lg xl:text-xl 2xl:text-2xl" style={{ marginLeft: "3%" }}>Top Films</a>
//             <a href="#" className="hover:cursor-pointer hover:text-red-600 text-white text-sm lg:text-lg xl:text-xl 2xl:text-2xl" style={{ marginLeft: "3%" }}>About</a>
//             <button className="bg-red-700 text-sm hover:bg-green-500 lg:text-lg xl:text-xl 2xl:text-2xl px-2 py-0.5 ml-auto" >Sign In</button>
//             <button className="bg-red-700 text-sm hover:bg-green-500 lg:text-lg xl:text-xl 2xl:text-2xl px-2 py-0.5 ml-5" style={{ marginRight: "10%" }}>Sign Up</button>
//         </div>

//     );
// };




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
} from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/20/solid";

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
        color: "blue",
        icon: FlagIcon,
        title: "About us",
        description: "Learn about our story and our mission statement.",
    },
    {
        color: "orange",
        icon: ChatBubbleOvalLeftIcon,
        title: "Press",
        description: "News and writings, press releases, and resources",
    },
    {
        color: "green",
        icon: UsersIcon,
        title: (
            <div className="flex items-center gap-1">
                Careers{" "}
                <Chip
                    size="sm"
                    color="green"
                    variant="ghost"
                    value="We're hiring!"
                    className="capitalize"
                />
            </div>
        ),
        description: "We are always looking for talented people. Join us!",
    },
    {
        color: "blue-gray",
        icon: FolderIcon,
        title: "Legal",
        description: "All the stuff that we dan from legal made us add.",
    },
    {
        color: "purple",
        icon: RocketLaunchIcon,
        title: "Products",
        description: "Checkout our products that helps a startup running.",
    },
    {
        color: "teal",
        icon: FaceSmileIcon,
        title: "Icons",
        description: "Set of beautiful icons that you can use in your project.",
    },
    {
        color: "cyan",
        icon: PuzzlePieceIcon,
        title: "UI Kits",
        description: "High quality UI Kits helps you to 2x faster.",
    },
    {
        color: "pink",
        icon: GiftIcon,
        title: "Open Source",
        description: "List of all our open-source projects, it's all free.",
    },
];

function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const renderItems = navListMenuItems.map(
        ({ icon, title, description, color }, key) => (
            <a href="#" key={key}>
                <MenuItem className="flex items-center gap-3 rounded-lg">
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
                    <Typography as="div" variant="small" className=" text-orange-500 text-2xl font-semibold font-manrope hover:text-white">
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
            <Typography
                as="a"
                href="#"
                variant="small"
                color="blue-gray"
                className="font-normal"
            >
                <ListItem className="flex items-center gap-2 py-2 pr-4 text-orange-500 text-2xl font-semibold font-manrope hover:text-white">
                    <HomeIcon className="h-[20px] w-[20px] font-semibold" />
                    Home
                </ListItem>
            </Typography>
            <NavListMenu />
            <Typography
                as="a"
                href="#"
                variant="small"
                color="blue-gray"
                className="font-normal"
            >
                <ListItem className="flex items-center gap-2 py-2 pr-4 text-orange-500 text-2xl font-semibold font-manrope hover:text-white">
                    <UserCircleIcon className="h-[20px] w-[20px] font-semibold" />
                    About us
                </ListItem>
            </Typography>
        </List>
    );
}

export function NavbarWithMegaMenu() {
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    return (
        <Navbar className="max-w-screen-2xl px-10 py-4 bg-green-800 rounded-none border-none z-10">
            <div className="flex items-center justify-between">
                <Typography className="text-4xl font-manrope font-extrabold">
                    T.M.T Movies
                </Typography>
                <div className="hidden lg:block">
                    <NavList />
                </div>
                <div className="hidden gap-5 lg:flex mr-5">
                    <Button size="lg" className="text-gray-800 bg-slate-200 text-base font-manrope">
                        Sign In
                    </Button>
                    <Button size="lg" className="text-white bg-slate-800 text-base font-manrope">
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
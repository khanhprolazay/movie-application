import React from 'react';
import { Role } from './roles';

const AboutUsPage = React.lazy(() => import("./pages/home/about.us.page").then((AboutUsPage ) => AboutUsPage  ));
const MoviePage = React.lazy(() => import("./pages/home/movie.page").then(( MoviePage) => MoviePage ));
const HomePage = React.lazy(() => import("./pages/home/home.page").then(( HomePage ) => HomePage ));
const SearchPage = React.lazy(() => import("./pages/home/search.page").then(( SearchPage ) => SearchPage ));
const WatchPage = React.lazy(() => import("./pages/home/watch.page").then(( WatchPage ) => WatchPage ));

const ProfileForm = React.lazy(() => import("./pages/user/profile/profile-form").then(( ProfileForm ) => ProfileForm ));
const ChangePasswordForm = React.lazy(() => import("./pages/user/profile/change-password-form").then(( ChangePasswordForm ) => ChangePasswordForm ));
const HistoryPage = React.lazy(() => import("./pages/user/history/index").then(( HistoryPage ) =>  HistoryPage));

type RouteType = {
  path: string,
  name: string,
  element: any,
  login: boolean,
  accessible: Role[],
}

const routes: RouteType[] = [
  {
    path: "/home",
    name: "Home",
    login: false,
    element: HomePage,
    accessible: ["ALL"],
  },
  {
    path: "/about-us",
    name: "About us",
    login: false,
    element: AboutUsPage,
    accessible: ["ALL"],
  },
  {
    path: "/search",
    name: "Search",
    login: false,
    element: SearchPage,
    accessible: ["ALL"]
  },
  {
    path: "/movie/:id",
    name: "Detail",
    login: false,
    element: MoviePage,
    accessible: ["ALL"],
  },
  {
    path: "/watch/:id",
    name: "Watch",
    login: true,
    element: WatchPage,
    accessible: ["ALL"],
  },

  {
    path: "/user/profile",
    name: "Profile",
    element: ProfileForm,
    login: true,
    accessible: ["ALL"],
  },
  {
    path: "/user/change-password",
    name: "Password",
    element: ChangePasswordForm,
    login: true,
    accessible: ["ALL"],
  },
  {
    path: "/user/history",
    name: "History",
    element: HistoryPage,
    login: true,
    accessible: ["ALL"]
  },
  {
    path: "/user/subcription",
    name: "Subcription",
    element: ProfileForm,
    login: true,
    accessible: ["ALL"]
  },
  {
    path: "/user/favorite",
    name: "Favorite",
    element: ProfileForm,
    login: true,
    accessible: ["ALL"],
  },
  {
    path: "/user/setting",
    name: "Setting",
    element: ProfileForm,
    login: true,
    accessible: ["ALL"],
  },
]

export const getRoutersWithRole = (login: boolean, role: Exclude<Role, "ALL">) : RouteType[] => 
  !login 
    ? routes.filter(route => !route.login) 
    : routes.filter(route => route.accessible.includes("ALL") || route.accessible.includes(role))


export default routes;
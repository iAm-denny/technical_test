import Home from "./pages/Home/Home";
import Work from "./pages/Work/Work";

export const routes = [
  {
    path: "/",
    key: "HOME",
    title: "Home",
    exact: true,
    component: Home,
  },
  {
    path: "/work/:id",
    key: "WORK",
    title: "Work",
    exact: true,
    component: Work,
  },
];

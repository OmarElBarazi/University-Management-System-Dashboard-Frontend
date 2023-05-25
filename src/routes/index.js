import { lazy } from "react";

//INDEX
import Staff from "../pages/staff";
import Student from "../pages/student";
import Course from "../pages/course";
import TimeTable from "../pages/timetable";
import Transcript from "../pages/transcript";

//UPDATE

// use lazy for better code splitting, a.k.a. load faster
const Page404 = lazy(() => import("../pages/404"));

const routes = [
  {
    path: "/Staff",
    component: Staff,
    roles: ["admin"],
  },
  {
    path: "/Student",
    component: Student,
    roles: ["admin", "staff"],
  },
  {
    path: "/Course",
    component: Course,
    roles: ["admin", "staff", "student"],
  },
  {
    path: "/TimeTable",
    component: TimeTable,
    roles: ["admin", "staff", "student"],
  },
  {
    path: "/Transcript",
    component: Transcript,
    roles: ["admin", "staff", "student"],
  },
  {
    path: "/404",
    component: Page404,
    roles: ["admin", "staff", "student"],
  },
];

export default routes;

import { lazy } from "react";

//INDEX
import Staff from "../pages/staff";
import Student from "../pages/student";
import Meeting from "../pages/meeting";
import Course from "../pages/course";
import TimeTable from "../pages/timetable";
import Transcript from "../pages/transcript";

//CREATE
import StaffForm from "../pages/staff/StaffForm";
import StudentForm from "../pages/student/StudentForm";
import CourseForm from "../pages/course/CourseForm";
import TranscriptForm from "../pages/transcript/TranscriptForm";

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
    path: "/Staff/Form",
    component: StaffForm,
    roles: ["admin"],
  },
  {
    path: "/Student",
    component: Student,
    roles: ["admin", "staff"],
  },
  {
    path: "/Student/Create",
    component: StudentForm,
    roles: ["admin"],
  },
  {
    path: "/Meeting",
    component: Meeting,
    roles: ["staff"],
  },
  {
    path: "/Course",
    component: Course,
    roles: ["admin", "staff"],
  },
  {
    path: "/Course/Create",
    component: CourseForm,
    roles: ["admin"],
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
    path: "/Transcript",
    component: Transcript,
    roles: ["admin", "staff", "student"],
  },
  {
    path: "/Transcript/Create",
    component: TranscriptForm,
    roles: ["admin", "staff"],
  },
  {
    path: "/404",
    component: Page404,
    roles: ["admin", "staff", "student"],
  },
];

export default routes;

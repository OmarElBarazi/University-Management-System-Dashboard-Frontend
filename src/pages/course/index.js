import React from "react";

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PageTitle from "../../components/Typography/PageTitle";
import GeneralTable from "../GeneralTable";

import { Button } from "@windmill/react-ui";

import {
  getCourse,
  getCourseStaff,
  createCourse,
} from "../../redux/actions/courseActions";

function Course() {
  const dispatch = useDispatch();

  const user = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  // Determine if the user role is admin, staff, or student
  const isAdmin = user && user.role === "admin";
  const isStaff = user && user.role === "staff";
  const isStudent = user && user.role === "student";

  const courseGet = useSelector((state) => state.courseGet);
  const { courses } = courseGet;

  const courseGetStaff = useSelector((state) => state.courseGetStaff);
  const { courses_staff } = courseGetStaff;

  const courseCreate = useSelector((state) => state.courseCreate);
  const { course_create } = courseCreate;

  const columns = [
    { label: "Code", id: "code" },
    { label: "Description", id: "description" },
    { label: "Credits", id: "credits" },
    { label: "Instructor", id: "instructor" },
    { label: "Day", id: "day" },
    { label: "Start ", id: "start" },
    { label: "End", id: "end" },
  ];

  //State for the rows of data
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (user.role === "admin") {
      dispatch(getCourse());
    } else if (user.role === "staff") {
      dispatch(getCourseStaff(user._id));
    } else setRows([]);
  }, [dispatch, course_create]);

  useEffect(() => {
    if (courses && user.role === "admin") {
      const course = courses.map((course) => {
        const { instructor, ...rest } = course;
        return {
          ...rest,
          instructor: instructor.name + " " + instructor.surname,
        };
      });
      setRows(course);
    } else if (courses_staff && user.role === "staff") {
      const course = courses_staff.map((course) => {
        const { instructor, ...rest } = course;
        return {
          ...rest,
          instructor: instructor.name + " " + instructor.surname,
        };
      });
      setRows(course);
    }
  }, [courses, courses_staff]);
  return (
    <>
      <div className="flex flex-row justify-between ">
        {isAdmin && <PageTitle>Course Page</PageTitle>}
        {isStaff ? (
          user ? (
            <PageTitle>
              Courses Given By Staff Member {user.name.toUpperCase()}{" "}
              {user.surname.toUpperCase()}
            </PageTitle>
          ) : (
            <PageTitle>User data still didn't render.</PageTitle>
          )
        ) : null}
        {user.role === "admin" && (
          <Button
            className="my-8 text-l font-semibold"
            tag={Link}
            to="/app/Course/Create"
          >
            Create Course
          </Button>
        )}
      </div>
      <GeneralTable columns={columns} rows={rows} />
    </>
  );
}

export default Course;

import React from "react";

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PageTitle from "../../components/Typography/PageTitle";
import GeneralTable from "../GeneralTable";

import { Button } from "@windmill/react-ui";

import { getCourse, getCourseStaff } from "../../redux/actions/courseActions";

function Course() {
  const dispatch = useDispatch();

  const user = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const courseGet = useSelector((state) => state.courseGet);
  const { courses } = courseGet;

  const courseGetStaff = useSelector((state) => state.courseGetStaff);
  const { courses_staff } = courseGetStaff;

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
  }, [dispatch]);

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
      setRows(courses_staff);
    }
  }, [courses, courses_staff]);
  return (
    <>
      <div className="flex flex-row justify-between ">
        <PageTitle>Course</PageTitle>
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

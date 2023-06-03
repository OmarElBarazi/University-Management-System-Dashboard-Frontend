import React from "react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import {
  getTimeTable,
  updateTimeTableCourses,
  updateTimeTableConfirmation,
} from "../../redux/actions/timeTableActions";

import { getTakenCourses } from "../../redux/actions/transcriptActions";

import { getCourse } from "../../redux/actions/courseActions";

import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";

import { Button } from "@windmill/react-ui";

import Schedule from "./Schedule";
import GeneralTable from "../GeneralTable";

function TimeTable() {
  const dispatch = useDispatch();

  const location = useLocation();

  const user = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  // Determine if the user role is admin, staff, or student
  const isAdmin = user && user.role === "admin";
  const isStaff = user && user.role === "staff";
  const isStudent = user && user.role === "student";

  const state = location.state;

  const student = state?.state.student || null;

  const columns1 = [
    { label: "Code", id: "code" },
    { label: "Credits", id: "credits" },
    { label: "Grade", id: "grade" },
  ];

  const columns2 = [
    { label: "CRS. Code", id: "code" },
    { label: "Description", id: "description" },
    { label: "Advisor", id: "instructor" },
    { label: "Credits", id: "credits" },
    { label: "Start Time", id: "start" },
    { label: "End Time", id: "end" },
  ];

  const [scheduleData, setScheduleData] = useState([]);
  const [rows1, setRows1] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [confirmed, setConfirmed] = useState("false");
  const [filteredCourses, setFilteredCourses] = useState([]);

  const timeTableGet = useSelector((state) => state.timeTableGet);
  const { timetable } = timeTableGet;

  const timeTableUpdateCourses = useSelector(
    (state) => state.timeTableUpdateCourses
  );
  const { timetable_courses } = timeTableUpdateCourses;

  const timeTableUpdateConfirmation = useSelector(
    (state) => state.timeTableUpdateConfirmation
  );
  const { timetable_confirm } = timeTableUpdateConfirmation;

  const transcriptGetTakenCourses = useSelector(
    (state) => state.transcriptGetTakenCourses
  );
  const { courses_taken } = transcriptGetTakenCourses;

  const courseGet = useSelector((state) => state.courseGet);
  const { courses } = courseGet;

  useEffect(() => {
    if (student) {
      dispatch(getTimeTable(student._id));
      dispatch(getCourse());
      dispatch(getTakenCourses(student._id));
    }
    if (user && user.role === "student") {
      dispatch(getTimeTable(user._id));
      dispatch(getCourse());
      dispatch(getTakenCourses(user._id));
    }
  }, [dispatch, timetable_courses, timetable_confirm]);

  useEffect(() => {
    if (
      (student || (user && user.role === "student")) &&
      courses &&
      courses_taken
    ) {
      if (timetable) {
        const currentCourses = timetable.schedule.map((course) => {
          const { instructor, ...rest } = course;
          return {
            ...rest,
            instructor: instructor.name + " " + instructor.surname,
          };
        });
        const idSetTakenCourses = new Set(courses_taken.map((obj) => obj._id));
        const idSetCurrentCourses = new Set(
          currentCourses.map((obj) => obj._id)
        );

        const filteredTakenFromCourses = courses.filter(
          (obj) => !idSetTakenCourses.has(obj._id)
        );
        const filteredCurrentFromCourses = filteredTakenFromCourses.filter(
          (obj) => !idSetCurrentCourses.has(obj._id)
        );

        setFilteredCourses(filteredCurrentFromCourses);
        setRows1(filteredCurrentFromCourses);
        setRows2(currentCourses);
        setScheduleData(timetable.schedule);
        setConfirmed(timetable.confirm);
      }
    }
  }, [courses, timetable, timetable_courses]);

  const handleAddCourses = (courseId) => {
    const coursesToAdd = [courseId];
    const coursesToRemove = [];
    let id = "";
    if (user && user.role === "student") {
      id = user._id;
    } else {
      id = student._id || "";
    }
    dispatch(updateTimeTableCourses(id, coursesToAdd, coursesToRemove));
  };

  const handleRemoveCourses = (courseId) => {
    const coursesToAdd = [];
    const coursesToRemove = [courseId];
    let id = "";
    if (user && user.role === "student") {
      id = user._id;
    } else {
      id = student._id || "";
    }
    dispatch(updateTimeTableCourses(id, coursesToAdd, coursesToRemove));
  };

  const handleConfirmationUpdate = () => {
    const confirm = !confirmed;
    if (student && isStaff && timetable) {
      const id = timetable._id;
      dispatch(updateTimeTableConfirmation(id, confirm));
    }
  };

  return (
    <>
      {isStudent && (
        <PageTitle>TimeTable for {user.name + " " + user.surname}</PageTitle>
      )}
      {isStaff ? (
        student ? (
          <div className="flex flex-row justify-between ">
            <PageTitle>
              TimeTable for {student.name.toUpperCase()}{" "}
              {student.surname.toUpperCase()} with ID {student.studentId}
            </PageTitle>
            {timetable ? (
              timetable.confirm === false ? (
                <Button
                  className="my-8 text-l font-semibold "
                  onClick={handleConfirmationUpdate}
                >
                  Confirm Courses
                </Button>
              ) : (
                <Button
                  className="my-8 text-l font-semibold "
                  onClick={handleConfirmationUpdate}
                >
                  Unconfirm Courses
                </Button>
              )
            ) : (
              <Button className="my-8 text-l font-semibold ">Loading</Button>
            )}
          </div>
        ) : (
          <div className="mt-6">
            <SectionTitle>
              To access the time table of a student, use the student page, click
              on time table button.
            </SectionTitle>
          </div>
        )
      ) : null}
      {isAdmin ? (
        student ? (
          <PageTitle>
            TimeTable for {student.name.toUpperCase()}{" "}
            {student.surname.toUpperCase()} with ID {student.studentId}
          </PageTitle>
        ) : (
          <div className="mt-6">
            <SectionTitle>
              To access the time table of a student, use the student page, click
              on time table button.
            </SectionTitle>
          </div>
        )
      ) : null}
      <div>
        <div className="flex space-x-4">
          <Schedule data={scheduleData} />
          {confirmed === false && (
            <div>
              <GeneralTable
                columns={columns1}
                rows={rows1}
                timeTable1={true}
                timeTable2={false}
                handleAddCourseInTimeTable={handleAddCourses}
              />
            </div>
          )}
        </div>
        <div className="mt-6 w-full">
          <PageTitle>Current Semester Courses</PageTitle>
          <GeneralTable
            columns={columns2}
            rows={rows2}
            timeTable1={false}
            timeTable2={true}
            handleRemoveCourseFromTimeTable={handleRemoveCourses}
          />
        </div>
      </div>
    </>
  );
}

export default TimeTable;

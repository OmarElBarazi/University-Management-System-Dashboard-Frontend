import React from "react";

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PageTitle from "../../components/Typography/PageTitle";
import GeneralTable from "../GeneralTable";

import { Button, Alert } from "@windmill/react-ui";

import {
  createUser,
  getStudent,
  getStudentByStaff,
} from "../../redux/actions/userActions";

function Student() {
  const dispatch = useDispatch();

  const history = useHistory();

  const location = useLocation();

  const user = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  //Checked students data
  const state = location.state;

  const students = state?.state.students || null;

  // Determine if the user role is admin, staff, or student
  const isAdmin = user && user.role === "admin";
  const isStaff = user && user.role === "staff";
  const isStudent = user && user.role === "student";

  const studentGet = useSelector((state) => state.studentGet);
  const { student } = studentGet;

  const studentGetByStaff = useSelector((state) => state.studentGetByStaff);
  const { student_staff } = studentGetByStaff;

  const userCreateAccount = useSelector((state) => state.userCreateAccount);
  const { user_create_account } = userCreateAccount;

  //Static columns for the students
  const columns = [
    { label: "Name", id: "name" },
    { label: "Surname", id: "surname" },
    { label: "Student Id", id: "studentId" },
    { label: "Email", id: "email" },
    { label: "Role", id: "role" },
    { label: "Advisor", id: "advisor" },
    { label: "Start Date", id: "startDate" },
    { label: "Year", id: "year" },
    { label: "semester", id: "semester" },
  ];

  //State for the rows of data
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (user.role === "admin") {
      dispatch(getStudent());
    } else if (user.role === "staff") {
      dispatch(getStudentByStaff(user._id));
    } else setRows([]);
  }, [dispatch, user_create_account]);

  useEffect(() => {
    if (student && user.role === "admin") {
      const students = student.map((student) => {
        const { advisor, ...rest } = student;
        return {
          ...rest,
          advisor: advisor.name + " " + advisor.surname,
        };
      });
      setRows(students);
    } else if (student_staff && user.role === "staff") {
      const students = student_staff.map((student) => {
        const { advisor, ...rest } = student;
        return {
          ...rest,
          advisor: advisor.name + " " + advisor.surname,
        };
      });
      setRows(students);
    }
  }, [student, student_staff]);

  //Handle scheduling meeting button
  const [showAlert, setShowAlert] = useState(false);

  const handleMeetingSchedulerButton = () => {
    if (students.length > 0) {
      const state = { students: students };
      history.push("/app/Meeting", { state: state });
    } else {
      alert(
        "Please select students to find the available time for scheduling a meeting between them."
      );
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        {isAdmin && <PageTitle>Student Page</PageTitle>}
        {isStaff ? (
          user ? (
            <PageTitle>
              Student for Staff Member {user.name.toUpperCase()}{" "}
              {user.surname.toUpperCase()}
            </PageTitle>
          ) : (
            <PageTitle>User data still didn't render.</PageTitle>
          )
        ) : null}
        {isStaff && (
          <Button
            className="my-8 text-l font-semibold"
            onClick={() => {
              handleMeetingSchedulerButton();
            }}
          >
            Meeting Scheduler
          </Button>
        )}
        {isAdmin && (
          <Button
            className="my-8 text-l font-semibold"
            tag={Link}
            to="/app/Student/Create"
          >
            Add Student
          </Button>
        )}
      </div>
      <GeneralTable columns={columns} rows={rows} />
    </>
  );
}

export default Student;

import React from "react";

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PageTitle from "../../components/Typography/PageTitle";
import GenralTable from "../GeneralTable";

import { Button } from "@windmill/react-ui";

import {
  createUser,
  getStudent,
  getStudentByStaff,
} from "../../redux/actions/userActions";

function Student() {
  const dispatch = useDispatch();

  const user = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const studentGet = useSelector((state) => state.studentGet);
  const { student } = studentGet;

  const studentGetByStaff = useSelector((state) => state.studentGetByStaff);
  const { student_staff } = studentGetByStaff;

  //Static columns for the students
  const columns = [
    { label: "Name", id: "name" },
    { label: "Surname", id: "surname" },
    { label: "Student Id", id: "studentId" },
    { label: "Email", id: "email" },
    { label: "Role", id: "role" },
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
  }, [dispatch]);

  useEffect(() => {
    if (student && user.role === "admin") {
      const students = student.map((student) => {
        const { advisor, ...rest } = student;
        return {
          ...rest,
          advisor: advisor.name + " " + advisor.surname,
        };
      });
      console.log(students);
      setRows(students);
    } else if (student_staff && user.role === "staff") {
      setRows(student_staff);
    }
  }, [student, student_staff]);

  return (
    <>
      <div className="flex flex-row justify-between ">
        <PageTitle>Student</PageTitle>
        {user.role === "admin" && (
          <Button
            className="my-8 text-l font-semibold"
            tag={Link}
            to="/app/Student/Create"
          >
            Create Student
          </Button>
        )}
      </div>
      <GenralTable columns={columns} rows={rows} />
    </>
  );
}

export default Student;

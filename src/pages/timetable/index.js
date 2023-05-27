import React from "react";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import PageTitle from "../../components/Typography/PageTitle";

import Schedule from "./Schedule";
import GeneralTable from "../GeneralTable";

function TimeTable() {
  const dispatch = useDispatch();

  const user = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

  // const studentGet = useSelector((state) => state.studentGet);
  // const { student } = studentGet;

  // const studentGetByStaff = useSelector((state) => state.studentGetByStaff);
  // const { student_staff } = studentGetByStaff;


  const columns = [
    { label: "Code", id: "code" },
    { label: "Credits", id: "credits" },
    { label: "Grade", id: "grade" },
  ];

  return (
    <>
      <PageTitle>TimeTable</PageTitle>
      <div className="flex flex-row space-x-4 w-full">
        <div className="w-full">
          <Schedule />
        </div>
        <div className="w-1/4">
          <GeneralTable columns={columns} rows={[]} />
        </div>
      </div>
    </>
  );
}

export default TimeTable;

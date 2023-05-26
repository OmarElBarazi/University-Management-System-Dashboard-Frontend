import React from "react";

import PageTitle from "../../components/Typography/PageTitle";
import Schedule from "./Schedule";
import GeneralTable from "../GeneralTable";

function TimeTable() {
  const columns = [
    { label: "Code", id: "code" },
    // { label: "Description", id: "description" },
    { label: "Credits", id: "credits" },
    // { label: "Instructor", id: "instructor" },
    // { label: "Day", id: "day" },
    // { label: "Start ", id: "start" },
    // { label: "End", id: "End" },
  ];
  const rows = [
    {
      _id: "646942b75edb1d32d03f1664",
      code: "COMP101",
      description: "Introduction to Computer Science",
      credits: 3,
      instructor: "64693ccf4c20dca92132c863",
      available: false,
      day: "Monday",
      time: "10:00 AM",
      __v: 0,
    },
    {
      _id: "646942d05edb1d32d03f1667",
      code: "MATH201",
      description: "Calculus I",
      credits: 4,
      instructor: "64693ccf4c20dca92132c863",
      available: true,
      day: "Wednesday",
      time: "2:00 PM",
      __v: 0,
    },
    {
      _id: "646a2dfbd4b607be3cfaa3f3",
      code: "CHEM101",
      description: "Introduction to Chemistry",
      credits: 3,
      instructor: "64693ccf4c20dca92132c863",
      available: false,
      day: "Thursday",
      time: "1:00 PM",
      __v: 0,
    }
  ];
  return (
    <>
      <PageTitle>TimeTable</PageTitle>
      <div className="flex flex-row space-x-4 w-full">
        <div className="w-full">
          <Schedule />
        </div>
        <div className="w-1/4">
          <GeneralTable columns={columns} rows={rows} />
        </div>
      </div>
    </>
  );
}

export default TimeTable;

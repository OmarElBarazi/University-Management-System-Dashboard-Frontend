import React from "react";

import PageTitle from "../../components/Typography/PageTitle";
import UserTable from "../UserTable";

function Student() {
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

  const rows = [
    {
      _id: "64693b9037c41326269bebfa",
      name: "Malek",
      surname: "Kahteeb",
      password: "$2b$10$XbsxcUusKVmH3LGQatNGSeqVYrktx.VGwL08qBN22Kt3QQwohVxWq",
      email: "malek@example.com",
      role: "student",
      advisor: "64693440c6045aa282a4362d",
      startDate: "01/01/2023",
      year: 2023,
      semester: "spring",
      studentId: 23000001,
      __v: 0,
    },
    {
      _id: "64693bb037c41326269bec02",
      name: "Nabil",
      surname: "Kahteeb",
      password: "$2b$10$JufJderMefNDvY.DLAwfQ.oo4TZgDnkJ5gH/YbI1ec0qKtu0e97wO",
      email: "nabil@example.com",
      role: "student",
      advisor: "64693440c6045aa282a4362d",
      startDate: "01/01/2023",
      year: 2023,
      semester: "spring",
      studentId: 23000002,
      __v: 0,
    },
    {
      _id: "64693bc637c41326269bec0a",
      name: "Omar",
      surname: "Kahteeb",
      password: "$2b$10$Tg.pj7Xg5LYQXANED4AqvOj5P0HKgGmNhqpoLoIb/Oz9PsKhfy2Pa",
      email: "omar@example.com",
      role: "student",
      advisor: "64693440c6045aa282a4362d",
      startDate: "01/01/2023",
      year: 2023,
      semester: "spring",
      studentId: 23000003,
      __v: 0,
    },
    {
      _id: "646d2244bb8b1f5a19b0f8b9",
      name: "Samir",
      surname: "Kahteeb",
      password: "$2b$10$dwLnwMExdw7gXEQb/OE1QeBqur17NwDZGG3FF0E9GA/qPkVXjHA5a",
      email: "samir@example.com",
      role: "student",
      advisor: "64693440c6045aa282a4362d",
      startDate: "01/01/2023",
      year: 2023,
      semester: "spring",
      studentId: 23000004,
      __v: 0,
    },
  ];

  return (
    <>
      <PageTitle>Student</PageTitle>
      <UserTable columns={columns} rows={rows} />
    </>
  );
}

export default Student;

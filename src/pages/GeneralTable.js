import React, { useState, useEffect } from "react";

import { useLocation, useHistory } from "react-router-dom";

import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Button,
  Pagination,
  Label,
  Input,
} from "@windmill/react-ui";

import { EditIcon, TrashIcon, TablesIcon, ModalsIcon } from "../icons";

import PageTitle from "../components/Typography/PageTitle";

const GeneralTable = ({
  columns,
  rows,
  timeTable1,
  timeTable2,
  handleAddCourseInTimeTable,
  handleRemoveCourseFromTimeTable,
}) => {
  const location = useLocation();

  const history = useHistory();

  const user = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  // setup pages control for every table
  const [pageTable, setPageTable] = useState(1);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = rows.length;

  // pagination change control
  function onPageChangeTable(p) {
    setPageTable(p);
  }

  // Calculate the current page's slice of the rows array
  const startIdx = (pageTable - 1) * resultsPerPage;
  const endIdx = pageTable * resultsPerPage;
  const currentRows = rows.slice(startIdx, endIdx);

  // Determine if the user role is admin, staff, or student
  const isAdmin = user && user.role === "admin";
  const isStaff = user && user.role === "staff";
  const isStudent = user && user.role === "student";

  // Determine if the location is "/app/Staff"
  const isStaffPage = location.pathname === "/app/Staff";

  // Determine if the location is "/app/Student"
  const isStudentPage = location.pathname === "/app/Student";

  // Determine if the location is "/app/Student"
  const isCoursePage = location.pathname === "/app/Course";

  // Determine if the location is "/app/TimeTable"
  const isTimeTablePage = location.pathname === "/app/TimeTable";

  //TimeTable Page have two Tables
  const isTimeTable1 = timeTable1;

  const isTimeTable2 = timeTable2;

  //Handle actions of Buttons according to location and user
  const handleStudentPageTimeTableButton = (student) => {
    const state = { student: student };
    history.push("/app/TimeTable", { state: state });
  };

  const handleStudentPageTranscriptButton = (student) => {
    const state = { student: student };
    history.push("/app/Transcript", { state: state });
  };

  const handleStaffUpdateButton = (staff) => {
    const state = { staff: staff, updateAccountForm: true };
    history.push("/app/Staff/Form", { state: state });
  };

  //Handle Check boxes in Student Page for Staff
  const [checkedRows, setCheckedRows] = useState([]);

  // Function to handle checkbox change
  const handleCheckboxChange = (event, row) => {
    const checked = event.target.checked;
    if (checked) {
      setCheckedRows((prevCheckedRows) => [...prevCheckedRows, row]);
    } else {
      setCheckedRows((prevCheckedRows) =>
        prevCheckedRows.filter((checkedRow) => checkedRow._id !== row._id)
      );
    }
  };
  useEffect(() => {
    if (isStudentPage && isStaff) {
      const state = { students: checkedRows };
      history.push("/app/Student", { state: state });
    }
  }, [checkedRows]);

  return (
    <TableContainer className="mb-8">
      <Table>
        <TableHeader>
          <TableRow>
            {isStudentPage && isStaff && <TableCell></TableCell>}
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
            {isStaffPage && isAdmin && <TableCell>Actions</TableCell>}
            {isStudentPage && (isAdmin || isStaff) && (
              <TableCell>Actions</TableCell>
            )}
            {/* {isCoursePage && isAdmin && <TableCell>Actions</TableCell>} */}
            {isTimeTablePage &&
              (isTimeTable1 || isTimeTable2) &&
              (isAdmin || isStaff || isStudent) && (
                <TableCell>Actions</TableCell>
              )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentRows.map((entity) => (
            <TableRow key={entity._id}>
              {isStudentPage && isStaff && (
                <TableCell>
                  <Label check>
                    <Input
                      type="checkbox"
                      onChange={(event) => handleCheckboxChange(event, entity)}
                    />
                  </Label>
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell key={column.id}>{entity[column.id]}</TableCell>
              ))}
              {isStaffPage && isAdmin && (
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button
                      layout="link"
                      size="icon"
                      aria-label="Edit"
                      title="Edit Staff Information"
                      onClick={() => {
                        handleStaffUpdateButton(entity);
                      }}
                    >
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    {/* <Button
                      layout="link"
                      size="icon"
                      aria-label="Delete"
                      title="Delete Staff Member"
                    >
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button> */}
                  </div>
                </TableCell>
              )}
              {isStudentPage && isAdmin && (
                <TableCell>
                  <div className="flex items-center space-x-4">
                    {/* <Button
                      layout="link"
                      size="icon"
                      aria-label="Edit"
                      title="Edit Student Information"
                    >
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button
                      layout="link"
                      size="icon"
                      aria-label="Delete"
                      title="Delete Student Information"
                    >
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button> */}
                    <Button
                      layout="link"
                      size="icon"
                      aria-label="TimeTable"
                      title="Display Time-Table"
                      onClick={() => {
                        handleStudentPageTimeTableButton(entity);
                      }}
                    >
                      <TablesIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button
                      layout="link"
                      size="icon"
                      aria-label="Transcript"
                      title="Display Transcript"
                      onClick={() => {
                        handleStudentPageTranscriptButton(entity);
                      }}
                    >
                      <ModalsIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              )}
              {isStudentPage && isStaff && (
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button
                      layout="link"
                      size="icon"
                      aria-label="TimeTable"
                      title="Display Time-Table"
                      onClick={() => {
                        handleStudentPageTimeTableButton(entity);
                      }}
                    >
                      <TablesIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button
                      layout="link"
                      size="icon"
                      aria-label="Transcript"
                      title="Display Transcript"
                      onClick={() => {
                        handleStudentPageTranscriptButton(entity);
                      }}
                    >
                      <ModalsIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              )}
              {/* {isCoursePage && isAdmin && (
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button
                      layout="link"
                      size="icon"
                      aria-label="Edit"
                      title="EDit Course Information"
                    >
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              )} */}
              {isTimeTablePage &&
                isTimeTable1 &&
                (isAdmin || isStaff || isStudent) && (
                  <TableCell>
                    <div>
                      <Button
                        size="small"
                        aria-label="Add"
                        title="Add Course"
                        onClick={() => {
                          handleAddCourseInTimeTable(entity._id);
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </TableCell>
                )}
              {isTimeTablePage &&
                isTimeTable2 &&
                (isAdmin || isStaff || isStudent) && (
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Button
                        layout="link"
                        size="icon"
                        aria-label="Delete"
                        tilte="Remove Course"
                        onClick={() => {
                          handleRemoveCourseFromTimeTable(entity._id);
                        }}
                      >
                        <TrashIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </div>
                  </TableCell>
                )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TableFooter>
        <Pagination
          totalResults={totalResults}
          resultsPerPage={resultsPerPage}
          onChange={onPageChangeTable}
          label="Table navigation"
        />
      </TableFooter>
    </TableContainer>
  );
};

export default GeneralTable;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
} from "@windmill/react-ui";
import { EditIcon, TrashIcon, TablesIcon, ModalsIcon } from "../icons";
import PageTitle from "../components/Typography/PageTitle";

const GeneralTable = ({ columns, rows }) => {
  const location = useLocation();

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

  // Determine if the location is "/app/Transcript"
  const isTranscriptPage = location.pathname === "/app/Transcript";

  return (
    <>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
              {isStaffPage && isAdmin && <TableCell>Actions</TableCell>}
              {isStudentPage && (isAdmin || isStaff) && (
                <TableCell>Actions</TableCell>
              )}
              {isCoursePage && isAdmin && <TableCell>Actions</TableCell>}
              {isTimeTablePage && (isAdmin || isStaff || isStudent) && (
                <TableCell>Actions</TableCell>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRows.map((user) => (
              <TableRow key={user._id}>
                {columns.map((column) => (
                  <TableCell key={column.id}>{user[column.id]}</TableCell>
                ))}
                {isStaffPage && isAdmin && (
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      <Button layout="link" size="icon" aria-label="Delete">
                        <TrashIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </div>
                  </TableCell>
                )}
                {isStudentPage && isAdmin && (
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      <Button layout="link" size="icon" aria-label="Delete">
                        <TrashIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      <Button layout="link" size="icon" aria-label="TimeTable">
                        <TablesIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      <Button layout="link" size="icon" aria-label="Transcript">
                        <ModalsIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </div>
                  </TableCell>
                )}
                {isStudentPage && isStaff && (
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Button layout="link" size="icon" aria-label="TimeTable">
                        <TablesIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      <Button layout="link" size="icon" aria-label="Transcript">
                        <ModalsIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </div>
                  </TableCell>
                )}
                {isCoursePage && isAdmin && (
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </div>
                  </TableCell>
                )}
                {isTimeTablePage && (isAdmin || isStaff || isStudent) && (
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      <Button layout="link" size="icon" aria-label="Delete">
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
    </>
  );
};

export default GeneralTable;

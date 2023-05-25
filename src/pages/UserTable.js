import React, { useState, useEffect } from "react";
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
import { EditIcon, TrashIcon } from "../icons";

import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";

const UserTable = ({ columns, rows }) => {
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

  return (
    <>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRows.map((user) => (
              <TableRow key={user._id}>
                {columns.map((column) => (
                  <TableCell key={column.id}>{user[column.id]}</TableCell>
                ))}
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

export default UserTable;

import React from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
} from "@windmill/react-ui";

const TranscriptTable = ({ data }) => {
  return (
    <>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell colSpan={2}>
                ACADEMIC YEAR {data && data.year}
              </TableCell>
              <TableCell colSpan={2}>
                SEMESTER {data && data.semester}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>CRS.CODE</TableCell>
              <TableCell>COURSE DESCRIPTION</TableCell>
              <TableCell>COURSE GRADE</TableCell>
              <TableCell>COURSE CREDITS</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.courses.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.course.code}</TableCell>
                  <TableCell>{entry.course.description}</TableCell>
                  <TableCell>{entry.grade}</TableCell>
                  <TableCell>{entry.course.credits}</TableCell>
                </TableRow>
              ))}
            <TableRow>
              <TableCell colSpan={4}>GPA {data.gpa}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4}>CGPA {data.cgpa}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TranscriptTable;

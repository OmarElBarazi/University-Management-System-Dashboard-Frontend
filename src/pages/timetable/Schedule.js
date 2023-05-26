import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "@windmill/react-ui";

const Schedule = ({ data }) => {
  data = [
    {
      code: "CMPE101",
      description: "Introduction to Computer",
      credits: 4,
      instructor: "Hakan",
      day: "Monday",
      start: "11:00",
      end: "13:00",
      available: true,
    },
    {
      code: "CMPE102",
      description: "Introduction to Computer",
      credits: 4,
      instructor: "Hakan",
      day: "Tuesday",
      start: "13:00",
      end: "15:00",
      available: true,
    },
    {
      code: "CMPE103",
      description: "Introduction to Computer",
      credits: 4,
      instructor: "Hakan",
      day: "Wednesday",
      start: "11:00",
      end: "12:00",
      available: true,
    },
  ];

  // Create an array of unique days
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Create an array of start times from 8:00 to 20:00
  const startTimes = Array.from({ length: 13 }, (_, index) => {
    const hour = index + 8;
    return `${hour < 10 ? "0" + hour : hour}:00`;
  });

  const renderCourseCode = (day, startTime) => {
    const matchingCourses = data.filter(
      (item) =>
        item.day === day && startTime >= item.start && startTime <= item.end
    );

    if (matchingCourses.length === 0) {
      return null;
    }

    return (
      <div>
        {matchingCourses.map((course) => (
          <div
            key={course.code}
            style={{
              backgroundColor: "#8A2BE2",
              padding: "4px",
              marginBottom: "2px",
              borderRadius: "10px",
            }}
          >
            {course.code}
          </div>
        ))}
      </div>
    );
  };
  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell></TableCell> {/* Empty cell in the top-left corner */}
            {days.map((day) => (
              <TableCell
                style={{
                  justifyContent: "center",
                }}
                key={day}
              >
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {startTimes.map((startTime) => (
            <TableRow key={startTime}>
              <TableCell>{startTime}</TableCell>
              {data && // Check if data is available
                days.map((day) => (
                  <TableCell key={`${day}-${startTime}`}>
                    {renderCourseCode(day, startTime)}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Schedule;

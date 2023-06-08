import React from "react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { getTimeTable } from "../../redux/actions/timeTableActions";

import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import Schedule from "../timetable/Schedule";
import GeneralTable from "../GeneralTable";

import { Button } from "@windmill/react-ui";

function Meeting() {
  function generateSlots() {
    const timeTableBoxes = []; // Contains 84 objects representing time slots
    // Generate timeTableBoxes array with all possible time slots
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const startTime = "08:00";
    const endTime = "20:00";

    for (let i = 0; i < 7; i++) {
      let currentTime = startTime;

      while (currentTime !== endTime) {
        const timeSlot = {
          day: days[i],
          start: currentTime,
          end: incrementTimeByHour(currentTime),
          code: "Available",
        };

        timeTableBoxes.push(timeSlot);
        currentTime = incrementTimeByHour(currentTime);
      }
    }

    // Helper function to increment time by an hour
    function incrementTimeByHour(time) {
      const [hours, minutes] = time.split(":").map(Number);
      const newHours = (hours + 1) % 24;
      return `${newHours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
    }

    return timeTableBoxes;
  }

  //Logic of Page start here

  const dispatch = useDispatch();

  const location = useLocation();

  //Checked students data
  const state = location.state;

  const students = state?.state.students || null;

  const timeTableGet = useSelector((state) => state.timeTableGet);
  const { timetable } = timeTableGet;

  const [scheduleData, setScheduleData] = useState([]);

  const [courses, setCourses] = useState([]);

  const [slots, setSlots] = useState([]);

  useEffect(() => {
    setSlots(generateSlots());
    for (const student of students) {
      dispatch(getTimeTable(student._id));
    }
  }, [students]);

  useEffect(() => {
    if (timetable) {
      for (let i = 0; i < timetable.schedule.length; i++) {
        setCourses((prevTimeTables) => [
          ...prevTimeTables,
          timetable.schedule[i],
        ]);
      }
    }
  }, [timetable]);

  function generateAvailableTimeSlots(courses) {
    // Filter out time slots based on student schedules
    const availableTimeSlots = slots.filter((timeSlot) => {
      for (const course of courses) {
        if (
          course.day === timeSlot.day &&
          course.start <= timeSlot.start &&
          course.end >= timeSlot.end
        ) {
          return false; // Remove time slot if student has a course during this time
        }
      }
      return true; // Keep time slot if no student has a course during this time
    });

    return availableTimeSlots;
  }
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

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <PageTitle>Meeting page</PageTitle>
        <Button
          onClick={() => {
            const availableSlots = generateAvailableTimeSlots(courses);
            setScheduleData(availableSlots);
          }}
        >
          Generate
        </Button>
      </div>
      <SectionTitle>Selected Students</SectionTitle>
      <GeneralTable columns={columns} rows={students}></GeneralTable>
      <SectionTitle>
        Available time slots to apply meeting between selected students.
      </SectionTitle>
      <Schedule data={scheduleData} />
    </>
  );
}

export default Meeting;

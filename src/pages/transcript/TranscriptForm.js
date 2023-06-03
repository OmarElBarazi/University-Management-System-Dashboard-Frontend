import React from "react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";

import { Input, Select, Button, Label } from "@windmill/react-ui";

import PageTitle from "../../components/Typography/PageTitle";

import { getCourse } from "../../redux/actions/courseActions";

import {
  createTranscript,
  getTakenCourses,
} from "../../redux/actions/transcriptActions";

function TranscriptForm() {
  const dispatch = useDispatch();

  const location = useLocation();

  let state = location.state;

  const student = state?.state.student || null;

  const history = useHistory();

  const courseGet = useSelector((state) => state.courseGet);
  const { courses } = courseGet;

  const transcriptGetTakenCourses = useSelector(
    (state) => state.transcriptGetTakenCourses
  );
  const { courses_taken } = transcriptGetTakenCourses;

  const [studentId, setStudentId] = useState(student._id);
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [courseInputs, setCourseInputs] = useState([{ course: "", grade: "" }]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    dispatch(getCourse());
    dispatch(getTakenCourses(student._id));
  }, [dispatch]);

  useEffect(() => {
    if (courses && courses_taken) {
      const idSet = new Set(courses_taken.map((obj) => obj._id));

      const newArray = courses.filter((obj) => !idSet.has(obj._id));

      setFilteredCourses(newArray);
    }
  }, [courses, courses_taken]);

  const handleCourseInputChange = (index, event) => {
    const updatedInputs = [...courseInputs];
    updatedInputs[index][event.target.name] = event.target.value;
    setCourseInputs(updatedInputs);
  };

  const handleAddCourse = () => {
    setCourseInputs([...courseInputs, { course: "", grade: "" }]);
  };

  const handleRemoveCourse = (index) => {
    const updatedInputs = [...courseInputs];
    updatedInputs.splice(index, 1);
    setCourseInputs(updatedInputs);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      studentId,
      year,
      semester,
      courses: courseInputs.map((input) => ({
        course: input.course,
        grade: input.grade,
      })),
    };
    dispatch(createTranscript(formData));

    // Redirect to the desired route

    state = { student: student };
    history.push("/app/Transcript", { state: state });

    setStudentId("");
    setYear("");
    setSemester("");
    setCourseInputs([{ course: "", grade: "" }]);
  };

  const yearOptions = [];
  for (let i = 1980; i <= 2023; i++) {
    yearOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <>
      <PageTitle>Transcript Form</PageTitle>
      <div className="w-full p-4">
        <div className="mb-4">
          <Label>Student ID:</Label>
          <Input
            className="mt-1"
            value={student.studentId}
            // onChange={(e) => setStudentId(e.target.value)}
            disabled
          />
        </div>
        <div className="mb-4">
          <Label>Year:</Label>
          <Select
            className="mt-1"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">Select Year</option>
            {yearOptions}
          </Select>
        </div>
        <div className="mb-4">
          <Label>Semester:</Label>
          <Select
            className="mt-1"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            <option value="">Select Semester</option>
            <option value="fall">Fall</option>
            <option value="spring">Spring</option>
          </Select>
        </div>
        <div className="mb-4">
          <Label>Courses:</Label>
          {courseInputs.map((input, index) => (
            <div key={index} className="flex items-center mt-4">
              <div className="mr-4">
                <Select
                  value={input.course}
                  name="course"
                  onChange={(e) => handleCourseInputChange(index, e)}
                >
                  <option value="">Select Course</option>
                  {filteredCourses &&
                    filteredCourses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.code}
                      </option>
                    ))}
                </Select>
              </div>
              <div className="mr-4">
                <Select
                  value={input.grade}
                  name="grade"
                  onChange={(e) => handleCourseInputChange(index, e)}
                >
                  <option value="">Select Grade</option>
                  <option value="A">A</option>
                  <option value="A+">A+</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="C+">C+</option>
                  <option value="D">D</option>
                  <option value="F">F</option>
                </Select>
              </div>
              <Button onClick={() => handleRemoveCourse(index)}>Remove</Button>
            </div>
          ))}
          <Button className="mt-4" onClick={handleAddCourse}>
            Add Course
          </Button>
        </div>
        <Button block className="mt-4" type="submit" onClick={handleSubmit}>
          Submit Transcript
        </Button>
      </div>
    </>
  );
}

export default TranscriptForm;

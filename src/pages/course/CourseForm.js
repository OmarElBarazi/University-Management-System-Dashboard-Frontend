import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { getStaff } from "../../redux/actions/userActions";

import { createCourse } from "../../redux/actions/courseActions";

import { Input, Label, Button, Select } from "@windmill/react-ui";

import PageTitle from "../../components/Typography/PageTitle";

const CourseForm = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const courseCreate = useSelector((state) => state.courseCreate);
  const { course } = courseCreate;

  const staffGet = useSelector((state) => state.staffGet);
  const { staff } = staffGet;

  const [formData, setFormData] = useState({
    code: "",
    description: "",
    instructor: "",
    day: "Monday",
    start: "08:00",
    end: "09:00",
    credits: 0,
  });

  useEffect(() => {
    dispatch(getStaff());
  }, [dispatch]);

  useEffect(() => {
    if (staff) {
      formData.instructor = staff[0]._id;
    }
  }, [staff]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data
    console.log("Form submitted:", formData);
    dispatch(createCourse(formData));
    // Reset form fields
    setFormData({
      code: "",
      description: "",
      instructor: "",
      day: "",
      start: "08:00",
      end: "09:00",
      credits: 0,
    });
    // Redirect to the desired route
    history.push("/app/Course");
  };

  const dayOptions = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wedensday", label: "Wedensday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
  ];

  const hourOptions = Array.from({ length: 13 }, (_, i) => i + 8);

  return (
    <>
      <PageTitle>Course Form</PageTitle>
      <div className="w-full p-4">
        <Label>
          <span>Course Code</span>
          <Input
            className="mt-1"
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="Course Code"
            required
          />
        </Label>
        <Label>
          <span>Description</span>
          <Input
            className="mt-1"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
        </Label>
        <Label>
          <span>Instructor</span>
          <Select
            className="mt-1"
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            required
          >
            {staff &&
              staff.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.name + " " + option.surname}
                </option>
              ))}
          </Select>
        </Label>
        <Label>
          <span>Day</span>
          <Select
            className="mt-1"
            name="day"
            value={formData.day}
            onChange={handleChange}
            required
          >
            {dayOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Label>
        <Label>
          <span>Start Time</span>
          <Select
            className="mt-1"
            name="start"
            value={formData.start}
            onChange={handleChange}
            required
          >
            {hourOptions.map((hour) => (
              <option
                key={hour}
                value={hour.toString().padStart(2, "0") + ":00"}
              >
                {hour.toString().padStart(2, "0")}:00
              </option>
            ))}
          </Select>
        </Label>
        <Label>
          <span>End Time</span>
          <Select
            className="mt-1"
            name="end"
            value={formData.end}
            onChange={handleChange}
            required
          >
            {hourOptions.map((hour) => (
              <option
                key={hour}
                value={hour.toString().padStart(2, "0") + ":00"}
              >
                {hour.toString().padStart(2, "0")}:00
              </option>
            ))}
          </Select>
        </Label>
        <Label>
          <span>Credits</span>
          <Select
            className="mt-1"
            name="credits"
            value={formData.credits}
            onChange={handleChange}
            required
          >
            <option value={0}>0 Credits</option>
            <option value={1}>1 Credit</option>
            <option value={2}>2 Credits</option>
            <option value={3}>3 Credits</option>
            <option value={4}>4 Credits</option>
          </Select>
        </Label>
        <Button block className="mt-4" type="submit" onClick={handleSubmit}>
          Create Course
        </Button>
      </div>
    </>
  );
};

export default CourseForm;

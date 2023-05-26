import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { createUser } from "../../redux/actions/userActions";

import { Input, Label, Button, Select } from "@windmill/react-ui";

import PageTitle from "../../components/Typography/PageTitle";

function StaffForm() {
  const dispatch = useDispatch();

  const history = useHistory();

  const userCreate = useSelector((state) => state.userCreate);
  const { user } = userCreate;

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("staff");
  const [year, setYear] = useState("");
  const [startDate, setStartDate] = useState("");
  const [semester, setSemester] = useState("fall");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
  };

  const handleSubmit = () => {
    const startDateObj = new Date(startDate); // Convert startDate string to Date object

    const data = {
      name: name,
      surname: surname,
      email: email,
      password: password,
      role: role,
      year: year,
      startDate: `${startDateObj.getDate()}/${
        startDateObj.getMonth() + 1
      }/${startDateObj.getFullYear()}`,
      semester: semester,
    };

    dispatch(createUser(data));

    // Redirect to the desired route
    history.push("/app/Staff");
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
      <PageTitle>Staff Form</PageTitle>
      <div className="w-full p-4">
        <Label>
          <span>Name</span>
          <Input
            className="mt-1"
            placeholder="john"
            value={name}
            onChange={handleNameChange}
          />
        </Label>
        <Label>
          <span>Surname</span>
          <Input
            className="mt-1"
            placeholder="doe"
            value={surname}
            onChange={handleSurnameChange}
          />
        </Label>
        <Label>
          <span>Email</span>
          <Input
            className="mt-1"
            type="email"
            placeholder="john@doe.com"
            value={email}
            onChange={handleEmailChange}
          />
        </Label>
        <Label className="mt-4">
          <span>Password</span>
          <Input
            className="mt-1"
            placeholder="***************"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Label>
        <Label className="mt-4">
          <span>Confirm password</span>
          <Input
            className="mt-1"
            placeholder="***************"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </Label>
        <Label>
          <span>Role</span>
          <Input className="mt-1" value={role} onChange={handleRoleChange} />
        </Label>
        <Label>
          <span>Year</span>
          <Select className="mt-1" value={year} onChange={handleYearChange}>
            {yearOptions}
          </Select>
        </Label>
        <Label>
          <span>Start Date</span>
          <Input
            className="mt-1"
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </Label>
        <Label>
          <span>Semester</span>
          <Select
            className="mt-1"
            value={semester}
            onChange={handleSemesterChange}
          >
            <option value="fall">Fall</option>
            <option value="spring">Spring</option>
          </Select>
        </Label>
        <Button block className="mt-4" onClick={handleSubmit}>
          Create account
        </Button>
      </div>
    </>
  );
}

export default StaffForm;

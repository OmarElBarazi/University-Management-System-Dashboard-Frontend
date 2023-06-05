import React from "react";

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";

import { Button } from "@windmill/react-ui";

import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import TranscriptTable from "./TranscriptTable";

import { getTranscript } from "../../redux/actions/transcriptActions";

function Transcript() {
  const dispatch = useDispatch();

  const location = useLocation();

  const history = useHistory();

  const user = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  // Determine if the user role is admin, staff, or student
  const isAdmin = user && user.role === "admin";
  const isStaff = user && user.role === "staff";
  const isStudent = user && user.role === "student";

  const state = location.state;

  const student = state?.state.student || null;

  const transcriptGet = useSelector((state) => state.transcriptGet);
  const { transcript } = transcriptGet;

  const transcriptCreate = useSelector((state) => state.transcriptCreate);
  const { transcript_create } = transcriptCreate;

  useEffect(() => {
    if (student) {
      dispatch(getTranscript(student._id));
    }
    if (student) {
      dispatch(getTranscript(student._id));
    }
    if (user && user.role === "student") {
      dispatch(getTranscript(user._id));
    }
  }, [dispatch, transcript_create]);

  const handleCreateTranscriptFormButton = (student) => {
    const state = { student: student };
    history.push("/app/Transcript/Create", { state: state });
  };

  return (
    <>
      {isStudent && (
        <PageTitle>TimeTable for {user.name + " " + user.surname}</PageTitle>
      )}
      {isAdmin ? (
        student ? (
          <div className="flex flex-row justify-between">
            <PageTitle>
              Transcript for {student.name.toUpperCase()}{" "}
              {student.surname.toUpperCase()} with ID {student.studentId}
            </PageTitle>
            <Button
              className="my-8  text-l font-semibold"
              onClick={() => {
                handleCreateTranscriptFormButton(student);
              }}
            >
              Create Transcript
            </Button>
          </div>
        ) : (
          <div className="mt-6">
            <SectionTitle>
              To access the transcript of a student, use the student page, click
              on transcript button.
            </SectionTitle>
          </div>
        )
      ) : null}
      {isStaff ? (
        student ? (
          <div className="flex flex-row justify-between">
            <PageTitle>
              Transcript for {student.name.toUpperCase()}{" "}
              {student.surname.toUpperCase()} with ID {student.studentId}
            </PageTitle>
            <Button
              className="my-8 text-l font-semibold "
              onClick={() => {
                handleCreateTranscriptFormButton(student);
              }}
            >
              Create Transcript
            </Button>
          </div>
        ) : (
          <div className="mt-6">
            <SectionTitle>
              To access the transcript of a student, use the student page, click
              on transcript button.
            </SectionTitle>
          </div>
        )
      ) : null}
      {student &&
        transcript &&
        transcript.map((entity, index) => (
          <TranscriptTable data={entity} key={index} />
        ))}
    </>
  );
}

export default Transcript;

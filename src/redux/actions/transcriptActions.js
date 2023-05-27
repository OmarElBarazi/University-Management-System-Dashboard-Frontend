import axios from "../../core/_axios";
import {
  TRANSCRIPT_GET,
  TRANSCRIPT_GET_TAKEN_COURSES,
  TRANSCRIPT_CREATE,
} from "../constants/transcriptConstants";

export const getTranscript = (id) => async (dispatch) => {
  try {
    dispatch({
      type: TRANSCRIPT_GET,
    });

    const res = await axios.get(`/transcript/${id}`);

    if (res.data) {
      dispatch({
        type: TRANSCRIPT_GET,
        payload: res.data,
      });
    }
  } catch (error) {}
};

export const getTakenCourses = (id) => async (dispatch) => {
  try {
    dispatch({
      type: TRANSCRIPT_GET_TAKEN_COURSES,
    });

    const res = await axios.get(`/transcript/taken/courses${id}`);

    if (res.data) {
      dispatch({
        type: TRANSCRIPT_GET_TAKEN_COURSES,
        payload: res.data.courses,
      });
    }
  } catch (error) {}
};

export const createTranscript = (data) => async (dispatch) => {
  try {
    dispatch({
      type: TRANSCRIPT_CREATE,
    });

    const res = await axios.post("/transcript/", data);

    if (res.data) {
      dispatch({
        type: TRANSCRIPT_CREATE,
        payload: res.data.transcript,
      });
    }
  } catch (error) {}
};

import axios from "../../core/_axios";
import {
  COURSE_CREATE,
  COURSE_GET,
  COURSE_GET_STAFF,
  COURSE_UPDATE,
} from "../constants/courseConstants";

export const getCourse = () => async (dispatch) => {
  try {
    dispatch({
      type: COURSE_GET,
    });

    const res = await axios.get("/course/");

    if (res.data) {
      dispatch({
        type: COURSE_GET,
        payload: res.data.courses,
      });
    }
  } catch (error) {}
};

export const getCourseStaff = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COURSE_GET_STAFF,
    });

    const res = await axios.get(`/course/advisor/${id}`);

    if (res.data) {
      dispatch({
        type: COURSE_GET_STAFF,
        payload: res.data.courses,
      });
    }
  } catch (error) {}
};

export const createCourse = (data) => async (dispatch) => {
  try {
    dispatch({
      type: COURSE_CREATE,
    });

    const res = await axios.post("/course/", data);

    if (res.data) {
      dispatch({
        type: COURSE_CREATE,
        payload: res.data.course,
      });
    }
  } catch (error) {}
};

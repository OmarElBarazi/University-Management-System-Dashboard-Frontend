import axios from "../../core/_axios";
import {
  TIME_TABLE_GET,
  TIME_TABLE_UPDATE_COURSES,
  TIME_TABLE_UPDATE_CONFIRMATION,
} from "../constants/timeTableConstants";

export const getTimeTable = (id) => async (dispatch) => {
  try {
    dispatch({
      type: TIME_TABLE_GET,
    });

    const res = await axios.get(`/timetable/${id}`);

    if (res.data) {
      dispatch({
        type: TIME_TABLE_GET,
        payload: res.data,
      });
    }
  } catch (error) {}
};

export const updateTimeTableCourses =
  (id, coursesToAdd, coursesToremove) => async (dispatch) => {
    try {
      dispatch({
        type: TIME_TABLE_UPDATE_COURSES,
      });

      const res = await axios.patch(`/timetable/schedule/${id}`, {
        coursesToAdd,
        coursesToremove,
      });

      if (res.data) {
        dispatch({
          type: TIME_TABLE_UPDATE_COURSES,
          payload: res.data.updatedTimeTable,
        });
      }
    } catch (error) {}
  };

export const updateTimeTableConfirmation =
  (id, confirm) => async (dispatch) => {
    try {
      dispatch({
        type: TIME_TABLE_UPDATE_CONFIRMATION,
      });

      const res = await axios.patch(`/timetable/confirm/${id}`, { confirm });

      if (res.data) {
        dispatch({
          type: TIME_TABLE_UPDATE_CONFIRMATION,
          payload: res.data.updatedTimeTable,
        });
      }
    } catch (error) {}
  };

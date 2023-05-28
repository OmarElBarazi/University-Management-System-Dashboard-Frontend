import {
  TIME_TABLE_GET,
  TIME_TABLE_UPDATE_COURSES,
  TIME_TABLE_UPDATE_CONFIRMATION,
} from "../constants/timeTableConstants";

export const timeTableReducer = (state = {}, action) => {
  switch (action.type) {
    case TIME_TABLE_GET:
      return { timetable: action.payload };
    case TIME_TABLE_UPDATE_COURSES:
      return { timetable_courses: action.payload };
    case TIME_TABLE_UPDATE_CONFIRMATION:
      return { timetable_confirm: action.payload };
    default:
      return state;
  }
};

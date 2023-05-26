import {
  COURSE_CREATE,
  COURSE_GET,
  COURSE_GET_STAFF,
  COURSE_UPDATE,
} from "../constants/courseConstants";

export const courseReducer = (state = {}, action) => {
  switch (action.type) {
    case COURSE_CREATE:
      return { course: action.payload };
    case COURSE_GET:
      return { courses: action.payload };
    case COURSE_GET_STAFF:
      return { courses_staff: action.payload };
    case COURSE_UPDATE:
      return { course: action.payload };
    default:
      return state;
  }
};

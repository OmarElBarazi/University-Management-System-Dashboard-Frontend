import { userReducer, staffReducer, studentReducer } from "./userReducer";
import { courseReducer } from "./courseReducer";
import { timeTableReducer } from "./timeTableReducer";
import { transcriptReducer } from "./transcriptReducer";

export default {
  userLogin: userReducer,
  userCreate: userReducer,
  userUpdate: userReducer,
  userDelete: userReducer,
  staffGet: staffReducer,
  studentGet: studentReducer,
  studentGetByStaff: studentReducer,
  courseGet: courseReducer,
  courseGetStaff: courseReducer,
  courseCreate: courseReducer,
  timeTableGet: timeTableReducer,
  timeTableUpdateCourses: timeTableReducer,
  timeTableUpdateConfirmation: timeTableReducer,
  transcriptGet: transcriptReducer,
  transcriptGetTakenCourses: transcriptReducer,
  transcriptCreate: transcriptReducer,
};

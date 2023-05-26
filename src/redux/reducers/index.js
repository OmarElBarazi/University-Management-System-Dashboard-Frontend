import { userReducer, staffReducer, studentReducer } from "./userReducer";
import { courseReducer } from "./courseReducer";

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
};

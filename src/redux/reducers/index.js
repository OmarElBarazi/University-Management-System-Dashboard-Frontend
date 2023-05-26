import { userReducer, staffReducer, studentReducer } from "./userReducer";

export default {
  userLogin: userReducer,
  userCreate: userReducer,
  userUpdate: userReducer,
  userDelete: userReducer,
  staffGet: staffReducer,
  studentGet: studentReducer,
  studentGetByStaff: studentReducer,
};

import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_CREATE,
  USER_DELETE,
  USER_UPDATE,
  STAFF_GET,
  STUDENT_GET,
  STUDENT_STAFF_GET,
} from "../constants/userConstants";

export const userRegisterationReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { userInfo: action.payload };
    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};
export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CREATE:
      return { user_create: action.payload };
    case USER_UPDATE:
      return {};
    case USER_DELETE:
      return {};

    default:
      return state;
  }
};

export const staffReducer = (state = {}, action) => {
  switch (action.type) {
    case STAFF_GET:
      return { staff: action.payload };
    default:
      return state;
  }
};

export const studentReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_GET:
      return { student: action.payload };
    case STUDENT_STAFF_GET:
      return { student_staff: action.payload };
    default:
      return state;
  }
};

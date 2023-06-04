import axios from "../../core/_axios";
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

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN,
    });

    const res = await axios.post("/registeration/login", { email, password });

    if (res.data) {
      dispatch({
        type: USER_LOGIN,
        payload: res.data,
      });

      localStorage.setItem("userInfo", JSON.stringify(res.data));
    }
  } catch (error) {}
};

export const logout = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  localStorage.removeItem("userInfo");
};

export const getStaff = () => async (dispatch) => {
  try {
    dispatch({
      type: STAFF_GET,
    });

    const res = await axios.get("/user/staff");

    if (res.data) {
      dispatch({
        type: STAFF_GET,
        payload: res.data.staff,
      });
    }
  } catch (error) {}
};

export const getStudent = () => async (dispatch) => {
  try {
    dispatch({
      type: STUDENT_GET,
    });

    const res = await axios.get("/user/student");

    if (res.data) {
      dispatch({
        type: STUDENT_GET,
        payload: res.data.students,
      });
    }
  } catch (error) {}
};

export const getStudentByStaff = (id) => async (dispatch) => {
  try {
    dispatch({
      type: STUDENT_STAFF_GET,
    });

    const res = await axios.get(`/user/student/${id}`);

    if (res.data) {
      dispatch({
        type: STUDENT_STAFF_GET,
        payload: res.data,
      });
    }
  } catch (error) {}
};

export const createUser = (data) => async (dispatch) => {
  try {
    dispatch({
      type: USER_CREATE,
    });

    const res = await axios.post("/user/", data);

    if (res.data) {
      dispatch({
        type: USER_CREATE,
        payload: res.data.user,
      });
    }
  } catch (error) {}
};

export const updateUser = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE,
    });

    const res = await axios.patch(`/user/${id}`, data);

    if (res.data) {
      dispatch({
        type: USER_UPDATE,
        payload: res.data.user,
      });
    }
  } catch (error) {}
};

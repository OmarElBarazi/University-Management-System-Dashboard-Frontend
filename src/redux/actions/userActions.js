import axios from "../../core/_axios";
import { USER_LOGIN, USER_LOGOUT } from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN,
    });

    console.log(email)
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

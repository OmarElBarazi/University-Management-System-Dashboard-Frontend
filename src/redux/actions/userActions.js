import axios from '../../core/_axios';
import {
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
} from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const res = await axios.post('/users/login', { email, password });

    if (res.data) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: res.data,
      });

      localStorage.setItem('userInfo', JSON.stringify(res.data));
    } else {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          res.response && res.response.data?.error?.message
            ? res.response.data?.error.message
            : res.message,
      });
    }
  } catch (error) {}
};

export const logout = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT });

  localStorage.removeItem('userInfo'); 
};

export const listUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const res = await axios.get('/users');

    if (res.data) {
      dispatch({
        type: USER_LIST_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: USER_LIST_FAIL,
        payload:
          res.response && res.response.data?.error?.message
            ? res.response.data?.error.message
            : res.message,
      });
    }
  } catch (error) {}
};

export const createUser =
  (name, email, password, avatar) => async (dispatch) => {
    try {
      dispatch({
        type: USER_CREATE_REQUEST,
      });

      const res = await axios.post('/users', { name, email, password, avatar });

      if (res.data) {
        dispatch({
          type: USER_CREATE_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: USER_CREATE_FAIL,
          payload:
            res.response && res.response.data?.error?.message
              ? res.response.data?.error.message
              : res.message,
        });
      }
    } catch (error) {}
  };

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const res = await axios.post(`/users/${id}/delete`);

    if (res.data) {
      dispatch({
        type: USER_DELETE_SUCCESS,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: USER_DELETE_FAIL,
        payload:
          res.response && res.response.data?.error?.message
            ? res.response.data?.error.message
            : res.message,
      });
    }
  } catch (error) {}
};

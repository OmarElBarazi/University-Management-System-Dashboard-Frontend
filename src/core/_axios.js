import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  // baseURL: "http://localhost:5000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    if (window.location.pathname !== "/login") {
      const { token } = JSON.parse(localStorage.getItem("userInfo"));
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      } else {
        window.location.replace("/login");
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (config) {
    return config;
  },
  async function (error) {
    if (
      window.location.pathname !== "/login" &&
      error?.response?.status === 401
    ) {
      window.location.replace("/login");
    }

    return error;
  }
);

export default axiosInstance;

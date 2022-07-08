import axios from "axios";
import store from "../store";
import { signout } from "../store/auth";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch({ type: signout });
    }
    return Promise.reject(err);
  }
);

export default api;

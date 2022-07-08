import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import alert from "./alert";

export default configureStore({
  reducer: {
    auth: auth,
    alert: alert,
  },
});

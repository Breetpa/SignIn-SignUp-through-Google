import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_ADDRESS } from "../config/keys";
import axios from "axios";
import { openAlert } from "./alert";

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ user }, { dispatch }) => {
    try {
      dispatch(setLoading());
      const res = await axios.post(SERVER_ADDRESS, {
        email: user.email,
        password: user.password,
      });
      dispatch(setUnLoading());
      console.log(res.data);
      if (res.data.Success == "LOGIN") {
        dispatch(openAlert({ type: "success", text: "success" }));
        return { Success: true };
      } else {
        dispatch(openAlert({ type: "error", text: res.data.Success }));
        return { Success: false };
      }
    } catch (err) {
      dispatch(setUnLoading());
      return { Success: false };
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ newUser }, { dispatch }) => {
    try {
      dispatch(setLoading());
      const res = await axios.post(SERVER_ADDRESS + "register", {
        email: newUser.email,
        password: newUser.password,
        passwordConf: newUser.password,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      });
      dispatch(setUnLoading());
      if (res.data.Success == "REGISTERED") {
        dispatch(openAlert({ type: "success", text: "success" }));
        return { Success: true };
      } else {
        dispatch(openAlert({ type: "error", text: res.data.Success }));
        return { Success: false };
      }
    } catch (err) {
      console.log(err);
      console.log("sss");
      dispatch(setUnLoading());
      return { Success: false };
    }
  }
);

export const signUpWithGoogleAccount = createAsyncThunk(
  "auth/signUpWithGoogleAccount",
  async (data, { dispatch }) => {
    try {
      alert("ss");
      const res = await axios.get(SERVER_ADDRESS + "google");
      console.log(res);
      return true;
    } catch (err) {
      return true;
    }
  }
);

export const signOut = () => async (dispatch) => {
  alert("saas");
  try {
    dispatch(setLoading());
    const res = await axios.get(SERVER_ADDRESS + "logout");
    dispatch(setUnLoading());
    alert("ssss");
  } catch (err) {
    dispatch(setUnLoading());
  }
};

export const auth = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = true;
    },
    setUnLoading: (state, action) => {
      state.loading = false;
    },
    signout: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      if (payload.Success) {
        state.isAuthenticated = true;
      }
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      if (payload.Success) {
        state.isAuthenticated = true;
      }
    });
  },
});

export const { signout, setLoading, setUnLoading } = auth.actions;

export default auth.reducer;

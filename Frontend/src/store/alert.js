import { createSlice } from "@reduxjs/toolkit";

export const alert = createSlice({
  name: "alert",
  initialState: {
    open: false,
    type: "error",
    text: "",
  },
  reducers: {
    openAlert: (state, action) => {
      state.open = true;
      state.type = action.payload.type;
      state.text = action.payload.text;
    },
    closeAlert: (state, action) => {
      state.open = false;
    },
  },
});

export const { openAlert, closeAlert } = alert.actions;

export default alert.reducer;

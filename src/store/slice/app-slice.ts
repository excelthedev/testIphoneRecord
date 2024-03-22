import { createSlice } from "@reduxjs/toolkit";
import { State } from "../../types/state";

const initialState: State.AppState = {
  request: undefined,
  response: undefined,
  record: undefined,
  postUrl: "",
  getUrl: "",
  getPostUrl: "",
  updateUrl: "",
  deleteUrl: "",
};
const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setAppState: (state, action) => {
      const key = action.payload.key;
      state = {
        ...state,
        [key]: action.payload.value,
      };
      return state;
    },
    setAllAppState(state, action) {
      state = action.payload;
      return state;
    },
  },
});
export const { setAppState, setAllAppState } = appSlice.actions;
export const appReducer = appSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  relation: "",
  latitude: null,
  longitude: null,
};

const parentSlice = createSlice({
  name: "parent",
  initialState,
  reducers: {
    updateParentProfile: (state, action) => ({ ...state, ...action.payload }),
  },
});

export const { updateParentProfile } = parentSlice.actions;
export default parentSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  selectedChildId: null,
};

const childrenSlice = createSlice({
  name: "children",
  initialState,
  reducers: {
    setChildren: (state, action) => {
      state.list = Array.isArray(action.payload) ? action.payload : state.list;
      if (!state.list.find((item) => item.id === state.selectedChildId)) {
        state.selectedChildId = state.list[0]?.id ?? null;
      }
    },
    selectChild: (state, action) => {
      const exists = state.list.some((item) => item.id === action.payload);
      if (exists) state.selectedChildId = action.payload;
    },
  },
});

export const { setChildren, selectChild } = childrenSlice.actions;
export default childrenSlice.reducer;

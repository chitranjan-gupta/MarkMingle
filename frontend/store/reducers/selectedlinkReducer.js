import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedLink: {
    id: "",
    url: "",
  },
};

const selectedLinkSlice = createSlice({
  name: "selectedLink",
  initialState,
  reducers: {
    selectLink: (state, action) => {
      state.selectedLink.id = action.payload.id;
      state.selectedLink.url = action.payload.url;
    },
  },
});

export const { selectLink } = selectedLinkSlice.actions

export default selectedLinkSlice.reducer
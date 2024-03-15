import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategory: {
    id: "",
    name: "Uncategorised",
    icon: "",
  },
};

const selectedCategorySlice = createSlice({
  name: "selectedCategory",
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      state.selectedCategory.id = action.payload.id;
      state.selectedCategory.name = action.payload.name;
      state.selectedCategory.icon = action.payload.icon;
    },
  },
});

export const { selectCategory } = selectedCategorySlice.actions;

export default selectedCategorySlice.reducer;

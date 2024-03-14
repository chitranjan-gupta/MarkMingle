import { SELECETD_CATEGORY } from "../types";
const initialState = {
  selectedCategory: {
    id: "",
    name: "Uncategorised",
    icon: "",
  },
};
export const selectedCatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECETD_CATEGORY:
      return {
        selectedCategory: {
          id: action.payload.id,
          name: action.payload.name,
          icon: action.payload.icon,
        },
      };
    default:
      return state;
  }
};

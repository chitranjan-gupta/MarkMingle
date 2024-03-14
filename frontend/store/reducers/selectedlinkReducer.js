import { SELECTED_LINK } from "../types";
const initialState = {
  selectedLink: {
    id: "",
    url: "",
  },
};
export const selectedLinkReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_LINK:
      return {
        ...state,
        selectedLink: {
          id: action.payload.id,
          url: action.payload.url,
        },
      };
    default:
      return state;
  }
};

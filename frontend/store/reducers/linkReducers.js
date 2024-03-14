import { GET_LINKS } from "../types";
const initialState = {
  links: [],
};
export const linkReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LINKS:
      return {
        ...state,
        links: action.payload,
      };
    default:
      return state;
  }
};

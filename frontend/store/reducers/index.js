import { combineReducers } from "redux";
import { linkReducer } from "./linkReducers";
import { categoryReducer } from "./categoryReducers";
import { selectedCatReducer } from "./selectedCatReducer";
import { selectedLinkReducer } from "./selectedlinkReducer";
export default combineReducers({
  link: linkReducer,
  category: categoryReducer,
  selectedCategory: selectedCatReducer,
  selectedLink: selectedLinkReducer,
});

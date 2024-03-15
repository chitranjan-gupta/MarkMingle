import { configureStore } from '@reduxjs/toolkit'
import linkReducer from "./reducers/linkReducers";
import categoryReducer from "./reducers/categoryReducers";
import selectedCatReducer from "./reducers/selectedCatReducer";
import selectedLinkReducer from "./reducers/selectedlinkReducer";

const store = configureStore({
	reducer:{
		link: linkReducer,
		category: categoryReducer,
		selectedCategory: selectedCatReducer,
		selectedLink: selectedLinkReducer
	}
})

export default store;

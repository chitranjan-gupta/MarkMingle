import { createSlice } from "@reduxjs/toolkit";
import log from "../../utils/log";

const fetchCategories = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/categorys/getAll", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({}),
    });
    if (res.status === 200) {
      return { status: res.status, data: await res.json() };
    } else {
      log(await res.json());
    }
  } catch (err) {
    log(err);
  }
};

const initialState = {
  categories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getCategories: (state, action) => {
      fetchCategories()
        .then((val) => {
          state.categories = val.data;
        })
        .catch((err) => {
          log(err);
        });
    },
  },
});

export const { getCategories } = categorySlice.actions;

export default categorySlice.reducer;

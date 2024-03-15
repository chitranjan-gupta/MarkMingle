import { createSlice } from "@reduxjs/toolkit";
import log from "../../utils/log";

const fetchLinks = async (catID) => {
  try {
    const res = await fetch("http://localhost:5000/api/categorys/getLinks", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ catID: catID }),
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
  links: [],
};

const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {
    getLinks: (state, action) => {
      fetchLinks(action.payload.catID)
        .then((val) => {
          state.links = val.data;
        })
        .catch((err) => {
          log(err);
        });
    },
  },
});

export const { getLinks } = linkSlice.actions;

export default linkSlice.reducer;

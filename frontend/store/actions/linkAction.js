import { GET_LINKS, SELECTED_LINK } from "../types";
import log from "../../utils/log";

export const selectedLink = (id, url) => (dispatch) => {
  dispatch({
    type: SELECTED_LINK,
    payload: { id: id, url: url },
  });
};

export const fetchlinks = (catID) => (dispatch) => {
  const getLinks = async (catID) => {
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
  getLinks(catID)
    .then((val) => {
      dispatch({
        type: GET_LINKS,
        payload: val.data,
      });
    })
    .catch((err) => {
      log(err);
    });
};

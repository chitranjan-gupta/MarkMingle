import { GET_CATEGORY, SELECETD_CATEGORY } from "../types";
import log from "../../utils/log";

export const selectedCategory = (id, name, icon) => (dispatch) => {
  dispatch({
    type: SELECETD_CATEGORY,
    payload: { id: id, name: name, icon: icon },
  });
};

export const fetchCategory = () => (dispatch) => {
  const getCategories = async () => {
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
  getCategories()
    .then((val) => {
      dispatch({
        type: GET_CATEGORY,
        payload: val.data,
      });
    })
    .catch((err) => {
      log(err);
    });
};

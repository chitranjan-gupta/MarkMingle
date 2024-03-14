import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { fetchlinks } from "../store/actions/linkAction";
import log from "../utils/log";
import { selectedCategory } from "../store/actions/categoryAction";
export default function Category(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [dSub, setdSub] = useState(false);
  const [category, setCategory] = useState({});
  const [subCategories, setSubCategories] = useState([]);
  const getDetail = async (catID) => {
    try {
      const res = await fetch("http://localhost:5000/api/categorys/get", {
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
      } else if (res.status === 401) {
        return { status: res.status, data: await res.json() };
      }
    } catch (err) {
      log(err);
    }
  };
  const getSubCategories = async (catID) => {
    try {
      const res = await fetch("http://localhost:5000/api/categorys/sub", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ catID: catID }),
      });
      if (res.status === 200) {
        setSubCategories(await res.json());
      } else if (res.status === 401) {
        log(await res.json());
        router.push("login");
      }
    } catch (err) {
      log(err);
    }
  };
  const show = () => {
    dispatch(fetchlinks(props.dataid));
    dispatch(selectedCategory(props.dataid, category.name, ""));
  };
  const open = (event) => {
    if (!dSub) {
      setdSub(true);
      const el = event.target.parentNode;
      const ele = event.target.parentNode.parentNode;
      if (el instanceof HTMLButtonElement) {
        el.classList.replace("-rotate-90", "rotate-0");
      } else if (ele instanceof HTMLButtonElement) {
        ele.classList.replace("-rotate-90", "rotate-0");
      }
      //log(event.target.attributes.catid.value);
      if (!loading) {
        getSubCategories(props.dataid);
      }
    } else {
      const el = event.target.parentNode;
      const ele = event.target.parentNode.parentNode;
      if (el instanceof HTMLButtonElement) {
        el.classList.replace("rotate-0", "-rotate-90");
      } else if (ele instanceof HTMLButtonElement) {
        ele.classList.replace("rotate-0", "-rotate-90");
      }
      setdSub(false);
    }
  };
  useEffect(() => {
    if (!loading) {
      getDetail(props.dataid)
        .then(({ status, data }) => {
          if (status === 200) {
            setCategory(data);
          } else if (status === 401) {
            log(data);
            router.push("login");
          }
        })
        .catch((err) => {
          log(err);
        });
    }
  }, []);
  useEffect(() => {
    return function cleanup() {
      setLoading(true);
      console.log("[log]Cleanup");
    };
  }, []);
  return (
    <li className="flex flex-col">
      <div className="flex flex-row justify-between items-center p-2 hover:bg-gray-300 cursor-pointer">
        <div className="flex flex-row items-center">
          <button className="transform -rotate-90" onClick={open} tabIndex={-1}>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <i>❤</i> <i onClick={show}>{category.name}</i>
        </div>
        <i>0</i>
      </div>
      {dSub ? (
        <>
          {subCategories.length >= 1 ? (
            <ul className="pl-3">
              {subCategories.map((val) => {
                return <Category key={val} dataid={val} />;
              })}
            </ul>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </li>
  );
}

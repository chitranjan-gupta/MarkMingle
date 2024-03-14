import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Category from "../component/category";
import Link from "../component/link";
import { fetchCategory } from "../store/actions/categoryAction";
import check from "../utils/check";
import log from "../utils/log";
export default function Home() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { links } = useSelector((state) => state.link);
  const { categories } = useSelector((state) => state.category);
  const { selectedCategory } = useSelector((state) => state.selectedCategory);
  const { selectedLink } = useSelector((state) => state.selectedLink);
  const router = useRouter();
  if (typeof window !== "undefined") {
    document.title = "LMANAGER";
  }
  useEffect(() => {
    if (selectedLink.id) {
      open();
    }
  }, [selectedLink]);
  useEffect(() => {
    if (!loading) {
      check()
        .then(({ status, data }) => {
          if (status === 200) {
            dispatch(fetchCategory());
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
  const open = () => {
    const viewSection = document.getElementById("viewSection");
    const linkSection = document.getElementById("linkSection");
    if (viewSection.classList.contains("hidden")) {
      viewSection.classList.remove("hidden");
      viewSection.classList.add("flex");
      linkSection.classList.remove("w-4/5");
      linkSection.classList.add("w-2/3");
    }
  };
  const close = () => {
    const viewSection = document.getElementById("viewSection");
    const linkSection = document.getElementById("linkSection");
    if (viewSection.classList.contains("flex")) {
      viewSection.classList.remove("flex");
      viewSection.classList.add("hidden");
      linkSection.classList.remove("w-2/3");
      linkSection.classList.add("w-4/5");
    }
  };
  return (
    <div className="flex w-screen overflow-hidden">
      <section className="w-1/5 min-w-1/5 h-screen border-r border-gray-300 overflow-hidden flex flex-col">
        <div className="">
          <h1 className="text-gray-400 p-2 font-mono">LMANAGER</h1>
        </div>
        <div className="relative p-2 overflow-y-scroll overflow-x-hidden h-full w-full">
          <div></div>
          <div>
            <h2>Main</h2>
            <ul>
              {categories.map((category) => {
                if (category.name === "Uncategorised") {
                  return <Fragment key={category._id}></Fragment>;
                } else if (category.sub === true) {
                  return <Fragment key={category._id}></Fragment>;
                } else {
                  return (
                    <Category
                      key={category._id}
                      dataid={category._id}
                    ></Category>
                  );
                }
              })}
            </ul>
          </div>
          <div className="w-10 h-10 absolute bottom-2 right-2 rounded-full border-blue-600 bg-blue-600 flex justify-center items-center pb-1 cursor-pointer">
            <div className="text-3xl text-white">+</div>
          </div>
        </div>
        <div className="border-t border-gray-300 flex justify-evenly items-center p-2">
          <button tabIndex={-1}>❤</button>
          <button tabIndex={-1}>⬇</button>
          <button tabIndex={-1}>✳</button>
        </div>
      </section>
      <section id="linkSection" className="w-4/5 h-screen flex flex-col">
        <div className="w-full flex justify-evenly p-2 shadow-md h-10">
          <div className="w-full flex justify-evenly">
            <div className="w-9 flex">
              <button tabIndex={-1}>❤</button> <b>:</b>
            </div>
            <input
              id="searchBar"
              className="w-10/12 bg-gray-200 outline-none border-none text-sm text-gray-500"
              placeholder={selectedCategory.name}
            />
            <div className="text-left">
              <button
                type="button"
                className="inline-flex justify-center w-full px-1 text-sm font-medium text-gray-700"
                tabIndex={-1}
              >
                ❤
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
            </div>
            <div className="text-left">
              <button
                type="button"
                className="inline-flex justify-center w-full px-1 text-sm font-medium text-gray-700"
                tabIndex={-1}
              >
                View
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
            </div>
            <div
              className="origin-top-right absolute right-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="py-1" role="none">
                <a
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                  role="menuitem"
                  id="menu-item-0"
                >
                  Account Setting
                </a>
                <a
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                  role="menuitem"
                  id="menu-item-1"
                >
                  Support
                </a>
                <a
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                  role="menuitem"
                  id="menu-item-3"
                >
                  License
                </a>
                <a
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                  role="menuitem"
                  id="menu-item-4"
                >
                  Sign Out
                </a>
              </div>
            </div>
          </div>
          <div className="hidden w-full"></div>
        </div>
        <div className="w-full h-full overflow-x-hidden overflow-y-scroll">
          {links.map((link) => {
            return (
              <Link
                key={link._id}
                linkdataid={link._id}
                cname={link.url}
              ></Link>
            );
          })}
        </div>
      </section>
      <section
        id="viewSection"
        className="hidden w-full h-screen flex-col overflow-hidden"
      >
        <div className="w-full flex justify-between items-center p-2">
          <div className="flex items-center">
            <button onClick={close} tabIndex={-1}>
              <svg
                className="h-5 w-5 transform rotate-90"
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
            <button tabIndex={-1}>❤</button>
          </div>
          <div className="flex items-center justify-evenly w-1/4">
            <span className="rounded-3xl border border-green-500 bg-green-500 text-white font-semibold px-2">
              Article
            </span>
            <span className="rounded-3xl border border-green-500 bg-green-500 text-white font-semibold px-2 mx-1">
              google
            </span>
            <span className="rounded-3xl border border-green-500 bg-green-500 text-white font-semibold px-2">
              Edit
            </span>
          </div>
          <div className="flex items-center">
            <button tabIndex={-1}>❤</button>
            <button tabIndex={-1}>❤</button>
            <button tabIndex={-1}>❤</button>
          </div>
        </div>
        <div className="w-full h-full overflow-x-hidden overflow-y-scroll px-2">
          Welcome
        </div>
        <div className="w-full flex items-center justify-between border-t border-gray-400 p-2">
          <button tabIndex={-1}>❤</button>
          <span className="text-gray-400">{selectedLink.url}</span>
          <button tabIndex={-1}>❤</button>
        </div>
      </section>
      <section className="absolute h-screen w-screen flex justify-center items-center">
        <div className="w-96 h-32 rounded-lg border-2 box-border shadow-md">
          <div className="flex flex-col h-full w-full justify-center items-start pl-5 p-4">
            <label className="mb-1 text-gray-600">
              Enter The Name of Category
            </label>
            <input
              className="border-none outline-none w-full rounded-lg shadow-md text-gray-600"
              type="text"
              placeholder=""
            />
            <input
              className="bg-transparent rounded-lg self-end mt-1 shadow-md w-12 text-gray-600 cursor-pointer"
              type="submit"
              value="Save"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

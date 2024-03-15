import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import log from "../utils/log";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const history = useRouter();
  const [isDisabled, setDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const checkNum = new RegExp("^[0-9]", "g");
      const checkSpace = new RegExp(/\s/, "g");
      const checkEmail = new RegExp(
        "^[a-zA-Z0-9+_.-]+@[a-zA-Z]+[.][a-zA-Z]+$",
        "g"
      );
      const checkemail = new RegExp("email", "ig");
      const checkUpper = new RegExp("[A-Z]", "g");
      const checkLower = new RegExp("[a-z]", "g");
      const checkNumber = new RegExp("[0-9]", "g");
      const checkSpecial = new RegExp("[@#!%]", "g");
      if (!email || !password) {
        if (typeof window !== "undefined") {
          window.alert("Email Or Pasword Field Is Empty");
        }
        return;
      }
      if (checkSpace.test(email) || checkSpace.test(password)) {
        if (typeof window !== "undefined") {
          window.alert(
            "Email Or Pasword Field should not contain white spaces"
          );
        }
        return;
      }
      if (checkNum.test(email)) {
        if (typeof window !== "undefined") {
          window.alert(
            "email should not be a number and does not start with a number"
          );
        }
        return;
      }
      if (!checkEmail.test(email) || checkemail.test(email)) {
        if (typeof window !== "undefined") {
          window.alert("Not An Email Address");
        }
        return;
      }
      // if (password.length < 6) {
      //   if (typeof window !== "undefined") {
      //     window.alert("Password Should Be More than 6 character");
      //   }
      //   return;
      // }
      // if (!checkUpper.test(password)) {
      //   if (typeof window !== "undefined") {
      //     window.alert("Password Should Contain An UpperCase Letter");
      //   }
      //   return;
      // }
      // if (!checkLower.test(password)) {
      //   if (typeof window !== "undefined") {
      //     window.alert("Password Should Contain An LowerCase Letter");
      //   }
      //   return;
      // }
      // if (!checkNumber.test(password)) {
      //   if (typeof window !== "undefined") {
      //     window.alert("Password Should Contain An Number");
      //   }
      //   return;
      // }
      // if (!checkSpecial.test(password)) {
      //   if (typeof window !== "undefined") {
      //     window.alert("Password Should Contain any Of The @, #, %, !");
      //   }
      //   return;
      // }
      setDisabled(true);
      const res = await fetch("http://localhost:5000/api/users/signin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });
      const data = await res.json();
      if (res.status === 200) {
        setDisabled(false);
        if (typeof window !== "undefined") {
          window.alert(data.message);
        }
        history.push("/");
      } else {
        setDisabled(false);
        log(data.error);
        if (typeof window !== "undefined") {
          window.alert(data.error);
        }
        return;
      }
    } catch (err) {
      setDisabled(false);
      log(err);
    }
  };

  useEffect(() => {
    return function cleanup() {
      setLoading(true);
      log("[log]Cleanup");
    };
  }, []);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            {/* <Image
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        /> */}
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <div className="mt-8 space-y-6">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required={true}
                  className="
                appearance-none
                rounded-none
                relative
                block
                w-full
                px-3
                py-2
                border border-gray-300
                placeholder-gray-500
                text-gray-900
                rounded-t-md
                focus:outline-none
                focus:ring-indigo-500
                focus:border-indigo-500
                focus:z-10
                sm:text-sm
              "
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required={true}
                  className="
                appearance-none
                rounded-none
                relative
                block
                w-full
                px-3
                py-2
                border border-gray-300
                placeholder-gray-500
                text-gray-900
                rounded-b-md
                focus:outline-none
                focus:ring-indigo-500
                focus:border-indigo-500
                focus:z-10
                sm:text-sm
              "
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="
                h-4
                w-4
                text-indigo-600
                focus:ring-indigo-500
                border-gray-300
                rounded
              "
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={loginUser}
                disabled={isDisabled}
                className="
              group
              relative
              w-full
              flex
              justify-center
              py-2
              px-4
              border border-transparent
              text-sm
              font-medium
              rounded-md
              text-white
              bg-indigo-600
              hover:bg-indigo-700
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-indigo-500
            "
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

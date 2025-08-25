import { useLocation, useNavigate } from "react-router-dom";
import { singout } from "../services/apiAuth";
import { useEffect, useState } from "react";
import { getConfig } from "../utils/configHepler";
import { useAtom, useAtomValue } from "jotai";
import { isStudentAtom, userAtom } from "../atoms/user.js";
import ToggleTheme from "./ToggleTheme.jsx";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isStudent = useAtomValue(isStudentAtom);

  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const token = getConfig("SUPABASE_TOKEN");
    const userToken = JSON.parse(localStorage.getItem(token));

    if (!userToken) {
      return;
    }

    setUser(userToken.user.user_metadata);
  }, []);

  async function onClick() {
    await singout();

    navigate("/auth/login");
  }

  return (
    <>
      <div className="navbar bg-base-300 shadow-sm">
        {/* dropdown */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            {!isStudent && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {/* Mobile side */}
                <li>
                  <a
                    className={
                      location.pathname === "/home/student" ? "menu-active" : ""
                    }
                    onClick={() => navigate("/home/student")}
                  >
                    Student
                  </a>
                </li>

                <li>
                  <a
                    className={
                      location.pathname === "/home/score" ? "menu-active" : ""
                    }
                    onClick={() => navigate("/home/score")}
                  >
                    Score
                  </a>
                </li>
              </ul>
            )}
          </div>
          <a className="btn btn-ghost text-xl" onClick={() => navigate("/")}>
            SunShine
          </a>
        </div>

        {/* web side */}
        <div className="navbar-center hidden lg:flex">
          {!isStudent && (
            <ul className="menu menu-horizontal px-1">
              <li>
                <a
                  className={
                    location.pathname === "/home/student" ? "menu-active" : ""
                  }
                  onClick={() => navigate("/home/student")}
                >
                  Student
                </a>
              </li>

              <li>
                <a
                  className={
                    location.pathname === "/home/score" ? "menu-active" : ""
                  }
                  onClick={() => navigate("/home/score")}
                >
                  Score
                </a>
              </li>
            </ul>
          )}
        </div>

        {/* avatar */}
        <div className="navbar-end">
          {/* theme toggle */}

          <ToggleTheme />
          <div className="dropdown dropdown-end">
            {/* avatar */}
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.avatar} />
              </div>
            </div>

            {/* user profile dropdown */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a
                  className="justify-between"
                  onClick={() => navigate("/home/profile")}
                >
                  Profile
                </a>
              </li>

              <li>
                <a onClick={onClick}>Sign Out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
export default Navbar;

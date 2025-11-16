import { useAtom, useAtomValue } from "jotai";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

import {
  scoreSearchConditionAtom,
  StudentSearchConditionAtom,
} from "../atoms/search";

import { isStudentAtom } from "../atoms/user";
import { useState } from "react";
import Condition from "./Condition";

function ToolBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isStudent = useAtomValue(isStudentAtom);

  const [searchString, setSearchString] = useState("");

  function onClick() {
    const { pathname } = location;

    console.log(pathname);

    if (pathname === "/home/student") {
      navigate("/home/student/create");
      return;
    } else {
      navigate("/home/score/upload");
    }
  }

  const isStudentList = location.pathname === "/home/student";
  const [studentSearchCondition, setStudentSearchCondition] = useAtom(
    StudentSearchConditionAtom
  );

  const [scoreSearchCondition, setScoreSearchCondition] = useAtom(
    scoreSearchConditionAtom
  );

  function onSearch() {
    if (!searchString.length) {
      toast.dismiss();
      toast.warning("Please enter a search string");
      return;
    }

    if (isStudentList) {
      setStudentSearchCondition((prev) => [
        ...prev,
        searchString.toLowerCase(),
      ]);
    } else {
      setScoreSearchCondition((prev) => [...prev, searchString.toLowerCase()]);
    }

    setSearchString("");
  }

  function onDelete(idx) {
    if (isStudentList) {
      setStudentSearchCondition((prev) => prev.filter((_, i) => i !== idx));
    } else {
      setScoreSearchCondition((prev) => prev.filter((_, i) => i !== idx));
    }
  }

  return (
    <section className="my-4 grid grid-cols-4 gap-2">
      {/* conditon */}
      <div className="col-span-1 my-auto">
        {isStudentList
          ? studentSearchCondition.map((studentCondition, idx) => (
              <Condition key={idx} onDelete={() => onDelete(idx)}>
                {studentCondition}
              </Condition>
            ))
          : scoreSearchCondition.map((scoreCondition, idx) => (
              <Condition key={idx} onDelete={() => onDelete(idx)}>
                {scoreCondition}
              </Condition>
            ))}
      </div>

      {/* search input */}
      <div className="col-span-2 transition-transform transform hover:scale-120">
        <label className="input w-full">
          <svg
            className="h-[1em] opacity-50 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            onClick={onSearch}
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            required
            placeholder="Search"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
        </label>
      </div>

      {/* button */}
      <div className="col-span-1 text-center">
        {!isStudent && (
          <button className="btn btn-soft btn-primary" onClick={onClick}>
            {location.pathname === "/home/student"
              ? "Create Student"
              : "Upload Score"}
          </button>
        )}
      </div>
    </section>
  );
}
export default ToolBar;

function ToolBar() {
  return (
    <section className="my-4 grid grid-cols-4 gap-2">
      {/* conditon */}
      <div className="col-span-1 my-auto">
        {/* {isStudentList
          ? studentSearchCondition.map((studentCondition, idx) => (
              <Condition key={idx} onDelete={() => onDelete(idx)}>
                {studentCondition}
              </Condition>
            ))
          : scoreSearchCondition.map((scoreCondition, idx) => (
              <Condition key={idx} onDelete={() => onDelete(idx)}>
                {scoreCondition}
              </Condition>
            ))} */}
      </div>

      {/* search input */}
      <div className="col-span-2 transition-transform transform hover:scale-120">
        <label className="input w-full">
          <input
            type="search"
            required
            placeholder="Search9"
            // value={searchString}
            // onChange={(e) => setSearchString(e.target.value)}
          />
          <svg
            className="h-[1em] opacity-50 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            // onClick={onSearch}
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
        </label>
      </div>

      {/* button */}
      <div className="col-span-1 text-center">
        <button className="btn btn-soft btn-primary">
          {location.pathname === "/home/student"
            ? "Create Student"
            : "Upload Score"}
        </button>
      </div>
    </section>
  );
}
export default ToolBar;

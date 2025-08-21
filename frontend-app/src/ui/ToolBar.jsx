import { useLocation, useNavigate } from "react-router-dom";

function ToolBar() {
  const navigate = useNavigate();
  const location = useLocation();

  function onClick() {
    const { pathname } = location;

    console.log(pathname);

    if (pathname === "/home/student") {
      navigate("/home/student/create");
      return;
    } else {
      navigate("/home/score/update");
    }
  }

  return (
    <section className="my-4 grid grid-cols-4 gap-2">
      <div className="col-span-1 my-auto">
        <div className="badge badge-soft badge-primary mx-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-4 w-4 stroke-current transition-transform transform hover:scale-150"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
          Primary
        </div>
        <div className="badge badge-soft badge-secondary mx-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-4 w-4 stroke-current transition-transform transform hover:scale-150"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
          Secondary
        </div>
      </div>

      <div className="col-span-2 transition-transform transform hover:scale-120">
        <label className="input w-full">
          <svg
            className="h-[1em] opacity-50 "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
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
          <input type="search" required placeholder="Search" />
        </label>
      </div>

      <div className="col-span-1 text-center">
        <button class="btn btn-soft btn-primary" onClick={onClick}>
          {location.pathname === "/home/student"
            ? "Create Student"
            : "Upload Score"}
        </button>
      </div>
    </section>
  );
}
export default ToolBar;

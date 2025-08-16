import { useState } from "react";

function ScoreEdit() {
  const [score, setScore] = useState(80);
  const [subject, setSubject] = useState("Math");

  const [semesterYear, setSemesterYear] = useState(new Date().getFullYear());
  const [semesterSeason, setSemesterSeason] = useState("Fall");

  const yearList = Array.from(
    { length: new Date().getFullYear() - 2000 + 1 },
    (_, index) => index + 2000
  );

  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 w-1/3 mx-auto shadow-2xl shadow-blue-300 mt-40">
      <h1 className="text-center text-2xl pt-4">wumingdao</h1>

      <div className="w-3/4 mx-auto relative">
        <label className="label">Class</label>
        <input
          type="text"
          className="input w-full"
          value={"Class 1 | year 8"}
          disabled
        />
      </div>

      <div className="w-3/4 mx-auto relative">
        <label className="label">Socre</label>
        <input
          type="number"
          className="input w-full"
          value={score}
          onChange={(event) => setScore(Number(event.target.value))}
        />

        <select
          className="select w-full my-4"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
        >
          <option disabled={true}>Choose Subject</option>
          <option value="Math">Math</option>
          <option value="English">English</option>
          <option value="Science">Science</option>
        </select>

        <div className="grid grid-cols-2 gap-4">
          <select
            className="select w-full my-4"
            value={semesterYear}
            onChange={(event) => setSemesterYear(Number(event.target.value))}
          >
            <option disabled={true}>Choose semester year</option>
            {/* <option value="Math">Math</option> */}
            {yearList.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>

          <select
            className="select w-full my-4"
            value={semesterSeason}
            onChange={(event) => setSemesterSeason(event.target.value)}
          >
            <option disabled={true}>Choose semester eason</option>
            <option value="Fall">Fall</option>
            <option value="Spring">Spring</option>
          </select>
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-soft btn-primary my-2">
            Update socre
          </button>
        </div>
      </div>
    </fieldset>
  );
}
export default ScoreEdit;

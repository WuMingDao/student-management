import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getScoreByScoreId, updateScore } from "../../services/apiScore";
import { getStudentByStudentId } from "../../services/apiStudent";
import Loading from "../../ui/Loading";

function ScoreUpdate() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [currentStudent, setCurrentStudent] = useState({
    name: "wumingdao",
    class: "x",
    grade: "x",
  });
  const [name, setName] = useState("wumingdao");
  const [studentId, setStudentId] = useState("123456789");
  const [classNum, setClassNum] = useState("12");
  const [grade, setGrade] = useState("1");
  const [classinfo, setClassinfo] = useState("Class 12 | year 8");

  const [score, setScore] = useState(80);
  const [subject, setSubject] = useState("Math");

  const [semesterYear, setSemesterYear] = useState(new Date().getFullYear());
  const [semesterSeason, setSemesterSeason] = useState("Fall");

  const yearList = Array.from(
    { length: new Date().getFullYear() - 2000 + 1 },
    (_, index) => index + 2000
  );

  const param = useParams();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const scores = await getScoreByScoreId(param.id);
      const scoreDate = scores[0];

      console.log(scoreDate);

      setScore(scoreDate.score);
      setSubject(scoreDate.subject);
      setSemesterYear(scoreDate.semesterYear);
      setSemesterSeason(scoreDate.semesterSeason);
      setStudentId(scoreDate.student_id);

      const students = await getStudentByStudentId(scoreDate.student_id);
      const student = students[0];
      setCurrentStudent(student);

      console.log(student);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  async function oncClick() {
    const newScore = {
      score,
      subject,
      semesterYear,
      semesterSeason,
    };

    const data = await updateScore(param.id, newScore);

    console.log(data);

    navigate("/home/score");
  }

  return (
    <div>
      {isLoading && <Loading />}

      {!isLoading && (
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 w-1/3 mx-auto shadow-2xl shadow-blue-300 mt-40">
          <h1 className="text-center text-2xl pt-4">{currentStudent.name}</h1>

          <div className="w-3/4 mx-auto relative">
            <label className="label">Student ID</label>
            <input
              type="text"
              className="input w-full"
              value={studentId}
              onClick={(event) => setStudentId(event.target.value)}
            />

            <label className="label">Class</label>
            <input
              type="text"
              className="input w-full"
              value={`Class ${currentStudent.class} | Grade ${currentStudent.grade}`}
              disabled={true}
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
                onChange={(event) =>
                  setSemesterYear(Number(event.target.value))
                }
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
              <button
                className="btn btn-soft btn-primary my-2"
                onClick={oncClick}
              >
                Update Socre
              </button>
            </div>
          </div>
        </fieldset>
      )}
    </div>
  );
}
export default ScoreUpdate;

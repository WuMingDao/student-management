import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { createScore } from "../../services/apiScore";
import { getStudentList } from "../../services/apiStudent";

import Loading from "../../ui/Loading";

import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { pageParamPageScoreAtom } from "../../atoms/reload";
import { getUserId } from "../../utils/userHelper";

function ScoreUpload() {
  const page = useAtomValue(pageParamPageScoreAtom);

  const navigate = useNavigate();
  const [score, setScore] = useState(80);
  const [subject, setSubject] = useState("Math");

  const [students, setStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState({
    name: "some name",
    student_id: "123456789",
    class: "x",
    grade: "x",
  });

  const [semesterYear, setSemesterYear] = useState(new Date().getFullYear());
  const [semesterSeason, setSemesterSeason] = useState("Fall");

  const yearList = Array.from(
    { length: new Date().getFullYear() - 2000 + 1 },
    (_, index) => index + 2000
  );

  async function fetchDataApi(setStudents) {
    const userId = getUserId();

    const studentList = await getStudentList(userId);
    setCurrentStudent(studentList[0]);
    setStudents(studentList);
  }

  const { mutate: fetchData, isPending: isLoginPending } = useMutation({
    mutationFn: ({ setStudents }) => fetchDataApi(setStudents),
    onSuccess: () => {
      console.log("Data fetched successfully!");
    },
    onError: (error) => {
      console.log("Error fetching data: ", error.message);
    },
  });

  // read all student for teacher
  useEffect(() => {
    fetchData({ setStudents });
  }, []);

  async function onClick() {
    const toastId = toast.loading("Loading…");
    const newScore = {
      subject,
      semesterSeason,
      semesterYear,
      score,
      student_id: currentStudent.student_id,
    };

    console.log("New score: ", newScore);

    const scores = await createScore(newScore);

    console.log("Score: ", scores);

    toast.dismiss(toastId);
    toast.success("Score uploaded successfully!");
    navigate(`/home/score?page=${page}`);
  }

  return (
    <div>
      {isLoginPending && <Loading />}
      {!isLoginPending && (
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 w-1/3 mx-auto shadow-2xl shadow-blue-300 mt-40">
          <h1 className="text-center text-2xl pt-4">wumingdao</h1>

          <div className="w-3/4 mx-auto relative">
            <select
              className="select w-full my-4"
              value={currentStudent.student_id}
              onChange={(event) => {
                const selectedStudent = students.find(
                  (student) => student.student_id === event.target.value
                );

                if (selectedStudent) {
                  setCurrentStudent(selectedStudent);
                }
              }}
            >
              <option disabled>Choose Student</option>
              {students.map((student, index) => (
                <option key={index} value={student.student_id}>
                  {student.name}
                </option>
              ))}
            </select>

            <label className="label">Student ID</label>
            <input
              type="text"
              className="input w-full"
              value={currentStudent.student_id}
              disabled
            />

            <label className="label">Choose Class</label>
            <input
              type="text"
              className="input w-full"
              value={`Class ${currentStudent.class} | Grade ${currentStudent.grade}`}
              disabled
            />

            <label className="label">Score</label>
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
                <option disabled={true}>Choose semester Season</option>
                <option value="Fall">Fall</option>
                <option value="Spring">Spring</option>
              </select>
            </div>

            <div className="text-center mt-4">
              <button
                className="btn btn-soft btn-primary my-2"
                onClick={onClick}
              >
                Upload Score
              </button>
            </div>
          </div>
        </fieldset>
      )}
    </div>
  );
}
export default ScoreUpload;

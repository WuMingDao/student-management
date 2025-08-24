import { useEffect, useState } from "react";
import ScoreListItem from "./ScoreListItem";
import { getScoreList } from "../../services/apiScore.js";
import { getUserId } from "../../utils/userHelper.js";
import { getStudentList } from "../../services/apiStudent.js";

function ScoreList() {
  const [ScoreList, setScoreList] = useState([]);
  const [students, setStudents] = useState([]);

  const filterdScoreList = ScoreList.filter((ScoreItem) => {
    return students
      .map((student) => student.student_id)
      .includes(ScoreItem.student_id);
  });
  useEffect(() => {
    async function fetchData() {
      const userId = getUserId();

      const mockScoreList = await getScoreList();
      setScoreList(mockScoreList);

      const studentList = await getStudentList(userId);
      setStudents(studentList);
    }
    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table table-lg">
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Subject</th>
            <th>Semester</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {/* <ScoreListItem /> */}
          {filterdScoreList.map((scoreItem) => (
            <ScoreListItem
              key={scoreItem.id}
              scoreItem={scoreItem}
              currentStudent={students.find(
                (student) => student.student_id === scoreItem.student_id
              )}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ScoreList;

import { getScoreList } from "../../services/apiScore";
import { getStudentList } from "../../services/apiStudent";
import { mockScoreList, mockStudentList } from "../../services/mockData";
import ScoreListItem from "./ScoreListItem";

const MockScoreList = await getScoreList();
const MockStudentList = await getStudentList();

const studentScores = MockScoreList.flatMap((score) => {
  const filteredStudent = MockStudentList.filter(
    (student) => student.student_id === score.student_id
  );

  return filteredStudent;
});

function ScoreList() {
  return (
    <>
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
            {MockScoreList.map((scoreItem, index) => (
              <ScoreListItem
                key={scoreItem.id}
                scoreItem={scoreItem}
                currentStudent={studentScores[index]}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default ScoreList;

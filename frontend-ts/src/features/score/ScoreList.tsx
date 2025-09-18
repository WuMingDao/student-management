import { mockScoreList, mockStudentList } from "../../services/mockData";
import ScoreListItem from "./ScoreListItem";

const MockScoreList = mockScoreList;
const MockStudentList = mockStudentList;

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
                currentStudent={MockStudentList[index]}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default ScoreList;

import { useAtomValue } from "jotai";
import { useNavigate } from "react-router-dom";

import { isStudentAtom } from "../../atoms/user";

function ScoreListItem({ scoreItem, currentStudent }) {
  const navigate = useNavigate();

  const isStudent = useAtomValue(isStudentAtom);

  return (
    <tr>
      <td>{currentStudent.name}</td>
      <td>{`Class ${currentStudent.class} | Grade ${currentStudent.grade}`}</td>
      <td>{scoreItem.subject}</td>
      <td>
        {scoreItem.semesterSeason} {scoreItem.semesterYear}
      </td>
      <td>{scoreItem.score}</td>
      {!isStudent && (
        <th>
          <button
            className="btn btn-soft btn-info"
            onClick={() => navigate(`/home/score/${scoreItem.id}`)}
          >
            detail
          </button>
          <button className="btn btn-soft btn-error">delete</button>
        </th>
      )}
    </tr>
  );
}
export default ScoreListItem;

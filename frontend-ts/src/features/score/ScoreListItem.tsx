import { useNavigate } from "react-router";
import type { ScoreType } from "../../types/scoreType.ts";
import type { StudentType } from "../../types/studentType.ts";

function ScoreListItem({
  scoreItem,
  currentStudent,
}: {
  scoreItem: ScoreType;
  currentStudent: StudentType;
}) {
  const navigate = useNavigate();

  return (
    <tr>
      <td>{currentStudent.name}</td>
      <td>{`Class ${currentStudent.class} | Grade ${currentStudent.grade}`}</td>
      <td>{scoreItem.subject}</td>
      <td>
        {scoreItem.semesterSeason} {scoreItem.semesterYear}
      </td>
      <td>{scoreItem.score}</td>
      <th>
        <button
          className="btn btn-soft btn-info"
          //   onClick={() => navigate(`/home/score/${scoreItem.id}`)}
        >
          detail
        </button>
        <button className="btn btn-soft btn-error">delete</button>
      </th>
    </tr>
  );
}

export default ScoreListItem;

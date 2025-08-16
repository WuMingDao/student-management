import { useNavigate } from "react-router-dom";

function ScoreListItem({ scoreItem }) {
  const navigate = useNavigate();

  return (
    <tr>
      <td>{scoreItem.Name}</td>
      <td>{scoreItem.Class}</td>
      <td>{scoreItem.Subject}</td>
      <td>{scoreItem.Semester}</td>
      <td>{scoreItem.Score}</td>
      <th>
        <button
          className="btn btn-soft btn-info"
          onClick={() => navigate(`/home/score/${scoreItem.id}`)}
        >
          detail
        </button>
        <button className="btn btn-soft btn-error">delete</button>
      </th>
    </tr>
  );
}
export default ScoreListItem;

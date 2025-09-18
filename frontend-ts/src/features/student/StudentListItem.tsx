function StudentListItem({ studentItem }: any) {
  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img
                src={studentItem.avatar}
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          {/* Name and Gender */}
          <div>
            <div className="font-bold">{studentItem.name}</div>
            <div className="text-sm opacity-50">{studentItem.gender}</div>
          </div>
        </div>
      </td>
      {/* Class and teacher */}
      <td>
        class {studentItem.class} | grade {studentItem.grade}
      </td>
      <th>
        <button
          className="btn btn-soft btn-info"
          //   onClick={() => navigate(`/home/student/${studentItem.student_id}`)}
        >
          detail
        </button>
        <button className="btn btn-soft btn-error">delete</button>
      </th>
    </tr>
  );
}
export default StudentListItem;

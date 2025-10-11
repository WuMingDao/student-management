import { getStudentList } from "../../services/apiStudent";
import { mockStudentList } from "../../services/mockData";
import type { StudentType } from "../../types/studentType";
import StudentListItem from "./StudentListItem";

const studentList: StudentType[] = await getStudentList();

function StudentList() {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-lg">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Class</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {studentList.map((studentItem) => (
              <StudentListItem key={studentItem.id} studentItem={studentItem} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default StudentList;

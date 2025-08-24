import { useEffect, useState } from "react";
import StudentListItem from "./StudentListItem";
import { getStudentList } from "../../services/apiStudent";
import { getUserId } from "../../utils/userHelper";
import Loading from "../../ui/Loading";

function StudentList() {
  const [isLoading, setIsLoading] = useState(true);

  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const userId = getUserId();

      const mockStudentList = await getStudentList(userId);
      setStudentList(mockStudentList);

      // setStudentList(getStudentList(userId));
      setIsLoading(false);
    }

    fetchData();
  }, []);

  // console.log(studentList);

  return (
    <div>
      {isLoading && <Loading />}
      {/* Student list */}
      {!isLoading && (
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
                <StudentListItem
                  key={studentItem.id}
                  studentItem={studentItem}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
export default StudentList;

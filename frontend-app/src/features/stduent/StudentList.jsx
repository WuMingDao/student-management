import { useEffect, useState } from "react";
import StudentListItem from "./StudentListItem";
import { getStudentList } from "../../services/apiStudent";
import { getUserId } from "../../utils/userHelper";
import Loading from "../../ui/Loading";
import { useAtomValue } from "jotai";
import { StudentSearchConditionAtom } from "../../atoms/search";

function StudentList() {
  const [isLoading, setIsLoading] = useState(true);
  const [studentList, setStudentList] = useState([]);
  const studentSearchCondition = useAtomValue(StudentSearchConditionAtom);

  const filterStudentList = studentList.filter((studentItem) => {
    if (!studentSearchCondition.length) {
      return studentList;
    }

    const studentInfoJSON = JSON.stringify([
      studentItem.name.toLowerCase(),
      studentItem.class,
      studentItem.gender,
      studentItem.grade,
    ]);

    for (const condition of studentSearchCondition) {
      if (!studentInfoJSON.includes(condition)) {
        return false;
      }
    }

    return true;
  });

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
              {filterStudentList.map((studentItem) => (
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

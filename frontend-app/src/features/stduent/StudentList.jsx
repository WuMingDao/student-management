import { useEffect, useState } from "react";
import StudentListItem from "./StudentListItem";
import {
  countStudents,
  getStudentList,
  getStudentListWithLimit,
} from "../../services/apiStudent";
import { getUserId } from "../../utils/userHelper";
import Loading from "../../ui/Loading";
import { useAtomValue } from "jotai";
import { StudentSearchConditionAtom } from "../../atoms/search";
import { useSearchParams } from "react-router-dom";
import { getConfig } from "../../utils/configHepler";
import Pagination from "../../ui/Pagination";

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

  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);

  const pageSize = getConfig("PAGE_SIZE");
  const [studenCount, setStudenCount] = useState(0);
  const pageCount = Math.ceil(studenCount / pageSize);

  useEffect(() => {
    async function fetchData() {
      const userId = getUserId();
      const studentCountData = await countStudents(userId);
      console.log(studentCountData);
      setStudenCount(studentCountData);
    }

    fetchData();
  }, []);

  // console.log(studenCount);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const userId = getUserId();

      const studentListData = await getStudentListWithLimit(
        userId,
        currentPage,
        pageSize
      );
      setStudentList(studentListData);

      // setStudentList(getStudentList(userId));
      setIsLoading(false);
    }

    fetchData();
  }, [currentPage]);

  // console.log(studentList);

  // pagination

  // by pagination number => pagination
  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [currentPage]);

  // by pagination number buttom => serachParams
  useEffect(() => {
    setCurrentPage(searchParams.get("page") || 1);
  }, [searchParams.get("page")]);

  return (
    <div>
      {isLoading && <Loading />}
      {/* Student list */}
      {!isLoading && (
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
                  <StudentListItem
                    key={studentItem.id}
                    studentItem={studentItem}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <Pagination currentPage={currentPage} pageCount={pageCount} />
        </>
      )}
    </div>
  );
}
export default StudentList;

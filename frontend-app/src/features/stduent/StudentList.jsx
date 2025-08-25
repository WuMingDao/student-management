import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAtomValue } from "jotai";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import StudentListItem from "./StudentListItem";
import {
  countStudents as countStudentsApi,
  getStudentListWithLimit as getStudentListWithLimitApi,
} from "../../services/apiStudent";

import { StudentSearchConditionAtom } from "../../atoms/search";

import { getConfig } from "../../utils/configHepler";
import { getUserId } from "../../utils/userHelper";

import Pagination from "../../ui/Pagination";
import Loading from "../../ui/Loading";

function StudentList() {
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

  const { mutate: countStudents, isPending: isCounting } = useMutation({
    mutationFn: countStudentsApi,
    onSuccess: (studentLiastData) => setStudenCount(studentLiastData),
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: getStudentListWithLimit, isPending: isStudentListLoading } =
    useMutation({
      mutationFn: ({ userId, currentPage, pageSize }) =>
        getStudentListWithLimitApi(userId, currentPage, pageSize),
      onSuccess: (studentListData) => setStudentList(studentListData),
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const isLoading = isCounting || isStudentListLoading;

  useEffect(() => {
    countStudents(getUserId());
  }, []);

  useEffect(() => {
    const userId = getUserId();
    setSearchParams({ page: currentPage });
    getStudentListWithLimit({ userId, currentPage, pageSize });
  }, [currentPage]);

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
                {filterStudentList.map((studentItem) => (
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

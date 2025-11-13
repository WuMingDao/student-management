import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";

import { getScoreList } from "../../services/apiScore.js";
import {
  getStudentByStudentId,
  getStudentList,
} from "../../services/apiStudent.js";

import { isStudentAtom } from "../../atoms/user.js";
import { scoreSearchConditionAtom } from "../../atoms/search.js";
import {
  pageParamPageScoreAtom,
  reloadDeleteScoreAtom,
} from "../../atoms/reload.js";

import { getUserId } from "../../utils/userHelper.js";
import { getConfig } from "../../utils/configHepler.js";

import ScoreListItem from "./ScoreListItem";
import Loading from "../../ui/Loading";
import Pagination from "../../ui/Pagination.jsx";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

function ScoreList() {
  const setPageParamPageScore = useSetAtom(pageParamPageScoreAtom);
  const isStudent = useAtomValue(isStudentAtom);
  const reloadDeleteScore = useAtomValue(reloadDeleteScoreAtom);

  const [ScoreList, setScoreList] = useState([]);
  const [students, setStudents] = useState([]);

  const filterdScoreList = ScoreList.filter((ScoreItem) => {
    return students
      .map((student) => student.student_id)
      .includes(ScoreItem.student_id);
  });

  // by search condition filter score list
  const scoreSearchCondition = useAtomValue(scoreSearchConditionAtom);

  const filteredScoreListBySearchCondition = filterdScoreList.filter(
    (scoreItem) => {
      if (!scoreSearchCondition.length) {
        return filterdScoreList;
      }

      const scoreInfoJSON = JSON.stringify([
        scoreItem.subject.toLowerCase(),
        scoreItem.semesterYear,
        scoreItem.semesterSeason.toLowerCase(),
        scoreItem.score,
      ]);

      for (const condition of scoreSearchCondition) {
        if (!scoreInfoJSON.includes(condition)) {
          return false;
        }
      }

      return true;
    }
  );

  async function fetchDataApi(setScoreList, setStudents, isStudent) {
    const userId = getUserId();

    const ScoreListData = await getScoreList();
    setScoreList(ScoreListData);

    const studentList = isStudent
      ? await getStudentByStudentId(userId)
      : await getStudentList(userId);
    setStudents(studentList);
  }

  const { mutate: fetchData, isPending: isLoginPending } = useMutation({
    mutationFn: ({ setScoreList, setStudents, isStudent }) =>
      fetchDataApi(setScoreList, setStudents, isStudent),
    onSuccess: () => {
      console.log("Data fetched successfully!");
    },
    onError: (error) => {
      console.log("Error fetching data: ", error.message);
    },
  });

  useEffect(() => {
    if (isStudent === null) {
      return null;
    }

    fetchData({ setScoreList, setStudents, isStudent });
  }, [isStudent, reloadDeleteScore]);

  // pagination
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);

  const pageSize = getConfig("PAGE_SIZE");
  const pageCount = Math.ceil(
    filteredScoreListBySearchCondition.length / pageSize
  );

  // by pagination number => pagination
  useEffect(() => {
    setSearchParams({ page: currentPage });
    setPageParamPageScore(currentPage);
  }, [currentPage]);

  // by pagination number buttom => serachParams
  useEffect(() => {
    setCurrentPage(searchParams.get("page") || 1);
  }, [searchParams.get("page")]);

  // => show data
  const filteredScoreListByPage = filteredScoreListBySearchCondition.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      {isLoginPending && <Loading />}
      {!isLoginPending && (
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
                {/* <ScoreListItem /> */}
                {filteredScoreListByPage.map((scoreItem) => (
                  <ScoreListItem
                    key={scoreItem.id}
                    scoreItem={scoreItem}
                    currentStudent={
                      isStudent
                        ? students[0]
                        : students.find(
                            (student) =>
                              student.student_id === scoreItem.student_id
                          )
                    }
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
export default ScoreList;

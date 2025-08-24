import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";

import ScoreListItem from "./ScoreListItem";
import { getScoreList } from "../../services/apiScore.js";
import { getUserId } from "../../utils/userHelper.js";
import {
  getStudentByStudentId,
  getStudentList,
} from "../../services/apiStudent.js";
import Loading from "../../ui/Loading";
import { isStudentAtom } from "../../atoms/user.js";

function ScoreList() {
  const [isLoading, setIsLoading] = useState(true);
  const isStudent = useAtomValue(isStudentAtom);

  const [ScoreList, setScoreList] = useState([]);
  const [students, setStudents] = useState([]);

  const filterdScoreList = ScoreList.filter((ScoreItem) => {
    return students
      .map((student) => student.student_id)
      .includes(ScoreItem.student_id);
  });
  useEffect(() => {
    if (isStudent === null) {
      return null;
    }

    async function fetchData() {
      setIsLoading(true);
      const userId = getUserId();

      const ScoreListData = await getScoreList();
      setScoreList(ScoreListData);

      if (!isStudent) {
        const studentList = await getStudentList(userId);
        setStudents(studentList);
      } else {
        const studentList = await getStudentByStudentId(userId);
        setStudents(studentList);
      }

      setIsLoading(false);
    }
    fetchData();
  }, [isStudent]);

  return (
    <div>
      {isLoading && <Loading />}
      {!isLoading && (
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
              {filterdScoreList.map((scoreItem) => (
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
      )}
    </div>
  );
}
export default ScoreList;

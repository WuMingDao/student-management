import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { getTeacherById as getTeacherByIdApi } from "../../services/apiTeacher";
import { createStudent as createStudentApi } from "../../services/apiStudent";
import { signup as signupApi } from "../../services/apiAuth";

import Loading from "../../ui/Loading";

import { getUserId } from "../../utils/userHelper";

function StudentUpdate() {
  const navigate = useNavigate();

  const [name, setName] = useState("some name");
  const [email, setEmail] = useState("some@example.com");
  const [gender, setGender] = useState("male");
  const [ClassInChargeArr, setClassInChargeArr] = useState([]);
  const [classinfo, setClassinfo] = useState("x|y");

  const [teacherId, setTeacherId] = useState(null);

  // createStudent success or error
  const { mutate: createStudent, isPending: isCreteStudent } = useMutation({
    mutationFn: createStudentApi,
    onSuccess: (student) => {
      console.log("student created: ", student);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // signup success or error
  const { mutate: signup, isPending: isSignup } = useMutation({
    mutationFn: ({ email, password, metadata }) =>
      signupApi(email, password, metadata),
    onSuccess: (userData) => {
      createStudent({
        name,
        class: classinfo.split("|")[0],
        grade: classinfo.split("|")[1],
        avatar:
          "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp",
        gender,
        teacher_id: teacherId,
        student_id: userData.user.id,
      });

      toast.success(
        "Student created successfully, Please to email vail your Account"
      );

      navigate("/home/student");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // getTeacherById success or error
  const { mutate: getTeacherById, isPending: isGetTeacherById } = useMutation({
    mutationFn: getTeacherByIdApi,
    onSuccess: (teachers) => {
      const teacher = teachers[0];

      const ClassInChargeArrData = JSON.parse(teacher.class_in_charge);

      setClassInChargeArr(ClassInChargeArrData);
      setClassinfo(ClassInChargeArrData[0]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const isLoading = isSignup || isGetTeacherById || isCreteStudent;

  useEffect(() => {
    const userId = getUserId();
    if (!userId) {
      return;
    }
    setTeacherId(userId);

    getTeacherById(userId);
  }, []);

  async function onClick() {
    signup({ email, password: "123456", metadata: { isStudent: true } });
  }

  return (
    <div>
      {isLoading && <Loading />}
      {!isLoading && (
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 w-1/3 mx-auto shadow-2xl shadow-blue-300 mt-40">
          <div className="w-3/4 mx-auto relative">
            <label className="label">Email</label>
            <input
              type="email"
              className="input w-full"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <label className="label">Name</label>
            <input
              type="text"
              className="input w-full"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />

            <select
              className="select w-full my-4"
              value={classinfo}
              onChange={(event) => setClassinfo(event.target.value)}
            >
              <option disabled={true}>Choose Class</option>
              {ClassInChargeArr.map((classItem, index) => (
                <option key={index} value={classItem}>
                  Class {classItem.split("|")[0]} | Year{" "}
                  {classItem.split("|")[1]}
                </option>
              ))}
            </select>

            <select
              className="select w-full"
              value={gender}
              onChange={(event) => setGender(event.target.value)}
            >
              <option disabled={true}>Choose Gender</option>
              <option>male</option>
              <option>female</option>
            </select>

            <div className="text-center mt-4">
              <button
                className="btn btn-soft btn-primary my-2"
                onClick={onClick}
              >
                Create Student
              </button>
            </div>
          </div>
        </fieldset>
      )}
    </div>
  );
}
export default StudentUpdate;

import { useEffect, useState } from "react";
import { getConfig } from "../../utils/configHepler";
import { getTeacherById } from "../../services/apiTeacher";
import { createStudent } from "../../services/apiStudent";
import { signup } from "../../services/apiAuth";

function StudentUpdate() {
  const [name, setName] = useState("some name");
  const [email, setEmail] = useState("some@example.com");
  const [gender, setGender] = useState("male");
  const [ClassInChargeArr, setClassInChargeArr] = useState([]);
  const [classinfo, setClassinfo] = useState("x|y");

  const [teacherId, setTeacherId] = useState(null);

  useEffect(() => {
    const token = getConfig("SUPABASE_TOKEN");
    const userToken = JSON.parse(localStorage.getItem(token));

    if (!userToken) {
      return;
    }
    setTeacherId(userToken.user.id);

    async function fetchData() {
      const teachers = await getTeacherById(userToken.user.id);
      const teacher = teachers[0];

      // console.log(teacher);
      const ClassInChargeArrData = await JSON.parse(teacher.class_in_charge);

      setClassInChargeArr(ClassInChargeArrData);
      setClassinfo(ClassInChargeArrData[0]);
    }

    fetchData();
  }, []);

  async function onClick() {
    // TODO: sign up student to supabase
    const userData = await signup(email, "123456", { isStudent: true });
    console.log(userData);

    // TODO: insert student to database
    const student = await createStudent({
      name,
      class: classinfo.split("|")[0],
      grade: classinfo.split("|")[1],
      avatar: "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp",
      gender,
      teacher_id: teacherId,
      student_id: userData.user.id,
    });

    console.log(student);
  }

  return (
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
              Class {classItem.split("|")[0]} | Year {classItem.split("|")[1]}
            </option>
          ))}
        </select>

        <select
          className="select w-full"
          value={gender}
          onChange={(event) => setGender(event.target.value)}
        >
          <option disabled={true}>Choose Gender</option>
          <option value="Male">male</option>
          <option value="Female">female</option>
        </select>

        <div className="text-center mt-4">
          <button className="btn btn-soft btn-primary my-2" onClick={onClick}>
            Create Student
          </button>
        </div>
      </div>
    </fieldset>
  );
}
export default StudentUpdate;

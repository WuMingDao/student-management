import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getConfig } from "../../utils/configHepler";

import {
  getStudentByStudentId,
  updateStudent,
} from "../../services/apiStudent";
import { uploadAvatar } from "../../services/apiStorage";

function StudentEdit() {
  const navigate = useNavigate();

  const [currentAvatar, setCurrentAvatar] = useState(
    "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
  );
  const [avatarFile, setAvatarFile] = useState(null);

  const [name, setName] = useState("wumingdao");
  const [gender, setGender] = useState("male");

  const param = useParams();

  useEffect(() => {
    async function fetchData() {
      const stduents = await getStudentByStudentId(param.id);
      const student = stduents[0];

      setName(student.name);
      setGender(student.gender);
      setCurrentAvatar(student.avatar);
    }

    fetchData();
    // console.log(currentAvatar);
  }, []);

  function handleAvatarChange(event) {
    const file = event.target.files[0];
    setAvatarFile(file);

    const newUrl = URL.createObjectURL(file);
    setCurrentAvatar(newUrl);
  }

  async function onClick() {
    const newStudent = {
      name,
      gender,
    };

    if (avatarFile) {
      // build avatar file name
      const supabaseToken = getConfig("SUPABASE_TOKEN");
      const userToken = JSON.parse(localStorage.getItem(supabaseToken));
      const avatarFileName = `${userToken.user.email}-${Date.now()}.png`;

      // upload avatar file
      await uploadAvatar(avatarFile, avatarFileName);

      // build user access avatar url
      const supabaseUrl = getConfig("SUPABASE_URL");
      const avatar = `${supabaseUrl}/storage/v1/object/public/avatar/public/${avatarFileName}`;

      newStudent.avatar = avatar;
    }

    // update student in supabase
    const data = await updateStudent(param.id, newStudent);

    console.log(data);

    navigate("/home/student");
  }

  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 w-1/3 mx-auto shadow-2xl shadow-blue-300 mt-40">
      <div className="avatar my-4 flex justify-center">
        <div className="w-24 rounded-full ">
          <label htmlFor="input-avatar" className="cursor-pointer">
            <img src={currentAvatar} />
          </label>
        </div>
      </div>

      <input
        id="input-avatar"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleAvatarChange}
      />

      <div className="w-3/4 mx-auto relative">
        <label className="label">Name</label>
        <input
          type="text"
          className="input w-full"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <select
          className="select w-full my-4"
          value={gender}
          onChange={(event) => setGender(event.target.value)}
        >
          <option disabled>Choose Gender</option>
          <option>male</option>
          <option>female</option>
        </select>

        <div className="text-center mt-4">
          <button className="btn btn-soft btn-primary my-2" onClick={onClick}>
            Update Profile
          </button>
        </div>
      </div>
    </fieldset>
  );
}
export default StudentEdit;

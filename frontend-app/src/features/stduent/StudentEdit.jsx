import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { getConfig } from "../../utils/configHepler";

import {
  getStudentByStudentId as getStudentByStudentIdAPI,
  updateStudent,
} from "../../services/apiStudent";
import { uploadAvatar } from "../../services/apiStorage";

import Loading from "../../ui/Loading";
import { getNewImageUrl } from "../../utils/getNewImage";

function StudentEdit() {
  const navigate = useNavigate();

  const [currentAvatar, setCurrentAvatar] = useState(
    "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
  );
  const [avatarFile, setAvatarFile] = useState(null);

  const [name, setName] = useState("wumingdao");
  const [gender, setGender] = useState("male");

  const param = useParams();

  // load student data from supabase
  const { mutate: getStudentByStudentId, isPending: isGetStudentByStudentId } =
    useMutation({
      mutationFn: getStudentByStudentIdAPI,
      onSuccess: (stduents) => {
        const student = stduents[0];

        setName(student.name);
        setGender(student.gender);
        setCurrentAvatar(student.avatar);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const isLoading = isGetStudentByStudentId;

  useEffect(() => {
    getStudentByStudentId(param.id);
  }, []);

  function handleAvatarChange(event) {
    const file = event.target.files[0];
    getNewImageUrl(file, setAvatarFile, setCurrentAvatar);
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
    <div>
      {isLoading && <Loading />}
      {!isLoading && (
        <div>
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
                <button
                  className="btn btn-soft btn-primary my-2"
                  onClick={onClick}
                >
                  Update Profile
                </button>
              </div>
            </div>
          </fieldset>
        </div>
      )}
    </div>
  );
}
export default StudentEdit;

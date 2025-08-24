import { useEffect, useState } from "react";

import { useAtom } from "jotai";
import { userAtom } from "../../atoms/user";

import { getConfig } from "../../utils/configHepler";
import { getUserId } from "../../utils/userHelper";

import { uploadAvatar } from "../../services/apiStorage";
import { getTeacherById } from "../../services/apiTeacher";
import { updateUser } from "../../services/apiAuth";

function Profile() {
  const [user, setUser] = useAtom(userAtom);

  const [currentAvatar, setCurrentAvatar] = useState(user.avatar);

  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    setCurrentAvatar(user.avatar);
  }, [user]);

  // get class in charge render
  const [ClassInChargeArr, setClassInChargeArr] = useState([]);

  useEffect(() => {
    async function loadData() {
      const userId = getUserId();

      const teachers = await getTeacherById(userId);
      const teacher = teachers[0];

      // console.log(teacher.class_in_charge);

      setClassInChargeArr(JSON.parse(teacher.class_in_charge));
    }

    loadData();
    // console.log(ClassInChargeArr);
  }, []);

  function handleAvatarChange(event) {
    const file = event.target.files[0];
    setAvatarFile(file);

    const newUrl = URL.createObjectURL(file);
    setCurrentAvatar(newUrl);
  }

  async function onClick() {
    if (!avatarFile) {
      // TODO: warning toast
      console.log("Please select an avatar file");
      return;
    }

    // build avatar file name
    const supabaseToken = getConfig("SUPABASE_TOKEN");
    const userToken = JSON.parse(localStorage.getItem(supabaseToken));
    const avatarFileName = `${userToken.user.email}-${Date.now()}.png`;

    // upload avatar file
    await uploadAvatar(avatarFile, avatarFileName);
    // update user metadata in supabase
    const supabaseUrl = getConfig("SUPABASE_URL");
    const newAvatarUrl = `${supabaseUrl}/storage/v1/object/public/avatar/public/${avatarFileName}`;
    const newUserMetadata = await updateUser({ avatar: newAvatarUrl });

    console.log(newUserMetadata);
    // update user matedata in jotai
    setUser(newUserMetadata.user.user_metadata);

    console.log(user);
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
        <label className="label">wumingdao</label>

        <input
          type="email"
          className="input w-full"
          value={"wumingdao"}
          disabled
        />

        {ClassInChargeArr.length > 0 && (
          <ul className="menu bg-base-200 rounded-box w-full">
            <li>
              <details>
                <summary>Change Class</summary>
                <ul>
                  {ClassInChargeArr.map((classItem, index) => (
                    <li key={index}>
                      <a>
                        Class {classItem.split("|")[0]} | year{" "}
                        {classItem.split("|")[1]}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          </ul>
        )}
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-soft btn-primary my-2" onClick={onClick}>
          Update Avatar
        </button>
      </div>
    </fieldset>
  );
}
export default Profile;

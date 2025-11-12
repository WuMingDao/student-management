import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useAtom, useAtomValue } from "jotai";
import { isStudentAtom, userAtom } from "../../atoms/user";

import { getUserId } from "../../utils/userHelper";
import { getNewImageUrl } from "../../utils/getNewImage";

import { uploadAvatar } from "../../services/apiStorage";
import { getTeacherById } from "../../services/apiTeacher";
import {
  getStudentByStudentId,
  updateStudent,
} from "../../services/apiStudent";
import { updateUser } from "../../services/apiAuth";

import Loading from "../../ui/Loading";
import { getConfig } from "../../utils/configHelper";

function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useAtom(userAtom);
  const isStudent = useAtomValue(isStudentAtom);

  const [currentAvatar, setCurrentAvatar] = useState<string>(user.avatar);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    setCurrentAvatar(user.avatar);
  }, [user]);

  // get class in charge render
  const [ClassInChargeArr, setClassInChargeArr] = useState([]);

  useEffect(() => {
    if (isStudent === null) {
      return;
    }

    async function loadData() {
      setIsLoading(true);

      if (!isStudent) {
        const userId = getUserId();
        const teachers = await getTeacherById(userId);
        const teacher = teachers[0];

        setClassInChargeArr(JSON.parse(teacher.class_in_charge));
      }
      setIsLoading(false);
    }

    loadData();
    // console.log(ClassInChargeArr);
  }, [isStudent]);

  function handleAvatarChange(event: any) {
    const file = event.target.files[0];
    getNewImageUrl({ file, setAvatarFile, setCurrentAvatar });
  }

  async function onClick() {
    if (!avatarFile) {
      toast.warning("Please select an avatar file");

      return;
    }

    toast.loading("Uploading avatar...");

    // build avatar file name
    const supabaseToken = getConfig("SUPABASE_TOKEN");
    const userToken = JSON.parse(localStorage.getItem(supabaseToken) as string);
    const avatarFileName = `${userToken.user.email}-${Date.now()}.png`;

    // upload avatar file
    await uploadAvatar(avatarFile, avatarFileName);
    // update user metadata in supabase
    const supabaseUrl = getConfig("SUPABASE_URL");
    const newAvatarUrl = `${supabaseUrl}/storage/v1/object/public/avatar/public/${avatarFileName}`;
    const newUserMetadata = await updateUser({ avatar: newAvatarUrl });

    // update user avatar
    const userId = getUserId();

    const currStudent = getStudentByStudentId(userId);

    if (isStudent) {
      const student = await updateStudent({
        studentId: userId,
        updatedStudent: { avatar: newAvatarUrl },
      });

      console.log(student);
    }

    console.log(newUserMetadata);
    // update user matedata in jotai
    setUser(newUserMetadata.user.user_metadata);

    console.log(user);

    toast.dismiss();
    toast.success("Avatar updated successfully");
  }

  return (
    <div>
      {isLoading && <Loading />}
      {!isLoading && (
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
      )}
    </div>
  );
}
export default Profile;

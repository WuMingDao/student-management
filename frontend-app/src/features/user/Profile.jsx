import { use, useEffect, useState } from "react";
import { uploadAvatar } from "../../services/apiStorage";
import { getConfig } from "../../utils/configHepler";

function Profile() {
  const [currentAvatar, setCurrentAvatar] = useState(
    "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
  );

  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    const token = getConfig("SUPABASE_TOKEN");
    const userToken = JSON.parse(localStorage.getItem(token));

    console.log(userToken.user.user_metadata.avatar);
    setCurrentAvatar(userToken.user.user_metadata.avatar);
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

    const data = await uploadAvatar(avatarFile);
    console.log(data);
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

        <ul className="menu bg-base-200 rounded-box w-full">
          <li>
            <details>
              <summary>Change Class</summary>
              <ul>
                <li>
                  <a>Class 1 | year 8</a>
                </li>
                <li>
                  <a>Class 2 | year 9</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
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

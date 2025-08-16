import { useState } from "react";

function StudentUpdate() {
  const [name, setName] = useState("wumingdao");
  const [gender, setGender] = useState("Male");
  const [classinfo, setClassinfo] = useState("Class 10 | year 2");

  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 w-1/3 mx-auto shadow-2xl shadow-blue-300 mt-40">
      <div className="avatar my-4 flex justify-center">
        <div className="w-24 rounded-full ">
          <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
        </div>
      </div>

      <div className="w-3/4 mx-auto relative">
        <label className="label">Name</label>
        <input
          type="text"
          className="input w-full"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <label className="label">Class</label>
        <input
          type="text"
          className="input w-full"
          value={classinfo}
          onChange={(event) => setClassinfo(event.target.value)}
        />

        <select
          className="select w-full my-4"
          value={gender}
          onChange={(event) => setGender(event.target.value)}
        >
          <option disabled={true}>Choose Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <div className="text-center mt-4">
          <button className="btn btn-soft btn-primary my-2">
            Update Profile
          </button>
        </div>
      </div>
    </fieldset>
  );
}
export default StudentUpdate;

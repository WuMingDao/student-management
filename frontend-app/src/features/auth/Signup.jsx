import { useState } from "react";
import { signup } from "../../services/apiAuth.js";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function onClick() {
    const data = await signup(email, password);

    console.log(data);
  }

  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 w-1/3 mx-auto shadow-2xl shadow-blue-300 mt-40">
      <h1 className="text-center text-2xl">SunShine</h1>

      <div className="w-3/4 mx-auto relative">
        <label className="label">Email</label>
        <input
          type="email"
          className="input w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="w-3/4 mx-auto relative">
        <label className="label">Password</label>
        <input
          type="password"
          className="input w-full"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="w-3/4 mx-auto relative">
        <label className="label">Confirm Password</label>
        <input
          type="password"
          className="input w-full"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className="text-center mt-4">
        {/* TODO: form verification */}
        <button
          className="btn btn-soft btn-primary mx-2 my-2"
          onClick={onClick}
        >
          Sign Up
        </button>
        <button className="btn btn-soft btn-secondary mx-2 my-2">Login</button>
      </div>
    </fieldset>
  );
}
export default Signup;

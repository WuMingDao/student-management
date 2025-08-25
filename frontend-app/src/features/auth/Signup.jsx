import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { signup } from "../../services/apiAuth.js";
import { useNavigate } from "react-router-dom";
import { createTeacher } from "../../services/apiTeacher.js";
import ErrorMessage from "../../ui/ErrorMessage.jsx";

function Signup() {
  const navigate = useNavigate();

  //  vail form in signup
  const Validationschema = yup
    .object({
      email: yup.string().required().email(),
      password: yup.string().required().min(6),
      confirmPassword: yup
        .string()
        .required()
        .min(6)
        .oneOf([yup.ref("password")], "Passwords must match"),
    })
    .required();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Validationschema),
  });

  async function onSubmit({ email, password }) {
    // Sign up user
    const data = await signup(email, password);

    console.log(data);

    // insesrt data to teacher table
    const teacherID = data.user.id;
    await createTeacher({ teacher_id: teacherID });

    navigate("/auth/login");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 w-1/3 mx-auto shadow-2xl shadow-blue-300 mt-40">
        <h1 className="text-center text-2xl">SunShine</h1>

        <div className="w-3/4 mx-auto relative">
          <label className="label">Email</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="w-3/4 mx-auto relative">
          <label className="label">Password</label>
          <input
            type="password"
            className="input w-full"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="w-3/4 mx-auto relative">
          <label className="label">Confirm Password</label>
          <input
            type="password"
            className="input w-full"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
          )}
        </div>

        <div className="text-center mt-4">
          {/* TODO: form verification */}
          <button className="btn btn-soft btn-primary mx-2 my-2">
            Sign Up
          </button>
          <button
            className="btn btn-soft btn-secondary mx-2 my-2"
            onClick={() => navigate("/auth/login")}
          >
            Login
          </button>
        </div>
      </fieldset>
    </form>
  );
}
export default Signup;

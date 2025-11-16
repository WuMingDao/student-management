import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router";
import { useSignup } from "../../hooks/useSignup.js";
import ErrorMessage from "../../ui/ErrorMessage.jsx";
import { signupValidationSchema } from "../../utils/validationSchemas.js";

function Signup() {
  const navigate = useNavigate();
  // setup form vail
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupValidationSchema),
  });

  const { isLoading, signup } = useSignup();

  function onSubmit({ email, password }) {
    signup({ email, password });
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
          <button
            className="btn btn-soft btn-primary mx-2 my-2"
            disabled={isLoading}
          >
            Sign Up
          </button>
          <button
            className="btn btn-soft btn-secondary mx-2 my-2"
            onClick={() => navigate("/auth/login")}
            disabled={isLoading}
          >
            Login
          </button>
        </div>
      </fieldset>
    </form>
  );
}
export default Signup;

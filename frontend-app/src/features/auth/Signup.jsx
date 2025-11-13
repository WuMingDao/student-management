import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { signup as signupAPI } from "../../services/apiAuth.js";
import { createTeacher as createTeacherApi } from "../../services/apiTeacher.js";
import ErrorMessage from "../../ui/ErrorMessage.jsx";

function Signup() {
  const navigate = useNavigate();

  // create tearcer user to supabase user
  const { mutate: createTeacher, isPending: isCreatingTeacher } = useMutation({
    mutationFn: createTeacherApi,
    onSuccess: () => {
      toast.success("Signup successful, Please comfirm your email");
      navigate("/auth/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // insert teacher user to supabase table
  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: ({ email, password }) => signupAPI(email, password),
    onSuccess: (userData) => {
      createTeacher({ teacher_id: userData.user.id });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const isLoading = isCreatingTeacher || isSigningUp;

  //  vail form handle
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

  // settip form vail
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Validationschema),
  });

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

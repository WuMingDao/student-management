import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as yup from "yup";

import { login as loginAPi } from "../../services/apiAuth.js";
import ErrorMessage from "../../ui/ErrorMessage.jsx";

function Login() {
  const navigate = useNavigate();

  // login after success or error
  const { mutate: login, isPending: isLoginPending } = useMutation({
    mutationFn: ({ email, password }) => loginAPi(email, password),
    onSuccess: () => {
      toast.success("Login success!");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // vail form handle
  const Validationschema = yup
    .object({
      email: yup.string().required().email(),
      password: yup.string().required().min(6),
    })
    .required();

  // settip form vail
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Validationschema),
  });

  // handle submit form to login
  async function onSubmit({ email, password }) {
    login({ email, password });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 w-1/3 mx-auto shadow-2xl shadow-blue-300 mt-40">
        <h1 className="text-center text-2xl">SunShine</h1>

        {/* type eamil for login */}
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

        {/* type password for login */}
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

          <div className="grid grid-cols-2 gap-2 mt-4">
            <label className="label mt-2 text-xl">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-primary"
              />
              Remember me
            </label>

            <button className="btn btn-link">Forget Password</button>
          </div>
        </div>

        <div className="text-center mt-4">
          <button
            className="btn btn-soft btn-primary mx-2 my-2"
            onClick={() => navigate("/auth/signup")}
            disabled={isLoginPending}
          >
            Sign Up
          </button>

          <button
            className="btn btn-soft btn-secondary mx-2 my-2"
            disabled={isLoginPending}
          >
            Login
          </button>
        </div>
      </fieldset>
    </form>
  );
}
export default Login;

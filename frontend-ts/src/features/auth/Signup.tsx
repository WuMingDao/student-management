import { useNavigate } from "react-router";
import { userSchema, type userType } from "../../types/userType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../ui/ErrorMessage";

function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userType>({
    resolver: zodResolver(userSchema),
  });

  async function onSubmit(data: userType) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid h-screen place-items-center">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xl border p-6 gap-4 mb-60 shadow-2xl shadow-blue-300">
          {/* <legend className="fieldset-legend">Login</legend> */}

          <h2 className="text-2xl text-center">SunShine Sign Up</h2>

          <div className="grid grid-rows-3 gap-4 mx-auto w-full max-w-xs">
            <label className="input">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-mail-icon lucide-mail"
              >
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                <rect x="2" y="4" width="20" height="16" rx="2" />
              </svg>
              <input
                type="email"
                className="input"
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </label>

            <label className="input ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-key-square-icon lucide-key-square"
              >
                <path d="M12.4 2.7a2.5 2.5 0 0 1 3.4 0l5.5 5.5a2.5 2.5 0 0 1 0 3.4l-3.7 3.7a2.5 2.5 0 0 1-3.4 0L8.7 9.8a2.5 2.5 0 0 1 0-3.4z" />
                <path d="m14 7 3 3" />
                <path d="m9.4 10.6-6.814 6.814A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814" />
              </svg>
              <input
                type="password"
                className="input"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </label>

            <label className="input ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-key-square-icon lucide-key-square"
              >
                <path d="M12.4 2.7a2.5 2.5 0 0 1 3.4 0l5.5 5.5a2.5 2.5 0 0 1 0 3.4l-3.7 3.7a2.5 2.5 0 0 1-3.4 0L8.7 9.8a2.5 2.5 0 0 1 0-3.4z" />
                <path d="m14 7 3 3" />
                <path d="m9.4 10.6-6.814 6.814A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814" />
              </svg>
              <input
                type="password"
                className="input"
                placeholder="Comfirm Password"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-2 mx-auto w-full max-w-sm">
            <button
              className="btn btn-soft btn-primary mx-2 my-2"
              // disabled={isLoading}
            >
              Sign Up
            </button>
            <button
              className="btn btn-soft btn-secondary mx-2 my-2"
              onClick={() => navigate("/auth/login")}
              // disabled={isLoading}
            >
              Login
            </button>
          </div>
        </fieldset>
      </div>
    </form>
  );
}
export default Signup;

import { useNavigate } from "react-router";
import { getStudentList } from "../../services/apiStudent";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudentSchema } from "../../types/studentType";
import type { StudentType } from "../../types/studentType";
import {
  StudentUserSchema,
  userSchema,
  type StudentUserType,
} from "../../types/userType";
import z from "zod";
import { supabase } from "../../utils/supabase";
import ErrorMessage from "../../ui/ErrorMessage";
import { getUser as getUserApi } from "../../services/apiAuth";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import type { TeacherType } from "../../types/teacher";

// console.log(teacher);

function CreateStudent() {
  const classWithGradeArray = ["4|6", "9|1", "12|1", "2|9", "1|9"];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentUserType>({
    resolver: zodResolver(StudentUserSchema),
    defaultValues: {
      password: "123456",
      classWithGrade: "1|9",
      gender: "male",
    },
  });

  const onSubmit: SubmitHandler<StudentUserType> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid place-items-center">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xl border gap-4 p-8 mt-20 shadow-2xl shadow-blue-300">
          <h2 className="text-center text-2xl">Create Student</h2>

          <label className="input w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>

            <input type="text" placeholder="email" {...register("email")} />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </label>

          <label className="input w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>

            <input
              type="text"
              placeholder="My awesome page"
              {...register("name")}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </label>

          {/* <select className="select w-full" {...register("classWithGrade")}>
            <option disabled={true}>Choose Class</option>
            {classWithGradeArray.map((item, index) => (
              <option key={index} value={item}>
                class {item.split("|")[0]} | grade {item.split("|")[1]}
              </option>
            ))}
          </select>

          <select className="select w-full" {...register("gender")}>
            <option disabled={true}>Choose Gender</option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select> */}

          <button
            type="submit"
            className="btn btn-soft btn-primary  mx-auto w-1/2"
          >
            Create Student
          </button>
        </fieldset>
      </div>
    </form>
  );
}
export default CreateStudent;

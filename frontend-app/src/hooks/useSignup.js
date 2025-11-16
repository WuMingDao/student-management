import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { signup as signupAPI } from "../services/apiAuth.js";
import { createTeacher as createTeacherApi } from "../services/apiTeacher.js";

export function useSignup() {
  const navigate = useNavigate();

  // create teacher user to supabase user
  const { mutate: createTeacher, isPending: isCreatingTeacher } = useMutation({
    mutationFn: createTeacherApi,
    onSuccess: () => {
      toast.success("Signup successful, Please confirm your email");
      navigate("/auth/login");
    },
    onError: (error) => {
      toast.error(` Error creating teacher: ${error.message}`);
    },
  });

  // insert teacher user to supabase table
  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: ({ email, password }) => signupAPI(email, password),
    onSuccess: (userData) => {
      createTeacher({ teacher_id: userData.user.id });
    },
    onError: (error) => {
      toast.error(`Error signing up: ${error.message}`);
    },
  });

  const isLoading = isCreatingTeacher || isSigningUp;

  return { signup, isLoading };
}

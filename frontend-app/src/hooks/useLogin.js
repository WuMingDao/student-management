import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { useNavigate } from "react-router";
import { login as loginAPi } from "../services/apiAuth.js";

export function useLogin() {
  const navigate = useNavigate();

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

  return { login, isLoginPending };
}

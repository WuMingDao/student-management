import { atom } from "jotai";

export const userAtom = atom<{ avatar: string; isStudent: boolean | null }>({
  avatar: "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp",
  isStudent: null,
});

export const isStudentAtom = atom((get) => {
  const user = get(userAtom);

  return user.isStudent;
});

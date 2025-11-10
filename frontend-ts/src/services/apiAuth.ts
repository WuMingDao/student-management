import { TeacherSchema } from "../types/teacher";
import { supabase } from "../utils/supabase";

export async function signup({
  email,
  password,
  metadata = {},
}: {
  email: string;
  password: string;
  metadata?: any;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: `${email}-${Date.now()}`,
        avatar:
          "https://img.daisyui.com/images/profile/demo/batperson@192.webp",
        ...metadata,
      },
    },
  });

  if (error) {
    console.log("Error signing up", error.message);
    throw new Error(error.message);
  }

  console.log("User created", data);

  return data;
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log("Error logging in", error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function singout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("Error logging out", error.message);
    throw new Error(error.message);
  }
}

export async function getUser() {
  const { data: teacher, error } = await supabase
    .from("teacher")
    .select("*")
    .eq("teacher_id", "cee636d9-1099-4619-87b1-c0f11286a619");

  if (!teacher) {
    return [];
  }

  const data = TeacherSchema.safeParse(teacher);

  if (!data.success) {
    throw new Error("Failed to parse teacher data");
  }

  const result = TeacherSchema.parse(teacher);

  return result;
}

export async function updateUser(newUserMetadata = {}) {
  const { data, error } = await supabase.auth.updateUser({
    data: newUserMetadata,
  });

  if (error) {
    console.log("Error updating user", error.message);
    throw new Error(error.message);
  }

  return data;
}

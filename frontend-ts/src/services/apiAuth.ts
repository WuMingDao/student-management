import { TeacherSchema } from "../types/teacher";
import { supabase } from "../utils/supabase";

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

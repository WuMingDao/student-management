import { supabase } from "../utils/supabase";

export async function createTeacher(teacher) {
  const { error } = await supabase.from("teacher").insert([teacher]);

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
}

export async function getTeacherById(teacherId) {
  // console.log("getTeacherById: ", teacherId);
  const { data: teacher, error } = await supabase
    .from("teacher")
    .select("*")
    .eq("teacher_id", teacherId);

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  // console.log("teacher: ", teacher);
  return teacher;
}

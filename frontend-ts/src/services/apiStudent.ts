import z from "zod";
import { supabase } from "../utils/supabase";
import { StudentSchema } from "../types/studentType";

export async function getStudentList() {
  const { data: student, error } = await supabase.from("student").select("*");

  if (error) {
    throw error.message;
  }

  if (!student) {
    return [];
  }

  const StudentTypeArray = z.array(StudentSchema);
  const isStudentType = StudentTypeArray.safeParse(student);

  if (!isStudentType) {
    throw new Error("Invalid student data");
  }

  const result = StudentTypeArray.parse(student);

  return result;
}

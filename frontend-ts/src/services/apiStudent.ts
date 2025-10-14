import z from "zod";
import { supabase } from "../utils/supabase";
import { StudentSchema, type StudentType } from "../types/studentType";

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

export async function createStudent(newStudent: StudentType) {
  const { data: student, error } = await supabase
    .from("student")
    .insert([newStudent])
    .select();

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  const isStudentType = StudentSchema.safeParse(student);

  if (!isStudentType) {
    throw new Error("Invalid student data");
  }

  const result = StudentSchema.parse(student);

  return result;
}

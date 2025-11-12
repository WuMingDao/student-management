import z from "zod";
import { supabase } from "../utils/supabase";
import { StudentSchema, type StudentType } from "../types/studentType";

export async function getStudentList(teacherId: string) {
  const { data: student, error } = await supabase
    .from("student")
    .select("*")
    .eq("teacher_id", teacherId);

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

export async function getStudentListWithLimit({
  teacherId,
  currentPage,
  pageSize,
}: {
  teacherId: string;
  currentPage: number;
  pageSize: number;
}) {
  const { data: student, error } = await supabase
    .from("student")
    .select("*")
    .eq("teacher_id", teacherId)
    .range((currentPage - 1) * pageSize, currentPage * pageSize - 1);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return student;
}

export async function countStudents(teacherId: string) {
  const { count, error } = await supabase
    .from("student")
    .select("*", { count: "exact", head: true })
    .eq("teacher_id", teacherId);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return count;
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

export async function getStudentByStudentId(studentId: string) {
  console.log("studentId: ", studentId);

  const { data: student, error } = await supabase
    .from("student")
    .select("*")
    .eq("student_id", studentId);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  console.log("student: ", student);
  return student;
}

export async function updateStudent({
  studentId,
  updatedStudent,
}: {
  studentId: string;
  updatedStudent: StudentType;
}) {
  const { data, error } = await supabase
    .from("student")
    .update(updatedStudent)
    .eq("student_id", studentId)
    .select();

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data;
}

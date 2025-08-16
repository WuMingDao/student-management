import { supabase } from "../utils/supabase.js";

export async function getStudents() {
  let { data: student, error } = await supabase.from("student").select("*");

  if (error) {
    console.log("Error fetching students", error);
    return;
  }

  return student;
}

export async function insertStudent() {
  const { data, error } = await supabase
    .from("student")
    .insert([{ name: "John Doe", class: 2, grade: 4, gender: "female" }])
    .select();

  if (error) {
    console.log("Error fetching data", error);
    return;
  }

  return data;
}

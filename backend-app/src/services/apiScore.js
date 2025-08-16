import { faker } from "@faker-js/faker";
import { supabase } from "../utils/supabase.js";

const subjects = ["Math", "English", "Science", "History", "Geography", "Art"];

export function generateScore() {
  const student_id = faker.number.int({ min: 1, max: 11 });
  const score = faker.number.int({ min: 0, max: 100 });
  const semesterSeason = faker.number.int(1, 4) % 2 ? "Spring" : "Fall";
  const semesterYear = faker.number.int({
    min: 2000,
    max: new Date().getFullYear(),
  });

  const subject = faker.helpers.arrayElement(subjects);

  return {
    student_id,
    score,
    semesterSeason,
    semesterYear,
    subject,
  };
}

export function generateScores(count = 5) {
  return new Array(count).fill("").map(() => generateScore());
}

export async function insertScores(count = 5) {
  const scores = generateScores(count);
  console.log("Inserting scores:", scores);

  const { data, error } = await supabase.from("score").insert(scores).select();

  if (error) {
    console.error("Error inserting data:", error);
    return;
  }

  return data;
}

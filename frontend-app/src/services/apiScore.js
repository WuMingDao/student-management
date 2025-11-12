import { supabase } from "../utils/supabase";

const mockScoreList = [
  {
    id: 1,
    Name: "Cy Ganderton",
    Class: "Year 6",
    Subject: "Math",
    Semester: "2024 fall",
    Score: 99.99,
  },
  {
    id: 2,
    Name: "David Chen",
    Class: "Year 7",
    Subject: "Science",
    Semester: "2024 fall",
    Score: 85.5,
  },
  {
    id: 3,
    Name: "Emily White",
    Class: "Year 8",
    Subject: "English",
    Semester: "2024 spring",
    Score: 92.0,
  },
  {
    id: 4,
    Name: "Frank Miller",
    Class: "Year 6",
    Subject: "History",
    Semester: "2024 spring",
    Score: 78.2,
  },
  {
    id: 5,
    Name: "Grace Lee",
    Class: "Year 7",
    Subject: "Geography",
    Semester: "2024 fall",
    Score: 95.8,
  },
  {
    id: 6,
    Name: "Henry Adams",
    Class: "Year 8",
    Subject: "Physics",
    Semester: "2024 spring",
    Score: 89.1,
  },
  {
    id: 7,
    Name: "Ivy Wilson",
    Class: "Year 6",
    Subject: "Chemistry",
    Semester: "2024 fall",
    Score: 81.7,
  },
  {
    id: 8,
    Name: "Jack Green",
    Class: "Year 7",
    Subject: "Biology",
    Semester: "2024 spring",
    Score: 90.5,
  },
  {
    id: 9,
    Name: "Karen Hall",
    Class: "Year 8",
    Subject: "Art",
    Semester: "2024 fall",
    Score: 96.3,
  },
  {
    id: 10,
    Name: "Leo Brown",
    Class: "Year 6",
    Subject: "Music",
    Semester: "2024 spring",
    Score: 87.6,
  },
];

export async function getScoreList() {
  const { data: score, error } = await supabase.from("score").select("*");

  if (error) {
    console.log(error.messgae);
    return;
  }

  return score;
}

export async function createScore(newScore) {
  const { data, error } = await supabase
    .from("score")
    .insert([newScore])
    .select();

  if (error) {
    console.log(error.messgae);
    return;
  }

  return data;
}

export async function getScoreByScoreId(scoreId) {
  const { data: score, error } = await supabase
    .from("score")
    .select("*")
    .eq("id", scoreId);

  if (error) {
    console.log(error.messgae);
    return;
  }

  return score;
}

export async function updateScore(scoreId, updatedScore) {
  const { data, error } = await supabase
    .from("score")
    .update(updatedScore)
    .eq("id", scoreId)
    .select();

  if (error) {
    console.log(error.messgae);
    throw new Error(error.message);
  }

  return data;
}

export async function deleteScore(ScoreId) {
  const { error } = await supabase.from("score").delete().eq("id", ScoreId);

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
}

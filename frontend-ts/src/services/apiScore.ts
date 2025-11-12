import z from "zod";
import { ScoreSchema, type ScoreType } from "../types/scoreType";
import { supabase } from "../utils/supabase";

export async function getScoreList(): Promise<ScoreType[]> {
  const { data: score, error } = await supabase.from("score").select("*");

  if (error) {
    throw error.message;
  }

  if (!score) {
    return [];
  }

  //  Validate data
  const ScoreTypeArray = z.array(ScoreSchema);
  const isScoreType = ScoreTypeArray.safeParse(score);

  if (!isScoreType) {
    throw new Error("Invalid score data");
  }

  const result = ScoreTypeArray.parse(score);

  return result;
}

export async function createScore(newScore: ScoreType) {
  const { data, error } = await supabase
    .from("score")
    .insert([newScore])
    .select();

  if (error) {
    console.log(error.message);
    return;
  }

  return data;
}

export async function getScoreByScoreId(scoreId: number) {
  const { data: score, error } = await supabase
    .from("score")
    .select("*")
    .eq("id", scoreId);

  if (error) {
    console.log(error.message);
    return;
  }

  return score;
}

export async function updateScore({
  scoreId,
  updatedScore,
}: {
  scoreId: number;
  updatedScore: ScoreType;
}) {
  const { data, error } = await supabase
    .from("score")
    .update(updatedScore)
    .eq("id", scoreId)
    .select();

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data;
}

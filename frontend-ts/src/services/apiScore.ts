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

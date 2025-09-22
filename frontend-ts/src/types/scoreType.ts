import * as z from "zod";

const ScoreSchema = z.object({
  id: z.number(),
  subject: z.enum(["Math", "English", "Science", "Social Studies", "History"]),
  score: z.number(),
  semesterSeason: z.enum(["Fall", "Spring"]),
  semesterYear: z.number(),
});

export type ScoreType = {
  id: number;
  subject: "Math" | "English" | "Science" | "Social Studies" | "History";
  score: number;
  semesterSeason: "Fall" | "Spring";
  semesterYear: number;
};

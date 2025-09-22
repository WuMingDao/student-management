import * as z from "zod";

const ScoreSchema = z.object({
  id: z.number(),
  student_id: z.string(),
  score: z.number(),
  semesterSeason: z.enum(["Fall", "Spring"]),
  semesterYear: z.number(),
  subject: z.enum(["Math", "English", "Science", "Social Studies", "History"]),
});

export type ScoreType = z.infer<typeof ScoreSchema>;

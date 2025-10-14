import * as z from "zod";

export const TeacherSchema = z.object({
  id: z.number(),
  teacher_id: z.string(),
  gender: z.enum(["male", "female"]),
  class_in_charge: z.string(),
});

export type TeacherType = z.infer<typeof TeacherSchema>;

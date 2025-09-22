import * as z from "zod";

export const StudentSchema = z.object({
  id: z.number(),
  avatar: z.string().url(),
  student_id: z.string(),
  teacher_id: z.string(),

  name: z.string().min(1).max(30),
  class: z.string().max(2),
  grade: z.string().max(2),
  gender: z.enum(["male", "female"]),
});

export type StudentType = z.infer<typeof StudentSchema>;

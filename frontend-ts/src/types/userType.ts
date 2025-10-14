import * as z from "zod";
import { StudentSchema } from "./studentType";

export const userSchema = z.object({
  password: z.string().min(8).max(100),
  email: z.string().email(),
});

export type userType = z.infer<typeof userSchema>;

const justNeedStudentInfoSchema = StudentSchema.pick({
  gender: true,
  name: true,
});

export const StudentUserSchema = userSchema.extend({
  ...justNeedStudentInfoSchema.shape,
  classWithGrade: z.string(),
});

export type StudentUserType = z.infer<typeof StudentUserSchema>;

/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropTable
DROP TABLE "public"."Post";

-- DropTable
DROP TABLE "public"."Profile";

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."Teacher" (
    "id" SERIAL NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'teacher name',
    "avatar" TEXT NOT NULL DEFAULT 'https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp',
    "class" TEXT[] DEFAULT ARRAY['x | y', 'x | y']::TEXT[],

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Student" (
    "id" SERIAL NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT 'https://img.daisyui.com/images/profile/demo/distracted1@192.webp',
    "student_id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'student name',
    "class" TEXT NOT NULL DEFAULT 'x',
    "grade" TEXT NOT NULL DEFAULT 'y',
    "gender" TEXT NOT NULL DEFAULT 'female',

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Score" (
    "id" SERIAL NOT NULL,
    "student_id" TEXT NOT NULL,
    "score" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "semesterSeason" TEXT NOT NULL DEFAULT 'Spring',
    "semesterYear" INTEGER NOT NULL DEFAULT 2022,
    "subject" TEXT NOT NULL DEFAULT 'Math',

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_teacher_id_key" ON "public"."Teacher"("teacher_id");

-- CreateIndex
CREATE UNIQUE INDEX "Student_student_id_key" ON "public"."Student"("student_id");

-- AddForeignKey
ALTER TABLE "public"."Student" ADD CONSTRAINT "Student_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."Teacher"("teacher_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Score" ADD CONSTRAINT "Score_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."Student"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

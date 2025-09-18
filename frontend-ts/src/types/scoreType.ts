export type ScoreType = {
  id: number;
  subject: "Math" | "English" | "Science" | "Social Studies" | "History";
  score: number;
  semesterSeason: "Fall" | "Spring";
  semesterYear: number;
};

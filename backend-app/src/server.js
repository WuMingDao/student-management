import { getStudents, insertStudent } from "./services/apiStudent.js";
import { generateTeachers, insertTeachers } from "./services/apiTeacher.js";

// const student = await getStudents();
// console.log(student);

// const data = await insertStudent();
// console.log(data);

const data = await insertTeachers();
// console.log(data);

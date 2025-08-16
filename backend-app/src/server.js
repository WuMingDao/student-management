import { getStudents, insertStudent } from "./services/apiStudent.js";

// const student = await getStudents();
// console.log(student);

const data = await insertStudent();
console.log(data);

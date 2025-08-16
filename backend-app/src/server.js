import { insertStudents } from "./services/apiStudent.js";
import { insertTeachers } from "./services/apiTeacher.js";

// const data = await insertTeachers();
// // console.log(data);

const data = await insertStudents(10);
console.log(data);

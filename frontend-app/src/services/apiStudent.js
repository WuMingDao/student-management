import { faker } from "@faker-js/faker";

const mockStudentList = [
  {
    id: "1",
    name: "John Doe",
    class: "class 1 | year 9",
    gender: "male",
    teacher: "mr. smith",
  },
  {
    id: "2",
    name: "Jane Doe",
    class: "class 2 | year 9",
    gender: "female",
    teacher: "mrs. jones",
  },
  {
    id: "3",
    name: "Peter Pan",
    class: "class 1 | year 10",
    gender: "male",
    teacher: "mr. smith",
  },
  {
    id: "4",
    name: "Wendy Darling",
    class: "class 2 | year 10",
    gender: "female",
    teacher: "mrs. jones",
  },
  {
    id: "5",
    name: "Michael Jackson",
    class: "class 1 | year 11",
    gender: "male",
    teacher: "mr. davis",
  },
  {
    id: "6",
    name: "Janet Jackson",
    class: "class 2 | year 11",
    gender: "female",
    teacher: "mrs. davis",
  },
  {
    id: "7",
    name: "Tom Sawyer",
    class: "class 1 | year 12",
    gender: "male",
    teacher: "mr. smith",
  },
  {
    id: "8",
    name: "Becky Thatcher",
    class: "class 2 | year 12",
    gender: "female",
    teacher: "mrs. jones",
  },
  {
    id: "9",
    name: "Huckleberry Finn",
    class: "class 1 | year 9",
    gender: "male",
    teacher: "mr. smith",
  },
  {
    id: "10",
    name: "Amy Lawrence",
    class: "class 2 | year 9",
    gender: "female",
    teacher: "mrs. jones",
  },
];

export function getStudentList() {
  return mockStudentList.map((student) => {
    return {
      ...student,
      avatar: faker.image.avatar(),
    };
  });
}

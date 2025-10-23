import { Student } from "./student.js";

const student = new Student("Kristián Botek", 18, true)

console.log("Students name: " + student.getName())
console.log("Students age: " + student.getAge())
console.log("Is student a male: " + student.getIsMale())
student.study()
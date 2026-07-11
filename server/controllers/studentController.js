const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/students.json");

// GET students
exports.getStudents = (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  res.json(data);
};

// ADD student
exports.addStudent = (req, res) => {
  const students = JSON.parse(fs.readFileSync(filePath));

  const newStudent = {
    id: Date.now(),
    ...req.body
  };

  students.push(newStudent);

  fs.writeFileSync(filePath, JSON.stringify(students, null, 2));

  res.json({ message: "Student added", student: newStudent });
};
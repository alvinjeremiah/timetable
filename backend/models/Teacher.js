// backend/models/Teacher.js
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  classTeacherOf: { type: String, default: null }, // Optional field
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;

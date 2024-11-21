const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  employee_id: { type: Number, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone: { type: Number, required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  gender: { type: String, required: true },
  department: { type: String, enum: ['HR', 'Finance', 'IT', 'Operations'], required: true },
  salary: { type: Number, required: true },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
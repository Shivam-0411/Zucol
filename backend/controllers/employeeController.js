const Employee = require('../models/Employee');

// Register a new employee
const registerEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    console.log(employee);
    res.status(201).json({ message: 'Employee registered successfully', employee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search for employees
const getEmployee = async (req, res) => {
    const { employee_id, first_name, last_name } = req.query;
    
    if (!employee_id && (!first_name || !last_name)) {
        return res.status(400).json({ error: "Provide either employee_id, or both first_name and last_name." });
    }
    
    // Construct the query
    let query = {};
    if (employee_id) {
        query.employee_id = Number(employee_id);  // Ensure employee_id is a number
    } else if (first_name && last_name) {
        query.first_name = first_name;
        query.last_name = last_name;
    }
    
    // Query the database
    try {
        const employee = await Employee.findOne(query);  // Use findOne for single employee
        if (!employee) {
            return res.status(404).json({ message: "No employee found." });
        }
        res.json(employee);  // Return the employee as an object
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};

// Update employee details
const updateEmployee = async (req, res) => {
  try {
    const { employee_id } = req.params; // This will be the custom employee_id
    const employee = await Employee.findOneAndUpdate({ employee_id: employee_id }, req.body, { new: true });
    // console.log('Request Body:', req.body);
    console.log('Request Params:', req.params);
    if (!employee) {
        return res.status(404).json({ error: 'Employee not found.' });
    }
    res.json({ message: 'Employee updated successfully', employee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get employees by department
const departmentEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ department: req.params.name });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get department-wise stats
const stats = async (req, res) => {
  try {
    const salaryStats = await Employee.aggregate([
      { $group: { _id: '$department', totalSalary: { $sum: '$salary' }, count: { $sum: 1 } } },
    ]);

    res.json(salaryStats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registerEmployee, getEmployee, updateEmployee, departmentEmployees, stats };
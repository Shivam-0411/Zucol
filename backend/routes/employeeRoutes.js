const express = require('express');
const router = express.Router();

const { registerEmployee, getEmployee, updateEmployee, departmentEmployees, stats } = require('../controllers/employeeController');

router.post('/register', registerEmployee);
router.get('/search', getEmployee);
router.put('/update/:_id', updateEmployee);
router.get('/department/:name', departmentEmployees);
router.get('/stats', stats);

module.exports = router;
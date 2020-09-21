const express = require("express");
const router = express.Router();
const EmployeeController = require("../controllers/employee");
router.get("", EmployeeController.getEmployees);
router.post("", EmployeeController.createEmployee);


module.exports = router;

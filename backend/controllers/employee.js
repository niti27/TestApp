const Employee = require("../models/employee");

exports.getEmployees = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Employee.find();
  let fetchedEmployees;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedEmployees = documents;
      return Employee.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Employees fetched successfully!",
        employees: fetchedEmployees,
        maxEmployees: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Employees failed!"
      });
    });
};

exports.createEmployee = (req, res, next) => {

  console.log("name:",req.body.name);

  const url = req.protocol + "://" + req.get("host");
  const employee= new Employee({
    name: req.body.name,
   });

   employee
    .save()
    .then(createdEmployee => {
      res.status(201).json({
        message: "Emp created successfully",
        employee: {
          ...createdEmployee,
          id: createdEmployee._id
        }
      });
    })
    .catch(error => {
      // console.log(error);
      res.status(500).json({
        message: "Creating emp failed!"
      });
    });
};

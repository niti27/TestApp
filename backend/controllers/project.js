const Project = require("../models/project");
const mongoose = require("mongoose");
exports.getProjects = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Project.find();
  let fetchedProjects;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedProjects = documents;
      return Project.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Projects fetched successfully!",
        projects: fetchedProjects,
        maxProjects: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Projects failed!"
      });
    });
};

exports.createProject = (req, res, next) => {

  console.log("name:",req.body.name);
  console.log("totalestimate:",req.body.totalestimate);

  const project= new Project({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    totalestimate: req.body.totalestimate,
  });

  project
    .save()
    .then(createdProject => {
      res.status(201).json({
        message: "Post added successfully",
        project: {
          ...createdProject,
          id: createdProject._id
        }
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Creating a project failed!"
      });
    });
};

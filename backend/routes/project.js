
const express = require("express");
const router = express.Router();
const ProjectsController = require("../controllers/project");
router.get("", ProjectsController.getProjects);
router.post("", ProjectsController.createProject);


module.exports = router;

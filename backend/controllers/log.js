
const Log = require("../models/log");
const mongoose = require("mongoose");
const ObjectId=mongoose.Types.ObjectId;
const Employee=require('./employee')
const Project=require('./project')
function toObjectId(id) {
    if(id==null){
      return null;
    }
  var stringId = id.toString().toLowerCase();

  if (!ObjectId.isValid(stringId)) {
      return null;
  }

  var result = new ObjectId(stringId);
  if (result.toString() != stringId) {
      return null;
  }

  return result;
}
exports.createLog = (req, res, next) => {

  console.log("date:",req.body.date);
  console.log("employee:",req.body.employee);
  console.log("time:",req.body.time);
  console.log("project:",req.body.project);

  const log= new Log({
    date: req.body.date,
    time: req.body.time,
    project: req.body.project,
    employee: req.body.employee,
  });

  log
    .save()
    .then(createdLog => {
      res.status(201).json({
        message: "Log added successfully",
        log: {
          ...createdLog,
          id: createdLog._id
        }
      });
    })
    .catch(error => {
      // console.log(error);
      res.status(500).json({
        message: "Creating a log failed!"
      });
    });
};

exports.getLogs = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Log.find();
  let fetchedLogs;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  postQuery
  .populate("employee")
  .populate("project")
  .exec().then(documents => {
      fetchedLogs = documents;
      return Log.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Logs fetched successfully!",
        logs: fetchedLogs,
        maxLogs: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Logs failed!"
      });
    });
};

exports.searchLogs = (req, res, next) => {
  let fetchedLogs;


console.log("emp",toObjectId(req.body.project));
Log.find({$or:[{employee: req.body.employee},{ project:req.body.project}]  })
.populate("employee")
.populate("project").exec()
      .then(documents => {
        fetchedLogs = documents;
        console.log(fetchedLogs);
        return Log.count();
      })
    .then(count => {
      if (fetchedLogs.length==""){
        return res.status(404).json({
          message: "No log Found",
          logs: 0,
        });
      }
      res.status(200).json({
        message: "Logs fetched successfully!",
        logs: fetchedLogs,
        maxLogs: count
      });
    })
    .catch(err => {
      return res.status(404).json({
        message: "Error logging data",
        logs: 0,
      });
    });
}

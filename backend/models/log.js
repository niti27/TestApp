const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const logSchema = mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  // project: { type: String, required: true },
  // employee: { type: String, required: true },
  project: { type:String,ref:'Project' ,required: true} ,
  employee:{ type: String,ref:'Employee' ,required: true} ,
});

logSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Log", logSchema);


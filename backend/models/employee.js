const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const employeeSchema = mongoose.Schema({

  name: { type: String, required: true, unique: true },
});

employeeSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Employee", employeeSchema);

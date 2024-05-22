const mongoose = require("mongoose");

// User schema
const taskSchema = new mongoose.Schema({
  to: {
    type: String,
    required: true,
  },
  from: {
    type: String,
  },
  task: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: "Incomplete",
  },
});


module.exports = mongoose.model("tasks", taskSchema);

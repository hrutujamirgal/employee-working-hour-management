const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  employee: {
    type: String,
  },
  employeeDepartment: String,
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  noOfDays: Number,
  type:{
    type:String,
  },
  reason: {
    type: String,
  },
  status:{
    type: String,
    default: "Not Approved",
  }
});

module.exports = mongoose.model("Leave", leaveSchema);

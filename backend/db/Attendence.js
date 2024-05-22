const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employee: {
    type: String,
  },
  attendance: {
    attended: {
      type: Number,
      default: 0, // Default value for attended
    },
    total: {
      type: Number,
      default: 0, // Default value for total
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  login: {
    type: String,
    default: "00:00:00",
  },
  logout: {
    type: String,
    default: "00:00:00",
  },
});

module.exports = mongoose.model("Attendance", attendanceSchema);

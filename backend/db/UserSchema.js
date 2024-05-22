const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  joiningDate: {
    type: Date,
    default: Date.now,
    require: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  employmentType: {
    type: String,
  },
  department: {
    type: String,
  },
  designation: {
    type: String,
  },
});

// Hash the user's password before saving to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

module.exports = mongoose.model("users", userSchema)
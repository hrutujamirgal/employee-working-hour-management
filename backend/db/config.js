const mongoose = require("mongoose");


mongoose.connect("mongodb+srv://hrutujamirgal21:VV950oTDyAAfbFHZ@employeeapp.9man4jz.mongodb.net/?retryWrites=true&w=majority&appName=employeeApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

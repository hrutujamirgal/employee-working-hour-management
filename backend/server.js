// server.js
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();

require("./db/config");
const User = require("./db/UserSchema");
const Task = require("./db/Task");
const Attendance = require("./db/Attendence");
const Leave = require("./db/Leave");

// Middleware
app.use(cors());
app.use(express.json()); //body parser

// User registration
app.post("/emp", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      joiningDate,
      salary,
      employmentType,
      department,
      designation,
    } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      password,
      joiningDate,
      salary,
      employmentType,
      designation,
      department,
    });
    const result = await newUser.save();

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
});

// User login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const isEmail = await User.findOne({ email });

    if (!isEmail) {
      return res.status(401).json({ message: "Email: Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, isEmail.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password: Invalid credentials" });
    }

    res.send(isEmail);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
});

app.get("/emp", async (req, res) => {
  try {
    const data = await User.find();
    res.send(data);
  } catch (error) {
    console.error("Error retrieving data from Collection 2:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/getTask", async (req, res) => {
  try {
    const data = await Task.find();
    res.send(data);
  } catch (error) {
    console.error("Error retrieving data from Collection 2:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/task", async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    console.error("Error saving task data:", error);
    res.status(500).json({ error: "Failed to assign task" });
  }
});

app.post("/askLeave", async (req, res) => {
  try {
    const leave = new Leave(req.body);
    const askLeave = await leave.save();
    res.json(askLeave);
  } catch (error) {
    console.error("Error saving task data:", error);
    res.status(500).json({ error: "Failed to assign task" });
  }
});



app.delete("/deleteEmp", async (req, res) => {
  try {
    const { employeeId } = req.body;
    const deletedEmployee = await User.deleteOne({ _id: employeeId });

    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    return res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


app.get("/profile/:key", async (req, res) => {
  try {
    const getEMP = await User.find({ _id: req.params.key });

    return res.send(getEMP);

  } catch (error) {
    console.error("Error detecting employee:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/profileDate/:key", async (req, res) => {
  try {
    const key = req.params.key;

    if (!key) {
      return res.status(400).json({ error: "Invalid key" });
    }

    const getDate = await Attendance.findOne({ employee: key });

    if (!getDate) {
      return res.status(404).json({ error: "Profile date not found" });
    }

    return res.send(getDate);
  } catch (error) {
    console.error("Error retrieving profile date:");
    return res.status(500).json({ error: "Internal server error" });
  }
});


app.get("/getTaskMy/:key", async (req, res) => {
  try {
    const getTask = await Task.find({
      from: req.params.key 
    });

    return res.send(getTask);

  } catch (error) {
    console.error("Error detecting employee:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/deleteTask", async (req, res) => {
  try {
    const { taskId } = req.body;
    console.log(taskId);
    const deletedTask = await Task.deleteOne({ _id: taskId });

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    console.log(deletedTask);

    return res.json(deletedTask);
  } catch (error) {
    console.error("Error deleting Task:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/getTask/:key", async (req, res) => {
  try {
    console.log(req.params.key);
    const getTask = await Task.findOne({ _id: req.params.key });
    console.log(getTask); // Log the retrieved task

    return res.send(getTask);
  } catch (error) {
    console.error("Error getting task:");
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/updateTask/:key", async (req, res) => {
  try {
    const updateTask = await Task.updateOne(
      { _id: req.params.key },
      { $set: req.body }
    );
    return res.send(updateTask);
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


app.get("/getEmpTask/:key", async (req, res) => {
  try {
    const getTasks = await Task.find({ to: req.params.key });

    return res.send(getTasks);
  } catch (error) {
    console.error("Error detecting employee:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});



app.get("/getLeave/:key", async (req, res) => {
  try {
    const getTasks = await Leave.find({ employeeDepartment: req.params.key });

    return res.send(getTasks);
  } catch (error) {
    console.error("Error detecting employee:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/updateLeaveStatus/:key", async (req, res) => {
  try {
    const updateTask = await Leave.updateOne(
      { _id: req.params.key },
      { $set: { status: "Approved" } }
    );
    return res.send(updateTask);
  } catch (error) {
    console.error("Error detecting employee:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/updateLeaveStatusReject/:key", async (req, res) => {
  try {
    const updateTask = await Leave.updateOne(
      { _id: req.params.key },
      { $set: { status: "Rejected" } }
    );
    return res.send(updateTask);
  } catch (error) {
    console.error("Error detecting employee:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/getLeaveStatus/:key", async (req, res) => {
  try {
    const getStat = await Leave.findOne({ _id: req.params.key });

    return res.send(getStat);
  } catch (error) {
    console.error("Error detecting employee:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


app.put("/updateTaskStatus/:key", async (req, res) => {
  try {
    const updateTask = await Task.updateOne(
      { _id: req.params.key },
      { $set: { status: "Completed" } }
    );
    return res.send(updateTask);
  } catch (error) {
    console.error("Error detecting employee:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});



app.get("/GetEmp/:key", async (req, res) => {
  try {
    const key = req.params.key;

    if (!key) {
      return res.status(400).json({ error: "Invalid key" });
    }

    const getTasks = await User.findOne({ _id: key });

    if (!getTasks) {
      return res.status(404).json({ error: "Document not found" });
    }

    return res.send(getTasks);
  } catch (error) {
    console.error("Error detecting employee:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});




app.put("/UpdateEmp/:key", async (req, res) => {
  try {
    const updateTask = await User.updateOne(
      { _id: req.params.key },
      { $set: req.body }
    );
    return res.send(updateTask);
  } catch (error) {
    console.error("Error detecting employee:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/attendanceLogin/:mail", async (req, res) => {
  try {


    // const [employee, date, login] = req.body;

    const existingAttendance = await Attendance.findOne({
      employee: req.params.mail,
    });


    if (existingAttendance) {

      // const updatedAttendance = await Attendance.updateOne({
      //   employee: employee
      // }, {$set: {date: date, login : login }});
      existingAttendance.date = Date.now();

      existingAttendance.login = req.body.login;

      const updatedAttendance = await existingAttendance.save();

      res.json(updatedAttendance);

    } else {

      const newAttendance = new Attendance({
        employee: req.params.mail,
        date: Date.now(),
        login: req.body.login,
      });

      const savedAttendance = await newAttendance.save();
      res.json(savedAttendance);

    }
  } catch (error) {
    console.error("Error saving attendance data:", error);
    res.status(500).json({ error: "Failed to save attendance" });
  }
});


app.put("/UpdateLogout/:key", async (req, res) => {
  try {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 8);
    const today = now.toISOString().split("T")[0];

    // Find the document by ID
    const attendance = await Attendance.findOne({ _id: req.params.key });

    if (!attendance) {
      return res.status(404).json({ error: "Document not found" });
    }

    // If the date has changed, it's a new day
    if (attendance.lastUpdated != today) {
      attendance.attendance.total += 1;
    }

    // Update the attendance data
    attendance.logout = currentTime;
    attendance.lastUpdated = today;
    attendance.attendance.attended += 1;

    // Save the updated document
    const updateTask = await attendance.save();

    return res.send(updateTask);
  } catch (error) {
    console.error("Error updating logout:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});






// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

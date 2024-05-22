import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SignIn from "./pages/SignIn";
import Common from "./components/Common";
import Home from "./components/Home";
import Admin from "./pages/Admin";
import AssignProject from "./pages/AssignProject";
import EmpData from "./pages/EmpData";
import Profile from "./pages/Profile";
import AddEmp from "./pages/AddEmp";
import NavBar from "./components/NavBar";
import EditEmp from "./pages/EditEmp";
import AskLeave from "./pages/AskLeave";
import Assigntask from "./pages/Assigntask";
import Assigned from "./pages/Assigned";
import AssignedEmp from "./pages/AssignedEmp";
import ManageLeave from "./pages/ManageLeave";
import GetAssignedTAsk from "./pages/GetAssignedTAsk";
import View from "./pages/View";
import UpdateTask from "./pages/UpdateTask";

import PRotectedComponents from "./components/PRotectedComponents";

import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route element={<PRotectedComponents />}>
          <Route path="/home" element={<Common />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/assign" element={<AssignProject />} />
          <Route path="/empdata" element={<EmpData />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addEmp" element={<AddEmp />} />
          <Route path="/edit" element={<EditEmp />} />
          <Route path="/askLeave" element={<AskLeave />} />
          <Route path="/assignTask" element={<Assigntask />} />
          <Route path="/assigned" element={<Assigned />} />
          <Route path="/assignedEMP" element={<AssignedEmp />} />
          <Route path="/manageLeave" element={<ManageLeave />} />
          <Route path="/getAssignedTask" element={<GetAssignedTAsk />} />
          <Route path="/view" element={<View />} />
          <Route path="/updateTask" element={<UpdateTask />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

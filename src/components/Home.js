import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  return (
    <div>
      <div className="home" id="home">
        <div className="front">
          <div className="intro-text">
            The Work Hour Management System for the people
          </div>
          <div className="work-text">Who Like to</div>
          <div className="emphasis-text">
            <i>Work From Home!</i>
          </div>
        </div>
      </div>

      <div className="features" id="features">
        <div className="heading">
          <p>What will you have ?</p>
        </div>
        <div className="underword"></div>
        <div className="feat">
          <div className="p1" id="p1">
            <div className="box">
              <img
                src={process.env.PUBLIC_URL + "/images/face_reconition.png"}
                alt="face detection"
              />
            </div>
            <h1>Working Hour Detection</h1>
            <p>
              The working hour of the employee will be monitored continuously.
            </p>
          </div>

          <div className="p1" id="p1">
            <div className="box">
              <img
                src={process.env.PUBLIC_URL + "/images/attendence.png"}
                alt="attendance system"
              />
            </div>
            <h1>Time and Attendance</h1>
            <p>
              The website will manage the time and attendance of the employee
              based on their Log In time.
            </p>
          </div>

          <div className="p1" id="p1">
            <div className="box">
              <img
                src={process.env.PUBLIC_URL + "/images/project.png"}
                alt="projects"
              />
            </div>
            <h1>Operational Efficiency</h1>
            <p>The track of Tasks assigned to the employee.</p>
          </div>
        </div>
      </div>

      <div className="foot">
        <div className="contact" id="contact">
          <div className="phone">
            <h2>Contact Us At</h2>
            <ul>
              <li>Phone No: 7845236987</li>
              <li>Email: abc@gmail.com</li>
              <li>Website: www.abc.com</li>
            </ul>
          </div>

          <div className="socialMedia">
            <h2>Follow Us</h2>
            <ul>
              <li>
                Facebook
              </li>
              <li>LinkedIn</li>
              <li>GitHub</li>
            </ul>
          </div>

          <div className="feedback">
            <h2>Feedback</h2>
            <p className="feedback-link">
              Rate the work
              
            </p>
          </div>
        </div>

        <p className="copyright">@Copyrights reserved to WorkIt 2023</p>
        
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useRef } from "react";
import Webcam from "react-webcam";

import "./CameraComponent.css";

const CameraComponent = () => {
  const webcamRef = useRef(null);

 


  return (
    <div className="camera-container">
      <Webcam className="webcam" ref={webcamRef} />
      
    </div>
  );
};

export default CameraComponent;

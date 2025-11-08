import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import ObjectDetection from "./components/ObjectDetection";
import Settings from "./components/Settings";
import Analytics from "./components/Analytics";
import Control from "./components/Control";
import "./App.css";

function App() {
  const [settings, setSettings] = useState({
    apiUrl: "http://localhost:5000/api",
    cameraEnabled: true,
    detectionThreshold: 0.7,
    modelType: "yolov5",
    googleApiKey: "",
    roboflowApiKey: "",
    roboflowModel: "your-model",
    visionProvider: "opencv",
    robotApiUrl: "http://localhost:8080/api",
    confidenceThreshold: 75,
    fps: 30,
    enabledClasses: ["person", "box", "vehicle", "obstacle"],
    autoDetect: false,
    opencvConfidence: 0.6,
    clarifaiApiKey: "",
  });

  return (
    <Router>
      <div className="App">
        <Navigation />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/detection"
              element={<ObjectDetection settings={settings} />}
            />
            <Route path="/control" element={<Control settings={settings} />} />
            <Route
              path="/analytics"
              element={<Analytics settings={settings} />}
            />
            <Route
              path="/settings"
              element={
                <Settings settings={settings} setSettings={setSettings} />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

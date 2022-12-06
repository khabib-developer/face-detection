// import "@tensorflow/tfjs-node";
import { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import { Three } from "../threejs";

export function FaceDetecion() {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [state, setState] = useState(false);
  useEffect(() => {
    if (videoRef) startVideo();
    videoRef && loadModels();
  }, []);
  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(() => {
      setState(true);
      faceDetection();
    });
  };
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream;
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const faceDetection = async () => {
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      console.log(detections);
      canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
        videoRef.current
      );
      faceapi.matchDimensions(canvasRef.current, {
        width: 500,
        height: 500,
      });
      const resized = faceapi.resizeResults(detections, {
        width: 500,
        height: 500,
      });
      // to draw the detection onto the detected face i.e the box
      faceapi.draw.drawDetections(canvasRef.current, resized);
      //to draw the the points onto the detected face
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
      //to analyze and output the current expression by the detected face
      faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
    }, 1000);
  };
  return (
    <div className="app">
      <h1> {!state ? "loading..." : "AI FACE DETECTION"}</h1>
      <div>
        <div className="app__video" style={{ position: "relative" }}>
          <video
            // style={{ transform: "rotateY(180deg)"}}
            crossOrigin="anonymous"
            ref={videoRef}
            autoPlay
          />
          <canvas
            style={{
              position: "absolute",
              left: "0px",
              top: "0px",
              width: "100%",
              height: "100%",
              zIndex: 100,
            }}
            ref={canvasRef}
            className="app__canvas"
          />
        </div>
      </div>
    </div>
  );
}

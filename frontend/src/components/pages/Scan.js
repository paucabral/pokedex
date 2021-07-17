import React, { useEffect, useRef, useState } from 'react';

const MODEL_ENDPOINT = process.env.REACT_APP_SCAN_API_ENDPOINT;

const Scan = () => {
  const canvasRef = useRef();
  const imageRef = useRef();
  const videoRef = useRef();

  const [result, setResult] = useState("");

  // Get the camera feed.
  useEffect(() => {
    async function getCameraStream() {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
      });
  
      if (videoRef.current) {      
        videoRef.current.srcObject = stream;
      }
    };
  
    getCameraStream();
  }, []);
  
  // Send snapshots from camera feed to API.
  useEffect(() => {
    const interval = setInterval(async () => {
      captureImageFromCamera();

      if (imageRef.current) {
        const formData = new FormData();
        formData.append('image', imageRef.current);

        const response = await fetch(MODEL_ENDPOINT, {
          method: "POST",
          body: formData,
        });

        if (response.status === 200) {
          const text = await response.text();
          setResult(text);
        } else {
          setResult("Error from API.");
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Play the camera feed.
  const playCameraStream = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  // Capture image from the camera feed.
  const captureImageFromCamera = () => {
    const context = canvasRef.current.getContext('2d');
    const { videoWidth, videoHeight } = videoRef.current;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    context.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);

    canvasRef.current.toBlob((blob) => {
      imageRef.current = blob;
    })
  };

  return (
    <React.Fragment>
      <div className="container" style={{ height: "115vh"}}>
        <h3 className="text-white">Scan</h3>
        <br/>

        <div className="container">
          <video className="container" ref={videoRef} onCanPlay={() => playCameraStream()} />
          <canvas ref={canvasRef} hidden></canvas>
          <p className="text-white">Currently seeing: {result}</p>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Scan

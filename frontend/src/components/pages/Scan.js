import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { pokemon_showdown_sprites_directory } from '../../data/api';

const MODEL_ENDPOINT = process.env.REACT_APP_SCAN_API_ENDPOINT;

const Scan = () => {
  const canvasRef = useRef();
  const imageRef = useRef();
  const videoRef = useRef();

  const [result, setResult] = useState({});

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
          const output = await response.json();
          setResult(output);
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
      <div className="container" style={{ height: "100vh", marginBottom: "20%"}}>
        <h3 className="text-white">Scan</h3>
        <br/>

        <div className="container">
          <video className="container" ref={videoRef} onCanPlay={() => playCameraStream()} />
          <canvas ref={canvasRef} hidden></canvas>
          <span className="text-white"><b>Pokémon:</b> {String(result.name).toUpperCase()}</span>
          <br/>
          <span className="text-white"><b>Accuracy:</b> {Math.round((result.accuracy + Number.EPSILON) * 100)/100} %</span>
          <br/>
          <br/>
          {
            result.name ?
            <img src={`${pokemon_showdown_sprites_directory}${String(result.name)}.gif`} alt={String(result.name)}/>:
            ""
          }
          <br/>
          <br/>
          {
            result.name ?
          <Link to={ `/pokemon/${result.name}` } className="text-white btn-info" style={{ fontWeight: "bold", borderRadius: "0.3rem", textDecoration: "none", padding: "0.7rem" }}>VIEW {String(result.name).toUpperCase()}</Link> :
            ""
          }
          <br/>
          <br/>
          <p className="text-white"><i>Note: The model still needs optimization. This classifier can only detect Generation 1 Pokémon (ID 1-151). The activator used for the model is softmax.</i></p>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Scan

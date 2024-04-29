import React, { useState, useEffect} from 'react';
import axios from 'axios';
import "./tri.css";

const url = 'http://localhost:3000/';


export const Tricep = () => {
  const [response, setResponse] = useState('');

  const handleClick = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/tricep_pushdowns');
      if (res.data.success) {
        setResponse('Squats detection started successfully.');
      } else {
        setResponse('Error: ' + res.data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error: ' + error.message);
    }
  };
  return (
    <body>
      <div className="tricep-pushdowns">
        <div className="group"><button onClick={handleClick}>
          <div className="overlap-group">
            <div className="text-wrapper">Start Recording</div>
          </div></button>
        </div>
        <div className="overlap">
          <div className="overlap-wrapper">
            <div className="overlap-2">
              <div className="rectangle" />
              <p className="to-perform-squats">
                <span className="span">To perform Squats </span>
                <span className="text-wrapper-2"> </span>
                <span className="text-wrapper-3">
                <br />1.Start Position: Stand with feet shoulder-width apart, toes slightly turned out, back straight.
                <br />2.Descend: Bend knees, push hips back as if sitting into a chair, keeping chest up, back straight. Lower until thighs parallel to ground.
                <br />3.Engage Core: Keep core muscles engaged throughout for spine stabilization.
                <br />4.Knees Alignment: Ensure knees aligned with toes, not extending beyond.
                <br />5.Drive Through Heels: Press through heels to return to start, exhale during movement.
                <br />6.Finish Position: Stand straight, fully extend hips and knees.
                <br />7.Repeat: Perform desired repetitions.
                </span>
              </p>
            </div>
          </div>
          <img className="image" alt="Image" src="squat.png" />
        </div>
        <div className="div" />
        <img className="image" alt="Image" src="tricepp.png" />
      </div>
    </body>
  );
};
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './sq.css';
const url = 'http://localhost:3000/';


export const Squat = () => {
  const [response, setResponse] = useState('');

  const handleClick = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/squats_squats');
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
    <div className="squats">
      <div className="div">
        <div className="group">
          <button onClick={handleClick}>
          <div className="overlap-group">
            <div className="text-wrapper">Start Recording</div>
          </div>
          </button>
        </div>
        <div className="overlap">
          <div className="overlap-wrapper">
            <div className="overlap-2">
              <div className="rectangle" />
              <p className="to-perform-squats">
                <span className="span">To perform Squats </span>
                <span className="text-wrapper-2"> </span>
                <span className="text-wrapper-3">
                  <br/>1.Setup: Stand in front of cable machine with straight bar attached to high pulley. Grip bar with overhand grip, hands shoulder-width apart, and extend arms downward.
                  <br/>2.Positioning: Keep feet shoulder-width apart, knees slightly bent, maintain straight posture with engaged core for stability.
                  <br/>3.Execution: Keep upper arms stationary and close to body. Exhale, push bar down by straightening arms until fully extended. Contract triceps throughout.
                  <br/>4.Controlled Movement: Inhale as bar returns slowly to starting position, maintaining control. Avoid letting weight stack slam down.
                  <br/>5.Repetitions and Sets: Aim for 3-4 sets of 8-12 reps. Adjust weight to fit strength level. Rest 60-90 seconds between sets.
                  <br/>6.Form and Safety: Maintain proper form to engage muscles and prevent injury. Consider working with certified trainer for beginners.
                  <br/>7.Start Light: Begin with less weight and more reps to aid muscle growth.
                </span>
              </p>
            </div>
          </div>
          <img className="image" alt="Image" src="squat.png" />
        </div>
      </div>
    </div>
  );
};

import React,{ useState, useEffect} from "react";
import "./cur.css";
import axios from 'axios';
const url = 'http://localhost:3000/';


export const Bic_curl = () => {
  const [response, setResponse] = useState('');

  const handleClick = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/bicep_curl');
      if (res.data.success) {
        setResponse('Bicep Curl detection started successfully.');
      } else {
        setResponse('Error: ' + res.data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error: ' + error.message);
    }
  };
  return (
    <div className="frame">
      <div className="div">
        <div className="group">
          <div className="overlap-group-wrapper">
            <button onClick={handleClick}>
            <div className="overlap-group">
              <div className="text-wrapper">Start Recording</div>
            </div>
            </button>
          </div>
        </div>
        <div className="group-wrapper">
          <div className="div-wrapper">
            <div className="overlap-group-2">
              <div className="rectangle" />
              <p className="to-perform-bicep">
                <span className="span">To perform Bicep Curls: </span>
                <span className="text-wrapper-2"> </span>
                <span className="text-wrapper-3">
                <br />1.Stand up straight with a dumbbell in each hand, arms fully extended down by your sides, and palms
                  facing forward.<br />2.Keep your elbows close to your torso and exhale as you curl the weights upward by
                  bending your elbows, ensuring only your forearms move.<br />3.Continue curling until your biceps are fully
                  contracted and the dumbbells are at shoulder level. Hold this position for a moment, squeezing your
                  biceps.<br />4.Inhale as you slowly lower the dumbbells back to the starting position, maintaining control
                  and keeping tension on your biceps.<br />5.Repeat for the desired number of repetitions.
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="group-2" />
      </div>
    </div>
  );
};

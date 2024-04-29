import React, { useState } from 'react';
import axios from 'axios';
import './should.css';

export const Shoulder = () => {
  const [response, setResponse] = useState('');

  const handleClick = async () => {
    try {
      const res = await axios.post('/shoulder-press');
      if (res.data.success) {
        setResponse('Shoulder press detection started successfully.');
      } else {
        setResponse('Error: ' + res.data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error: ' + error.message);
    }
  };

  return (
    <div className="shoulder-press">
      <div className="div">
        <div className="group">
          <button onClick={handleClick}>
            <div className="overlap-group">
              <div className="text-wrapper">Start Recording</div>
            </div>
          </button>
        </div>
        <div className="overlap-wrapper">
          <div className="overlap">
            <p className="to-perform-a">
              <span className="span">To perform a Dumbbell Shoulder press: </span>
              <span className="text-wrapper-2"> </span>
              <span className="text-wrapper-3">
                1. Start by sitting on a bench with back support, or stand with your feet shoulder-width apart.<br />
                2. Hold a dumbbell in each hand at shoulder height, palms facing forward, and elbows bent.<br />
                3. Engage your core muscles to stabilize your body.<br />
                4. Press the dumbbells upward until your arms are fully extended overhead, but not locked out at the elbows.<br />
                5. Keep your back straight and avoid arching it excessively.<br />
                6. Slowly lower the dumbbells back to the starting position with control, maintaining proper form throughout.<br />
                7. Repeat for the desired number of repetitions.
              </span>
            </p>
          </div>
        </div>
        {response && <p>{response}</p>}
        <img className="image" alt="Shoulder Press" src="ShoulderPress.png" />
      </div>
    </div>
  );
};

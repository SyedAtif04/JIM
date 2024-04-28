import React from "react";
import "./should.css";

export const Shoulder = () => {
  return (
    <div className="shoulder-press">
      <div className="div">
        <div className="group">
          <div className="overlap-group">
            <div className="text-wrapper">Start Recording</div>
          </div>
        </div>
        <div className="overlap-wrapper">
          <div className="overlap">
            <p className="to-perform-a">
              <span className="span">To perform a Dumbbell Shoulder press: </span>
              <span className="text-wrapper-2"> </span>
              <span className="text-wrapper-3">
                1.Start by sitting on a bench with back support, or stand with your feet shoulder-width apart.2.Hold a
                dumbbell in each hand at shoulder height, palms facing forward, and elbows bent.3.Engage your core
                muscles to stabilize your body.4.Press the dumbbells upward until your arms are fully extended
                overhead, but not locked out at the elbows.5.Keep your back straight and avoid arching it
                excessively.6.Slowly lower the dumbbells back to the starting position with control, maintaining proper
                form throughout.7.Repeat for the desired number of repetitions ( recommended to do 12 if your a
                beginner and 15 if you are somewhat experienced)
              </span>
            </p>
          </div>
        </div>
        <img className="image" alt="Image" src="ShoulderPress.png" />
      </div>
    </div>
  );
};
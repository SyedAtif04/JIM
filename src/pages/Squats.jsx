import React from "react";
import "./sq.css";

export const Squat = () => {
  return (
    <div className="squats">
      <div className="div">
        <div className="group">
          <div className="overlap-group">
            <div className="text-wrapper">Start Recording</div>
          </div>
        </div>
        <div className="overlap">
          <div className="overlap-wrapper">
            <div className="overlap-2">
              <div className="rectangle" />
              <p className="to-perform-squats">
                <span className="span">To perform Squats </span>
                <span className="text-wrapper-2"> </span>
                <span className="text-wrapper-3">
                  <br/>Setup: Stand in front of cable machine with straight bar attached to high pulley. Grip bar with overhand grip, hands shoulder-width apart, and extend arms downward.
                  <br/>Positioning: Keep feet shoulder-width apart, knees slightly bent, maintain straight posture with engaged core for stability.
                  <br/>Execution: Keep upper arms stationary and close to body. Exhale, push bar down by straightening arms until fully extended. Contract triceps throughout.
                  <br/>Controlled Movement: Inhale as bar returns slowly to starting position, maintaining control. Avoid letting weight stack slam down.
                  <br/>Repetitions and Sets: Aim for 3-4 sets of 8-12 reps. Adjust weight to fit strength level. Rest 60-90 seconds between sets.
                  <br/>Form and Safety: Maintain proper form to engage muscles and prevent injury. Consider working with certified trainer for beginners.
                  <br/>Start Light: Begin with less weight and more reps to aid muscle growth.
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

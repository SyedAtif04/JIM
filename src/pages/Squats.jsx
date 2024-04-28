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
                  1.Start Position: Stand with your feet shoulder-width apart, toes slightly turned out, and your back
                  straight. You can place your hands on your hips or extend them forward for balance.2.Descend:
                  Initiate the movement by bending your knees and pushing your hips back as if you&#39;re sitting back
                  into a chair. Keep your chest up and your back straight. Lower yourself down until your thighs are
                  parallel to the ground or as low as you can comfortably go while maintaining proper form.3.Keep Core
                  Engaged: Engage your core muscles throughout the movement to stabilize your spine.4.Knees in Line
                  with Toes: Make sure your knees are aligned with your toes and don&#39;t extend beyond them.5.Drive
                  Through Heels: Press through your heels to push yourself back up to the starting position, exhaling as
                  you do so.6.Finish Position: Stand up straight, fully extending your hips and knees at the top of the
                  movement.7.Repeat: Perform the desired number of repetitions, aiming for a controlled motion
                  throughout.
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

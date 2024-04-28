import React from "react";
import "./style1.css";


export const selection = () => {
  return (
    <div className="selection">
      <div className="overlap">
        <img className="image" alt="Image" src="image-3.png" />
        <div className="button">
          <div className="overlap-group">
            <div className="text-wrapper">SHOULDER-PRESS</div>
            <div className="rectangle" />
          </div>
        </div>
        <div className="overlap-wrapper">
          <div className="div">
            <div className="text-wrapper-2">TRICEP-PUSHDOWNS</div>
            <div className="rectangle" />
          </div>
        </div>
        <div className="overlap-group-wrapper">
          <div className="overlap-group">
            <div className="text-wrapper">SQUATS</div>
            <div className="rectangle" />
          </div>
        </div>
        <div className="div-wrapper">
          <div className="overlap-group">
            <div className="text-wrapper">DUMBBELL-CURLS</div>
            <div className="rectangle" />
          </div>
        </div>
      </div>
      <div className="return">
        <div className="overlap-2">
          <div className="rectangle-2" />
          <div className="text-wrapper-3">RETURN</div>
        </div>
      </div>
    </div>
  );
};
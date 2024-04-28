import React from "react";
import "./style1.css";
import { Link } from 'react-router-dom';


export const Selection_page = () => {
  return (
    <body>
    <div className="selection">
      <div className="overlap">
        <img className="image" alt="Image" src="" />
        <Link to="/shoulder">
          <button>
        <div className="button">
          <div className="overlap-group">
            <div className="text-wrapper">SHOULDER PRESS</div>
            <div className="rectangle" />
          </div>
        </div></button></Link>
        <div className="overlap-wrapper">
        <Link to="/tri">
          <button>
          <div className="div">
            <div className="text-wrapper-2">TRICEP PUSHDOWNS</div>
            <div className="rectangle" />
          </div></button></Link>
        </div>
        <div className="overlap-group-wrapper">
        <Link to="/squat">
          <button>
          <div className="overlap-group">
            <div className="text-wrapper">WEIGHTED SQUATS</div>
            <div className="rectangle" />
          </div></button> </Link>       
          </div>
        <div className="div-wrapper">
        <Link to="/bic">
          <button>
          <div className="overlap-group">
            <div className="text-wrapper">DUMBBELL CURLS</div>
            <div className="rectangle" />
          </div></button></Link>
        </div>
      </div>
      <div className="return">
        <div className="overlap-2">
            <button>
        <div className="rectangle-2" />
            <Link to="/">
            <div className="text-wrapper-3">RETURN</div>
         </Link>
            </button>
            
            
      </div>
    </div>
    </div>
    </body>
  );
};
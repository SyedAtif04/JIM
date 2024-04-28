import React from "react";
import "./style.css";

import { Link } from 'react-router-dom';
export const LandingPage = () => {
  return (
    <div className="desktop">
    <div className="overlap-wrapper">
      <div className="overlap">
        <div className="group">
          <div className="overlap-group">
            <Link to="/selection"><button>
            <div className="text-wrapper">JIM</div></button></Link>
          </div>
        </div>
        <div className="div">
          <img className="image" alt="Image" src="bicep.png" />
          <p className="p">Work out more like Work smart</p>
          <p className="text-wrapper-2">with our NEW AI powered app</p>
        </div>
      </div>
    </div>
  </div>
  );
};
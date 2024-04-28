import React from "react";
import "./style.css";
import { Selection } from "./selection";
import { Link } from 'react-router-dom';
export const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="overlap">
        <div className="overlap-group">
          <img className="image" alt="Image" src="./bicep.png" />
          <p className="text-wrapper">Work out more like Work smart</p>
          <p className="div">with our NEW AI powered app</p>
        </div>
        <div className="group">
          <div className="div-wrapper">
          <Link to="/selection">
            <button><div className="text-wrapper-2">JIM</div></button>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
import React from "react";
import "./style.css";
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="div">
      <svg className="m" alt="" src="./M.png"/>
        <div className="overlap-group">
          <Link to="/login">
            <button>
              <div className="text-wrapper">Let’s get started!</div>
            </button>
          </Link>
        </div>
        <p className="p">Why workout at GYM when you workout with JIM</p>
      </div>
    </div>
  );
};
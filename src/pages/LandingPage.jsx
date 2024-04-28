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
              <Link to="/selection">
                <button>
                  <div className="text-wrapper">GET STARTED</div>
                </button>
              </Link>
            </div>
          </div>
          <div className="div">
            <p className="p">WHY WORKOUT AT GYM</p>
            <p className="text-wrapper-2">WHEN YOU CAN WORKOUT WITH JIM</p>
            <img className="image" alt="Image" src="bicep.png" />
          </div>
        </div>
      </div>
    </div>
  );
};
import React,{ useState, useEffect} from "react";
import "./cur.css";
import axios from 'axios';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const url = 'http://localhost:3000/';


export const Bic_curl = () => {
  const [response, setResponse] = useState('');

  const handleClick = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/bicep_curl');
      if (res.data.success) {
        setResponse('Bicep Curl detection started successfully.');
      } else {
        setResponse('Error: ' + res.data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error: ' + error.message);
    }
  };
  return (
    <div className="dektop">
            <Helmet>
    <title>JIM | BICEP CURL</title>
    <svg className="h-m" alt="s-m" src="s-m.png"/>
  </Helmet>
      <div className="div">
        <svg className="m" alt="M" src="m.svg" />
        <div className="overlap100">
          <p className="p">
            Stand by holding a dumbbell in each hand with your arms hanging by your sides. Ensure your elbows are close
            to your torso and your shoulders are unshrugged. Keeping your upper arms stationary, exhale as you curl the
            weights up to shoulder level, rotating your wrists outwards, while contracting your biceps
          </p>
          
          <div className="overlap-group" onClick={handleClick}>
            <div className="frame">
              <svg className="vector" alt="Vector" src="vector.png" />
              <div className="text-wrapper-2">Start</div>
            </div>
          </div>
          
          <video className="group" alt="exer" src="./cur.mp4" controls />

        </div>
        <div className="header">
          <div className="text-wrapper-3">Bicep Curl</div>
          <Link to="/selection">
          <svg className="vector-2" alt="Vector" src="return.svg" />
          <svg className="m-2" alt="M" src="s-m.png" />
          </Link>
        </div>
        <svg className="line2" alt="Line" src="line-2.svg" />

        <div className="toolbar">
        <svg className="male-user" alt="Male user" src="male-user.png" />
        <div className="text-wrapper">Hitler1945</div>
        <svg className="line3" alt="Line" src="line-3.svg" />
        <Link to="/Profile">
        <div className="ProfileLink">
        <div className="customer-wrapper">
          <svg className="customer" alt="Customer" src="image.png" />
        </div>
        <div className="overlap-2">
          <div className="text-wrapper-4">Profile</div>
          <div className="text-wrapper-4">Profile</div>
        </div>
        </div>
        </Link>
        <Link to="/MyWorkout">
        <div className="MyWorkoutLink">
        <div className="barbell-wrapper">
          <svg className="barbell" alt="Barbell" src="barbell-2.png" />
        </div>        
        <div className="overlap-3">
          <div className="text-wrapper-5">My Workouts</div>
          <div className="text-wrapper-5">My Workouts</div>
        </div>
        </div>
        </Link>
        <Link to="/about">
        <div className="AboutLink">
            <div className="book-wrapper">
              <svg className="book" alt="Book" src="book-2.png" />
            </div>
            <div className="overlap-4">
              <div className="text-wrapper-6">About</div>
              <div className="text-wrapper-6">About</div>
            </div>
          </div>
        </Link>
        </div>

      </div>
    </div>
  );
};


import React, { useState, useEffect} from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
// import { Helmet } from 'react-helmet';
import './sq.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const url = 'http://localhost:3000/';


export const Squat = () => {
  const [response, setResponse] = useState('');

  const handleClick = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/squats_squats');
      if (res.data.success) {
        setResponse('Squats detection started successfully.');
      } else {
        setResponse('Error: ' + res.data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error: ' + error.message);
    }
  };
  return (
    <div className="desktop">
      <Helmet>
    <title>JIM | SQUATS</title>
    <svg className="h-m" alt="s-m" src="s-m.png"/>
  </Helmet>
      <div className="div">
        <svg className="m" alt="M" src="s-m.png" />
        <div className="text-wrapper">Hitler1945</div>
        <div className="overlap-group">
          <div className="overlap">
            <p className="p">
              A squat is a strength exercise in which the trainee lowers their hips from a standing position and then
              stands back up. During the descent, the hip and knee joints flex while the ankle joint dorsiflexes;
              conversely the hip and knee joints extend and the ankle joint plantarflexes when standing up.
            </p>
            <div className="rectangle" />
            <div className="frame">
              <svg className="vector" alt="palyb" src="vector.svg" />
              <div className="text-wrapper-2">Start</div>
            </div>
          </div>
          <svg className="image" alt="exer" src="image.png" />
        </div>
        <div className="text-wrapper-3">Squats</div>
        <svg className="male-user" alt="Male user" src="male-user.png" />
        <svg className="line" alt="Line" src="line-2.svg" />
        <svg className="img" alt="Line" src="line-3.svg" />
        <div className="customer-wrapper">
          <svg className="customer" alt="Customer" src="cust.png" />
        </div>
        <div className="book-wrapper">
          <svg className="book" alt="Book" src="book-2.png" />
        </div>
        <div className="barbell-wrapper">
          <svg className="barbell" alt="Barbell" src="barbell-2.png" />
        </div>
        <div className="overlap-2">
          <div className="text-wrapper-4">Profile</div>
          <div className="text-wrapper-4">Profile</div>
        </div>
        <div className="overlap-3">
          <div className="text-wrapper-5">My Workouts</div>
          <div className="text-wrapper-5">My Workouts</div>
        </div>
        <div className="overlap-4">
          <div className="text-wrapper-6">About</div>
          <div className="text-wrapper-6">About</div>
        </div>
          <Link to="/selection">
            <button>
              <svg className="vector-2" alt="Rb" src="return.svg" />
              <svg className="m-2" alt="M" src="image.svg" />
            </button>
          </Link>
      </div>
    </div>
  );
};

import React,{ useState, useEffect} from "react";
import "./should.css";
import axios from 'axios';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const url = 'http://localhost:3000/';


export const Shoulder = () => {
  const [response, setResponse] = useState('');

  const handleClick = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/shoulder_press');
      if (res.data.success) {
        setResponse('Tricep pushdown detection started successfully.');
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
<title>JIM | SHOULDER PRESS</title>
<svg className="h-m" alt="s-m" src="s-m.png"/>
</Helmet>
<div className="div">
<svg className="m" alt="M" src="m.svg" />
<div className="overlap100">
  <p className="p">
  The shoulder press is a strength training exercise that primarily targets the deltoid muscles of the shoulders, as well as the triceps and upper chest muscles. It is a fundamental exercise for building upper body strength and muscle mass. The shoulder press can be performed using various equipment, including dumbbells, barbells, or a shoulder press machine.    </p>
  
  <div className="overlap-group" onClick={handleClick}>
    <div className="frame">
      <svg className="vector" alt="Vector" src="vector.png" />
      <div className="text-wrapper-2">Start</div>
    </div>
  </div>
  
  <video className="group" alt="exer" src="./cur.mp4" controls />

</div>
<div className="header">
  <div className="text-wrapper-3">Shoulder Press</div>
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


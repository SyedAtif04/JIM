import React from "react";
import { useContext } from "react";

import "./AboutStyles.css";
import { Link } from 'react-router-dom';
import { UserContext } from "../UserContext";

import { Helmet } from 'react-helmet';
const url = 'http://localhost:3000/';


export const About = () => {
  const { username } = useContext(UserContext);


  return (
    <div className="dektop">
            <Helmet>
    <title>JIM | About</title>
    <svg className="h-m" alt="s-m" src="s-m.png"/>
  </Helmet>
      <div className="div2">
        <svg className="m" alt="M" src="m.svg" />
        
        <svg className="m-3" alt="M" src="m-2.svg" />
<p className="p1">
Technically, the project utilizes a stack comprising React.js for the front-end and Python for the back-end, with MediaPipe for joint tracking. The user opens the web app, which activates the webcam. The app uses MediaPipe to track the user’s body joints. As the user performs exercises, the app monitors the movements. If an incorrect movement is detected, the app provides immediate feedback through audio and text, detailing the specific error.
</p>
<div className="overlap-5">
  <div className="text-wrapper-8">Syed Atif</div>
  <div className="text-wrapper-9">Full Stack</div>
</div>
<div className="overlap-group-2">
  <div className="text-wrapper-9">Backend</div>
  <div className="mustafa-idris-hasan">
    Mustafa
    <br />
    Idris Hasan
  </div>
</div>
<div className="overlap-6">
  <div className="text-wrapper-10">Backend</div>
  <div className="abrar-farooque">
    Abrar
    <br />
    Farooque
  </div>
</div>
<div className="overlap-7">
  <div className="text-wrapper-11">Frontend</div>
  <div className="syed-abdur-rahman">
    Syed
    <br />
    Abdur Rahman
  </div>
</div>
<div className="overlap-8">
  <div className="text-wrapper-12">Frontend</div>
  <div className="text-wrapper-13">Syed Ishaq</div>
</div>


        <div className="header">
          <div className="text-wrapper-3">About</div>
          <Link to="/selection">
          <svg className="vector-2" alt="Vector" src="return.svg" />
          <svg className="m-2" alt="M" src="s-m.png" />
          </Link>
        </div>
        <svg className="line2" alt="Line" src="line-2.svg" />

        <div className="toolbar">
        <svg className="male-user" alt="Male user" src="male-user.png" />
        <div className="text-wrapper">{username}</div>
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


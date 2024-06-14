import React from "react";
import { UserContext } from "../UserContext";
import { useState, useEffect,useContext } from "react";

import "./Profile.css";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const url = 'http://localhost:3000/';


export const Profile = () => {
  const { username } = useContext(UserContext);


  return (
    <div className="dektop">
            <Helmet>
    <title>JIM | PROFILE</title>
    <svg className="h-m" alt="s-m" src="s-m.png"/>
  </Helmet>
      <div className="div">
        <svg className="m" alt="M" src="m.svg" />
        
        <div className="box">
      <div className="group">
        <div className="div">
            <div className="overlap">
          <div className="group-2">
            <div className="group-3">
              <div className="group-4">
                <div className="text-wrapper-20">Username:</div>
                <div className="text-wrapper-30">{username}</div>
              </div>
              <div className="group-5">
                <div className="text-wrapper-40">Email:</div>
                <div className="text-wrapper-50">atif06@gmail.com</div>
              </div>
              {/* <div className="group-6">
                <div className="text-wrapper-60">Password:</div>
                <div className="text-wrapper-70">islpslppl</div>
              </div>
              <Link to="/Profile">
                <div className="text-wrapper-10">change</div></Link> */}
            </div>
          </div>
          <div className="overlap-group-wrapper">
          <Link to="/Profile">
            <div className="photo">
              <div className="text-wrapper-80">change photo</div>
              <svg className="male-user2" alt="Male user" src="male-user.png" />
            </div>
            </Link>

          </div>
          <Link to="/">
          <div className="overlap-wrapper">
            <div className="logoutbutton">
              <div className="text-wrapper-90">Log Out</div>
              </div>
            </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
        <div className="header">
          <div className="text-wrapper-3">Profile</div>
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


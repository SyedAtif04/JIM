import React from "react";
import { Helmet } from 'react-helmet';
import "./style1.css";
import { Link } from 'react-router-dom';




export const Selection_page = () => {
 

  return (
    <div className="selection-page">
    <Helmet>
    <title>JIM | SELECTION PAGE</title>
    <link rel="canonical" href="src\pages\s-m.png" />
  </Helmet>
    <div className="div">
      <svg className="s-m" alt="" src="s-m.png" />
      <div className="text-wrapper">Workouts</div>
      <div className="text-wrapper-2">Hi Hitler1945,</div>
      <div className="text-wrapper-3">Hitler1945</div>
      <div className="overlap">
        <div className="text-wrapper-4">Squats</div>
        <svg className="image" alt="" src="image.png" />
        <div className="overlap-group">
          <Link to="/squat">
            <button>
              <div className="text-wrapper-5">Start</div>
              <svg className="vector" alt="" src="vector.svg" />
            </button>
          </Link>
        </div>
      </div>
      <div className="overlap-2">
        <div className="text-wrapper-4">Squats</div>
        <svg className="image" alt="" src="image-6.png" />
        <div className="overlap-group">
          <div className="text-wrapper-5">Start</div>
          <svg className="vector" alt="" src="vector.png" />
        </div>
      </div>
      <div className="overlap-3">
        <div className="text-wrapper-4">Squats</div>
        <svg className="image" alt="" src="image.png" />
        <div className="overlap-group">
          <div className="text-wrapper-5">Start</div>
          <svg className="vector" alt="" src="vector.svg" />
        </div>
      </div>
      <div className="overlap-group-2">
        <div className="text-wrapper-4">Squats</div>
        <svg className="image" alt="" src="image.png" />
        <div className="overlap-group">
          <div className="text-wrapper-5">Start</div>
          <svg className="vector" alt="" src="vector.svg" />
        </div>
      </div>
      <div className="overlap-4">
        <div className="text-wrapper-4">Squats</div>
        <svg className="image" alt="" src="image.png" />
        <div className="overlap-group">
          <div className="text-wrapper-5">Start</div>
          <svg className="vector" alt="" src="vector.svg" />
        </div>
      </div>
      <div className="overlap-5">
        <div className="text-wrapper-4">Squats</div>
        <svg className="image" alt="" src="image.png" />
        <div className="overlap-group">
          <div className="text-wrapper-5">Start</div>
          <svg className="vector" alt="" src="vector.svg" />
        </div>
      </div>
      <div className="overlap-6">
        <div className="text-wrapper-4">Squats</div>
        <svg className="image" alt="" src="image.png" />
        <div className="overlap-group">
          <div className="text-wrapper-5">Start</div>
          <svg className="vector" alt="" src="vector.svg" />
        </div>
      </div>
      <svg className="male-user" alt="" src="male-user.png" />
      <svg className="line" alt="" src="line-2.svg" />
      <svg className="img" alt="" src="line-3.svg" />
      <div className="customer-wrapper">
        <svg className="customer" alt="" src="cust.png" />
      </div>
      <div className="book-wrapper">
        <svg className="book" alt="" src="book.png" />
      </div>
      <div className="barbell-wrapper">
        <svg className="barbell" alt="" src="barbell.png" />
      </div>
      <div className="overlap-7">
        <div className="text-wrapper-6">Profile</div>
        <div className="text-wrapper-6">Profile</div>
      </div>
      <div className="overlap-8">
        <div className="text-wrapper-7">My Workouts</div>
        <div className="text-wrapper-7">My Workouts</div>
      </div>
      <div className="overlap-9">
        <div className="text-wrapper-8">About</div>
        <div className="text-wrapper-8">About</div>
      </div>
    </div>
  </div>
  );
};
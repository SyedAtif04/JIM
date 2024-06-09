import React from "react";
import { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import axios from "axios";
import "./style1.css";
import { Link } from 'react-router-dom';





export const Selection_page = () => {
  const [username, setUsername] = useState('');
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

  useEffect(() => {
    // Fetch username from backend
    axios.get("/username")
      .then(response => {
        setUsername(response.data.username);
      })
      .catch(error => {
        console.error("Error fetching username:", error);
      });
  }, []);

  return (
    <div className="selection-page">
    <Helmet>
    <title>JIM | SELECTION PAGE</title>
    <link rel="canonical" href="src\pages\s-m.png" />
    </Helmet>
    <div className="div">
      <svg className="s-m" alt="" src="s-m.png" />
      <div className="text-wrapper">Workouts</div>
      <div className="text-wrapper-2">Hi Syed Atif,</div>
      <div className="text-wrapper-3">Syed Atif</div>
          <Link to="/squat">
           
                <div className="overlap">
                  <div className="text-wrapper-4">Squats</div>
                  <svg className="image" alt="" src="image.png" />     
                  <div className="overlap-group">
                    <Link to="/selection" onClick={handleClick}>
                      
                            <div className="text-wrapper-5">Start</div>
                            <svg className="vector" alt="" src="vector.svg" />
                      
                    </Link>
                  </div>
                </div>
            
          </Link>
          <Link to="/bic">
      <div className="overlap-2">
        <div className="text-wrapper-4">Bicep Curls</div>
        <svg className="image" alt="" src="image-6.png" />
        <div className="overlap-group">
          <div className="text-wrapper-5">Start</div>
          <svg className="vector" alt="" src="vector.png" />
        </div>
      </div>
      </Link>
      <Link to ="/tri">
      <div className="overlap-3">
        <div className="text-wrapper-4">Tricep Pushdowns</div>
        <svg className="image" alt="" src="image.png" />
        <div className="overlap-group">
          <div className="text-wrapper-5">Start</div>
          <svg className="vector" alt="" src="vector.svg" />
        </div>
      </div>
      </Link>
      <Link to = "/shoulder">
      <div className="overlap-group-2">
        <div className="text-wrapper-4">Shoulder Press</div>
        <svg className="image" alt="" src="image.png" />
        <div className="overlap-group">
          <div className="text-wrapper-5">Start</div>
          <svg className="vector" alt="" src="vector.svg" />
        </div>
      </div>
      </Link>
      <div className="overlap-4">
        <div className="text-wrapper-4">Lateral Raises</div>
        <svg className="image" alt="" src="image.png" />
        <div className="overlap-group">
          <div className="text-wrapper-5">Start</div>
          <svg className="vector" alt="" src="vector.svg" />
        </div>
      </div>
      <div className="overlap-5">
        <div className="text-wrapper-4">Planks</div>
        <svg className="image" alt="" src="image.png" />
        <div className="overlap-group">
          <div className="text-wrapper-5">Start</div>
          <svg className="vector" alt="" src="vector.svg" />
        </div>
      </div>
      {/* <div className="overlap-6">
        <div className="text-wrapper-4">Squats</div>
        <svg className="image" alt="" src="image.png" />
        <div className="overlap-group">
          <div className="text-wrapper-5">Start</div>
          <svg className="vector" alt="" src="vector.svg" />
        </div>
      </div> */}
      <svg className="male-user" alt="" src="male-user.png" />
      <svg className="line" alt="" src="line-2.svg" />
      <svg className="img" alt="" src="line-3.svg" />
      <div className="customer-wrapper">
        <svg className="customer" alt="" src="cust.png" />
      </div>

      <div className="overlap-7">
        <div className="text-wrapper-6">Profile</div>
        <div className="text-wrapper-6">Profile</div>
      </div>
      <div className="overlap-8">
        <div className="text-wrapper-7">My Workouts</div>
        <div className="text-wrapper-7">My Workouts</div>
      </div>
            <div className="barbell-wrapper">
        <svg className="barbell" alt="" src="barbell.png" />
      </div>
      <Link to="/about">
           
        <div className="AboutLink">
      <div className="overlap-9">
        <div className="text-wrapper-8">About</div>
        <div className="text-wrapper-8">About</div>
      </div>
      <div className="book-wrapper">
        <svg className="book" alt="" src="book.png" />
      </div>
      </div>
        
        </Link>
    </div>
  </div>
  );
};
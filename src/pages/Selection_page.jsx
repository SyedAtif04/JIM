import React from "react";
import { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import axios from "axios";
import "./style1.css";
import { Link } from 'react-router-dom';





export const Selection_page = () => {
  const [username, setUsername] = useState('');
  const [response, setResponse] = useState('');

  const Squat = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/squats');
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

  const tricep = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/tricep_pushdowns');
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

  const Bicep = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/bicep_curl');
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

  const shoulder = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/shoulder_press');
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

  const lateral = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/lateral_raises');
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

  const crunch = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/crunches');
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
    <div style={{ backgroundColor: '#1a1818', display: 'flex', justifyContent: 'center', width: '100%', margin: '0 auto' }}>
    <div className="selection-page">
    <Helmet>
    <title>JIM | SELECTION PAGE</title>
    <link rel="canonical" href="src\pages\s-m.png" />
    </Helmet>
    <div className="div">



          <Link to="/squat">
                <div className="overlap">
                  <div className="text-wrapper-400">Squats</div>
                  <svg className="image" alt="" src="image.png" />     
                  <div className="overlap-group">
                    <Link to="/selection">
                      <div className = "hidden" onClick={Squat}>
                            <div className="text-wrapper-500">Start</div>
                            <svg className="vector" alt="" src="vector.svg" />
                      </div>
                    </Link>
                  </div>
                </div>
          </Link>

          <Link to="/bic">
                <div className="overlap-bicep">
                  <div className="text-wrapper-400">Bicep Curl</div>
                  <svg className="image-bicep" alt="" src="BicepsCurl.png" />     
                  <div className="overlap-group">
                    <Link to="/selection">
                      <div className = "hidden" onClick={Bicep}> {/* change the HandleClick fun() */}
                            <div className="text-wrapper-500">Start</div>
                            <svg className="vector" alt="" src="vector.svg" />
                      </div>
                    </Link>
                  </div>
                </div>
          </Link>

          <Link to="/tri">
                <div className="overlap-tri">
                  <div className="text-wrapper-400">Tricep Pulldown</div>
                  <svg className="image-tri" alt="" src="tricepp.png" />     
                  <div className="overlap-group">
                    <Link to="/selection">
                      <div className = "hidden" onClick={tricep}> {/* change the HandleClick fun() */}
                            <div className="text-wrapper-500">Start</div>
                            <svg className="vector" alt="" src="vector.svg" />
                      </div>
                    </Link>
                  </div>
                </div>
          </Link>

          <Link to="/shoulder">
                <div className="overlap-sho">
                  <div className="text-wrapper-400">Shoulder Press</div>
                  <svg className="image-sho" alt="" src="ShoulderPress.png" />     
                  <div className="overlap-group">
                    <Link to="/selection">
                      <div className = "hidden" onClick={shoulder}> {/* change the HandleClick fun() */}
                            <div className="text-wrapper-500">Start</div>
                            <svg className="vector" alt="" src="vector.svg" />
                      </div>
                    </Link>
                  </div>
                </div>
          </Link>

          <Link to="/Plank">
                <div className="overlap-plank">
                  <div className="text-wrapper-400">Crunches</div>
                  <svg className="image-plank" alt="" src="plank.png" />     
                  <div className="overlap-group">
                    <Link to="/selection">
                      <div className = "hidden" onClick={crunch}> {/* change the HandleClick fun() */}
                            <div className="text-wrapper-500">Start</div>
                            <svg className="vector" alt="" src="vector.svg" />
                      </div>
                    </Link>
                  </div>
                </div>
          </Link>

          <Link to="/LateralRaises">
                <div className="overlap-lat">
                  <div className="text-wrapper-400">Lateral Raises</div>
                  <svg className="image-lat" alt="" src="lateral.raises.png" />     
                  <div className="overlap-group">
                    <Link to="/selection">
                      <div className = "hidden" onClick={lateral}> {/* change the HandleClick fun() */}
                            <div className="text-wrapper-500">Start</div>
                            <svg className="vector" alt="" src="vector.svg" />
                      </div>
                    </Link>
                  </div>
                </div>
          </Link>
      {/* <div className="overlap-20">
        <div className="text-wrapper-400">Squats</div>
        <svg className="image" alt="" src="image-6.png" />
        <div className="overlap-group">
          <div className="text-wrapper-500">Start</div>
          <svg className="vector" alt="" src="vector.png" />
        </div>
      </div>
      <div className="overlap-30">
        <div className="text-wrapper-400">Squats</div>
        <svg className="image" alt="" src="image.png" />
        <div className="overlap-group">
          <div className="text-wrapper-500">Start</div>
          <svg className="vector" alt="" src="vector.svg" />
        </div>
      </div>
      <div className="overlap-group-2">
        <div className="text-wrapper-400">Squats</div>
        <svg className="image" alt="" src="image.png" />
        <div className="overlap-group">
          <div className="text-wrapper-500">Start</div>
          <svg className="vector" alt="" src="vector.svg" />
        </div>
      </div>
      <div className="overlap-40">
        <div className="text-wrapper-400">Squats</div>
        <svg className="image" alt="" src="image.png" />
        <div className="overlap-group">
          <div className="text-wrapper-500">Start</div>
          <svg className="vector" alt="" src="vector.svg" />
        </div>
      </div>
      <div className="overlap-50">
        <div className="text-wrapper-400">Squats</div>
        <svg className="image" alt="" src="image.png" />
        <div className="overlap-group">
          <div className="text-wrapper-500">Start</div>
          <svg className="vector" alt="" src="vector.svg" />
        </div>
      </div>
      <div className="overlap-60">
        <div className="text-wrapper-400">Squats</div>
        <svg className="image" alt="" src="image.png" />
        <div className="overlap-group">
          <div className="text-wrapper-500">Start</div>
          <svg className="vector" alt="" src="vector.svg" />
        </div>
      </div> */}
          </div>
            {/* <svg className="s-m" alt="" src="s-m.png" /> */}
            {/* <div className="text-wrapper-3">Hitler1945</div>*/}
      {/* <svg className="male-user" alt="" src="male-user.png" />
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

        </Link> */}


<svg className="m" alt="M" src="m.svg" />
        <div className="header">
        <div className="text-wrapper-1">Workouts</div>
      <div className="text-wrapper-2">Hi Hitler1945,</div>
          <Link to="/selection">
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
import React from "react";
import "./AboutStyles.css";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const url = 'http://localhost:3000/';


export const About = () => {

  return (
    <div className="desktop">
    <Helmet>
    <title>JIM | ABOUT PAGE</title>
    <svg className="h-m" alt="s-m" src="s-m.png"/>
    </Helmet>
      <div className="div">
        <svg className="m" alt="M" src="image.svg" />
        <div className="text-wrapper">Hitler1945</div>
        <div className="text-wrapper-2">About</div>
        <div className="text-wrapper-3">JIM</div>
        <svg className="male-user" alt="Male user" src="male-user.png" />
        <svg className="line" alt="Line" src="line-2.svg" />
        <svg className="line3" alt="Line" src="line-3.svg" />
        <div className="overlap">
          <svg className="customer" alt="Customer" src="cust.png" />
        </div>
        <Link to="/about">
            
        <div className="AboutLink">
            <div className="overlap-book">
            <svg className="book" alt="Book" src="book.png" />
            </div>
            <div className="overlap-4">
            <div className="text-wrapper-6">About</div>
            {/* <div className="text-wrapper-7">About</div> */}
            </div>
        </div>
       
        </Link>
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
        <Link to="/selection">
            
              <svg className="vector" alt="Rb" src="return.svg" />
              <svg className="m-2" alt="M" src="image.svg" />
            
          </Link>
        <svg className="m-3" alt="M" src="m-2.svg" />
        <p className="p">
          A squat is a strength exercise in which the trainee lowers their hips from a standing position and then stands
          back up. During the descent, the hip and knee joints flex while the ankle joint dorsiflexes; conversely the
          hip and knee joints extend and the ankle joint plantarflexes when standing up.
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
      </div>
    </div>
  );
};

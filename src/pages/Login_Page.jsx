import React, { useState, useEffect } from "react";
import "./login.css";
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';


export const LoginPage=()=> {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			const response = await fetch('/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			});

			const data = await response.json();
			if (response.ok) {
				navigate("/selection") ;
				console.log(data.message); // If login successful
			} else {
				console.error(data.message); // If login failed
			}
		} catch (error) {
			console.error("An error occurred:", error);
		}
	};


	const handleRegister = async () => {
		try {
			const response = await fetch('/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username: name, email, password })
			});

			const data = await response.json();
			if (response.ok) {
				console.log(data.message); // If registration successful
			} else {
				console.error(data.message); // If registration failed
			}
		} catch (error) {
			console.error("An error occurred:", error);
		}
	};

	useEffect(() => {
		const signUpButton = document.getElementById('signUp');
		const signInButton = document.getElementById('signIn');
		const container = document.getElementById('container');

		// Check if elements exist before adding event listeners
		if (signUpButton && signInButton && container) {
			signUpButton.addEventListener('click', () => {
				container.classList.add("right-panel-active");
			});

			signInButton.addEventListener('click', () => {
				container.classList.remove("right-panel-active");
			});

			return () => {
				signUpButton.removeEventListener('click', () => {
					container.classList.add("right-panel-active");
				});
				signInButton.removeEventListener('click', () => {
					container.classList.remove("right-panel-active");
				});
			};
		}
	}, []);

	return (
		<div className="LoginPage">
			<div>
				<svg src="s-m.png" alt="jimlogo" />
			</div>

			<h2>WorkOut With JIM!!!</h2>
			<div className="container" id="container">
				<div className="form-container sign-up-container">
					<form>
						<h1>Create Account</h1>
						<span>or use your email for registration</span>
						<input
							type="text"
							placeholder="Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button onClick={handleRegister}>Sign Up</button>
					</form>
				</div>
				<div className="form-container sign-in-container">
					<form action="#">
						<h1>Sign in</h1>
						<span>or use your account</span>
						<input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<a href="#">Forgot your password?</a>
						<button onClick={handleLogin}>Sign In</button>
					</form>
				</div>
				<div className="overlay-container">
					<div className="overlay">
						<div className="overlay-panel overlay-left">
							<h1>Welcome Back!</h1>
							<p>To keep connected with us please login with your personal info</p>
							<button className="ghost" id="signIn">Sign In</button>
						</div>
						<div className="overlay-panel overlay-right">
							<h1>Hello, Friend!</h1>
							<p>Enter your personal details and start journey with us</p>
							<button className="ghost" id="signUp">Sign Up</button>
						</div>
					</div>
				</div>
			</div>

			<footer>
				<p>
					Join The Squad NOW!
				</p>
			</footer>
		</div>
	);
}






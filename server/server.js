// server.js
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "jim", // your MySQL username
  password: "jim1234", // your MySQL password
  database: "user_authentication", // name of your database
});

// Middleware
app.use(express.json());

// Routes
// register route
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
      (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Internal server error" });
        }
        res.status(201).json({ message: "User registered successfully" });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// login route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Internal server error" });
        }

        if (results.length === 0) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = results[0];

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful" });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

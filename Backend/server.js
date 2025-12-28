const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const UserModel = require("./models/userModel");

// config dotenv
dotenv.config();

// database config
connectDB();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// PORT
const PORT = process.env.PORT || 8080;
/* =========================
   REGISTER ROUTE
========================= */
app.post("/register", async (req, res) => {
  const { email } = req.body;

  const checkuserExist = await UserModel.findOne({ email });
  if(checkuserExist)
  {
    return  res.status(400).json({
      message: "User already exists with this email",
    });
  }

  try {
    const user = await UserModel.create(req.body);
    res.status(201).json({
      message: "User registered successfully",user
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

/* =========================
   LOGIN ROUTE
========================= */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      message: "Login successful",
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

/* =========================
   GEMINI API ROUTE
========================= */
const API_KEY = process.env.GEMINI_API_KEY;
const url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

app.post("/api/gemini", async (req, res) => {
  try {
    const prompt = req.body.message;

    const response = await fetch(`${url}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;

    res.json({ reply: text });
  } catch (error) {
    console.error("Gemini API error:", error.message);
    res.status(500).json({
      error: "Failed to get response from Gemini",
    });
  }
});

/* =========================
   SERVER LISTEN
========================= */
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.DEV_MODE} mode on port ${PORT}`
  );
});

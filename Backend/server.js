const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const EmployeeModel = require('./models/userModel');


// routes path
const authRoutes = require('./routes/authRoutes');
const errormidleware = require('./middelwares/errormidleware');


// confit dotenv
dotenv.config();

// database config
connectDB();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.json());
const Port= process.env.PORT || 8080;

// api routes
app.use('/api/v1/auth',authRoutes);

// error middleware
app.use(errormidleware);

// POST /register
app.post('/register',(req,res)=>{
   EmployeeModel.create(req.body)
   .then(employees => res.json(employees))
   .catch(err => res.json(err));
});

// POST /login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await EmployeeModel.findOne({ email });

    // Check user existence
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Password check
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Success
    return res.status(200).json({
      message: "Login successful",
      user
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});


// POST /api/gemini
const API_KEY = process.env.GEMINI_API_KEY; // or put your key directly
const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";
app.post("/api/gemini", async (req, res) => {
  try {
    const prompt = req.body.message;
    const response = await fetch(`${url}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${prompt}`
              }
            ]
          }
        ]
      }),
    });
    const data = await response.json();

    const text = data.candidates[0].content.parts[0].text;
    return res.json({
      "reply": text,
    });
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);

    return res.status(500).json({
      error: "Failed to get response from Gemini",
      details: error.response?.data || error.message,
    });
  }
});


// listening server
app.listen(8080,()=>{ 
    console.log(`Server is running ${process.env.DEV_MODE} mode on port on ${Port}`.yellow.bold);
})
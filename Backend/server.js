const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


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

const API_KEY = process.env.GEMINI_API_KEY; // or put your key directly
const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Chat backend running" });
});

// POST /api/gemini
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
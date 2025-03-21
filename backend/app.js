const express = require('express');
const path = require('path');
const app = express();
const connectDB = require('./connection/connect');
const cors = require('cors');

const auth = require("./routes/auth");
const list = require("./routes/list");

app.use(express.json());
connectDB();
app.use(cors({
  origin: 'https://todo-list-ankit-jrjs6m6du-ankit-baghels-projects.vercel.app', 
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

  


// API routes
app.use("/api/v1", auth);
app.use("/api/v2", list);

// Serve static files from the React app
app.use(express.static(path.join(__dirname,"frontend", "build"))); // Adjust if your build folder is elsewhere

// Handle React routing, return index.html for all non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

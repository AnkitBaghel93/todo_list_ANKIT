const express = require('express');
const path = require('path');
const app = express();
const connectDB = require('./connection/connect');
const cors = require('cors');

const auth = require("./routes/auth");
const list = require("./routes/list");

app.use(express.json());
connectDB();
app.use(cors());


// API routes
app.use("/api/v1", auth);
app.use("/api/v2", list);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

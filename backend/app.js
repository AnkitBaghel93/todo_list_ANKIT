const express = require('express');
const app = express();
const connectDB = require('./connection/connect');

const auth = require("./routes/auth");
const list = require("./routes/list");
app.use(express.json());
connectDB();

app.get('/', (req, res)=>{
  console.log(req.url, req.method);
res.send("hello bhai");
})

app.use("/api/v1", auth);
app.use("/api/v2", list);



const PORT = 3000;
app.listen(PORT, ()=>{
  console.log(`Server running at address http://localhost:${PORT}`);
})
const mongoose = require('mongoose');

const connectDB = async(req, res) => {
try {
  await mongoose.connect("mongodb+srv://Ankit:Ankitkl08@cluster0.ovvmb.mongodb.net/").then(()=>{
    console.log("Database is connected successfully");
  })
} catch (error) {
  res.status(200).json({
    message : "Database is not connected"
  })
}
};
module.exports = connectDB;
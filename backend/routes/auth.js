const router = require('express').Router();
const User = require("../models/user");
const bcrypt = require('bcryptjs');

// SIGN UP
 router.post("/register", async(req, res) => {
  try {
    const {email, username, password} = req.body;
     
    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    // check if user already exists
    const existingUser = await User.findOne({email});
    if(existingUser){
      return res.status(400).json({ message: "User Already Exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);             // for password encryption
    const user = new User({
      email: req.body.email,
      password: hashedPassword, // Store the hashed password
      username: req.body.username
    });
    await user.save().then(() => res.status(200).json({message: "SignUp successfully "}));
  } 
  catch (error) {
   res.status(500).json({ message: "Server Error" });
  }
 });
 
 //SIGN IN
 router.post("/signin", async (req, res) => {
   try {
     const user = await User.findOne({ email: req.body.email });
 
     if (!user) {
       return res.status(404).json({ message: "Please Sign Up First" });
     }
 
     console.log("Stored Hashed Password:", user.password);
     console.log("Entered Password:", req.body.password);
     
     const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
     if (!isPasswordCorrect) {
       return res.status(401).json({ message: "Password is incorrect" });
     }
 
     const { password, ...others } = user._doc;
     return res.status(200).json({ message: "Login successful", user: others });
   } catch (error) {
     console.error(error);
     return res.status(500).json({ message: "Server Error. Please try again." });
   }
 });
 
 module.exports = router;
import React, {useState} from "react";
import "./Signup.css";
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const history = useNavigate();
  const [Inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  })

  const change = (e) => {
    const {name, value} = e.target;
    setInputs({...Inputs, [name]: value});
    
  }

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://todo-list-ankit-f19djopkp-ankit-baghels-projects.vercel.app/api/v1/register`, Inputs);
      console.log("1");
      alert(response.data.message);
      setInputs({
        email: "",
        username: "",
        password: "",
      });
  
      history("/signin");
      toast.success("You SignUp Successfully!");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message); // Shows "User Already Exists"
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };
  
  return (
    <div className="signup-container">
      <ToastContainer/> 
      
      <div className="signup-box">
        <h2>Create an Account</h2>
        <form>
          <div className="input-group">
            <input 
                  type="text" 
                  name="username"
                  onChange={change} 
                  value={Inputs.username}
                  required 
                />
            <label>Full Name</label>
          </div>
          <div className="input-group">
            <input 
                  type="email"  
                  name="email" 
                  onChange={change}
                  value={Inputs.email}  
                  required 
            />
            <label>Email Address</label>
          </div>
          <div className="input-group">
            <input 
                  type="password"  
                  name="password" 
                  onChange={change}
                  value={Inputs.password}  
                  required 
            />
            <label>Password</label>
          </div>
          <button 
                type="submit" 
                className="signup-btn"
                onClick={submit}
         >
            Sign Up
          </button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

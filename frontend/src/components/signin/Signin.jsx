import React, {useState} from "react";
import "./Signin.css";
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { authActions } from "../../store";

const Signin = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [Inputs, setInputs] = useState({
    email: "",
    password: ""
  });
   
  const change = (e) => {
    const {name, value} = e.target;
    setInputs({...Inputs, [name]: value});
  }

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/v1/signin", Inputs);
      console.log("Server Response:", response.data);


      if (response.data.user) {
        sessionStorage.setItem("id", response.data.user._id);
        console.log("User ID stored in sessionStorage:", response.data.user._id);
        
        dispatch(authActions.login());
        history("/todo");
      } 
      else {
        alert("Unexpected response from server");
      }
    } 
    catch (error) {
      if (error.response && error.response.data.message) {
        alert(error.response.data.message);
    
      } 
      else {
        alert("Something went wrong. Please try again.");
      
      }
    }
  };
    
  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Sign In to DooBeeDoo</h2>
        <form>
          <div className="input-group">
            <input
                  type="email"
                  name="email"
                  value={Inputs.email} 
                  onChange={change}
                  required />
            <label>Email Address</label>
          </div>
          <div className="input-group">
            <input 
                  type="password" 
                  name="password" 
                  value={Inputs.password} 
                  onChange={change}
                  required />
            <label>Password</label>
          </div>
          <button 
          type="submit" 
          className="signin-btn"
          onClick={submit}
          >Sign In</button>
        </form>
        <p className="forgot-password"><a href="#">Forgot Password?</a></p>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};
export default Signin;

  
   
  
 



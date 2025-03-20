import React, {useState} from 'react';
import "./Navbar.css";
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { authActions } from "../../store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = () => {
    sessionStorage.clear("id");
    dispatch(authActions.logout());
    setIsMenuOpen(false);                 // Close menu after logout
  }
  const handleLinkClick = () => {
    setIsMenuOpen(false); // Close menu when a link is clicked
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg "> 
  <div className="container">
 <Link className="navbar-brand" to="/"><b> DooBeeDoo</b></Link>
    <button
      className="navbar-toggler"
      type="button" 
      data-bs-toggle="collapse" 
      data-bs-target="#navbarSupportedContent" 
      aria-controls="navbarSupportedContent" 
      // aria-expanded="false" 
      aria-label="Toggle navigation"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      aria-expanded={isMenuOpen}>
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}  id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
       <Link className="nav-link active" aria-current="page" onClick={handleLinkClick} to="/">Home</Link>
        </li>
        <li className="nav-item">
       <Link className="nav-link active" aria-current="page" onClick={handleLinkClick} to="/about">About us</Link>
        </li>
        <li className="nav-item">
       <Link className="nav-link active" aria-current="page" onClick={handleLinkClick} to="/todo"> Todo</Link>
        </li>
        {!isLoggedIn && 
         (   <>
         <li className="nav-item">
                <Link className="nav-link active" aria-current="page" onClick={handleLinkClick} to="/signup">Sign Up</Link>
          </li>
          <li className="nav-item">
                <Link className="nav-link active" aria-current="page" onClick={handleLinkClick} to="/signin">Sign In</Link>
          </li>
          </>)}
       {isLoggedIn && (    
        <li className="nav-item"   onClick={logout}>
                <Link className="nav-link active" aria-current="page" to="#">Log Out</Link>
              
        </li>)}
    
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar;
     
       
     
       

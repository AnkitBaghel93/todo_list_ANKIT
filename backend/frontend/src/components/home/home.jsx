import React from 'react';
import './Home.css';
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <div className='home d-flex justify-content-center align-items-center'>
      <div className='container'>

          <h1>Organize Your <br />Work And Life, Finally </h1>
          <p>
          Become focused, organized and calm with 
          <span className="animated-text"> DooBeeDoo</span> app. 
          The World's #Easiest task manager app.
          </p>
          <Link to='/todo'>
          <button className='home-btn'>Make Todo List</button>
          </Link>
        
      </div>
    </div>
  )
}

export default Home;

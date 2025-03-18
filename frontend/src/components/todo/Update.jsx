import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  toast } from 'react-toastify';


const Update = ({ display ,update }) => {
  const [Inputs, setInputs] = useState({
    title:"",
    body:"",
  });

  useEffect(() => {
    setInputs({
      title:update.title,
      body:update.body,
    });
  }, []);

  const change = (e) => {
    const {name, value} = e.target;
    setInputs({...Inputs, [name]: value});
  }
  const submit = async () => {
   await axios
   .put(` http://localhost:3000/api/v2/${update.id}`, Inputs)
   .then((response) => {
   toast.success(response.data.message);

   })
  }
  return (
    <div className="position-relative container p-4 bg-light rounded shadow-sm">
      {/* Close Button */}
      <button 
        className="btn-close position-absolute top-0 end-0 m-3" 
        onClick={() => {display("none")}}
        aria-label="Close"
      ></button>

      <h3 className="text-center text-dark mb-3">Update Your Task</h3>
      
      <input 
        type="text" 
        className="form-control mb-3" 
       
        value={Inputs}
        name='title'
        onChange={change}
      />
      
      <textarea 
        className="form-control mb-3" 
        rows="4" 
       
        value={Inputs}
        name='body'
        onChange={change}
      ></textarea>
      
      <div className="d-flex justify-content-center">
        <button 
        className="btn btn-dark w-50"
        onClick={submit}
        >UPDATE</button>
      </div>
    </div>
  );
};

export default Update;

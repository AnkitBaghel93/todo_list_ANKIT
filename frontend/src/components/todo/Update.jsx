import React from 'react';

const Update = ({ display }) => {
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
        placeholder="Enter new title..." 
      />
      
      <textarea 
        className="form-control mb-3" 
        rows="4" 
        placeholder="Enter task details..."
      ></textarea>
      
      <div className="d-flex justify-content-center">
        <button className="btn btn-dark w-50">UPDATE</button>
      </div>
    </div>
  );
};

export default Update;

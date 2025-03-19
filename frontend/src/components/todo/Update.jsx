import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Update = ({ display, update }) => {
  
const [inputs, setInputs] = useState({
    title: "",
    body: "",
  });

useEffect(() => {
    console.log("Update prop received in Update.js:", update);

    if (update) {
      console.log("Populating update form with:", update);
      setInputs({
        title: update.title || "",
        body: update.body || "",
      });
    } else {
      console.warn("Update prop is missing or invalid:", update);
      setInputs({ title: "", body: "" });  // Prevent undefined form state
    }
}, [update]);

const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  
const handleSubmit = async () => {
      console.log("Submitting update for task ID:", update?._id);
  
      if (!update || !update._id) {
        toast.error("Task ID is missing!");
        return;
      }
  
      if (!inputs.title.trim() || !inputs.body.trim()) {
        toast.error("Title and body cannot be empty!");
        return;
      }
  
      try {
        const response = await axios.put(
          `http://localhost:3000/api/v2/updateTask/${update._id}`,
          inputs
        );
  
        if (response.status === 200) {
          toast.success(response.data.message || "Task updated successfully!");
          display("none"); // Close modal after update
        } else {
          toast.error("Unexpected response from server!");
          console.error("Response details:", response);
        }
      } catch (error) {
        console.error("Update error:", error);
        toast.error(error.response?.data?.message || "Error updating task!");
      }
  };

return (
      <div className="position-relative container p-4 bg-light rounded shadow-sm">
        {/* Close Button */}
        <button
          className="btn-close position-absolute top-0 end-0 m-3"
          onClick={() => display("none")}
          aria-label="Close"
        ></button>
  
        <h3 className="text-center text-dark mb-3">Update Your Task</h3>
  
        <input
          type="text"
          className="form-control mb-3"
          value={inputs.title}
          name="title"
          onChange={handleChange}
          placeholder="Enter task title"
        />
  
        <textarea
          className="form-control mb-3"
          rows="4"
          value={inputs.body}
          name="body"
          onChange={handleChange}
          placeholder="Enter task details"
        ></textarea>
  
        <div className="d-flex justify-content-center">
          <button className="btn btn-dark w-50" onClick={handleSubmit}>
            UPDATE
          </button>
        </div>
      </div>
    );
};
  
export default Update;


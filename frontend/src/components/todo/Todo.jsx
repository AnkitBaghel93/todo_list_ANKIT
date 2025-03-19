import React, { useEffect, useState } from "react";
import "./Todo.css";
import TodoCards from "./TodoCards";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from "./Update";
import axios from 'axios';

const Todo = () => {
  const [showTextarea, setShowTextarea] = useState(false);
  const [Inputs, setInputs] = useState({title: "", body: ""});
  const [Array, setArray] = useState([]);
  const [id] = useState(sessionStorage.getItem("id") || "");
  const [update, setUpdate] = useState(null); 

  const change= (e) => {
        const { name, value} = e.target;
        setInputs({...Inputs, [name]: value});
  };

  const submit = async () => {
    if (Inputs.title === "" || Inputs.body === "") {
      toast.error("Title or Body Can't Be Empty");
    } else {
      if (id) {
        try {
          const response = await axios.post("http://localhost:3000/api/v2/addTask", {
            title: Inputs.title,
            body: Inputs.body,
            id: id,
          });
  
          if (response.status === 200) {
            console.log("Task Added Successfully:", response.data);
  
            // Ensure the new task is added to the state instantly
            setArray((prevArray) => [...prevArray, response.data.task]);
  
            setInputs({ title: "", body: "" });
            toast.success("Your Task is Saved Successfully!");
          } else {
            toast.error("Failed to add task!");
          }
        } catch (error) {
          console.error("Error adding task:", error);
          toast.error("Error adding task!");
        }
      } else {
        setArray((prevArray) => [...prevArray, Inputs]); // Add to local state if no ID
        setInputs({ title: "", body: "" });
        toast.success("Your Task is Added Successfully!");
        toast.error("But Your Task Is Not Saved, Please Sign Up First!");
      }
    }
  };
  
  
  const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // Prevents new line in textarea
        submit();
  } };
  
  const del = async (Cardid) => {
    if (id) {
      setArray((prevArray) => prevArray.filter((task) => task._id !== Cardid));
      try {
        await axios.delete(`http://localhost:3000/api/v2/deleteTask/${Cardid}`);
        toast.success("Your Task is Deleted Successfully!");
      } catch (error) {
        console.error("Error deleting task:", error);
        toast.error("Failed to delete task!");
        // Rollback: Restore the deleted task in case of an API error
      setArray((prevArray) => [...prevArray, { _id: Cardid }]);  
      }
    } else {
      toast.error("Please Sign Up First!");
    }
  };
  
  const dis = (value) => {
   console.log(value);
   document.getElementById("todo-update").style.display = value;
  }
        
  const handleUpdate = (taskId) => {
    console.log("Looking for task with ID:", taskId);
    const taskToUpdate = Array.find((task) => task._id === taskId);
    if (taskToUpdate) {
      console.log("Setting update state with:", taskToUpdate);
      setUpdate({ ...taskToUpdate });
      dis("block"); // Ensure the update modal appears
    } else {
      console.warn("Task not found for update:", taskId);
    }
  };
    
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.post(`http://localhost:3000/api/v2/getTask/${id}`);
  
        if (!response || !response.data) {
          throw new Error("Response or response.data is undefined");
        }
        console.log("Full API Response:", response);
        console.log("List of Tasks:", response.data.list);
        setArray(response.data.list || []); // Ensure list exists
        
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Failed to fetch tasks!");
      }
    };
    if (id) fetchTasks();
  }, [id]);

  return (
  <>
  <div className="todo d-flex flex-column">
  <ToastContainer/> 
         <div className="todo-main container d-flex  justify-content-center align-items-center ">
       
           <div className="d-flex flex-column todo-inputs">
             <input
               type="text"
               placeholder="Enter Title..."
               onClick={() => setShowTextarea(true)}
               className="todo-title"
               name="title"
               value={Inputs.title}
               onChange={change}
               onKeyDown={handleKeyDown}
             />
             <textarea
               id="textarea"
               placeholder="Enter Details..."
               className={`todo-body ${showTextarea ? "visible" : ""}`}
               name="body"
               value={Inputs.body}
               onChange={change}
               onKeyDown={handleKeyDown}
               />
             <button className="todo-add-btn" onClick={submit}>
               Add
             </button>
           </div>
         </div>
     
  <div className="todo-card my-5">
    <div className="container-fluid">
      <div className="row justify-content-center">
      {Array?.length > 0 ? (

          Array.map((item, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex justify-content-center">
                <TodoCards 
                title={item.title} 
                body={item.body} 
                id={item._id} 
                delid={del}  
                display={dis}
                updateId={index}
                toBeUpdate={handleUpdate}
                />
            </div>
          ))
        ) : (
          <p className="text-center">No Todos Added Yet</p>
        )}
      </div>
    </div>
  </div>
  </div>
  <div className="todo-update bg-primary" id="todo-update">
    <div className="container">
        <Update display={dis} update={update} setArray={setArray}  />    
    </div>
  
  </div>
  </>
  ) };
  export default Todo;
 




    
        




  
  
  
              
  
        

  
  

  
 
  
    
  
  
  



   
       
       
  


    

 
    




 


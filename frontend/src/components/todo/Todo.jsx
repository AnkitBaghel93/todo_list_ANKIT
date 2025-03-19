import React, { useEffect, useState } from "react";
import "./Todo.css";
import TodoCards from "./TodoCards";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from "./Update";
import axios from 'axios';

let id = sessionStorage.getItem("id") || "";
console.log("Retrieved ID from sessionStorage:", id);
// let toUpdateArray = [];

const Todo = () => {
  const [showTextarea, setShowTextarea] = useState(false);
  const [Inputs, setInputs] = useState({title: "", body: ""});
  const [Array, setArray] = useState([]);
  const [id, setId] = useState(sessionStorage.getItem("id") || "");
  const [update, setUpdate] = useState(null); 

 

  const change= (e) => {
        const { name, value} = e.target;
        setInputs({...Inputs, [name]: value});
  };

  const submit = async() => {
    if(Inputs.title === "" || Inputs.body === ""){
      toast.error("Title or Body Can't Be Empty");
    } else {
      if(id){
        await axios.post("http://localhost:3000/api/v2/addTask", {
          title: Inputs.title,
          body: Inputs.body,
          id: id,
        }).then((response) => {
          console.log(response);
        });
       
        setInputs({title: "", body: ""});
        toast.success("Your Task is Saved Successfully!");
      }
      else{
        // Spread operator to maintain previous state
        setArray((prevArray) => [...prevArray, Inputs]);
        // console.log("Updated Array:", Array);
        setInputs({title: "", body: ""});
        toast.success("Your Task is Added Successfully!");
        toast.error("But Your Task Is Not Saved, Please SignUp First!");
       }  
    }
  };
  
  const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // Prevents new line in textarea
        submit();
  } };
  
  const del = async (Cardid) => {
    console.log(id);
    if(id){
      await axios
      .delete(`http://localhost:3000/api/v2/deleteTask/${Cardid}?id=${id}`)
      .then((response) => {console.log(response)});
     
      // Array.splice(id, "1");
      // setArray([...Array]);
      toast.success("Your Task is Deleted Successfully!");
    }
    else{
      toast.error("Please SignUp First!");
    }
  }   

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
    } else {
      console.warn("Task not found for update:", taskId);
    }
  };
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        console.log("Fetching tasks for ID:", id); // Debugging
  
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

  useEffect(() => {
    console.log("Updated Array state:", Array);
  }, [Array]);
  
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
       {Array && Array.length > 0 ? (
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
 
       <Update display={dis} update={update}/>    
       
   </div>
 </div>
 </>
 ) };
 export default Todo;
 
  
    
  
  
  



   
       
       
  


    

 
    




 


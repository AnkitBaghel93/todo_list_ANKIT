import React, { useState } from "react";
import "./Todo.css";
import TodoCards from "./TodoCards";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from "./Update";


const Todo = () => {
  const [showTextarea, setShowTextarea] = useState(false);
  const [Inputs, setInputs] = useState({title: "", body: ""});
  const [Array, setArray] = useState([]);

  const change= (e) => {
        const { name, value} = e.target;
        setInputs({...Inputs, [name]: value});
  };

  const submit = () => {
    setArray([...Array, Inputs]); // Spread operator to maintain previous state
    console.log("Updated Array:", Array);
    setInputs({title: "", body: ""});
    toast.success("Your Task is Added Successfully!");
    toast.error("But Your Task Is Not Saved, Please SignUp First!");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents new line in textarea
      submit();
     } };

  const del = (id) => {
    console.log(id);
    Array.splice(id, "1");
    setArray([...Array]);
    toast.success("Your Task is Deleted Successfully!");
    
  }   
  
  const dis = (value) => {
   console.log(value);
   document.getElementById("todo-update").style.display = value;
  }

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
            <TodoCards title={item.title} body={item.body} id={index} delid={del}  display={dis}/>
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

      <Update display={dis}/>    
      
  </div>
</div>
</>
) };
export default Todo;
    

 
    




 


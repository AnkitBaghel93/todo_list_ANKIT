import React from "react";
import './TodoCards.css';
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineBrowserUpdated } from "react-icons/md";

const TodoCards = ({ title, body ,id , delid , display, updateId, toBeUpdate }) => {
 
return (
<div className="todo-item p-3">
      <div className="card">
          <h5 className="my-3">{title.split("", 20)}</h5>
          <p className="text">{body.split("", 50)}...</p> 
          <div className="card-btn my-1">
            <div onClick={() => {
              display('block');
              
              toBeUpdate(updateId);

            }}>
            <MdOutlineBrowserUpdated className="card-btn-update"/>
            </div>
              <div onClick={() => delid(id)}>
            <MdDeleteForever className="card-btn-delete"  />
              </div>

          </div>
    </div>
</div>
);
};
export default TodoCards;






          
         

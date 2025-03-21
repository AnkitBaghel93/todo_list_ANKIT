const router = require('express').Router();
const User = require("../models/user");
const List = require("../models/list");

//create task
router.post("/addTask", async (req, res) => {
  try {
    const { title, body, id } = req.body;
    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const list = new List({ title, body, user: existingUser });
    await list.save();

    // Push the new task into the user's list and save the user document
    existingUser.list.push(list);
    await existingUser.save();

    //Return the created task properly
    return res.status(200).json({ message: "Task added successfully", task: list });
  } catch (error) {
    console.log("Add Task Error:", error);
    return res.status(500).json({ message: "Failed to add task" });
  }
});

//update task
router.put("/updateTask/:id", async (req, res) => {
  try {
    const {title, body } = req.body;
    
    const list =  await List.findByIdAndUpdate(req.params.id, {title, body});
      list.save().then(()=> res.status(200).json({message: "Task Updated"}));
      
    } catch (error) {
      console.log(error);
    }
  });
    
 //delete task 
  router.delete("/deleteTask/:id", async (req, res) => {
      try {
        const taskId = req.params.id; // Get task ID from URL params
        console.log("Deleting Task ID:", taskId);
    
        // Check if the task exists
        const task = await List.findById(taskId);
        if (!task) {
          return res.status(404).json({ message: "Task not found" });
        }
    
        // Delete task from user's list
        await User.updateMany({}, { $pull: { list: taskId } });
    
        // Delete the task itself
        await List.findByIdAndDelete(taskId);
    
        return res.status(200).json({ message: "Task Deleted" });
      } catch (error) {
        console.error("Delete Task Error:", error);
        res.status(500).json({ message: "Server Error" });
      }
  });

  //getTask
  router.post("/getTask/:id", async (req, res) =>{
    const list = await List.find({user: req.params.id}).sort({createdAt:-1});
  if(list.length!== 0){
    res.status(200).json({ list : list});
  }
  else{
    res.status(200).json({ "message": "No Tasks" });
  }
  });
  
  module.exports = router;
  
  

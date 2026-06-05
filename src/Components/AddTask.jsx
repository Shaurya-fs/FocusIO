import { useState } from "react";

function AddTask({addTask}){
    const [task , setTask] = useState("");
    const handleSubmit=()=>{
        addTask(task);
        setTask("");
    };
    return(
        <div>
            <input 
                value={task}
                onChange={(e)=>setTask(e.target.value)}
                placeholder="Add Task"
            />

            <button onClick={handleSubmit}>Add</button>
            
        </div>
    );

}
export default AddTask;
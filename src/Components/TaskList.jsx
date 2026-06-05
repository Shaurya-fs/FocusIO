import { useState }from "react";
import "./TaskList.css";

function TaskList() {
    const [tasks, setTasks ]= useState([]);
    return(
        <div>
            <h2>Tasks</h2>
            {tasks.map((task,index)=>(
                <div key={index}>{task}</div>
            ))}
        </div>
    )
}
export default TaskList;

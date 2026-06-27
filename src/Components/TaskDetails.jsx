import "./TaskDetails.css";
function TaskDetails({task}){
    if(!task){
        return(
            <div className="Task_Details">
                <h2>Task Details</h2>
                <p>Select a task to see more information</p>
            </div>
        );
    }
    return(
        <div className="Task_Details">
            <h2>Task details</h2>
            <h3>{task.title}</h3>
            <p>status:{task.completed? "Completed" : "Active"}</p>
        </div>
    );
}

export default TaskDetails;
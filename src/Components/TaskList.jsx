import "./TaskList.css";

export function TaskList({ tasks, toggleTask, deleteTask, onSelectTask, startEditing }) {
  return (
    <div className="task-list">
      <h2>Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="task-card">
            <div onClick={() => onSelectTask(task)}>
              <h3>{task.title}</h3>
              <p>Status: {task.completed ? "Completed" : "Active"}</p>
              {task.description &&(<p>{task.description}</p>)}
              {task.priority &&(<p>Priority: {task.priority}</p>)}
              {task.dueDate &&(<p>Due Date: {task.dueDate}</p>)}
              {task.estimatedDuration 
               &&(<p>Estimated Duration: {task.estimatedDuration} minutes</p>)}
            </div>
            

            <button onClick={() => toggleTask(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button className="editTask_button" onClick={() => startEditing(task)}>
              Edit Task
            </button>

            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

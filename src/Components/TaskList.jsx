import "./TaskList.css";

const formatDueDate = (value) => {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};

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
              {task.dueDate &&(<p>Due Date: {formatDueDate(task.dueDate)}</p>)}
              {task.time && (
                <p>Time: {task.time}</p>
              )}
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

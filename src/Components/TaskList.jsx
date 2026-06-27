import "./TaskList.css";

export function TaskList({ tasks, toggleTask, deleteTask, onSelectTask }) {
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
              <p>{task.completed ? "Completed" : "Active"}</p>
            </div>

            <button onClick={() => toggleTask(task.id)}>
              {task.completed ? "Undo" : "Complete"}
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

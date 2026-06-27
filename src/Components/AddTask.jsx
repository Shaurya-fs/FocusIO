import { useState } from "react";
import "./AddTask.css";

function AddTask({ addTask }) {
  const [task, setTask] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!task.trim()) {
      return;
    }

    addTask(task);
    setTask("");
  };

  return (
    <form className="add-task" onSubmit={handleSubmit}>
      <div className="add-task__copy">
        <h2>Add a task</h2>
      </div>

      <div className="add-task__controls">
        <input
          className="add-task__input"
          value={task}
          onChange={(event) => setTask(event.target.value)}
          placeholder="Example: Revise arrays for interview prep"
        />

        <button className="add-task__button" type="submit">
          Add
        </button>
      </div>
    </form>
  );
}

export default AddTask;

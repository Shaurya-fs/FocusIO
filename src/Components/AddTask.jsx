import { useState } from "react";
import "./AddTask.css";

function AddTask({ addTask }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    estimatedDuration: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!task.title.trim()) {
      return;
    }

    addTask(task);
    setTask({
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
      estimatedDuration: "",
    });
  };

  return (
    <form className="add-task" onSubmit={handleSubmit}>
      <div className="add-task__copy">
        <h2>Add a task</h2>
      </div>

      <div className="add-task__controls">
        <input
          className="add-task__input"
          value={task.title}
          onChange={(event) =>
            setTask({
              ...task,
              title: event.target.value,
            })
          }
          placeholder="Example: Revise arrays for interview prep"
        />
        <textarea
          className="add-task__textarea"
          value={task.description}
          onChange={(event)=>setTask({
            ...task,
            description:event.target.value
          })}
          placeholder="Description"/>

          <input
          type="date"
          className="add-task__dueDate"
          value={task.dueDate}
          onChange={(event)=>setTask({
            ...task,dueDate:event.target.value
          })}
          placeholder="Due Date"/>
        <input 
        type="text"
        className="add-task__priority"
        value={task.priority}
        onChange={(event)=>setTask({
          ...task,priority:event.target.value
        })}
        placeholder="Priority"/>
        <input 
        type="number"
        className="add-task__estimatedDuration"
        value={task.estimatedDuration}
        onChange={(event)=>setTask({
          ...task,estimatedDuration:event.target.value
        })}
        placeholder="Estimated Duration"/>
      

        <button className="add-task__button" type="submit">
          Add
        </button>
      </div>
    </form>
  );
}

export default AddTask;

import { useState } from "react";
import AddTask from "../Components/AddTask";
import { TaskList } from "../Components/TaskList";
import TaskDetails from "../Components/TaskDetails";
import CalendarView from "../Components/CalendarView";
import "./HomePage.css";

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const addTask = (title) => {
    const cleanedTitle = title.trim();

    if (!cleanedTitle) {
      return;
    }

    const newTask = {
      id: Date.now(),
      title: cleanedTitle,
      completed: false,
    };

    setTasks([...tasks, newTask]);
  };

  const toggleTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, completed: !task.completed }
        : task
    );

    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);

    setTasks(filteredTasks);

    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(null);
    }
  };

  return (
    <div className="Dashboard">
      <h1>Fokus Dashboard</h1>

      <AddTask addTask={addTask} />

      <TaskList
        tasks={tasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        onSelectTask={setSelectedTask}
      />

      <TaskDetails task={selectedTask} />

      <CalendarView tasks={tasks} />
    </div>
  );
}

export default HomePage;

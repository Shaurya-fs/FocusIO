import { useEffect, useState } from "react";
import AddTask from "../Components/AddTask";
import { TaskList } from "../Components/TaskList";
import TaskDetails from "../Components/TaskDetails";
import CalendarView from "../Components/CalendarView";
import "./HomePage.css";

const API_URL = "http://localhost:5000/tasks";

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (title) => {
    const cleanedTitle = title.trim();

    if (!cleanedTitle) {
      return;
    }

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: cleanedTitle })
      });

      fetchTasks();
    } catch (error) {
      console.log("Error adding task:", error);
    }
  };

  const toggleTask = async (taskId) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);

    if (!taskToUpdate) {
      return;
    }

    try {
      await fetch(`${API_URL}/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: taskToUpdate.title,
          completed: !taskToUpdate.completed
        })
      });

      fetchTasks();

      if (selectedTask && selectedTask.id === taskId) {
        setSelectedTask({
          ...selectedTask,
          completed: !selectedTask.completed
        });
      }
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await fetch(`${API_URL}/${taskId}`, {
        method: "DELETE"
      });

      fetchTasks();

      if (selectedTask && selectedTask.id === taskId) {
        setSelectedTask(null);
      }
    } catch (error) {
      console.log("Error deleting task:", error);
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
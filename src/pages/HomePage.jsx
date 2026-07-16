import { useEffect, useState } from "react";
import AddTask from "../Components/AddTask";
import { TaskList } from "../Components/TaskList";
import TaskDetails from "../Components/TaskDetails";
import CalendarView from "../Components/CalendarView";
import AIPlanner from "../Components/AIPlanner";
import "./HomePage.css";

const API_URL = "http://localhost:5001/tasks";

const normalizeCompleted = (value) => {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    return value === 1;
  }

  if (typeof value === "string") {
    return value === "1" || value.toLowerCase() === "true";
  }

  if (
    value &&
    typeof value === "object" &&
    value.type === "Buffer" &&
    Array.isArray(value.data)
  ) {
    return value.data[0] === 1;
  }

  return false;
};

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] =useState(null);
  const startEditing=(task)=>{
    setEditingTask(task);
  }

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const normalizedTasks = data.map((task) => ({
        ...task,
        completed: normalizeCompleted(task.completed)
      }));

      setTasks(normalizedTasks);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (newTask) => {
    const cleanedTitle = newTask.title.trim();

    if (!cleanedTitle) {
      return;
    }

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
      });

      await fetchTasks();
    } catch (error) {
      console.log("Error adding task:", error);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      await fetch(`${API_URL}/${updatedTask.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedTask)
      });

      await fetchTasks();
      setEditingTask(null);

      if (selectedTask && selectedTask.id === updatedTask.id) {
        setSelectedTask({
          ...updatedTask,
          completed: normalizeCompleted(updatedTask.completed)
        });
      }
    } catch (error) {
      console.log("Error updating task:", error);
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
          description: taskToUpdate.description,
          dueDate: taskToUpdate.dueDate,
          priority: taskToUpdate.priority,
          time: taskToUpdate.time,
          completed: !taskToUpdate.completed
        })
      });

      await fetchTasks();

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

      await fetchTasks();

      if (selectedTask && selectedTask.id === taskId) {
        setSelectedTask(null);
      }
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  return (
    <div className="Dashboard">
      <h1>FocusIO</h1>

      <div className="dashboard__grid">
        <div className="dashboard__panel">
          <TaskList
            tasks={tasks}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            onSelectTask={setSelectedTask}
            startEditing={startEditing}
          />
        </div>

        <div className="dashboard__panel">
          <AddTask
            addTask={addTask}
            updateTask={updateTask}
            editingTask={editingTask}
          />
        </div>

        <div className="dashboard__panel">
          <AIPlanner tasks={tasks} />
        </div>

        <div className="dashboard__panel">
          <CalendarView tasks={tasks} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;

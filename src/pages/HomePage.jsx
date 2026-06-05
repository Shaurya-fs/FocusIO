import { useState } from "react";
import Tasklist from "../Components/TaskList";
import CalendarView from "../Components/CalendarView";
import AddTask from "../Components/AddTask"

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const addTask=(newTask)=>{ 
    setTasks ([...tasks , newTask]
      
    )}

  return (
    <div className="Dashboard">
      <h1> Fokus Dashboard</h1>
      <Tasklist />
      <AddTask  addTask={addTask} />
      <CalendarView />
     
    </div>
  )
}

export default HomePage;

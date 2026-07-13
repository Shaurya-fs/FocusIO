import { useState } from "react";
import "./AIPlanner.css";

function AIPlanner() {
  const [schedule, setSchedule] = useState("");

  return (
    <div className="ai-planner">
      <h2>AI Daily Planner</h2>

      <button>
        Generate Today's Schedule
      </button>

      <div className="schedule-box">
        {schedule ? (
          <pre>{schedule}</pre>
        ) : (
          <p>No AI schedule generated yet.</p>
        )}
      </div>
    </div>
  );
}

export default AIPlanner;
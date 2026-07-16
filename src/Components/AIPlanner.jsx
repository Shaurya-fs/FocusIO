import { useState } from "react";
import "./AIPlanner.css";

function AIPlanner({ tasks }) {
  const [schedule, setSchedule] = useState("");
  const [loading, setLoading] = useState(false);
  const handleGenerate = async () => {
  setLoading(true);

  try {
            const response = await fetch("http://localhost:5001/generateSchedule", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ tasks }),
            });

            const data = await response.json();

            setSchedule(data.schedule);
        } catch (error) {
            console.log("Error generating schedule:", error);
        }

        setLoading(false);
    };

  return (
    <div className="ai-planner">
      <h2>AI Daily Planner</h2>

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Today's Schedule"}
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

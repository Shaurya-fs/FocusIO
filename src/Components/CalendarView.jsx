import "./CalendarView.css";

function CalendarView({ tasks }) {
  const today = new Date();
  const todayLabel = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const activeTasks = tasks.filter((task) => !task.completed).length;
  const completedTasks = tasks.length - activeTasks;

  return (
    <div className="calendar-view">
      <div className="calendar-view__copy">
        <p className="calendar-view__eyebrow">Google Calendar</p>
        <h2>Calender</h2>
      </div>

      <div className="calendar-view__stats">
        <div className="calendar-stat">
          <span className="calendar-stat__label">Today</span>
          <strong>{todayLabel}</strong>
        </div>
        <div className="calendar-stat">
          <span className="calendar-stat__label">Active tasks</span>
          <strong>{activeTasks}</strong>
        </div>
        <div className="calendar-stat">
          <span className="calendar-stat__label">Completed tasks</span>
          <strong>{completedTasks}</strong>
        </div>
      </div>

      <div className="calendar-view__actions">
        <a
          className="calendar-view__primary"
          href="https://calendar.google.com/"
          target="_blank"
          rel="noreferrer"
        >
          Link Google Calendar
        </a>

        <p className="calendar-view__note">
        
        </p>
      </div>
    </div>
  );
}

export default CalendarView;

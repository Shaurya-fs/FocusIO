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

  const start = new Date();
  start.setHours(9, 0, 0, 0);

  const end = new Date(start);
  end.setHours(10, 0, 0, 0);

  const formatGoogleDate = (date) =>
    date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const activeTaskLines = tasks
    .filter((task) => !task.completed)
    .map((task) => `• ${task.title}${task.time ? ` (${task.time})` : ""}`)
    .join("\n");

  const googleCalendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=FocusIO+Daily+Plan&details=${encodeURIComponent(
    activeTaskLines
  )}&dates=${formatGoogleDate(start)}/${formatGoogleDate(end)}`;

  return (
    <div className="calendar-view">
      <div className="calendar-view__copy">
        <p className="calendar-view__eyebrow">Google Calendar</p>
        <h2>Calendar</h2>
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
          href={googleCalendarLink}
          target="_blank"
          rel="noreferrer"
        >
          Add Today's Tasks to Google Calendar
        </a>

        <p className="calendar-view__note">
          Opens Google Calendar with today's task list pre-filled in a new event.
        </p>
      </div>
    </div>
  );
}

export default CalendarView;

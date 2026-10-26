import { padTwo } from "./textHelpers";

function dayStamp(date) {
  return date.getFullYear() + padTwo(date.getMonth() + 1) + padTwo(date.getDate());
}

function timeStamp(date) {
  return dayStamp(date) + "T" + padTwo(date.getHours()) + padTwo(date.getMinutes()) + "00";
}

// Builds a Google Calendar link with the event already filled in.
// It opens Google's own "new event" page, so there is no account linking and no API key.
// Without a time it becomes an all-day event on that date.
export function googleCalendarLink({ title, date, time, mins, details }) {
  const [year, month, day] = date.split("-").map(Number);
  let dates;

  if (time) {
    const [hours, minutes] = time.split(":").map(Number);
    const start = new Date(year, month - 1, day, hours, minutes);
    const end = new Date(start.getTime() + (mins || 30) * 60000);
    dates = timeStamp(start) + "/" + timeStamp(end);
  } else {
    dates = dayStamp(new Date(year, month - 1, day)) + "/" + dayStamp(new Date(year, month - 1, day + 1));
  }

  return (
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + encodeURIComponent(title) +
    "&dates=" + dates +
    "&details=" + encodeURIComponent(details || "Added from FocusIO")
  );
}

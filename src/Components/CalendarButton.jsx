import { CalendarIcon, CheckIcon } from "./Icons";
import { googleCalendarLink } from "../utils/calendar";
import "./CalendarButton.css";

// A small link that opens Google Calendar with the event filled in.
function CalendarButton({ event, added, onHero, onAdded }) {
  return (
    <a
      className={"calendar-button" + (onHero ? " calendar-button--hero" : "")}
      data-added={added ? "yes" : "no"}
      href={googleCalendarLink(event)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onAdded}
    >
      {added ? <CheckIcon size={16} width={2.4} /> : <CalendarIcon />}
      {added ? "Sent to Google Calendar" : "Add to Google Calendar"}
    </a>
  );
}

export default CalendarButton;

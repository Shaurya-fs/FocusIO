import { padTwo } from "./textHelpers";

const WEEKDAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const SHORT_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const SHORT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function dateKey(date) {
  return date.getFullYear() + "-" + padTwo(date.getMonth() + 1) + "-" + padTwo(date.getDate());
}

export function todayKey() {
  return dateKey(new Date());
}

export function shortDate(date) {
  return SHORT_DAYS[date.getDay()] + " " + date.getDate() + " " + SHORT_MONTHS[date.getMonth()];
}

// Finds a date in a sentence: today, tomorrow, a weekday, or a day of the month like "on 25".
export function findDate(lower, now) {
  const base = startOfDay(now);

  if (/\b(today|tonight)\b/.test(lower)) {
    return { days: 0, date: base, label: "Today" };
  }

  if (/\btom(orrow)?\b/.test(lower)) {
    const tomorrow = new Date(base);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return { days: 1, date: tomorrow, label: "Tomorrow" };
  }

  const weekday = lower.match(new RegExp("\\b(" + WEEKDAYS.join("|") + ")\\b"));
  if (weekday) {
    let diff = (WEEKDAYS.indexOf(weekday[1]) - base.getDay() + 7) % 7;
    if (diff === 0 && /\bnext\b/.test(lower)) {
      diff = 7;
    }
    if (diff === 0) {
      return { days: 0, date: base, label: "Today" };
    }
    const date = new Date(base);
    date.setDate(date.getDate() + diff);
    return { days: diff, date, label: shortDate(date) };
  }

  const dayOfMonth =
    lower.match(/\b(?:on|by|before|until|till)\s+(?:the\s+)?(\d{1,2})(?:st|nd|rd|th)?\b(?!\s*(?:am|pm|:))/) ||
    lower.match(/\b(\d{1,2})(?:st|nd|rd|th)\b/);
  if (dayOfMonth) {
    const day = parseInt(dayOfMonth[1], 10);
    if (day >= 1 && day <= 31) {
      let date = new Date(base.getFullYear(), base.getMonth(), day);
      if (date < base) {
        date = new Date(base.getFullYear(), base.getMonth() + 1, day);
      }
      return { days: Math.round((date - base) / 86400000), date, label: shortDate(date) };
    }
  }

  return null;
}

export function findTimeOfDay(lower) {
  const found = lower.match(/\b(morning|afternoon|evening|night)\b/);
  return found ? found[1] : null;
}

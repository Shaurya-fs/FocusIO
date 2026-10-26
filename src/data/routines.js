export const DAY_ORDER = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export const DAY_LETTER = { mon: "M", tue: "T", wed: "W", thu: "T", fri: "F", sat: "S", sun: "S" };

export const DAY_FULL = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

export const DAY_BY_JS_INDEX = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export const TIME_OF_DAY = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
  night: "Night",
};

export function scheduleLabel(days) {
  const on = DAY_ORDER.filter((d) => days[d]);
  const weekdays = ["mon", "tue", "wed", "thu", "fri"];
  const weekend = ["sat", "sun"];

  if (on.length === 7) {
    return "Every day";
  }
  if (on.length === 0) {
    return "No days yet";
  }
  if (on.length === 5 && weekdays.every((d) => days[d])) {
    return "Weekdays";
  }
  if (on.length === 2 && weekend.every((d) => days[d])) {
    return "Weekends";
  }
  return on.map((d) => DAY_LETTER[d]).join(" ");
}

export function emptyRoutine() {
  return {
    id: "rt" + Date.now(),
    name: "",
    timeOfDay: "morning",
    days: { mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false },
    steps: [],
  };
}

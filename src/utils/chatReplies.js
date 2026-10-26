import { CHAT_INTENTS } from "../data/dumpRules";
import { capitalise, getWords, matchScore, padTwo } from "./textHelpers";
import { dateKey, findDate } from "./dateHelpers";

function findIntent(lower, words) {
  const hasTime = /\d\s*(am|pm)|\d{1,2}:\d{2}/.test(lower);
  const scores = [
    ["meeting", matchScore(lower, words, CHAT_INTENTS.meeting) + (hasTime ? 1.5 : 0)],
    ["overwhelm", matchScore(lower, words, CHAT_INTENTS.overwhelm)],
    ["start", matchScore(lower, words, CHAT_INTENTS.start)],
    ["missed", matchScore(lower, words, CHAT_INTENTS.missed)],
  ];
  scores.sort((a, b) => b[1] - a[1]);
  return scores[0][1] >= 1 ? scores[0][0] : "other";
}

// Keeps the person's own words as the event name, without the day and time.
// "dentist appointment tomorrow at 2pm" becomes "Dentist appointment".
function eventTitle(text) {
  const words = text
    .replace(/\b(at|from|around)?\s*\d{1,2}(:\d{2})?\s*(am|pm)?\b/gi, " ")
    .replace(/\b(on|by)?\s*(the\s+)?\d{1,2}(st|nd|rd|th)\b/gi, " ")
    .replace(/\b(on\s+|by\s+)?(next\s+|this\s+)?(today|tonight|tomorrow|tom|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/gi, " ")
    .replace(/\b(i have|i've got|ive got|i got|add|put in|schedule|book|please)\b/gi, " ")
    .replace(/^\s*(a|an)\s+/i, " ")
    .replace(/[^a-z\s']/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return words ? capitalise(words) : "Event";
}

function whereToFind(dateInfo) {
  if (!dateInfo || dateInfo.days === 0) {
    return "You'll find it on Today.";
  }
  if (dateInfo.days <= 7) {
    return "You'll find it on Today, under Coming up this week.";
  }
  return "It's more than a week away. It will show on Today in the week before.";
}

function meetingReply(theme, text, lower) {
  // A time is a number with am or pm, a clock time like 17:00, or a number after "at".
  // This keeps a date like "the 25th" from being read as a time.
  const found =
    lower.match(/\b(\d{1,2})(?::(\d{2}))?\s*(am|pm)\b/) ||
    lower.match(/\b(\d{1,2}):(\d{2})()/) ||
    lower.match(/\bat\s+(\d{1,2})()()\b/);

  if (!found) {
    const askTime = {
      default: "What time should it start?",
      adhd: "What time? Just the number is fine.",
      autism: "What time does it start? Please write it like 17:00.",
      audhd: "What time should it start? I can suggest a slot if you're not sure.",
    };
    return { text: askTime[theme], askTime: true };
  }

  let hours = parseInt(found[1], 10);
  const minutes = found[2] ? parseInt(found[2], 10) : 0;
  if (found[3] === "pm" && hours < 12) {
    hours += 12;
  }
  if (found[3] === "am" && hours === 12) {
    hours = 0;
  }
  if (!found[3] && hours < 8) {
    hours += 12;
  }

  const time = padTwo(hours) + ":" + padTwo(minutes);
  const reminderMinutes = (hours * 60 + minutes - 30 + 1440) % 1440;
  const reminder = padTwo(Math.floor(reminderMinutes / 60)) + ":" + padTwo(reminderMinutes % 60);

  const dateInfo = findDate(lower, new Date());
  // "today" and "tomorrow" read naturally in lower case, a date keeps its capitals: "Fri 23 Oct".
  let dayLabel = "today";
  if (dateInfo) {
    dayLabel = /^(Today|Tomorrow)$/.test(dateInfo.label) ? dateInfo.label.toLowerCase() : dateInfo.label;
  }
  const date = dateInfo ? dateInfo.date : new Date();

  const title = eventTitle(text);

  const messages = {
    default: "Done. I've put it in and set a reminder for " + reminder + ".",
    adhd: "Done! It's in. I'll nudge you at " + reminder + ", and again when it starts.",
    autism: "Added: " + title + ", " + dayLabel + ", " + time + ". I will remind you at " + reminder + ". Nothing else in your plan changes.",
    audhd: "Added. Reminder at " + reminder + ", plus a heads-up 10 minutes before. Your routine blocks stay where they are.",
  };

  const taskId = "c" + Date.now();
  return {
    text: messages[theme],
    card: {
      title,
      day: dayLabel,
      time,
      meta: dayLabel + " · " + time,
      where: whereToFind(dateInfo),
      taskId,
    },
    newTask: {
      id: taskId,
      title,
      time,
      mins: 30,
      category: "people",
      status: "todo",
      essential: true,
      event: true,
      date: dateKey(date),
    },
  };
}

// Simple rule based replies for the Plan chat, written for each brain profile.
export function chatReply(theme, text) {
  const { lower, words } = getWords(text);
  const intent = findIntent(lower, words);

  if (intent === "meeting") {
    return meetingReply(theme, text, lower);
  }

  if (intent === "overwhelm") {
    const messages = {
      default: "That sounds heavy. Let's make today small. I can keep the two essentials and move the rest to tomorrow. Nothing gets deleted.",
      adhd: "That's a lot. One breath, then one thing. I can hide everything except the two essentials. Want that?",
      autism: "I can reduce today to the essential items. The others move to tomorrow at the same times. Nothing is deleted. Do you want this?",
      audhd: "Understood. I can show only the essentials and move the rest to tomorrow, same times. Nothing is deleted. Want that?",
    };
    return { text: messages[theme], actionLabel: "Switch to low battery day" };
  }

  if (intent === "start") {
    const messages = {
      default: "That one's hard to start. Smallest step: open the file and write one bad sentence. Want a 5-minute timer?",
      adhd: "Starting is the hardest part. Smallest step: open the file. That's it. I'll count 5 minutes with you. Ready?",
      autism: "Here are the steps. Step 1: open the file. Step 2: write the title. Step 3: write one sentence. Done when: one sentence is written. Each step takes about 2 minutes.",
      audhd: "Two ways in. Option A: the routine, 3 small steps in order. Option B: start with the most interesting part first. Which fits today?",
    };
    return { text: messages[theme] };
  }

  if (intent === "missed") {
    const messages = {
      default: "No problem. Want it moved to 16:00, made shorter, or skipped? You don't have to say why.",
      adhd: "It happens. Fresh start: move it to 16:00, make it 15 minutes, or skip today?",
      autism: "Understood. Options: move to 16:00, shorten to 15 minutes, or remove from today. Nothing else changes.",
      audhd: "That's fine. Options: the same task at 16:00 to keep the routine, or something lighter now and the rest tomorrow. Nothing else moves.",
    };
    return { text: messages[theme] };
  }

  const messages = {
    default: "I can help you add a meeting, make a heavy day smaller, get started on something, or sort out a missed task. Try one of the examples below.",
    adhd: "Got it. I'm best with meetings, getting started and missed tasks for now. Tap an example below.",
    autism: 'I received: "' + text + '". I can add a meeting, reduce today, give steps to start, or handle a missed item. The examples below show how.',
    audhd: "Got it. For now I can add meetings, lighten the day, help you start, or sort out a missed task. Try an example below.",
  };
  return { text: messages[theme] };
}

import {
  BUCKETS,
  TASK_KINDS,
  KNOWN_WORDS,
  FEELING_WORDS,
  FEELING_PHRASES,
  getKind,
} from "../data/dumpRules";
import { capitalise, editDistance, getWords, matchScore } from "./textHelpers";
import { dateKey, findDate, findTimeOfDay, todayKey } from "./dateHelpers";

const FREE_SLOTS = ["12:30", "13:00", "18:00", "18:30", "19:00", "19:30"];

function fixTypos(text) {
  return text
    .split(/(\s+)/)
    .map((word) => {
      const clean = word.toLowerCase().replace(/[^a-z]/g, "");
      if (clean.length < 4) {
        return word;
      }

      let best = null;
      let bestDistance = 9;
      KNOWN_WORDS.forEach((known) => {
        const distance = editDistance(clean, known) / Math.max(clean.length, known.length);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = known;
        }
      });

      return bestDistance > 0 && bestDistance <= 0.25 ? best : word;
    })
    .join("");
}

function splitIntoClauses(text) {
  return text
    .replace(/\r/g, "")
    .replace(/([.!?])\s+/g, "$1\n")
    .split(/\n+|\s*,\s*|\s+(?:and then|then)\s+/i)
    .map((part) => part.trim().replace(/^(and|then)\s+/i, ""))
    .filter((part) => part.length > 2);
}

function findKind(lower, words) {
  let best = "generic";
  let bestScore = 0;

  TASK_KINDS.forEach((kind) => {
    if (kind.words.length === 0) {
      return;
    }
    const score = matchScore(lower, words, kind.words);
    if (score > bestScore + 0.001) {
      bestScore = score;
      best = kind.id;
    }
  });

  return bestScore >= 0.8 ? best : "generic";
}

function findBucket(line) {
  const { lower, words } = getWords(line);
  let best = null;
  let bestScore = 0;

  BUCKETS.forEach((bucket) => {
    let score = matchScore(lower, words, bucket.words, bucket.phrases);
    if (bucket.id === "decide" && line.indexOf("?") > -1) {
      score += 1.2;
    }
    if (score > bestScore) {
      bestScore = score;
      best = bucket.id;
    }
  });

  return bestScore >= 0.8 ? best : "unsorted";
}

function hasFeeling(text) {
  const { lower, words } = getWords(text);
  return matchScore(lower, words, FEELING_WORDS, FEELING_PHRASES) >= 1;
}

function cleanTitle(clause) {
  let title = clause.trim();
  const found =
    title.match(/\b(?:have|need|got|has)\s+(?:also\s+)?to\s+(.+)$/i) || title.match(/\b(?:need|must|should)\s+(.+)$/i);
  if (found) {
    title = found[1];
  }

  title = title
    .replace(/\b(also|tom|tomorrow|today|tonight|please)\b/gi, "")
    .replace(/\bin the (morning|afternoon|evening)\b/gi, "")
    .replace(/\s+/g, " ")
    .replace(/[,.;!?]+$/, "")
    .trim()
    .replace(/^(i|so|and|then|like|to)\s+/i, "");

  return title ? capitalise(title) : "Something to do";
}

function makeTitle(kind, clause, dateInfo, lower) {
  if (kind === "exam") {
    return dateInfo ? "Exam · " + dateInfo.label : "Exam";
  }
  if (kind === "jobs") {
    const resume = /resume|cv/.test(lower);
    const apply = /apply|job|application/.test(lower);
    if (resume && apply) {
      return "Apply for jobs and update your resume";
    }
    if (resume) {
      return "Update your resume";
    }
    return /interview/.test(lower) ? "Prepare for the interview" : "Apply for jobs";
  }
  if (kind === "visa") {
    return "Sort out the visa process";
  }
  if (kind === "admin") {
    return /payout/.test(lower) ? "Activate your blocked account payout" : "Sort out your account";
  }
  if (kind === "money") {
    return /rent/.test(lower) ? "Pay the rent" : "Pay the bill";
  }
  return cleanTitle(clause);
}

function whenText(dateInfo, timeOfDay) {
  if (dateInfo && dateInfo.days <= 1) {
    return dateInfo.label + (timeOfDay ? " " + timeOfDay : "");
  }
  if (dateInfo) {
    return dateInfo.label + (timeOfDay ? ", " + timeOfDay : "");
  }
  if (timeOfDay) {
    return capitalise(timeOfDay);
  }
  return "No date";
}

function whyText(dateInfo, timeOfDay) {
  if (!dateInfo) {
    return "No date, so it can wait for a good moment.";
  }
  if (dateInfo.days === 0) {
    return "Due today.";
  }
  if (dateInfo.days === 1) {
    return "Due tomorrow" + (timeOfDay ? " " + timeOfDay : "") + ". Doing the first step today makes tomorrow easier.";
  }
  return "In " + dateInfo.days + " days. Small steps now mean no last-minute rush.";
}

function urgency(dateInfo, kind) {
  let score = 30;
  if (dateInfo) {
    if (dateInfo.days <= 0) {
      score = 100;
    } else if (dateInfo.days === 1) {
      score = 90;
    } else if (dateInfo.days <= 3) {
      score = 70;
    } else if (dateInfo.days <= 7) {
      score = 50;
    } else {
      score = 40;
    }
  }
  if (kind === "admin" || kind === "visa" || kind === "money") {
    score += 5;
  }
  return score;
}

function makeItem(id, kindId, title, dateInfo, timeOfDay, position) {
  const kind = getKind(kindId);
  return {
    id,
    position,
    kind: kindId,
    category: kind.category,
    title,
    when: whenText(dateInfo, timeOfDay),
    why: whyText(dateInfo, timeOfDay),
    urgency: urgency(dateInfo, kindId),
    days: dateInfo ? dateInfo.days : null,
    date: dateInfo ? dateKey(dateInfo.date) : null,
    doneWhen: kind.doneWhen,
    steps: kind.steps,
    open: false,
    added: false,
  };
}

// Reads a brain dump and returns the tasks in order of urgency, plus the thoughts that are not tasks.
export function analyseDump(text, now) {
  const found = [];
  const others = [];
  const timeHints = [];

  splitIntoClauses(text).forEach((raw) => {
    const clause = fixTypos(raw);
    const { lower, words } = getWords(clause);
    const dateInfo = findDate(lower, now);
    const timeOfDay = findTimeOfDay(lower);
    const kind = findKind(lower, words);
    const bucket = findBucket(clause);
    const soundsLikeTask = /\b(need|have|got|has)\s+to\b|\bneed\b|\bmust\b/.test(lower);

    if (kind === "generic" && !dateInfo && timeOfDay && (bucket === "unsorted" || bucket === "do")) {
      timeHints.push(timeOfDay);
      return;
    }

    if (kind === "generic" && hasFeeling(raw) && !soundsLikeTask) {
      others.push({ text: capitalise(raw), bucket: "heavy" });
      return;
    }

    if (kind !== "generic" || dateInfo || bucket === "do" || bucket === "errand") {
      const finalKind = kind === "generic" && bucket === "errand" ? "errand" : kind;
      found.push({ kind: finalKind, title: makeTitle(finalKind, clause, dateInfo, lower), dateInfo, timeOfDay });
    } else {
      others.push({ text: capitalise(raw), bucket });
    }
  });

  const lastTimeHint = timeHints.length ? timeHints[timeHints.length - 1] : null;

  const items = found.map((entry, index) => {
    const timeOfDay = entry.timeOfDay || (entry.kind !== "exam" ? lastTimeHint : null);
    return makeItem("i" + index, entry.kind, entry.title, entry.dateInfo, timeOfDay, index);
  });

  items.sort((a, b) => b.urgency - a.urgency || a.position - b.position);
  if (items.length) {
    items[0].open = true;
  }

  return { items, others, feeling: hasFeeling(text) };
}

export function thoughtToItem(thought, count) {
  const item = makeItem("p" + count + "-" + Date.now(), "generic", thought.text.replace(/[.!?]$/, ""), null, null, 99);
  item.why = "You made this a task. It can wait for a good moment.";
  item.open = true;
  return item;
}

// Turns the first step of a dump item into a task for today.
export function firstStepTask(item, slotIndex, essential) {
  const step = item.steps[0];
  return {
    id: "d" + item.id + "-" + Date.now() + "-" + slotIndex,
    title: step.text,
    sub: item.title,
    time: FREE_SLOTS[slotIndex % FREE_SLOTS.length],
    mins: step.mins || 5,
    category: item.category,
    status: "todo",
    essential,
    date: todayKey(),
    doneWhen: item.doneWhen,
    fromDump: true,
  };
}

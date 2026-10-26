export function capitalise(text) {
  const trimmed = text.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export function countThings(n) {
  const words = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
  const number = words[n] !== undefined ? words[n] : String(n);
  return number + (n === 1 ? " thing" : " things");
}

export function padTwo(n) {
  return (n < 10 ? "0" : "") + n;
}

// Edit distance between two words. Swapped letters count as one change, so "emial" is close to "email".
export function editDistance(a, b) {
  const d = [];
  for (let i = 0; i <= a.length; i++) {
    d[i] = [i];
  }
  for (let j = 1; j <= b.length; j++) {
    d[0][j] = j;
  }
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  return d[a.length][b.length];
}

export function getWords(text) {
  const lower = text.toLowerCase().replace(/'/g, "");
  const words = lower
    .replace(/[^a-z\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 3);
  return { lower, words };
}

// Scores how well a sentence matches a list of key words and phrases.
export function matchScore(lower, words, keyWords, phrases = []) {
  let score = 0;

  words.forEach((word) => {
    let bestDistance = 9;
    keyWords.forEach((key) => {
      const distance = editDistance(word, key) / Math.max(word.length, key.length);
      if (distance < bestDistance) {
        bestDistance = distance;
      }
    });

    if (bestDistance === 0) {
      score += 1;
    } else if (bestDistance <= 0.25 && word.length >= 4) {
      score += 0.8 * (1 - bestDistance);
    }
  });

  phrases.forEach((phrase) => {
    if (lower.indexOf(phrase) > -1) {
      score += 1.5;
    }
  });

  return score;
}

export function timeInWords(time) {
  const parts = time.split(":").map(Number);
  const hours = parts[0];
  const minutes = parts[1];
  const hour12 = hours % 12 || 12;
  const nextHour = (hours + 1) % 12 || 12;
  const ampm = hours < 12 ? "am" : "pm";
  const nextAmpm = (hours + 1) % 24 < 12 ? "am" : "pm";

  if (minutes === 0) {
    return hour12 + " o'clock " + ampm;
  }
  if (minutes === 30) {
    return "half past " + hour12 + " " + ampm;
  }
  if (minutes === 15) {
    return "quarter past " + hour12 + " " + ampm;
  }
  if (minutes === 45) {
    return "quarter to " + nextHour + " " + nextAmpm;
  }
  if (minutes < 8) {
    return "just after " + hour12 + " " + ampm;
  }
  if (minutes < 23) {
    return "about quarter past " + hour12 + " " + ampm;
  }
  if (minutes < 38) {
    return "about half past " + hour12 + " " + ampm;
  }
  if (minutes < 53) {
    return "about quarter to " + nextHour + " " + nextAmpm;
  }
  return "just before " + nextHour + " " + nextAmpm;
}

export function durationInWords(mins) {
  if (mins <= 15) {
    return "a few minutes";
  }
  if (mins <= 30) {
    return "about half an hour";
  }
  if (mins <= 45) {
    return "under an hour";
  }
  return "about an hour";
}

// "about half an hour" instead of "28 min", for the time ring and heads-up.
export function minutesInWords(mins) {
  if (mins <= 2) {
    return "a moment";
  }
  if (mins <= 7) {
    return "about 5 minutes";
  }
  if (mins <= 12) {
    return "about 10 minutes";
  }
  if (mins <= 20) {
    return "about a quarter of an hour";
  }
  if (mins <= 40) {
    return "about half an hour";
  }
  if (mins <= 75) {
    return "about an hour";
  }
  if (mins <= 150) {
    return "about two hours";
  }
  return "a few hours";
}

export function toMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

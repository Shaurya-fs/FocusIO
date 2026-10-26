// Small extra helps. Each one switches on for the brain profiles it was made for,
// and anyone can turn it on or off in Settings.
export const EXTRAS = [
  {
    id: "bodyDouble",
    label: "Bruno sits with you",
    description: "A calm 10 minute timer with your bear beside you, for getting started",
    profiles: ["adhd", "audhd"],
  },
  {
    id: "parkIt",
    label: "Park a thought",
    description: "Save a stray thought to Unpack without leaving what you're doing",
    profiles: ["adhd", "audhd"],
  },
  {
    id: "headsUp",
    label: "Heads-up before the next thing",
    description: "Says what's next, how long it takes and when it's done",
    profiles: ["autism", "audhd"],
  },
  {
    id: "tooMuch",
    label: "Too much button",
    description: "One tap for a quiet grey screen with nothing to do",
    profiles: ["autism", "audhd"],
  },
  {
    id: "hyperfocus",
    label: "Hyperfocus check",
    description: "A calm note when something runs 20 minutes over",
    profiles: ["audhd"],
  },
  {
    id: "planB",
    label: "Plan B for routine steps",
    description: "A lighter version of each step for low energy days",
    profiles: ["audhd"],
  },
  {
    id: "voiceDump",
    label: "Speak instead of typing",
    description: "Talk instead of typing in Unpack",
    profiles: ["dyslexia"],
  },
  {
    id: "readAloud",
    label: "Read it to me",
    description: "A speaker button on cards and messages",
    profiles: ["dyslexia"],
  },
  {
    id: "timeRing",
    label: "Time as a shape",
    description: "A ring that shrinks as time passes, with the time in words",
    profiles: ["dyscalc"],
  },
  {
    id: "pickTime",
    label: "Pick a time, don't type it",
    description: "Morning, after lunch or evening buttons when I ask for a time",
    profiles: ["dyscalc"],
  },
  {
    id: "weekTip",
    label: "Try-a-week suggestions",
    description: "After a week, one setting that might suit you. Nothing changes unless you say yes.",
    profiles: ["other", "unsure", "none"],
  },
];

function activeProfiles(selected) {
  const ids = Object.keys(selected).filter((id) => selected[id]);
  if (selected.adhd && selected.autism) {
    ids.push("audhd");
  }
  if (ids.length === 0) {
    ids.push("none");
  }
  return ids;
}

// Returns which extras are on. A choice made in Settings wins over the profile default.
export function getExtras(selected, chosen = {}) {
  const profiles = activeProfiles(selected);
  const result = {};
  EXTRAS.forEach((extra) => {
    const fromProfile = extra.profiles.some((profile) => profiles.includes(profile));
    result[extra.id] = chosen[extra.id] ?? fromProfile;
  });
  return result;
}

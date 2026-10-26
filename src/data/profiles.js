export const PROFILE_OPTIONS = [
  { id: "adhd", label: "ADHD", note: "Attention, time and getting started" },
  { id: "autism", label: "Autism", note: "Routine, predictability and sensory calm" },
  { id: "audhd", label: "AuDHD", note: "Both together" },
  { id: "dyslexia", label: "Dyslexia", note: "Reading and spelling support" },
  { id: "dyscalc", label: "Dyscalculia", note: "Numbers and clocks in plain words" },
  { id: "other", label: "Something else", note: "I'll learn as we go" },
  { id: "unsure", label: "Not sure yet", note: "Standard for now, adjusting as we go" },
];

export const PROFILE_DEFAULTS = {
  default: { motion: true, praise: true },
  adhd: { motion: true, praise: true },
  autism: { motion: false, praise: false },
  audhd: { motion: false, praise: false },
};

export const PROFILE_CHANGES = {
  adhd: [
    "Look: High contrast, brighter categories",
    "Movement: Short and rewarding",
    "Layout: One big card, only two more items",
    "Reminders: Two cues, varied wording",
    "Voice: Short, offers the smallest first step",
  ],
  autism: [
    "Look: Muted, colour meanings never change",
    "Movement: None",
    "Layout: Same every day, nothing rearranges",
    "Reminders: Same time, same words, notice of changes",
    "Voice: Literal, exact, says what it did",
  ],
  audhd: [
    "Look: Muted, with one warm accent",
    "Movement: Off, celebration is opt-in",
    "Layout: Fixed skeleton plus a swap slot",
    "Reminders: Predictable, with a heads-up before changes",
    "Voice: Literal but warm, two clear options",
  ],
};

export function getTheme(selected) {
  const adhd = !!selected.adhd;
  const autism = !!selected.autism;

  if (selected.audhd || (adhd && autism)) {
    return "audhd";
  }
  if (adhd) {
    return "adhd";
  }
  if (autism) {
    return "autism";
  }
  return "default";
}

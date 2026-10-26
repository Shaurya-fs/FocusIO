const COLOURS = [
  "var(--hero)",
  "var(--cele-dot)",
  "var(--study-fg)",
  "var(--body-fg)",
  "var(--project-fg)",
  "var(--people-bg)",
  "var(--life-bg)",
];

// Made once when a task is marked done, so every celebration falls a little differently.
export function makeConfetti() {
  const pieces = [];
  for (let i = 0; i < 70; i++) {
    const round = Math.random() < 0.3;
    const size = 7 + Math.random() * 6;
    pieces.push({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.35,
      duration: 1.3 + Math.random() * 0.6,
      drift: (Math.random() - 0.5) * 140,
      spin: (Math.random() - 0.5) * 900,
      width: size,
      height: round ? size : size * 1.6,
      round,
      colour: COLOURS[i % COLOURS.length],
    });
  }
  return pieces;
}

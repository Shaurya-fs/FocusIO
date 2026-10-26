# FocusIO

FocusIO is a daily planner for every kind of mind, built with ADHD, autism, dyslexia and dyscalculia in mind.
A small bear companion helps you empty your head, turns it into small steps, and keeps the day calm.
It never asks why something did not happen, and it never counts streaks.

This branch (v2) is the rebuilt app. The first version, with the Express and MySQL backend, is on the main branch.

## Running it

```
npm install
npm run dev
```

Then open the address Vite prints (usually http://localhost:5173).

Other commands:

- `npm run build` makes the production version in `dist/`
- `npm run lint` checks the code

## How the project is organised

```
src/
  App.jsx           app state, saving, and which screen is shown
  index.css         colours for each profile and colour scheme, shared styles
  pages/            one file per screen (Welcome, Today, Unpack, Plan, Me, Settings, Routines...)
  Components/       pieces used by the screens (task row, next task card, chat message, settings rows...)
  data/             fixed content: the bear's wording, languages, outfits, Unpack rules, colour schemes
  utils/            logic: reading a brain dump, chat replies, dates, saving to the device
  assets/           bear pictures and outfits
```

## What works now

- First run: welcome, name, age, the optional "how your brain works" question, sign in
- Today: next task card, the rest of the day, celebrations, "not happening today" without blame,
  low battery day, routines checklist
- Unpack (called Dump in the code): type anything, the app finds tasks, dates and feelings, orders them and breaks each into steps
- Plan: chat that can add a meeting, lighten the day, help you start, or sort out a missed task
- What the bear has noticed about you, and you can forget any note
- Routines with days, time of day and essential steps
- Settings: two bears (Bruno with five outfits, Clarkson), five colour schemes, dark mode, text size,
  reading support, times in words, language list, download or delete your data
- Extra help for each brain profile, all of which can be turned on or off in Settings:
  - ADHD: "Bruno sits with you" (a 10 minute body doubling timer) and "Park a thought"
  - Autism: a heads-up before the next thing, and a "Too much" button for a quiet grey screen
  - AuDHD: a hyperfocus check when a task runs 20 minutes over, and a Plan B for routine steps
  - Dyslexia: speak instead of typing in Unpack of typing, and "Read it to me" on cards and messages
  - Dyscalculia: time as a shrinking ring with the time in words, and pick-a-time buttons
  - Something else or not sure: a try-a-week suggestion after seven days
- Add to Google Calendar on meetings and dated tasks. It opens Google Calendar with the event
  filled in, so there is no account linking or API key.

## Not built yet

- Real accounts and a server. Everything is saved on the device for now.
- Text message codes, reminders, and two-way calendar sync
- Translations. The language list is there, the text is still English.

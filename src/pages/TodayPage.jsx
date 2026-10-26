import { useState } from "react";
import NextTaskCard from "../Components/NextTaskCard";
import FailCard from "../Components/FailCard";
import CelebrationCard from "../Components/CelebrationCard";
import DayDoneCard from "../Components/DayDoneCard";
import TaskRow from "../Components/TaskRow";
import RoutineChecklist from "../Components/RoutineChecklist";
import HeaderWithBear from "../Components/HeaderWithBear";
import HeadsUpCard from "../Components/HeadsUpCard";
import TimeRing from "../Components/TimeRing";
import CalendarButton from "../Components/CalendarButton";
import ParkThought from "../Components/ParkThought";
import WeekTipCard from "../Components/WeekTipCard";
import { useBearArt } from "../Components/BearArt";
import { CATEGORY_NAMES } from "../data/dumpRules";
import { DAY_BY_JS_INDEX } from "../data/routines";
import { dateKey, shortDate, todayKey } from "../utils/dateHelpers";
import { capitalise, minutesInWords, toMinutes } from "../utils/textHelpers";
import { useNow } from "../utils/useNow";
import "./TodayPage.css";

function TodayPage({
  userName,
  theme,
  voice,
  tasks,
  routines,
  companion,
  lowBattery,
  showRings,
  formatTime,
  formatMinutes,
  extras,
  bearName,
  readLang,
  leadTime,
  timeInWords,
  calendarOn,
  weekTip,
  onToggleLow,
  onSetTaskStatus,
  onTaskSlipped,
  onToggleRoutineStep,
  onSwapRoutineStep,
  onOpenDump,
  onStartFocus,
  onTooMuch,
  onPark,
  onCalendarAdded,
  onWeekTip,
}) {
  const art = useBearArt();
  const [celebrating, setCelebrating] = useState(false);
  const [failOpen, setFailOpen] = useState(false);
  const [showComingUp, setShowComingUp] = useState(theme !== "adhd");
  const now = useNow(15000);
  const nowMins = now.getHours() * 60 + now.getMinutes();

  const today = todayKey();
  const todayName = DAY_BY_JS_INDEX[new Date().getDay()];

  // Unfinished tasks from earlier days stay visible today, so nothing gets lost.
  const todaysTasks = tasks.filter(
    (task) => task.status !== "skipped" && (task.date === today || (task.date < today && task.status === "todo"))
  );
  const visible = (lowBattery ? todaysTasks.filter((task) => task.essential) : todaysTasks)
    .slice()
    .sort((a, b) => a.time.localeCompare(b.time));
  const todo = visible.filter((task) => task.status === "todo");
  const hiddenCount = lowBattery ? todaysTasks.filter((task) => !task.essential && task.status === "todo").length : 0;

  const dayDone = visible.length > 0 && todo.length === 0;
  const nextTask = todo.length > 0 ? todo[0] : null;
  const showFail = failOpen && nextTask !== null;
  const showCelebration = celebrating && !dayDone;
  const showNext = nextTask !== null && !showCelebration && !showFail && !dayDone;

  let restOfDay = visible.filter((task) => !(nextTask && task.id === nextTask.id && (showNext || showFail)));
  let moreLater = 0;
  if (theme === "adhd") {
    const others = todo.filter((task) => !(nextTask && task.id === nextTask.id && (showNext || showFail)));
    restOfDay = others.slice(0, 2);
    moreLater = Math.max(0, others.length - 2);
  }

  // Heads-up: the next thing that starts later today, if it is close.
  const upcoming = todo.find((task) => task.date === today && toMinutes(task.time) > nowMins);
  const minsToUpcoming = upcoming ? toMinutes(upcoming.time) - nowMins : null;
  const showHeadsUp = extras.headsUp && upcoming && minsToUpcoming <= leadTime;
  let headsUpWhen = "";
  if (showHeadsUp) {
    headsUpWhen = timeInWords
      ? "In " + minutesInWords(minsToUpcoming)
      : "In " + minsToUpcoming + (minsToUpcoming === 1 ? " minute" : " minutes");
  }

  // Time ring: how long until the next task starts, or how much of it is left.
  let ring = null;
  if (extras.timeRing && nextTask) {
    const start = toMinutes(nextTask.time);
    const end = start + nextTask.mins;
    let fraction = 0;
    let ringLabel = "This was planned for earlier. Whenever you're ready.";
    if (nextTask.date === today && nowMins < start) {
      fraction = Math.min(start - nowMins, 60) / 60;
      ringLabel = "Starts in " + minutesInWords(start - nowMins);
    } else if (nextTask.date === today && nowMins < end) {
      fraction = (end - nowMins) / nextTask.mins;
      ringLabel = capitalise(minutesInWords(end - nowMins)) + " left";
    }
    ring = <TimeRing fraction={fraction} label={ringLabel} />;
  }

  const calendarFor = (task, onHero) =>
    calendarOn && task.event ? (
      <CalendarButton
        event={{ title: task.title, date: task.date, time: task.time, mins: task.mins }}
        added={task.inCalendar}
        onHero={onHero}
        onAdded={() => onCalendarAdded(task.id)}
      />
    ) : null;

  // Things planned for the next seven days, so nothing added for later goes missing.
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const weekEnd = dateKey(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7));
  const comingUp = tasks
    .filter((task) => task.status === "todo" && task.date > today && task.date <= weekEnd)
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
  const comingUpDays = [];
  comingUp.forEach((task) => {
    const last = comingUpDays[comingUpDays.length - 1];
    if (last && last.date === task.date) {
      last.tasks.push(task);
    } else {
      const [year, month, day] = task.date.split("-").map(Number);
      const label = task.date === dateKey(tomorrow) ? "Tomorrow" : shortDate(new Date(year, month - 1, day));
      comingUpDays.push({ date: task.date, label, tasks: [task] });
    }
  });

  const todaysRoutines = routines.filter((routine) => routine.days[todayName] && routine.steps.length > 0);

  const metaFor = (task) =>
    CATEGORY_NAMES[task.category] + " · " + formatMinutes(task.mins) + (task.fromDump && task.sub ? " · " + task.sub : "");

  const markDone = () => {
    onSetTaskStatus(nextTask.id, "done");
    setCelebrating(true);
  };

  const handleFail = (choice) => {
    onTaskSlipped(nextTask.id, choice);
    setFailOpen(false);
  };

  let celebrationBody = voice.doneBody;
  if (nextTask) {
    celebrationBody = (voice.doneBody + " Next: " + nextTask.title + " at " + formatTime(nextTask.time) + ".").trim();
  }

  let headline = voice.greet(visible.length);
  let subline = voice.sub(visible.length);
  if (lowBattery) {
    headline = voice.lowTitle;
    subline = voice.lowSub;
  } else if (visible.length === 0) {
    headline = "A clear day so far.";
    subline = "Nothing is waiting for you right now.";
  }

  let changesLine = "";
  if (theme === "autism") {
    changesLine = "Changes since yesterday: " + (tasks.some((t) => t.date === today && t.fromDump) ? "small steps added by you" : "none");
  } else if (theme === "audhd") {
    changesLine = "Routine unchanged. Nothing moved without you.";
  }

  return (
    <div className="screen">
      <div className="today__top">
        <div className="today__hello-row">
          <div className="today__hello">
            {companion ? null : <img className="breathe" src={lowBattery ? art.coffee : art.wave} alt="" width="46" />}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: 700 }}>Hi, {userName || "friend"}</span>
              <span className="muted t-sm">
                {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
            {extras.tooMuch ? (
              <button type="button" className="btn2" onClick={onTooMuch} style={{ minHeight: "44px", padding: "0 12px" }}>
                Too much
              </button>
            ) : null}
            <button
              type="button"
              className="btn2"
              data-on={lowBattery ? "yes" : "no"}
              aria-pressed={lowBattery}
              onClick={onToggleLow}
              style={{ minHeight: "44px", padding: "0 12px" }}
            >
              Low battery
            </button>
          </div>
        </div>

        <HeaderWithBear companion={companion}>
          <h1 className="h t-xl title-row">{headline}</h1>
          <p className="muted" style={{ margin: 0 }}>
            {subline}
          </p>
          {changesLine ? (
            <div>
              <span className="chip">{changesLine}</span>
            </div>
          ) : null}
        </HeaderWithBear>
      </div>

      {weekTip ? <WeekTipCard text={weekTip.text} onYes={() => onWeekTip(true)} onNo={() => onWeekTip(false)} /> : null}

      {showHeadsUp ? (
        <HeadsUpCard
          when={headsUpWhen}
          title={upcoming.title}
          length={formatMinutes(upcoming.mins)}
          doneWhen={upcoming.doneWhen || "you mark it as done"}
        />
      ) : null}

      {todaysRoutines.map((routine) => (
        <RoutineChecklist
          key={routine.id}
          routine={routine}
          lowBattery={lowBattery}
          today={today}
          planBOn={extras.planB}
          onToggleStep={onToggleRoutineStep}
          onSwapStep={onSwapRoutineStep}
        />
      ))}

      {visible.length === 0 ? (
        <section className="card today__empty">
          <img className="breathe" src={art.calm} alt="" width="64" />
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontWeight: 700 }}>Nothing planned yet.</span>
            <span className="muted t-sm">Unpack your head and I'll turn it into small steps for today.</span>
            <div>
              <button type="button" className="btn2" onClick={onOpenDump}>
                Unpack my head
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {showNext ? (
        <NextTaskCard
          label={voice.label}
          time={formatTime(nextTask.time)}
          title={nextTask.title}
          meta={(nextTask.sub ? nextTask.sub + " · " : "") + formatMinutes(nextTask.mins)}
          categoryClass={"cat-" + nextTask.category}
          categoryName={CATEGORY_NAMES[nextTask.category]}
          hint={voice.hint(nextTask)}
          failLabel={voice.failBtn}
          ring={ring}
          calendar={calendarFor(nextTask, true)}
          readLang={extras.readAloud ? readLang : null}
          startLabel={"Start with " + bearName}
          onStart={extras.bodyDouble ? () => onStartFocus(nextTask.id) : null}
          onDone={markDone}
          onFail={() => setFailOpen(true)}
        />
      ) : null}

      {showNext && extras.parkIt ? <ParkThought onPark={onPark} /> : null}

      {showFail ? (
        <FailCard
          title={voice.failTitle}
          body={voice.failBody}
          actions={voice.failActions}
          onAction={handleFail}
          onClose={() => setFailOpen(false)}
        />
      ) : null}

      {showCelebration ? (
        <CelebrationCard title={voice.doneTitle} body={celebrationBody} showRings={showRings} onContinue={() => setCelebrating(false)} />
      ) : null}

      {dayDone ? <DayDoneCard title={voice.dayTitle} body={voice.dayBody} onPlanMore={onOpenDump} /> : null}

      {restOfDay.length > 0 ? (
        <section aria-label="Rest of today" className="today__list">
          <h3 className="muted t-sm" style={{ margin: 0, fontWeight: 700 }}>
            {showNext || showFail ? "Later today" : "Today"}
          </h3>
          {restOfDay.map((task) => (
            <TaskRow
              key={task.id}
              time={formatTime(task.time)}
              title={task.title}
              meta={metaFor(task)}
              categoryClass={"cat-" + task.category}
              done={task.status === "done"}
              calendar={calendarFor(task, false)}
              onToggle={() => onSetTaskStatus(task.id, task.status === "done" ? "todo" : "done")}
            />
          ))}
          {moreLater > 0 ? (
            <span className="muted t-sm">And {moreLater} more later. They will show up when you get there.</span>
          ) : null}
        </section>
      ) : null}

      {comingUp.length > 0 ? (
        <section aria-label="Coming up this week" className="today__list">
          <button
            type="button"
            className="btn2 btn2--plain today__later-toggle"
            aria-expanded={showComingUp}
            onClick={() => setShowComingUp(!showComingUp)}
          >
            Coming up this week ({comingUp.length})
            <span className="muted t-sm">{showComingUp ? "Hide" : "Show"}</span>
          </button>
          {showComingUp
            ? comingUpDays.map((group) => (
                <div key={group.date} className="today__list">
                  <h3 className="muted t-sm" style={{ margin: 0, fontWeight: 700 }}>
                    {group.label}
                  </h3>
                  {group.tasks.map((task) => (
                    <TaskRow
                      key={task.id}
                      time={formatTime(task.time)}
                      title={task.title}
                      meta={metaFor(task)}
                      categoryClass={"cat-" + task.category}
                      done={false}
                      calendar={calendarFor(task, false)}
                      onToggle={() => onSetTaskStatus(task.id, "done")}
                    />
                  ))}
                </div>
              ))
            : null}
        </section>
      ) : null}

      {lowBattery && hiddenCount > 0 ? (
        <div className="rise today__hidden">
          <span className="muted">{hiddenCount} things moved to tomorrow. Nothing was deleted.</span>
          <button type="button" className="btn2" onClick={onToggleLow}>
            Undo
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default TodayPage;

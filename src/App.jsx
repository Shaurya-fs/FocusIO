import { useEffect, useRef, useState } from "react";
import WelcomePage from "./pages/WelcomePage";
import NamePage from "./pages/NamePage";
import AgePage from "./pages/AgePage";
import AuthPage from "./pages/AuthPage";
import CodePage from "./pages/CodePage";
import TodayPage from "./pages/TodayPage";
import DumpPage from "./pages/DumpPage";
import PlanPage from "./pages/PlanPage";
import MePage from "./pages/MePage";
import SettingsPage from "./pages/SettingsPage";
import RoutinesPage from "./pages/RoutinesPage";
import RoutineEditPage from "./pages/RoutineEditPage";
import TabBar from "./Components/TabBar";
import Companion from "./Components/Companion";
import Toast from "./Components/Toast";
import LanguageSheet from "./Components/LanguageSheet";
import AboutSheet from "./Components/AboutSheet";
import FocusSession from "./Components/FocusSession";
import QuietScreen from "./Components/QuietScreen";
import Confetti from "./Components/Confetti";
import VOICE from "./data/voice";
import { PROFILE_DEFAULTS, getTheme } from "./data/profiles";
import { BEARS, getBearArt, getBearLook } from "./data/bears";
import { BearArtContext } from "./Components/BearArt";
import { getExtras } from "./data/extras";
import { findLanguage } from "./data/languages";
import { emptyRoutine } from "./data/routines";
import { analyseDump, firstStepTask, thoughtToItem } from "./utils/dumpAnalysis";
import { chatReply } from "./utils/chatReplies";
import { todayKey } from "./utils/dateHelpers";
import { makeConfetti } from "./utils/confetti";
import { timeInWords, durationInWords } from "./utils/textHelpers";
import { loadSaved, saveAll, clearSaved, downloadData } from "./utils/storage";

const DEFAULT_PREFS = {
  reminders: true,
  leadTime: "10",
  reminderStyle: null,
  quietHours: false,
  checkIn: true,
  mode: "light",
  textSize: "m",
  sounds: true,
  vibration: true,
  tone: "gentle",
  companion: true,
  pose: "sleep",
  outfit: "uni",
  bear: "bruno",
  palette: "classic",
  calendar: true,
  extras: {},
};

const NEW_USAGE = { since: "", lowBattery: 0, slipped: 0, tooMuch: 0, parked: 0, tipAnswered: false };

const APP_SCREENS = ["today", "dump", "plan", "me", "settings", "routines", "routineEdit"];

const saved = loadSaved() || {};

function App() {
  const [screen, setScreen] = useState(saved.onboarded ? "today" : "welcome");
  const [aboutFrom, setAboutFrom] = useState(null);
  const [languageOpen, setLanguageOpen] = useState(false);

  const [userName, setUserName] = useState(saved.userName || "");
  const [age, setAge] = useState(saved.age || "");
  const [signedInWith, setSignedInWith] = useState(saved.signedInWith || "");
  const [onboarded, setOnboarded] = useState(!!saved.onboarded);
  const [authMode, setAuthMode] = useState("signup");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  const [selected, setSelected] = useState(saved.selected || {});
  const [motionOverride, setMotionOverride] = useState(saved.motionOverride ?? null);
  const [praiseOverride, setPraiseOverride] = useState(saved.praiseOverride ?? null);
  const [prefs, setPrefs] = useState({ ...DEFAULT_PREFS, ...saved.prefs });
  const [language, setLanguage] = useState(saved.language || "en-GB");
  const [bearName, setBearName] = useState(saved.bearName || "Bruno");

  const [tasks, setTasks] = useState(saved.tasks || []);
  const [routines, setRoutines] = useState(saved.routines || []);
  const [notes, setNotes] = useState(saved.notes || []);
  const [chat, setChat] = useState(saved.chat || []);
  const [lowBatteryDate, setLowBatteryDate] = useState(saved.lowBatteryDate || "");
  const [dumpText, setDumpText] = useState(saved.dumpText || "");
  const [dumpResult, setDumpResult] = useState(saved.dumpResult || null);
  const [editingRoutine, setEditingRoutine] = useState(null);
  const [usage, setUsage] = useState({ ...NEW_USAGE, since: todayKey(), ...saved.usage });
  const [focusTaskId, setFocusTaskId] = useState(null);
  const [quietOpen, setQuietOpen] = useState(false);
  const [confetti, setConfetti] = useState(null);

  const [awake, setAwake] = useState(false);
  const [bearMessage, setBearMessage] = useState("");
  const [toast, setToast] = useState("");
  const [systemDark, setSystemDark] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches);

  const wakeTimer = useRef(null);
  const toastTimer = useRef(null);
  const confettiTimer = useRef(null);

  useEffect(() => {
    saveAll({
      onboarded,
      userName,
      age,
      signedInWith,
      selected,
      motionOverride,
      praiseOverride,
      prefs,
      language,
      bearName,
      tasks,
      routines,
      notes,
      chat,
      lowBatteryDate,
      dumpText,
      dumpResult,
      usage,
    });
  }, [onboarded, userName, age, signedInWith, selected, motionOverride, praiseOverride, prefs, language, bearName, tasks, routines, notes, chat, lowBatteryDate, dumpText, dumpResult, usage]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setSystemDark(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const theme = getTheme(selected);
  const voice = VOICE[theme];
  const motion = motionOverride === null ? PROFILE_DEFAULTS[theme].motion : motionOverride;
  const praise = praiseOverride === null ? PROFILE_DEFAULTS[theme].praise : praiseOverride;
  const lowBattery = lowBatteryDate === todayKey();
  const bearLook = getBearLook(prefs.bear, prefs.outfit);
  const bearArt = getBearArt(prefs.bear, prefs.outfit);
  const languageInfo = findLanguage(language);
  const isDark = prefs.mode === "dark" || (prefs.mode === "auto" && systemDark);
  const inApp = APP_SCREENS.includes(screen);
  const extras = getExtras(selected, prefs.extras);

  const formatTime = (time) => (selected.dyscalc ? timeInWords(time) : time);
  const formatMinutes = (mins) => (selected.dyscalc ? durationInWords(mins) : mins + " min");

  const showToast = (message) => {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(""), 2600);
  };

  const wakeBear = (message) => {
    clearTimeout(wakeTimer.current);
    setAwake(true);
    setBearMessage(message);
    wakeTimer.current = setTimeout(() => {
      setAwake(false);
      setBearMessage("");
    }, 9000);
  };

  // The bear only pops up by itself when movement is on. With movement off it waits to be tapped.
  const nudgeBear = (message) => {
    if (motion) {
      wakeBear(message);
    }
  };

  const restBear = () => {
    clearTimeout(wakeTimer.current);
    setAwake(false);
    setBearMessage("");
  };

  const learn = (id, text) => {
    if (notes.some((note) => note.id === id)) {
      return;
    }
    const noticed = "Noticed on " + new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long" });
    setNotes(notes.concat({ id, text, meta: noticed }));
  };

  const goToTab = (tab) => {
    setScreen(tab);
    if (tab === "plan") {
      nudgeBear("Hi!");
    }
  };

  const countUse = (key) => {
    setUsage({ ...usage, [key]: usage[key] + 1 });
  };

  const toggleLowBattery = () => {
    if (!lowBattery) {
      countUse("lowBattery");
    }
    setLowBatteryDate(lowBattery ? "" : todayKey());
  };

  // Try-a-week: after seven days, one suggestion based on what the person actually used.
  let weekTip = null;
  const daysUsed = Math.floor((new Date(todayKey()) - new Date(usage.since)) / 86400000);
  if (extras.weekTip && !usage.tipAnswered && daysUsed >= 7) {
    const heavy = usage.lowBattery + usage.slipped;
    if (usage.tooMuch >= 2) {
      weekTip = {
        profile: "autism",
        text:
          "You used the Too much button " + usage.tooMuch + " times this week. " +
          "The calm look keeps colours muted and turns movement off. Want to try it for a week?",
      };
    } else if (heavy >= 3) {
      weekTip = {
        profile: "adhd",
        text:
          "This week you switched on Low battery " + usage.lowBattery + (usage.lowBattery === 1 ? " time" : " times") +
          " and moved " + usage.slipped + (usage.slipped === 1 ? " task" : " tasks") +
          ". The focus layout shows one big card and only two more things. Want to try it for a week?",
      };
    }
  }

  const answerWeekTip = (yes) => {
    if (yes) {
      setSelected({ ...selected, [weekTip.profile]: true });
      showToast("Trying it for a week. You can change it in Settings.");
    }
    setUsage({ ...usage, tipAnswered: true });
  };

  // Onboarding

  const finishSignIn = (method) => {
    setSignedInWith(method);
    setOnboarded(true);
    setScreen("today");
  };

  const goBackInOnboarding = () => {
    if (screen === "name") {
      setScreen("welcome");
    } else if (screen === "age") {
      setScreen("name");
    } else if (screen === "auth") {
      setScreen(authMode === "signin" ? "welcome" : "age");
    } else if (screen === "code") {
      setScreen("auth");
    }
  };

  const toggleProfile = (id) => {
    setSelected({ ...selected, [id]: !selected[id] });
    setMotionOverride(null);
    setPraiseOverride(null);
  };

  const closeAbout = (keepChoices) => {
    if (aboutFrom === "onboarding") {
      if (!keepChoices) {
        setSelected({});
      }
      setAuthMode("signup");
      setScreen("auth");
    }
    setAboutFrom(null);
  };

  // Tasks

  const updateTask = (id, changes) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...changes } : task)));
  };

  // A couple of seconds of confetti when something gets done, if movement and celebrations are on.
  const celebrate = () => {
    if (!praise || !motion) {
      return;
    }
    clearTimeout(confettiTimer.current);
    setConfetti({ id: Date.now(), pieces: makeConfetti() });
    confettiTimer.current = setTimeout(() => setConfetti(null), 2400);
  };

  const setTaskStatus = (id, status) => {
    const task = tasks.find((t) => t.id === id);
    if (status === "done" && task && task.status !== "done") {
      celebrate();
    }
    updateTask(id, { status });
  };

  const taskSlipped = (id, choice) => {
    const task = tasks.find((t) => t.id === id);
    if (choice === "later") {
      updateTask(id, { time: "16:00", date: todayKey() });
    } else if (choice === "shorter") {
      updateTask(id, { mins: 15, sub: "Short version" });
    } else {
      updateTask(id, { status: "skipped" });
    }
    countUse("slipped");
    learn("slipped", '"' + task.title + '" slipped once. I will suggest a different time for it next time. You did nothing wrong.');
  };

  // Extra help

  const parkThought = (text) => {
    setDumpText(dumpText.trim() ? dumpText.trim() + "\n" + text : text);
    countUse("parked");
    showToast("Parked in Unpack. It will be there later.");
  };

  const openQuiet = () => {
    setQuietOpen(true);
    countUse("tooMuch");
  };

  const changeExtra = (id) => {
    changePref("extras", { ...prefs.extras, [id]: !extras[id] });
  };

  const markInCalendar = (taskId) => {
    updateTask(taskId, { inCalendar: true });
  };

  // Dump

  const sortDump = () => {
    nudgeBear("Reading…");
    setDumpResult(analyseDump(dumpText, new Date()));
  };

  const changeDumpItem = (id, changes) => {
    setDumpResult({ ...dumpResult, items: dumpResult.items.map((item) => (item.id === id ? { ...item, ...changes } : item)) });
  };

  // The first two steps added on a day count as essentials for a low battery day.
  const essentialCountToday = () => tasks.filter((task) => task.date === todayKey() && task.essential).length;

  const addDumpItem = (id) => {
    const item = dumpResult.items.find((i) => i.id === id);
    const slot = tasks.filter((task) => task.fromDump && task.date === todayKey()).length;
    setTasks(tasks.concat(firstStepTask(item, slot, essentialCountToday() < 2)));
    changeDumpItem(id, { added: true });
  };

  const addAllDumpItems = () => {
    const newTasks = [];
    let slot = tasks.filter((task) => task.fromDump && task.date === todayKey()).length;
    let essentials = essentialCountToday();

    const items = dumpResult.items.map((item) => {
      if (item.added) {
        return item;
      }
      newTasks.push(firstStepTask(item, slot, essentials < 2));
      slot += 1;
      essentials += 1;
      return { ...item, added: true };
    });

    setTasks(tasks.concat(newTasks));
    setDumpResult({ ...dumpResult, items });
  };

  const makeThoughtATask = (index) => {
    const thought = dumpResult.others[index];
    setDumpResult({
      ...dumpResult,
      items: dumpResult.items.concat(thoughtToItem(thought, dumpResult.items.length)),
      others: dumpResult.others.filter((_, i) => i !== index),
    });
    learn("promoted", "You turned a thought into a task. I will treat similar thoughts as tasks next time.");
  };

  // Plan chat

  const sendMessage = (text) => {
    // If the bear just asked "what time?" and the answer is only a time, read it together
    // with the first message, so "17:00" stays the dentist on Friday.
    const last = chat[chat.length - 1];
    let fullText = text;
    if (last && last.askTime && /\d/.test(text) && text.trim().split(/\s+/).length <= 3) {
      fullText = last.askedAbout + " at " + text.trim().replace(/^at\s+/i, "");
    }

    const reply = chatReply(theme, fullText);
    const time = Date.now();
    const bearReply = { id: "b" + time, from: "bear", ...reply };
    if (reply.askTime) {
      bearReply.askedAbout = fullText;
    }
    setChat(chat.concat({ id: "u" + time, from: "user", text }, bearReply));
    if (reply.newTask) {
      setTasks(tasks.concat(reply.newTask));
    }
    nudgeBear("On it!");
  };

  const switchToLowBattery = () => {
    setLowBatteryDate(todayKey());
    setScreen("today");
  };

  // Routines

  const saveRoutine = (routine) => {
    const exists = routines.some((r) => r.id === routine.id);
    if (exists) {
      setRoutines(routines.map((r) => (r.id === routine.id ? routine : r)));
    } else {
      setRoutines(routines.concat(routine));
    }
    setEditingRoutine(null);
    setScreen("routines");
    showToast(exists ? "Routine saved." : "Routine created.");
  };

  const deleteRoutine = (id) => {
    setRoutines(routines.filter((r) => r.id !== id));
    showToast("Routine deleted.");
  };

  const toggleRoutineStep = (routineId, stepId) => {
    const today = todayKey();
    setRoutines(
      routines.map((routine) => {
        if (routine.id !== routineId) {
          return routine;
        }
        return {
          ...routine,
          steps: routine.steps.map((step) =>
            step.id === stepId ? { ...step, doneDate: step.doneDate === today ? null : today } : step
          ),
        };
      })
    );
  };

  const swapRoutineStep = (routineId, stepId) => {
    const today = todayKey();
    setRoutines(
      routines.map((routine) => {
        if (routine.id !== routineId) {
          return routine;
        }
        return {
          ...routine,
          steps: routine.steps.map((step) =>
            step.id === stepId ? { ...step, planBDate: step.planBDate === today ? null : today } : step
          ),
        };
      })
    );
  };

  // Settings

  const changePref = (key, value) => {
    setPrefs({ ...prefs, [key]: value });
  };

  const pickBear = (id) => {
    const previous = BEARS.find((bear) => bear.id === prefs.bear) || BEARS[0];
    const next = BEARS.find((bear) => bear.id === id);
    if (!bearName || bearName === previous.name) {
      setBearName(next.name);
    }
    changePref("bear", id);
  };

  const pickLanguage = (code) => {
    setLanguage(code);
    setLanguageOpen(false);
    showToast("Language set to " + findLanguage(code).english + ".");
  };

  const signOut = () => {
    setSignedInWith("");
    setAuthMode("signin");
    setCode("");
    setScreen("auth");
  };

  const deleteEverything = () => {
    clearSaved();
    window.location.reload();
  };

  const download = () => {
    downloadData({ userName, age, selected, prefs, language, bearName, tasks, routines, notes, chat });
    showToast("Your data has been downloaded.");
  };

  // Companion bear

  const todayHasTasks = tasks.some((task) => task.date === todayKey() && task.status !== "skipped");
  const allDoneToday = todayHasTasks && !tasks.some((task) => task.date <= todayKey() && task.status === "todo");

  let mood = awake ? "wave" : "calm";
  if (allDoneToday && screen === "today") {
    mood = "proud";
  } else if (lowBattery) {
    mood = "coffee";
  } else if (screen === "dump") {
    mood = dumpResult ? "thumbsup" : "write";
  } else if (screen === "plan") {
    mood = awake ? "idea" : "plan";
  }

  const asleep = (prefs.pose === "sleep" || lowBattery) && !awake;
  const companion = (
    <Companion
      pose={prefs.pose}
      asleep={asleep}
      mood={mood}
      awake={awake}
      message={bearMessage}
      bearName={bearName}
      onTap={() => (awake ? restBear() : wakeBear("Hi!"))}
    />
  );
  const pageBear = prefs.companion ? companion : null;

  const focusTask = tasks.find((task) => task.id === focusTaskId) || null;
  const openTasks = tasks
    .filter((task) => task.status === "todo" && task.date <= todayKey() && (!lowBattery || task.essential))
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
  const taskAfterFocus = focusTask ? openTasks.find((task) => task.id !== focusTask.id) : null;
  const quietNextLine = openTasks.length ? "When you're ready: " + openTasks[0].title + " at " + formatTime(openTasks[0].time) + "." : "";

  let tabForScreen = screen;
  if (screen === "settings" || screen === "routines" || screen === "routineEdit") {
    tabForScreen = "me";
  }

  return (
    <BearArtContext.Provider value={bearArt}>
      <div
        className="app"
        data-theme={theme}
        data-palette={prefs.palette}
        data-read={selected.dyslexia ? "on" : "off"}
        data-low={lowBattery ? "on" : "off"}
        data-motion={motion ? "on" : "off"}
        data-mode={isDark ? "dark" : "light"}
        data-size={prefs.textSize}
      >
        {screen === "welcome" ? (
          <WelcomePage
            bearName={bearName}
            bearLook={bearLook}
            languageName={languageInfo.native}
            languageLabel={languageInfo.english}
            onOpenLanguage={() => setLanguageOpen(true)}
            onStart={() => setScreen("name")}
            onHaveAccount={() => {
              setAuthMode("signin");
              setScreen("auth");
            }}
          />
        ) : null}

        {screen === "name" ? (
          <NamePage name={userName} onNameChange={setUserName} onBack={goBackInOnboarding} onNext={() => setScreen("age")} />
        ) : null}

        {screen === "age" ? (
          <AgePage name={userName} age={age} onAgeChange={setAge} onBack={goBackInOnboarding} onNext={() => setAboutFrom("onboarding")} />
        ) : null}

        {screen === "auth" ? (
          <AuthPage
            mode={authMode}
            name={userName}
            countryCode={countryCode}
            phone={phone}
            languageLabel={languageInfo.english}
            onCountryCode={setCountryCode}
            onPhone={setPhone}
            onApple={() => finishSignIn("Apple")}
            onGoogle={() => finishSignIn("Google")}
            onSendCode={() => {
              setCode("");
              setScreen("code");
            }}
            onBack={goBackInOnboarding}
            onOpenLanguage={() => setLanguageOpen(true)}
          />
        ) : null}

        {screen === "code" ? (
          <CodePage
            countryCode={countryCode}
            phone={phone}
            code={code}
            onCodeChange={setCode}
            onVerify={() => finishSignIn("phone " + countryCode + " ••• " + phone.replace(/\D/g, "").slice(-4))}
            onResend={() => showToast("New code sent.")}
            onChangeNumber={() => setScreen("auth")}
            onBack={goBackInOnboarding}
          />
        ) : null}

        {screen === "today" ? (
          <TodayPage
            userName={userName}
            theme={theme}
            voice={voice}
            tasks={tasks}
            routines={routines}
            companion={pageBear}
            lowBattery={lowBattery}
            showRings={praise && motion}
            formatTime={formatTime}
            formatMinutes={formatMinutes}
            onToggleLow={toggleLowBattery}
            onSetTaskStatus={setTaskStatus}
            onTaskSlipped={taskSlipped}
            extras={extras}
            bearName={bearName}
            readLang={language}
            leadTime={Number(prefs.leadTime)}
            timeInWords={!!selected.dyscalc}
            calendarOn={prefs.calendar}
            weekTip={weekTip}
            onToggleRoutineStep={toggleRoutineStep}
            onSwapRoutineStep={swapRoutineStep}
            onOpenDump={() => setScreen("dump")}
            onStartFocus={setFocusTaskId}
            onTooMuch={openQuiet}
            onPark={parkThought}
            onCalendarAdded={markInCalendar}
            onWeekTip={answerWeekTip}
          />
        ) : null}

        {screen === "dump" ? (
          <DumpPage
            theme={theme}
            voice={voice}
            text={dumpText}
            result={dumpResult}
            companion={pageBear}
            formatMinutes={formatMinutes}
            extras={extras}
            lang={language}
            calendarOn={prefs.calendar}
            onItemCalendar={(id) => changeDumpItem(id, { inCalendar: true })}
            onTextChange={setDumpText}
            onSort={sortDump}
            onBackToText={() => setDumpResult(null)}
            onNewDump={() => {
              setDumpText("");
              setDumpResult(null);
            }}
            onToggleItem={(id) => changeDumpItem(id, { open: !dumpResult.items.find((i) => i.id === id).open })}
            onAddItem={addDumpItem}
            onAddAll={addAllDumpItems}
            onMakeTask={makeThoughtATask}
            onSeeToday={() => setScreen("today")}
          />
        ) : null}

        {screen === "plan" ? (
          <PlanPage
            bearName={bearName}
            bearFace={bearLook.face}
            voice={voice}
            messages={chat}
            notes={notes}
            companion={pageBear}
            tasks={tasks}
            readLang={extras.readAloud ? language : null}
            pickTime={extras.pickTime}
            calendarOn={prefs.calendar}
            formatTime={formatTime}
            onCalendar={markInCalendar}
            onSend={sendMessage}
            onLowBattery={switchToLowBattery}
            onForgetNote={(id) => setNotes(notes.filter((note) => note.id !== id))}
            onResetNotes={() => setNotes([])}
          />
        ) : null}

        {screen === "me" ? (
          <MePage
            userName={userName}
            signedInWith={signedInWith}
            bearBust={bearLook.bust}
            selected={selected}
            routines={routines}
            onChangeProfile={() => setAboutFrom("me")}
            onOpenRoutines={() => setScreen("routines")}
            onOpenSettings={() => setScreen("settings")}
          />
        ) : null}

        {screen === "routines" ? (
          <RoutinesPage
            routines={routines}
            onBack={() => setScreen("me")}
            onNew={() => {
              setEditingRoutine({ routine: emptyRoutine(), isNew: true });
              setScreen("routineEdit");
            }}
            onEdit={(id) => {
              setEditingRoutine({ routine: routines.find((r) => r.id === id), isNew: false });
              setScreen("routineEdit");
            }}
            onDelete={deleteRoutine}
          />
        ) : null}

        {screen === "routineEdit" && editingRoutine ? (
          <RoutineEditPage
            routine={editingRoutine.routine}
            isNew={editingRoutine.isNew}
            planBOn={extras.planB}
            onBack={() => {
              setEditingRoutine(null);
              setScreen("routines");
            }}
            onSave={saveRoutine}
          />
        ) : null}

        {screen === "settings" ? (
          <SettingsPage
            prefs={prefs}
            userName={userName}
            age={age}
            bearName={bearName}
            signedInWith={signedInWith}
            language={language}
            selected={selected}
            theme={theme}
            motion={motion}
            praise={praise}
            extras={extras}
            onBack={() => setScreen("me")}
            onPref={changePref}
            onUserName={setUserName}
            onAge={setAge}
            onBearName={setBearName}
            onPickBear={pickBear}
            onSignOut={signOut}
            onOpenLanguage={() => setLanguageOpen(true)}
            onChangeProfile={() => setAboutFrom("settings")}
            onToggleLayer={toggleProfile}
            onMotion={() => setMotionOverride(!motion)}
            onPraise={() => setPraiseOverride(!praise)}
            onExtra={changeExtra}
            onResetLearned={() => {
              setNotes([]);
              showToast("Done. I'm starting fresh.");
            }}
            onDownload={download}
            onDeleteEverything={deleteEverything}
            onComingSoon={() => showToast("Coming soon.")}
          />
        ) : null}

        {focusTask ? (
          <FocusSession
            task={focusTask}
            nextTask={taskAfterFocus}
            bearImage={bearLook.full}
            bearName={bearName}
            wordsOnly={!!selected.dyscalc}
            parkOn={extras.parkIt}
            hyperOn={extras.hyperfocus}
            formatTime={formatTime}
            onPark={parkThought}
            onDone={() => {
              setTaskStatus(focusTask.id, "done");
              setFocusTaskId(null);
              showToast("Done. That was the hard part.");
            }}
            onClose={() => setFocusTaskId(null)}
          />
        ) : null}

        {quietOpen ? <QuietScreen bearImage={bearArt.calm} nextLine={quietNextLine} onClose={() => setQuietOpen(false)} /> : null}

        {confetti ? <Confetti key={confetti.id} pieces={confetti.pieces} /> : null}

        <Toast message={toast} />

        {inApp ? <TabBar current={tabForScreen} onChange={goToTab} /> : null}

        {languageOpen ? <LanguageSheet current={language} onPick={pickLanguage} onClose={() => setLanguageOpen(false)} /> : null}

        {aboutFrom ? (
          <AboutSheet
            selected={selected}
            onToggle={toggleProfile}
            onContinue={() => closeAbout(true)}
            onSkip={() => closeAbout(false)}
            skipLabel={aboutFrom === "onboarding" ? "Skip for now. Keep it standard." : "Close"}
          />
        ) : null}
      </div>
    </BearArtContext.Provider>
  );
}

export default App;

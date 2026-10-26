import DumpItemCard from "../Components/DumpItemCard";
import ThoughtCard from "../Components/ThoughtCard";
import HeaderWithBear from "../Components/HeaderWithBear";
import VoiceDumpButton from "../Components/VoiceDumpButton";
import { useBearArt } from "../Components/BearArt";
import { bucketLabel, EXAMPLE_LONG, EXAMPLE_LIST } from "../data/dumpRules";
import "./DumpPage.css";

function DumpPage({
  theme,
  voice,
  text,
  result,
  companion,
  formatMinutes,
  extras,
  lang,
  calendarOn,
  onTextChange,
  onSort,
  onBackToText,
  onNewDump,
  onToggleItem,
  onAddItem,
  onAddAll,
  onMakeTask,
  onSeeToday,
  onItemCalendar,
}) {
  const art = useBearArt();
  if (!result) {
    return (
      <div className="screen">
        <HeaderWithBear companion={companion}>
          <h1 className="h t-xl title-row">Unpack your head</h1>
          <p className="muted" style={{ margin: 0 }}>
            {voice.dumpSub}
          </p>
        </HeaderWithBear>

        <div className="card dump__box">
          <label htmlFor="dump-text" style={{ fontWeight: 700 }}>
            What's on your mind?
          </label>
          <textarea
            id="dump-text"
            className="ta"
            rows="7"
            placeholder="Type anything. Messy is fine. Typos are fine."
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
          />
          {extras.voiceDump ? <VoiceDumpButton lang={lang} text={text} onTextChange={onTextChange} /> : null}
          <button type="button" className="btn" disabled={!text.trim()} onClick={onSort}>
            Sort my head
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span className="muted t-sm" style={{ fontWeight: 700 }}>
            No words right now? Try an example
          </span>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button type="button" className="btn2" onClick={() => onTextChange(EXAMPLE_LONG)}>
              One long worry
            </button>
            <button type="button" className="btn2" onClick={() => onTextChange(EXAMPLE_LIST)}>
              A messy list
            </button>
          </div>
        </div>

        <div className="card dump__steps">
          <span style={{ fontWeight: 700 }}>What I'll do</span>
          <span className="muted t-sm">1. Read everything, even the messy parts.</span>
          <span className="muted t-sm">2. Pick out the dates and the things that matter.</span>
          <span className="muted t-sm">3. Put them in order and break each one into small steps.</span>
        </div>
      </div>
    );
  }

  const count = result.items.length;
  const calmLines = voice.calm.map((line, index) => {
    if (count === 0 && index === 1) {
      return "I didn't find any tasks in this, and that's fine. Sometimes writing it down is the whole job.";
    }
    if (count === 0 && index === 2) {
      return "If you want to talk it through, the Plan tab is right here.";
    }
    return line.replace("{N}", count === 1 ? "1 thing" : count + " things");
  });

  const notAdded = result.items.filter((item) => !item.added).length;
  const added = result.items.filter((item) => item.added).length;

  return (
    <div className="screen" style={{ gap: "16px" }}>
      <HeaderWithBear companion={companion}>
        <h1 className="h t-xl title-row">Here's what I found</h1>
        <div>
          <button type="button" className="btn2" onClick={onBackToText}>
            Back to what I wrote
          </button>
        </div>
      </HeaderWithBear>

      <section className="card rise dump__calm">
        {companion ? null : <img className="breathe" src={art.calm} alt="" width="56" />}
        {calmLines.map((line) => (
          <span key={line} className="dump__calm-line">
            {line}
          </span>
        ))}
        {result.feeling ? <span className="muted">{voice.feel}</span> : null}
      </section>

      {notAdded > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <button type="button" className="btn" onClick={onAddAll}>
            Plan it for me
          </button>
          <span className="muted t-sm">One small first step for each thing goes on Today. The rest waits in order.</span>
        </div>
      ) : null}

      {added > 0 ? (
        <div className="card rise dump__planned" role="status">
          <span style={{ fontWeight: 700 }}>
            Added {added} {added === 1 ? "small step" : "small steps"} to Today.
          </span>
          <button type="button" className="btn2" onClick={onSeeToday}>
            See Today
          </button>
        </div>
      ) : null}

      {result.items.map((item, index) => (
        <DumpItemCard
          key={item.id}
          item={item}
          isFirst={index === 0}
          showDoneWhen={theme === "autism" || theme === "audhd"}
          durationText={formatMinutes}
          readLang={extras.readAloud ? lang : null}
          calendarOn={calendarOn}
          onCalendar={() => onItemCalendar(item.id)}
          onToggle={() => onToggleItem(item.id)}
          onAdd={() => onAddItem(item.id)}
        />
      ))}

      {result.others.length > 0 ? (
        <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "2px" }}>
          <span style={{ fontWeight: 700 }}>Also on your mind</span>
          <span className="muted t-sm">These are not tasks. They can stay here.</span>
        </div>
      ) : null}

      {result.others.map((thought, index) => (
        <ThoughtCard key={thought.text} text={thought.text} groupLabel={bucketLabel(thought.bucket)} onMakeTask={() => onMakeTask(index)} />
      ))}

      <button type="button" className="btn2 btn2--center" onClick={onNewDump}>
        Unpack something new
      </button>
    </div>
  );
}

export default DumpPage;

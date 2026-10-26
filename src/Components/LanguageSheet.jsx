import { useState } from "react";
import Sheet from "./Sheet";
import { CheckIcon } from "./Icons";
import LANGUAGE_GROUPS from "../data/languages";

function LanguageSheet({ current, onPick, onClose }) {
  const [search, setSearch] = useState("");
  const query = search.trim().toLowerCase();

  const groups = LANGUAGE_GROUPS.map((group) => ({
    title: group.title,
    items: group.items.filter(
      (item) => !query || item[1].toLowerCase().includes(query) || item[2].toLowerCase().includes(query)
    ),
  })).filter((group) => group.items.length > 0);

  return (
    <Sheet label="Choose your language">
      <div className="sheet__top">
        <h2 className="h sheet__title">Choose your language</h2>
        <button type="button" className="btn2" onClick={onClose}>
          Done
        </button>
      </div>
      <p className="muted t-sm" style={{ margin: 0 }}>
        FocusIO will use this language on every screen. Translations are on the way, so for now the app stays in English.
      </p>
      <input
        type="search"
        className="tf"
        aria-label="Search languages"
        placeholder="Search languages"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {groups.map((group) => (
        <div key={group.title} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <h3 className="muted t-sm" style={{ margin: "6px 4px 0 4px", fontWeight: 700 }}>
            {group.title}
          </h3>
          {group.items.map((item) => (
            <button
              key={item[0]}
              type="button"
              className="setrow"
              aria-pressed={current === item[0]}
              onClick={() => onPick(item[0])}
            >
              <div className="setl">
                <span className="setn" dir={item[3] || "ltr"} lang={item[0]}>
                  {item[1]}
                </span>
                <span className="muted t-sm">{item[2]}</span>
              </div>
              {current === item[0] ? <CheckIcon width={2.4} /> : null}
            </button>
          ))}
        </div>
      ))}

      {groups.length === 0 ? (
        <p className="muted" style={{ margin: 0, textAlign: "center" }}>
          No language matches that search.
        </p>
      ) : null}
    </Sheet>
  );
}

export default LanguageSheet;

import { TodayIcon, DumpIcon, PlanIcon, MeIcon } from "./Icons";
import "./TabBar.css";

const TABS = [
  { id: "today", label: "Today", icon: <TodayIcon /> },
  { id: "dump", label: "Unpack", icon: <DumpIcon /> },
  { id: "plan", label: "Plan", icon: <PlanIcon /> },
  { id: "me", label: "Me", icon: <MeIcon /> },
];

function TabBar({ current, onChange }) {
  return (
    <nav className="tab-bar" aria-label="Main">
      {TABS.map((tab) => {
        const isOn = tab.id === current;
        return (
          <button
            key={tab.id}
            type="button"
            className="tab-bar__tab"
            data-on={isOn ? "yes" : "no"}
            aria-current={isOn ? "page" : undefined}
            onClick={() => onChange(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default TabBar;

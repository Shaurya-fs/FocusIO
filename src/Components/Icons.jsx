function Icon({ size = 22, width = 2.2, children, style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      {children}
    </svg>
  );
}

export function BackIcon() {
  return (
    <Icon>
      <path d="M15 5l-7 7 7 7" />
    </Icon>
  );
}

export function ArrowRightIcon() {
  return (
    <Icon size={20}>
      <path d="M9 6l6 6-6 6" />
    </Icon>
  );
}

export function ChevronDownIcon({ open }) {
  return (
    <Icon size={20} style={{ flexShrink: 0, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
      <path d="M6 9l6 6 6-6" />
    </Icon>
  );
}

export function CheckIcon({ size = 22, width = 2.8 }) {
  return (
    <Icon size={size} width={width}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </Icon>
  );
}

export function GlobeIcon() {
  return (
    <Icon size={20} width={2}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9s1.3-6.4 3.8-9z" />
    </Icon>
  );
}

export function SendIcon() {
  return (
    <Icon width={2.4}>
      <path d="M12 19V5M5 12l7-7 7 7" />
    </Icon>
  );
}

export function CloseIcon() {
  return (
    <Icon size={16} width={2.4}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Icon>
  );
}

export function TodayIcon() {
  return (
    <Icon size={24} width={2}>
      <path d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18z M8 12.5l3 3 5-6" />
    </Icon>
  );
}

export function DumpIcon() {
  return (
    <Icon size={24} width={2}>
      <path d="M7 18a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17 8.5a4 4 0 0 1 0 8H7z" />
    </Icon>
  );
}

export function PlanIcon() {
  return (
    <Icon size={24} width={2}>
      <path d="M4 5h16v11H9l-5 4z" />
    </Icon>
  );
}

export function MeIcon() {
  return (
    <Icon size={24} width={2}>
      <path d="M12 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8z M4 21c1-4 4-6 8-6s7 2 8 6" />
    </Icon>
  );
}

export function SpeakerIcon({ playing }) {
  return (
    <Icon size={20} width={2}>
      <path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z" />
      {playing ? <path d="M16 9a4 4 0 0 1 0 6 M18.5 6.5a7.5 7.5 0 0 1 0 11" /> : <path d="M16 9.5a3.5 3.5 0 0 1 0 5" />}
    </Icon>
  );
}

export function MicIcon() {
  return (
    <Icon size={20} width={2}>
      <path d="M12 3.5a2.8 2.8 0 0 0-2.8 2.8v5.4a2.8 2.8 0 0 0 5.6 0V6.3A2.8 2.8 0 0 0 12 3.5z" />
      <path d="M6.5 11.5a5.5 5.5 0 0 0 11 0 M12 17v3.5" />
    </Icon>
  );
}

export function CalendarIcon() {
  return (
    <Icon size={16} width={2}>
      <path d="M5 6h14v13H5z M5 10h14 M9 4v4 M15 4v4" />
    </Icon>
  );
}

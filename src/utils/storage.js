const STORAGE_KEY = "focusio";

export function loadSaved() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function saveAll(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage can be full or blocked. The app keeps working without saving.
  }
}

export function clearSaved() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to clear.
  }
}

export function downloadData(data) {
  const file = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = "focusio-my-data.json";
  link.click();
  URL.revokeObjectURL(link.href);
}

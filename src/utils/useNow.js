import { useEffect, useState } from "react";

// The current time, updated every few seconds so cards can count down.
export function useNow(everyMs) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), everyMs);
    return () => clearInterval(timer);
  }, [everyMs]);

  return now;
}

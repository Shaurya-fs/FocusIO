// Read aloud and speech to text, both built into the browser, so they cost nothing.

const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export function canSpeak() {
  return "speechSynthesis" in window;
}

export function canListen() {
  return !!Recognition;
}

// Reads the text out loud. onWord gets the start and end of each word as it is spoken.
export function speak(text, lang, onWord, onEnd) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.92;
  utterance.onboundary = (event) => {
    if (event.name && event.name !== "word") {
      return;
    }
    const from = event.charIndex;
    const gap = text.slice(from).search(/\s/);
    const to = event.charLength ? from + event.charLength : gap === -1 ? text.length : from + gap;
    onWord(from, to);
  };
  utterance.onend = onEnd;
  utterance.onerror = onEnd;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  window.speechSynthesis.cancel();
}

// Listens until stopped. onText gets everything heard so far. onEnd gets true if something went wrong.
export function listen(lang, onText, onEnd) {
  const recognition = new Recognition();
  let failed = false;
  recognition.lang = lang;
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onresult = (event) => {
    let heard = "";
    for (let i = 0; i < event.results.length; i++) {
      heard += event.results[i][0].transcript;
    }
    onText(heard.trim());
  };
  recognition.onerror = () => {
    failed = true;
  };
  recognition.onend = () => onEnd(failed);
  recognition.start();
  return () => recognition.stop();
}

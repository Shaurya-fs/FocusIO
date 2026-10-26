export const CATEGORY_NAMES = {
  study: "Study",
  body: "Body",
  project: "Project",
  people: "People",
  life: "Life admin",
};

// Groups for thoughts that are not tasks. The words are matched with typo tolerance.
export const BUCKETS = [
  {
    id: "do",
    label: "Do soon",
    words: ["due", "deadline", "email", "call", "submit", "pay", "book", "send", "finish", "reply", "check", "need", "must", "urgent", "rent", "bill", "appointment", "renew", "register", "apply", "fix", "tomorrow", "friday", "monday", "tuesday", "wednesday", "thursday", "saturday", "sunday", "today", "exam", "test", "quiz", "assignment", "interview", "resume", "resumes", "jobs", "job", "visa", "passport", "account", "payout", "blocked", "activate", "activation"],
    phrases: ["need to", "have to"],
  },
  {
    id: "errand",
    label: "Errands",
    words: ["buy", "groceries", "milk", "eggs", "shop", "shopping", "pick", "collect", "post", "laundry", "bin", "pharmacy", "bread", "fruit", "cook"],
    phrases: [],
  },
  {
    id: "decide",
    label: "To decide",
    words: ["should", "whether", "choose", "decide", "which", "worth", "drop", "keep", "option", "options", "either", "quit"],
    phrases: [],
  },
  {
    id: "heavy",
    label: "Heavy on my mind",
    words: ["feel", "feeling", "feels", "anxious", "worried", "worry", "overwhelmed", "behind", "tired", "exhausted", "stressed", "scared", "sad", "hate", "cant", "failing", "failure", "guilty", "alone", "panic", "afraid", "lost", "stuck", "enough", "thinking", "burnt", "burned"],
    phrases: ["not good enough", "too much", "everything is", "give up"],
  },
  {
    id: "someday",
    label: "Someday",
    words: ["someday", "maybe", "eventually", "wish", "idea", "learn", "try", "dream", "sometime", "later"],
    phrases: [],
  },
  {
    id: "remember",
    label: "Remember",
    words: ["remember", "password", "birthday", "address", "code", "note", "forget"],
    phrases: [],
  },
];

export function bucketLabel(id) {
  const bucket = BUCKETS.find((b) => b.id === id);
  return bucket ? bucket.label : "Not sure";
}

// Kinds of task. Each kind has its own small steps.
export const TASK_KINDS = [
  {
    id: "exam",
    category: "study",
    words: ["exam", "test", "quiz", "viva", "midterm", "finals"],
    doneWhen: "you have a topic list and one topic studied",
    steps: [
      { text: "Write down every topic that could come up", mins: 10 },
      { text: "Mark the 2 you feel least sure about", mins: 5 },
      { text: "Study the first one for 25 minutes, then take a break", mins: 25 },
      { text: "Plan one topic per day until the exam. Sleeping the night before counts as revising", mins: 5 },
    ],
  },
  {
    id: "jobs",
    category: "project",
    words: ["apply", "resume", "resumes", "cv", "jobs", "job", "interview", "application", "applications"],
    doneWhen: "your resume is updated and one application is sent",
    steps: [
      { text: "Open your resume and update the top summary", mins: 15 },
      { text: "Pick 3 roles you'd genuinely apply for", mins: 15 },
      { text: "Apply to just one today", mins: 30 },
      { text: "Save the other two links for tomorrow", mins: 2 },
    ],
  },
  {
    id: "visa",
    category: "life",
    words: ["visa", "passport", "permit", "embassy", "biometrics"],
    doneWhen: "you know which documents are missing and have asked for the first one",
    steps: [
      { text: "Open the visa checklist or the latest email from the office", mins: 5 },
      { text: "List which documents are still missing", mins: 10 },
      { text: "Book or request the first missing one", mins: 15 },
    ],
  },
  {
    id: "money",
    category: "life",
    words: ["rent", "bill", "pay", "invoice", "tax", "fees", "fee", "loan"],
    doneWhen: "the payment is made or scheduled",
    steps: [
      { text: "Open your bank app", mins: 2 },
      { text: "Check the amount and the due date", mins: 2 },
      { text: "Pay it now, or schedule it", mins: 5 },
    ],
  },
  {
    id: "admin",
    category: "life",
    words: ["activate", "activation", "account", "payout", "blocked", "bank", "unlock", "verify", "verification"],
    doneWhen: "the activation is confirmed",
    steps: [
      { text: "Find the login page, or the email with the activation link", mins: 5 },
      { text: "Check what they ask for: an ID, a code or a form", mins: 5 },
      { text: "Do the activation and take a screenshot when it is done", mins: 15 },
      { text: "If you get stuck, note the reference number and contact support", mins: 10 },
    ],
  },
  {
    id: "comms",
    category: "people",
    words: ["email", "mail", "call", "message", "text", "reply", "write"],
    doneWhen: "the message is sent",
    steps: [
      { text: "Write only the first line", mins: 3 },
      { text: "Add the one thing you need from them", mins: 5 },
      { text: "Send it before you re-read it", mins: 2 },
    ],
  },
  {
    id: "errand",
    category: "life",
    words: ["buy", "groceries", "milk", "eggs", "shop", "shopping", "pick", "collect", "laundry", "pharmacy"],
    doneWhen: "you have it",
    steps: [
      { text: "Add it to your phone list right now", mins: 1 },
      { text: "Grab it the next time you're out", mins: 10 },
    ],
  },
  {
    id: "generic",
    category: "life",
    words: [],
    doneWhen: "the first small piece is finished",
    steps: [
      { text: 'Write what "done" looks like in one line', mins: 2 },
      { text: "Do the smallest first piece", mins: 10 },
      { text: "Pick a time for the rest", mins: 3 },
    ],
  },
];

export function getKind(id) {
  return TASK_KINDS.find((k) => k.id === id) || TASK_KINDS[TASK_KINDS.length - 1];
}

// Common words people mistype. Close spellings are corrected to these.
export const KNOWN_WORDS = ["email", "professor", "resume", "account", "payout", "activate", "exam", "apply", "visa", "call", "submit", "extension"];

export const CHAT_INTENTS = {
  meeting: ["meeting", "call", "appointment", "lunch", "dinner", "remind", "schedule", "book"],
  overwhelm: ["overwhelmed", "overwhelm", "stressed", "exhausted", "tired", "panic", "much", "cope", "drowning"],
  start: ["start", "stuck", "begin", "procrastinating", "procrastinate", "motivation", "focus", "cant"],
  missed: ["missed", "skipped", "forgot", "failed", "late", "didnt", "slipped"],
};

export const FEELING_WORDS = ["overwhelmed", "stressed", "anxious", "panic", "worried", "scared", "behind", "stuck", "cope", "exhausted", "feel", "feeling", "low", "sad", "tired", "lonely", "drained"];

export const FEELING_PHRASES = ["so many", "too much", "dont know", "no idea", "so much", "everything is"];

export const EXAMPLE_LONG =
  "i dont know there ar so manynthings right now like there is exam on 25 and then i have also to apply for jobs and resumes , then i have to activate my blocked acount payout also tom , and voisa process is pending and then these task are to be done in the morning";

export const EXAMPLE_LIST =
  "rent due friday and i havent checked my account\nneed to emial professor about the extension\nfeeling like everything is behind\nshould i drop the elective or keep it?\nbuy milk and eggs\ni keep thinking i'm not good enough for this course\ncall mum back\nmaybe learn guitar someday";

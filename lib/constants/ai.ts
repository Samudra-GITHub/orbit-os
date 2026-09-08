export type MessageRole = "user" | "assistant";
export type WidgetType = "weather" | "calendar" | "finance" | "focus";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  widget?: WidgetType;
}

export interface ConversationEntry {
  id: string;
  title: string;
  group: "Today" | "Yesterday" | "Earlier";
}

export const CONVERSATIONS: ConversationEntry[] = [
  { id: "conv-1", title: "Plan my launch week", group: "Today" },
  { id: "conv-2", title: "Summarize design sync notes", group: "Today" },
  { id: "conv-3", title: "Budget check for Q4", group: "Yesterday" },
  { id: "conv-4", title: "Draft onboarding copy", group: "Yesterday" },
  { id: "conv-5", title: "Weather for the weekend trip", group: "Earlier" },
  { id: "conv-6", title: "Focus schedule for this week", group: "Earlier" },
];

export const SUGGESTIONS: string[] = [
  "What does my day look like?",
  "How's the weather this week?",
  "Show my spending this month",
  "Start a focus session",
];

/** Keyword → canned response + optional widget, used to fake "understanding"
 *  without a real model. Falls back to GENERIC_RESPONSE otherwise. */
const RESPONSE_RULES: Array<{ keywords: string[]; content: string; widget?: WidgetType }> = [
  {
    keywords: ["weather", "forecast", "rain", "temperature"],
    content: "Here's the latest forecast for Bengaluru — partly cloudy with a light breeze through the afternoon.",
    widget: "weather",
  },
  {
    keywords: ["calendar", "schedule", "meeting", "day look"],
    content: "Your day has four events, with a clear two-hour block this afternoon if you want to protect it for deep work.",
    widget: "calendar",
  },
  {
    keywords: ["spend", "budget", "finance", "money"],
    content: "You're tracking under budget this month — 12% less than last month, mostly from lighter dining spend.",
    widget: "finance",
  },
  {
    keywords: ["focus", "deep work", "pomodoro", "session"],
    content: "You've completed 2 of 5 planned focus sessions today. Want me to queue up the next one?",
    widget: "focus",
  },
];

const GENERIC_RESPONSES = [
  "Got it — I don't have a live model wired up yet, but here's a mock take: that's noted for now.",
  "I hear you. This is a mock response for Sprint 6 — real reasoning comes once Orbit's AI is connected.",
  "Noted. I'm running on scripted responses right now, but the interface is ready for a live model.",
];

export function getMockResponse(input: string): { content: string; widget?: WidgetType } {
  const lower = input.toLowerCase();
  for (const rule of RESPONSE_RULES) {
    if (rule.keywords.some((k) => lower.includes(k))) {
      return { content: rule.content, widget: rule.widget };
    }
  }
  const pick = GENERIC_RESPONSES[input.length % GENERIC_RESPONSES.length];
  return { content: pick };
}

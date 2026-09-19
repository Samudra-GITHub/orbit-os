import dynamic from "next/dynamic";
import type { ChatMessage } from "@/lib/constants/ai";

const ChatCanvas = dynamic(() => import("@/components/ai/ChatCanvas").then((m) => m.ChatCanvas), {
  loading: () => <div className="h-full min-h-[400px] animate-pulse rounded-4xl bg-white/[0.03]" />,
});

const SEED_MESSAGES: ChatMessage[] = [
  { id: "seed-1", role: "user", content: "What does my day look like?" },
  {
    id: "seed-2",
    role: "assistant",
    content: "Your day has four events, with a clear two-hour block this afternoon if you want to protect it for deep work.",
    widget: "calendar",
  },
  { id: "seed-3", role: "user", content: "How's the weather this week?" },
  {
    id: "seed-4",
    role: "assistant",
    content: "Here's the latest forecast for Bengaluru — partly cloudy with a light breeze through the afternoon.",
    widget: "weather",
  },
];

export default function AIChatPage() {
  return <ChatCanvas initialMessages={SEED_MESSAGES} />;
}

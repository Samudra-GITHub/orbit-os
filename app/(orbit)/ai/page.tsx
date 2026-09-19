import dynamic from "next/dynamic";

const ChatCanvas = dynamic(() => import("@/components/ai/ChatCanvas").then((m) => m.ChatCanvas), {
  loading: () => <div className="h-full min-h-[400px] animate-pulse rounded-4xl bg-white/[0.03]" />,
});

export default function AIHomePage() {
  return <ChatCanvas />;
}

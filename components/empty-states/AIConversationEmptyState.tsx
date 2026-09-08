import { MessageSquare } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

/** A lighter-weight fallback for a fresh, empty AI conversation thread.
 *  ChatCanvas's own landing view (AIOrb + suggestion chips) is the primary,
 *  more branded empty state for `/ai` itself — this exists for any future
 *  spot (e.g. a standalone conversation panel) that wants something
 *  simpler and consistent with the rest of the empty-state library. */
export function AIConversationEmptyState() {
  return (
    <EmptyState
      icon={MessageSquare}
      title="No messages yet"
      description="Start the conversation and Orbit will pick up the context."
    />
  );
}

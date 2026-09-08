import { FileText } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

interface NotesEmptyStateProps {
  onCreate?: () => void;
}

/** For a space or search with zero notes. Not currently reachable — the
 *  workspace mock data always seeds a few notes — but ready for when notes
 *  can actually be created and deleted. */
export function NotesEmptyState({ onCreate }: NotesEmptyStateProps) {
  return (
    <EmptyState
      icon={FileText}
      title="No notes yet"
      description="Start writing and it'll show up here."
      action={
        onCreate && (
          <Button variant="secondary" size="sm" onClick={onCreate} className="mt-1 rounded-full">
            New note
          </Button>
        )
      }
    />
  );
}

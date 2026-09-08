import { KanbanSquare } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

interface ProjectsEmptyStateProps {
  onCreateCard?: () => void;
}

/** For a board with zero cards across every column. Not currently
 *  reachable — cards only ever move between columns, never vanish — but
 *  ready for when cards can be created and deleted. */
export function ProjectsEmptyState({ onCreateCard }: ProjectsEmptyStateProps) {
  return (
    <EmptyState
      icon={KanbanSquare}
      title="No cards yet"
      description="Add your first card to start tracking work on the board."
      action={
        onCreateCard && (
          <Button variant="secondary" size="sm" onClick={onCreateCard} className="mt-1 rounded-full">
            Add a card
          </Button>
        )
      }
    />
  );
}

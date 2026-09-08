import { Briefcase } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

interface WorkspaceEmptyStateProps {
  onCreateSpace?: () => void;
}

/** For a brand-new workspace with no spaces yet. Not currently reachable
 *  — mock data always seeds a few — but ready for real accounts. */
export function WorkspaceEmptyState({ onCreateSpace }: WorkspaceEmptyStateProps) {
  return (
    <EmptyState
      icon={Briefcase}
      title="Your workspace is empty"
      description="Create a space to start organizing notes, projects, and files."
      action={
        onCreateSpace && (
          <Button variant="secondary" size="sm" onClick={onCreateSpace} className="mt-1 rounded-full">
            Create a space
          </Button>
        )
      }
    />
  );
}

import { SearchX } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

interface SearchEmptyStateProps {
  query?: string;
  className?: string;
}

/** Genuinely reachable — shown in the Command Center when a search
 *  matches nothing. */
export function SearchEmptyState({ query, className }: SearchEmptyStateProps) {
  return (
    <EmptyState
      icon={SearchX}
      title="No matches"
      description={query ? `Nothing found for "${query}". Try a different term.` : "Try a different search term."}
      className={className}
    />
  );
}

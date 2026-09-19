import dynamic from "next/dynamic";

const NotesEditor = dynamic(() => import("@/components/workspace/NotesEditor").then((m) => m.NotesEditor), {
  loading: () => <div className="h-full min-h-[400px] animate-pulse rounded-4xl bg-white/[0.03]" />,
});

export default function WorkspaceNotesPage() {
  return <NotesEditor />;
}

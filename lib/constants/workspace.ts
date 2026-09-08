export interface NoteStub {
  id: string;
  title: string;
  icon: string;
}

export const NOTES: NoteStub[] = [
  { id: "product-launch", title: "Product Launch Plan", icon: "🚀" },
  { id: "meeting-notes", title: "Design Sync Notes", icon: "📝" },
  { id: "research", title: "Competitor Research", icon: "🔍" },
];

export interface SpaceGroup {
  id: string;
  label: string;
  items: NoteStub[];
}

export const SPACES: SpaceGroup[] = [
  {
    id: "personal",
    label: "Personal",
    items: [
      { id: "journal", title: "Daily Journal", icon: "📓" },
      { id: "reading-list", title: "Reading List", icon: "📚" },
    ],
  },
  {
    id: "product",
    label: "Product Launch",
    items: NOTES,
  },
  {
    id: "marketing",
    label: "Marketing",
    items: [
      { id: "campaign", title: "Q4 Campaign", icon: "📣" },
      { id: "social", title: "Social Calendar", icon: "📅" },
    ],
  },
];

export type KanbanColumnId = "ideas" | "designing" | "building" | "testing" | "completed";

export interface KanbanColumn {
  id: KanbanColumnId;
  label: string;
}

export const KANBAN_COLUMNS: KanbanColumn[] = [
  { id: "ideas", label: "Ideas" },
  { id: "designing", label: "Designing" },
  { id: "building", label: "Building" },
  { id: "testing", label: "Testing" },
  { id: "completed", label: "Completed" },
];

export type CardPriority = "low" | "medium" | "high";

export interface KanbanCard {
  id: string;
  title: string;
  tag: string;
  priority: CardPriority;
  columnId: KanbanColumnId;
}

export const INITIAL_KANBAN_CARDS: KanbanCard[] = [
  { id: "card-1", title: "Explore onboarding concepts", tag: "Research", priority: "medium", columnId: "ideas" },
  { id: "card-2", title: "Voice command palette", tag: "Feature", priority: "low", columnId: "ideas" },
  { id: "card-3", title: "Redesign hero card", tag: "Design", priority: "high", columnId: "designing" },
  { id: "card-4", title: "Liquid glass tokens v2", tag: "Design", priority: "medium", columnId: "designing" },
  { id: "card-5", title: "Command center keyboard nav", tag: "Engineering", priority: "high", columnId: "building" },
  { id: "card-6", title: "SkyCast live data pipeline", tag: "Engineering", priority: "high", columnId: "building" },
  { id: "card-7", title: "Focus timer QA pass", tag: "QA", priority: "medium", columnId: "testing" },
  { id: "card-8", title: "Cross-browser glass blur check", tag: "QA", priority: "low", columnId: "testing" },
  { id: "card-9", title: "Cosmic background system", tag: "Design", priority: "medium", columnId: "completed" },
  { id: "card-10", title: "Sidebar microinteractions", tag: "Engineering", priority: "low", columnId: "completed" },
];

export type FileKind = "folder" | "doc" | "image" | "pdf" | "sheet";

export interface FileNode {
  id: string;
  name: string;
  kind: FileKind;
  size?: string;
  modified?: string;
  children?: FileNode[];
  preview?: string;
}

export const FILE_TREE: FileNode[] = [
  {
    id: "product",
    name: "Product Launch",
    kind: "folder",
    children: [
      { id: "brief", name: "Launch Brief.doc", kind: "doc", size: "24 KB", modified: "2 days ago", preview: "A concise brief covering positioning, timeline, and success metrics for the Orbit OS launch." },
      { id: "roadmap", name: "Roadmap.sheet", kind: "sheet", size: "58 KB", modified: "1 week ago", preview: "Quarterly roadmap tracking milestones across design, engineering, and marketing." },
      { id: "hero-shot", name: "Hero Shot.png", kind: "image", size: "1.2 MB", modified: "3 days ago" },
    ],
  },
  {
    id: "design",
    name: "Design Assets",
    kind: "folder",
    children: [
      { id: "tokens", name: "Design Tokens.pdf", kind: "pdf", size: "310 KB", modified: "5 days ago", preview: "The full Orbit design token reference — color, radius, shadow, and motion scales." },
      { id: "wallpaper", name: "Aurora Wallpaper.png", kind: "image", size: "2.4 MB", modified: "1 day ago" },
    ],
  },
  { id: "notes-export", name: "Meeting Notes.doc", kind: "doc", size: "12 KB", modified: "Today", preview: "Notes from today's design sync — action items and follow-ups." },
];

export type AIContextTopic = "home" | "notes" | "projects" | "files";

export const AI_SUGGESTIONS: Record<AIContextTopic, string[]> = {
  home: ["Summarize my open work", "Draft today's stand-up notes", "What needs my attention?"],
  notes: ["Improve this paragraph", "Generate a summary", "Fix grammar and tone", "Turn this into a checklist"],
  projects: ["Suggest next steps for Designing", "Flag cards stuck too long", "Draft a status update"],
  files: ["Summarize this document", "Extract action items", "Find related files"],
};

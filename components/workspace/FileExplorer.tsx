"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Folder, FileText, Image as ImageIcon, FileSpreadsheet, File as FileIcon } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { FilePreview } from "@/components/workspace/FilePreview";
import { FILE_TREE, type FileKind, type FileNode } from "@/lib/constants/workspace";
import { cn } from "@/lib/utils";

const KIND_ICON: Record<FileKind, typeof FileText> = {
  folder: Folder,
  doc: FileText,
  sheet: FileSpreadsheet,
  pdf: FileIcon,
  image: ImageIcon,
};

interface FileRowProps {
  node: FileNode;
  depth: number;
  selectedId: string | null;
  onSelect: (node: FileNode) => void;
}

function FileRow({ node, depth, selectedId, onSelect }: FileRowProps) {
  const [open, setOpen] = useState(depth === 0);
  const isFolder = node.kind === "folder";
  const Icon = KIND_ICON[node.kind];

  return (
    <div>
      <button
        onClick={() => (isFolder ? setOpen((o) => !o) : onSelect(node))}
        className={cn(
          "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition-colors",
          selectedId === node.id ? "bg-white/10 text-white" : "text-mist-300 hover:bg-white/5 hover:text-white"
        )}
        style={{ paddingLeft: `${8 + depth * 16}px` }}
      >
        {isFolder ? (
          <ChevronRight className={cn("h-3.5 w-3.5 shrink-0 transition-transform", open && "rotate-90")} />
        ) : (
          <span className="w-3.5 shrink-0" />
        )}
        <Icon className="h-3.5 w-3.5 shrink-0 text-cyan-300" strokeWidth={1.75} />
        <span className="truncate">{node.name}</span>
      </button>

      <AnimatePresence initial={false}>
        {isFolder && open && node.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {node.children.map((child) => (
              <FileRow key={child.id} node={child} depth={depth + 1} selectedId={selectedId} onSelect={onSelect} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FileExplorer() {
  const [selected, setSelected] = useState<FileNode | null>(null);

  return (
    <div className="flex h-full gap-4">
      <GlassSurface intensity="subtle" interactive={false} className="w-64 shrink-0 overflow-y-auto rounded-3xl p-3">
        <p className="px-2 pb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-mist-500">Files</p>
        <div className="flex flex-col gap-0.5">
          {FILE_TREE.map((node) => (
            <FileRow key={node.id} node={node} depth={0} selectedId={selected?.id ?? null} onSelect={setSelected} />
          ))}
        </div>
      </GlassSurface>

      <GlassSurface intensity="default" interactive={false} className="min-w-0 flex-1 overflow-y-auto rounded-3xl">
        <FilePreview file={selected} />
      </GlassSurface>
    </div>
  );
}

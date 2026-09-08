"use client";

import { motion } from "framer-motion";
import { FileText, Image as ImageIcon, FileSpreadsheet, File as FileIcon, FolderOpen } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import type { FileKind, FileNode } from "@/lib/constants/workspace";

const KIND_ICON: Record<FileKind, typeof FileText> = {
  folder: FolderOpen,
  doc: FileText,
  sheet: FileSpreadsheet,
  pdf: FileIcon,
  image: ImageIcon,
};

interface FilePreviewProps {
  file: FileNode | null;
}

export function FilePreview({ file }: FilePreviewProps) {
  if (!file) {
    return (
      <EmptyState
        icon={FolderOpen}
        title="No file selected"
        description="Choose a file from the list to preview its contents here."
      />
    );
  }

  const Icon = KIND_ICON[file.kind];

  return (
    <motion.div
      key={file.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex h-full flex-col gap-5 p-6"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/25 to-cyan-400/25">
          <Icon className="h-5 w-5 text-cyan-300" strokeWidth={1.75} />
        </div>
        <div>
          <p className="font-medium text-white">{file.name}</p>
          <p className="text-xs text-mist-400">
            {file.size} · {file.modified}
          </p>
        </div>
      </div>

      {file.kind === "image" ? (
        <div className="flex h-56 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20">
          <ImageIcon className="h-10 w-10 text-white/50" strokeWidth={1.25} />
        </div>
      ) : (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 text-sm leading-relaxed text-mist-300">
          {file.preview ?? "No preview available for this file type yet."}
        </div>
      )}
    </motion.div>
  );
}

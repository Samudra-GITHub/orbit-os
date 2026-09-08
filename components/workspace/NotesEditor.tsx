"use client";

import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { FloatingToolbar } from "@/components/workspace/FloatingToolbar";
import { cn } from "@/lib/utils";

interface ToolbarState {
  top: number;
  left: number;
}

const INITIAL_CHECKLIST = [
  { id: "c1", text: "Finalize launch messaging", done: true },
  { id: "c2", text: "Record product walkthrough video", done: true },
  { id: "c3", text: "Brief the support team", done: false },
  { id: "c4", text: "Schedule social announcements", done: false },
];

/**
 * A lightweight block-based note editor: each text block is a real
 * contentEditable element (genuinely typeable), and selecting text inside
 * the editor surfaces a floating formatting toolbar driven by
 * document.execCommand — no editor framework dependency needed for this
 * sprint's scope.
 */
export function NotesEditor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const [toolbar, setToolbar] = useState<ToolbarState | null>(null);
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);

  function updateToolbarFromSelection() {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
      setToolbar(null);
      return;
    }
    const range = sel.getRangeAt(0);
    if (!editorRef.current?.contains(range.commonAncestorContainer)) {
      setToolbar(null);
      return;
    }
    const rect = range.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
      setToolbar(null);
      return;
    }
    setToolbar({ top: rect.top - 48, left: rect.left + rect.width / 2 });
  }

  function handleCommand(command: string) {
    if (command.startsWith("formatBlock:")) {
      document.execCommand("formatBlock", false, command.split(":")[1]);
    } else {
      document.execCommand(command);
    }
  }

  function toggleChecklistItem(id: string) {
    setChecklist((items) => items.map((i) => (i.id === id ? { ...i, done: !i.done } : i)));
  }

  return (
    <GlassSurface intensity="default" interactive={false} className="flex h-full flex-col rounded-4xl">
      <div
        ref={editorRef}
        onMouseUp={updateToolbarFromSelection}
        onKeyUp={updateToolbarFromSelection}
        className="flex-1 overflow-y-auto px-8 py-8"
      >
        <div
          contentEditable
          suppressContentEditableWarning
          className="font-display text-3xl font-semibold text-white outline-none"
        >
          Product Launch Plan
        </div>
        <p className="mt-1 text-xs text-mist-500">Edited today · Product Launch space</p>

        <div className="mt-6 flex flex-col gap-5 text-sm leading-relaxed text-mist-300">
          <h2
            contentEditable
            suppressContentEditableWarning
            className="font-display text-xl font-semibold text-white outline-none"
          >
            Overview
          </h2>
          <p contentEditable suppressContentEditableWarning className="outline-none">
            Orbit OS launches with a cinematic onboarding, a Liquid Glass dashboard, and a fully live weather
            engine. This note tracks what&rsquo;s left before we ship.
          </p>

          <div className="flex gap-3 rounded-2xl border border-violet-400/20 bg-violet-500/10 p-4">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
            <p contentEditable suppressContentEditableWarning className="text-white/90 outline-none">
              Tip: keep the launch note short — link out to detailed specs instead of duplicating them here.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {checklist.map((item) => (
              <label key={item.id} className="flex items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => toggleChecklistItem(item.id)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-white/5 accent-violet-500"
                />
                <span
                  contentEditable
                  suppressContentEditableWarning
                  className={cn("outline-none", item.done && "text-mist-500 line-through")}
                >
                  {item.text}
                </span>
              </label>
            ))}
          </div>

          <blockquote
            contentEditable
            suppressContentEditableWarning
            className="border-l-2 border-cyan-400/40 pl-4 italic text-mist-300 outline-none"
          >
            &ldquo;Ship the smallest thing that proves the idea, then iterate in public.&rdquo;
          </blockquote>

          <pre className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-black/30 p-4 font-mono text-xs text-cyan-200">
            <code contentEditable suppressContentEditableWarning className="outline-none">
              {`const launch = {\n  version: "1.0.0",\n  codename: "Genesis",\n};`}
            </code>
          </pre>

          <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.04] text-mist-400">
                <tr>
                  <th className="px-3 py-2 font-medium">Milestone</th>
                  <th className="px-3 py-2 font-medium">Owner</th>
                  <th className="px-3 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                <tr>
                  <td className="px-3 py-2 text-white">Design freeze</td>
                  <td className="px-3 py-2 text-mist-300">Ravi</td>
                  <td className="px-3 py-2 text-cyan-300">Done</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 text-white">Beta rollout</td>
                  <td className="px-3 py-2 text-mist-300">Priya</td>
                  <td className="px-3 py-2 text-amber-300">In progress</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 text-white">Public launch</td>
                  <td className="px-3 py-2 text-mist-300">Team</td>
                  <td className="px-3 py-2 text-mist-400">Upcoming</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-white/15 bg-gradient-to-br from-violet-500/10 to-cyan-400/10 text-xs text-mist-400">
            Image placeholder — hero-shot.png
          </div>

          <h2
            contentEditable
            suppressContentEditableWarning
            className="font-display text-xl font-semibold text-white outline-none"
          >
            Next steps
          </h2>
          <p contentEditable suppressContentEditableWarning className="outline-none">
            Finish the checklist above, then move this note&rsquo;s linked project cards from Testing to
            Completed.
          </p>
        </div>
      </div>

      <AnimatePresence>
        {toolbar && <FloatingToolbar top={toolbar.top} left={toolbar.left} onCommand={handleCommand} />}
      </AnimatePresence>
    </GlassSurface>
  );
}

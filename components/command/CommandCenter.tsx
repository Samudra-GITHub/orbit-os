"use client";

import { motion, type Variants } from "framer-motion";
import { Command } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { CommandOverlay } from "@/components/command/CommandOverlay";
import { SearchInput } from "@/components/command/SearchInput";
import { CommandItem } from "@/components/command/CommandItem";
import { SuggestionChip } from "@/components/command/SuggestionChip";
import { RecentCommand } from "@/components/command/RecentCommand";
import { SearchEmptyState } from "@/components/empty-states/SearchEmptyState";
import { useCommandPalette } from "@/lib/hooks/useCommandPalette";

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Orbit's global command center — Ctrl/Cmd+K anywhere opens it. This is the
 * single source of truth for the palette; screens that want a "search"
 * entry point (like the hero card) should dispatch a synthetic ctrl+k
 * keydown rather than building their own search UI.
 */
export function CommandCenter() {
  const {
    open,
    setOpen,
    close,
    query,
    setQuery,
    results,
    suggested,
    navigation,
    isSearching,
    activeIndex,
    setActiveIndex,
    itemRefs,
    runCommand,
    handleInputKeyDown,
    recentCommands,
  } = useCommandPalette();

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 sm:bottom-8 sm:right-8">
        <Button
          variant="icon"
          size="lg"
          magnetic
          aria-label="Open command center"
          onClick={() => setOpen(true)}
          className="h-14 w-14 rounded-full bg-white text-ink-900 shadow-glow-command hover:bg-white animate-breathe"
        >
          <Command className="h-5 w-5" strokeWidth={2} />
        </Button>
      </div>

      <CommandOverlay open={open} onClose={close}>
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          onClick={(e) => e.stopPropagation()}
          className="w-[90vw] max-w-lg"
          role="listbox"
          aria-label="Command center"
        >
          <GlassSurface intensity="overlay" interactive={false} className="overflow-hidden rounded-[36px]">
            <SearchInput value={query} onChange={setQuery} onKeyDown={handleInputKeyDown} onClose={close} />

            <div className="max-h-[55vh] overflow-y-auto p-3">
              {isSearching ? (
                results.length > 0 ? (
                  <motion.ul variants={listVariants} initial="hidden" animate="show" className="flex flex-col gap-0.5">
                    {results.map((command, i) => (
                      <motion.li key={command.id} variants={itemVariants}>
                        <CommandItem
                          ref={(el) => {
                            itemRefs.current[i] = el;
                          }}
                          icon={command.icon}
                          label={command.label}
                          active={i === activeIndex}
                          onMouseEnter={() => setActiveIndex(i)}
                          onClick={() => runCommand(command)}
                        />
                      </motion.li>
                    ))}
                  </motion.ul>
                ) : (
                  <SearchEmptyState query={query} className="py-6" />
                )
              ) : (
                <motion.div variants={listVariants} initial="hidden" animate="show" className="flex flex-col gap-4">
                  {suggested.length > 0 && (
                    <div>
                      <p className="px-1 pb-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-mist-500">
                        Suggested
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {suggested.map((command) => {
                          const i = results.indexOf(command);
                          return (
                            <motion.div key={command.id} variants={itemVariants}>
                              <SuggestionChip
                                ref={(el) => {
                                  itemRefs.current[i] = el;
                                }}
                                icon={command.icon}
                                label={command.label}
                                active={i === activeIndex}
                                onMouseEnter={() => setActiveIndex(i)}
                                onClick={() => runCommand(command)}
                              />
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {navigation.length > 0 && (
                    <div>
                      <p className="px-1 pb-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-mist-500">
                        Navigate
                      </p>
                      <ul className="flex flex-col gap-0.5">
                        {navigation.map((command) => {
                          const i = results.indexOf(command);
                          return (
                            <motion.li key={command.id} variants={itemVariants}>
                              <CommandItem
                                ref={(el) => {
                                  itemRefs.current[i] = el;
                                }}
                                icon={command.icon}
                                label={command.label}
                                active={i === activeIndex}
                                onMouseEnter={() => setActiveIndex(i)}
                                onClick={() => runCommand(command)}
                              />
                            </motion.li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {recentCommands.length > 0 && (
                    <div>
                      <p className="px-1 pb-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-mist-500">
                        Recent
                      </p>
                      <ul className="flex flex-col gap-0.5">
                        {recentCommands.map((recent) => (
                          <motion.li key={recent.id} variants={itemVariants}>
                            <RecentCommand icon={recent.icon} label={recent.label} onClick={close} />
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </GlassSurface>
        </motion.div>
      </CommandOverlay>
    </>
  );
}

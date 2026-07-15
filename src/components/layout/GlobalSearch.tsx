'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles, X } from 'lucide-react';
import { TOOLS, ToolConfig } from '@/config/tools';

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ToolConfig[]>([]);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  // Toggle modal with Ctrl/Cmd + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Handle search matching
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const matched = Object.values(TOOLS).filter(
      (tool) =>
        tool.h1.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.keywords.some((kw) => kw.toLowerCase().includes(q))
    );
    setResults(matched.slice(0, 5));
  }, [query]);

  const handleSelect = (toolId: string) => {
    setIsOpen(false);
    setQuery('');
    router.push(`/${toolId}`);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border/80 bg-muted/50 hover:bg-muted text-muted-foreground transition-all duration-200 text-sm cursor-pointer select-none"
      >
        <Search className="w-4 h-4" />
        <span className="hidden md:inline">Search tools...</span>
        <kbd className="hidden md:inline-flex h-5 select-none items-center gap-0.5 rounded border border-border bg-card px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4">
          <div
            ref={searchRef}
            className="w-full max-w-lg glass-panel rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-center border-b border-border px-4 py-3">
              <Search className="w-5 h-5 text-muted-foreground mr-3" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find a PDF tool (e.g., Merge, OCR, Compress)..."
                className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-base focus:ring-0"
                autoFocus
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-muted/80 text-muted-foreground transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-72 overflow-y-auto p-2">
              {results.length > 0 ? (
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-3 py-2">
                    Search Results
                  </p>
                  {results.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => handleSelect(tool.id)}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted text-left transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                          {tool.h1}
                        </div>
                        <div className="text-xs text-muted-foreground truncate max-w-xs md:max-w-sm">
                          {tool.description}
                        </div>
                      </div>
                      <Sparkles className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              ) : query ? (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  No tools found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-3 py-2">
                    Popular Tools
                  </p>
                  {Object.values(TOOLS)
                    .filter((t) => t.popular)
                    .slice(0, 4)
                    .map((tool) => (
                      <button
                        key={tool.id}
                        onClick={() => handleSelect(tool.id)}
                        className="w-full flex items-center p-3 rounded-xl hover:bg-muted text-left transition-colors cursor-pointer group"
                      >
                        <div className="mr-3 p-2 rounded-lg bg-primary/10 text-primary">
                          <Search className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground text-sm">
                            {tool.h1}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {tool.description}
                          </div>
                        </div>
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon, Menu, X, ChevronDown, FileText, LayoutGrid, ShieldAlert, Award } from 'lucide-react';
import GlobalSearch from './GlobalSearch';

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Load and apply theme
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDarkMode = theme === 'dark' || (!theme && systemPrefersDark);
    
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-primary to-indigo-500 text-white font-bold text-lg leading-none shadow-md shadow-primary/20 hover:scale-105 transition-transform duration-200">
              PDF
            </div>
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:text-primary transition-colors">
              Combiner<span className="text-primary">.free</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              All Tools
            </Link>
            <Link
              href="/blog"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname.startsWith('/blog') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Blog
            </Link>
            <Link
              href="/admin"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname.startsWith('/admin') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Dashboard
            </Link>
          </nav>
        </div>

        {/* Right Nav Options */}
        <div className="flex items-center gap-3">
          <GlobalSearch />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-border/80 bg-muted/30 hover:bg-muted/80 text-foreground transition-all duration-200 cursor-pointer"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>

          {/* Premium CTA */}
          <Link
            href="/admin"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-tr from-primary to-indigo-500 text-white hover:opacity-90 shadow-md shadow-primary/20 transition-all duration-200"
          >
            <Award className="w-3.5 h-3.5" />
            Go Premium
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-border/80 text-foreground hover:bg-muted/80 transition-all cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-background px-4 py-4 space-y-3 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-2">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl hover:bg-muted font-medium text-sm text-foreground"
            >
              All PDF Tools
            </Link>
            <Link
              href="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl hover:bg-muted font-medium text-sm text-foreground"
            >
              Blog & Guides
            </Link>
            <Link
              href="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl hover:bg-muted font-medium text-sm text-foreground"
            >
              Admin Dashboard
            </Link>
          </nav>
          <div className="pt-2 border-t border-border">
            <Link
              href="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl font-semibold text-sm bg-gradient-to-tr from-primary to-indigo-500 text-white shadow-md"
            >
              <Award className="w-4 h-4" />
              Go Premium
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

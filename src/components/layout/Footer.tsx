import Link from 'next/link';
import { Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-primary to-indigo-500 text-white font-bold text-base leading-none shadow-md">
                PDF
              </div>
              <span className="font-extrabold text-base tracking-tight text-foreground">
                PDF Combiner<span className="text-primary">.free</span>
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              Free, browser-native client-side PDF tools. Protect your data by processing files locally—no server uploads, no queues, absolute security.
            </p>
            {/* Newsletter */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Newsletter</h4>
              <div className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 rounded-xl text-xs bg-background border border-border outline-none focus:border-primary text-foreground placeholder:text-muted-foreground"
                />
                <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold rounded-xl transition-all cursor-pointer">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Column 1: Organize */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">Organize</h3>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/merge-pdf" className="text-muted-foreground hover:text-primary transition-colors">
                  Merge PDF
                </Link>
              </li>
              <li>
                <Link href="/split-pdf" className="text-muted-foreground hover:text-primary transition-colors">
                  Split PDF
                </Link>
              </li>
              <li>
                <Link href="/rotate-pdf" className="text-muted-foreground hover:text-primary transition-colors">
                  Rotate PDF
                </Link>
              </li>
              <li>
                <Link href="/delete-pdf-pages" className="text-muted-foreground hover:text-primary transition-colors">
                  Delete PDF Pages
                </Link>
              </li>
              <li>
                <Link href="/reorder-pdf-pages" className="text-muted-foreground hover:text-primary transition-colors">
                  Reorder PDF Pages
                </Link>
              </li>
              <li>
                <Link href="/organize-pdf" className="text-muted-foreground hover:text-primary transition-colors">
                  Organize PDF Layout
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Convert to PDF */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">Convert to PDF</h3>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/jpg-to-pdf" className="text-muted-foreground hover:text-primary transition-colors">
                  JPG to PDF
                </Link>
              </li>
              <li>
                <Link href="/png-to-pdf" className="text-muted-foreground hover:text-primary transition-colors">
                  PNG to PDF
                </Link>
              </li>
              <li>
                <Link href="/word-to-pdf" className="text-muted-foreground hover:text-primary transition-colors">
                  Word to PDF
                </Link>
              </li>
              <li>
                <Link href="/excel-to-pdf" className="text-muted-foreground hover:text-primary transition-colors">
                  Excel to PDF
                </Link>
              </li>
              <li>
                <Link href="/html-to-pdf" className="text-muted-foreground hover:text-primary transition-colors">
                  HTML to PDF
                </Link>
              </li>
              <li>
                <Link href="/scan-to-pdf" className="text-muted-foreground hover:text-primary transition-colors">
                  Scan to PDF
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Security & Optimize */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">Security & Edit</h3>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/compress-pdf" className="text-muted-foreground hover:text-primary transition-colors">
                  Compress PDF
                </Link>
              </li>
              <li>
                <Link href="/protect-pdf" className="text-muted-foreground hover:text-primary transition-colors">
                  Password Protect
                </Link>
              </li>
              <li>
                <Link href="/unlock-pdf" className="text-muted-foreground hover:text-primary transition-colors">
                  Unlock PDF
                </Link>
              </li>
              <li>
                <Link href="/sign-pdf" className="text-muted-foreground hover:text-primary transition-colors">
                  Sign PDF Online
                </Link>
              </li>
              <li>
                <Link href="/watermark-pdf" className="text-muted-foreground hover:text-primary transition-colors">
                  Watermark PDF
                </Link>
              </li>
              <li>
                <Link href="/ocr-pdf" className="text-muted-foreground hover:text-primary transition-colors">
                  OCR Text Scan
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-border/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" /> for secure workflows. &copy; {new Date().getFullYear()} PDF Combiner Free. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-xs font-medium">
            <Link href="/sitemap.xml" className="text-muted-foreground hover:text-primary transition-colors">
              Sitemap
            </Link>
            <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
              Articles
            </Link>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter link">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub link">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Sticky Bottom/Anchor AdSense Placeholder */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 border-t border-border flex items-center justify-center p-2 md:p-3 shadow-lg select-none">
        <div className="text-[10px] text-muted-foreground absolute top-1 left-2 font-bold uppercase tracking-widest scale-75 origin-top-left">ADVERTISEMENT</div>
        <div className="w-full max-w-[728px] h-[50px] bg-muted/60 rounded flex items-center justify-center border border-border/60 text-xs text-muted-foreground font-semibold">
          Responsive Anchor Banner [AdSense Ready]
        </div>
      </div>
    </footer>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TOOLS } from '@/config/tools';
import { 
  Merge, Split, Minimize2, Image as ImageIcon, FileImage, FileText, FileEdit, FileSpreadsheet, 
  Presentation, RotateCw, Trash2, Download, Sliders, Stamp, Unlock, Lock, Hash, Crop, Maximize2, 
  Wrench, ScanText, PenTool, Columns, LayoutGrid, Code, Images, Camera, Search, HelpCircle, 
  ChevronDown, ChevronUp, ShieldCheck, Zap, Heart, Star, Sparkles
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', name: 'All Tools' },
  { id: 'organize', name: 'Organize PDF' },
  { id: 'convert-to', name: 'Convert to PDF' },
  { id: 'convert-from', name: 'Convert from PDF' },
  { id: 'optimize', name: 'Optimize & Edit' },
  { id: 'security', name: 'Sign & Security' },
  { id: 'advanced', name: 'Advanced Tools' }
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({});

  // Map icon names from TOOLS configuration to actual Lucide component elements
  const getIcon = (name: string) => {
    const icons: Record<string, any> = {
      Merge, Split, Minimize2, Image: ImageIcon, FileImage, FileText, FileEdit, FileSpreadsheet,
      Presentation, RotateCw, Trash2, Download, Sliders, Stamp, Unlock, Lock, Hash, Crop, Maximize2,
      Wrench, ScanText, PenTool, Columns, LayoutGrid, Code, Images, Camera
    };
    const Component = icons[name] || FileText;
    return <Component className="w-5 h-5" />;
  };

  const filteredTools = Object.values(TOOLS).filter(
    (tool) => activeCategory === 'all' || tool.category === activeCategory
  );

  const toggleFaq = (index: number) => {
    setFaqOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const homepageFaqs = [
    { q: "How are my files secure on this platform?", a: "Unlike standard PDF websites, we use browser-native client-side processing. Your PDF pages are drawn, merged, or split directly inside your browser memory using local Javascript. Files are never uploaded to any server, ensuring absolute confidentiality." },
    { q: "Is there a limit on how many files I can convert?", a: "No! Since we run calculations on your local device CPU, we do not pay hosting server bandwidth costs. This allows us to offer completely free, unlimited operations with no daily caps." },
    { q: "What is a PWA, and how do I install this site as an app?", a: "This platform is built as a Progressive Web App (PWA). If you are using Google Chrome or Microsoft Edge, click the install icon in the URL bar to launch it as a standalone app on your desktop, which runs offline." }
  ];

  return (
    <div className="space-y-16 animate-in fade-in duration-300">
      
      {/* Hero Section */}
      <section className="text-center py-10 md:py-16 space-y-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold hover:scale-105 transition-all">
          <Sparkles className="w-3.5 h-3.5" />
          100% Client-Side PDF Processing
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] leading-none">
          The Secure, Instant Way <br />
          to <span className="bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">Manage Your PDFs</span>
        </h1>
        
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Combine, compress, convert, sign, and organize your files directly inside your web browser. No uploads, absolute privacy, and infinite free scaling.
        </p>
      </section>

      {/* Ads Banner Placeholder */}
      <div className="w-full h-24 bg-muted/40 rounded-2xl flex items-center justify-center border border-border/60 relative overflow-hidden select-none">
        <div className="text-[10px] text-muted-foreground absolute top-1 left-2 font-bold uppercase tracking-widest scale-75 origin-top-left">ADVERTISEMENT</div>
        <div className="text-xs text-muted-foreground font-semibold">Responsive Homepage Leaderboard [AdSense Ready]</div>
      </div>

      {/* Categories Filter Tabs */}
      <section className="space-y-8">
        <div className="flex gap-2 pb-2 overflow-x-auto justify-start md:justify-center border-b border-border/60">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Tools Dashboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredTools.map((tool) => (
            <Link
              key={tool.id}
              href={`/${tool.id}`}
              className="group p-5 rounded-2xl border border-border/80 bg-card hover:border-primary/40 hover-glow transition-all flex flex-col justify-between h-[160px] cursor-pointer"
            >
              <div className="space-y-2">
                <div className="p-2 w-fit rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-200">
                  {getIcon(tool.iconName)}
                </div>
                <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors duration-150">
                  {tool.h1}
                </h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                  {tool.description}
                </p>
              </div>
              
              <span className="text-[10px] font-bold text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Open Tool
                <span className="transform translate-x-0 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust & Performance Seal */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
        <div className="glass-panel p-6 rounded-2xl space-y-3">
          <div className="p-3 w-fit rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base">Privacy by Design</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            By running completely client-side in browser sandboxes, your files are never uploaded, keeping sensitive business contracts or personal IDs perfectly safe.
          </p>
        </div>
        
        <div className="glass-panel p-6 rounded-2xl space-y-3">
          <div className="p-3 w-fit rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base">Instant Performance</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Skip long upload queues and network bandwidth limits. Merging, splitting, or watermarking large documents executes instantly on your device.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl space-y-3">
          <div className="p-3 w-fit rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base">100% Free & Open</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Access OCR, digital signatures, page numbering, file compressions, and page rotations without creating accounts, entering credit cards, or facing limits.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="glass-panel p-8 rounded-3xl space-y-6">
        <h2 className="text-2xl font-bold text-center">What Users Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-4 rounded-2xl bg-muted/20 border border-border/40 space-y-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
            </div>
            <p className="text-xs text-muted-foreground italic leading-relaxed">
              &ldquo;This is a game-changer. As a lawyer, uploading client files to external converters always worried me. Doing OCR and merges locally inside the browser is brilliant.&rdquo;
            </p>
            <p className="text-xs font-bold text-foreground">- Mark S., Senior Counsel</p>
          </div>
          
          <div className="p-4 rounded-2xl bg-muted/20 border border-border/40 space-y-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
            </div>
            <p className="text-xs text-muted-foreground italic leading-relaxed">
              &ldquo;No limits! I combined a 300MB photo compilation into a single PDF instantly. Standard sites locked me out after 2 files, but this site did it for free.&rdquo;
            </p>
            <p className="text-xs font-bold text-foreground">- Elena K., Designer</p>
          </div>
        </div>
      </section>

      {/* FAQs Drawer (Google Schema Accordion) */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4 pt-2">
          {homepageFaqs.map((faq, index) => {
            const isOpen = faqOpen[index];
            return (
              <div key={index} className="border border-border/80 rounded-2xl overflow-hidden bg-card transition-all">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 md:p-5 font-bold text-sm text-left text-foreground hover:bg-muted/40 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </button>
                {isOpen && (
                  <div className="p-5 pt-0 text-xs text-muted-foreground leading-relaxed border-t border-border/30 bg-background/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}

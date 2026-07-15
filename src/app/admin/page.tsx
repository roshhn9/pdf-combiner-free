'use client';

import { useState, useEffect } from 'react';
import { TOOLS, ToolConfig } from '@/config/tools';
import { BLOG_POSTS, BlogPostType } from '@/config/blog';
import { GLOBAL_FAQS, FAQItem } from '@/config/faqs';
import { 
  BarChart3, Settings2, FileText, HelpCircle, Layout, ToggleLeft, ToggleRight, Plus, 
  Trash2, Edit, Save, ArrowUpRight, ShieldCheck, Zap, DollarSign, Users, RefreshCw
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'tools' | 'blog' | 'faqs' | 'ads'>('analytics');
  
  // Stateful configurations synced with localStorage for demo persistency
  const [adSettings, setAdSettings] = useState({
    anchorAds: true,
    headerAds: true,
    sidebarAds: true,
    inContentAds: true,
  });

  const [toolsList, setToolsList] = useState<ToolConfig[]>([]);
  const [faqsList, setFaqsList] = useState<FAQItem[]>([]);
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [faqInput, setFaqInput] = useState({ question: '', answer: '', category: 'general' as any });

  useEffect(() => {
    // Set lists from static config on mount
    setToolsList(Object.values(TOOLS));
    setFaqsList(GLOBAL_FAQS);
    
    const savedAds = localStorage.getItem('admin_ad_settings');
    if (savedAds) {
      setAdSettings(JSON.parse(savedAds));
    }
  }, []);

  const toggleAdSetting = (key: keyof typeof adSettings) => {
    const nextSettings = { ...adSettings, [key]: !adSettings[key] };
    setAdSettings(nextSettings);
    localStorage.setItem('admin_ad_settings', JSON.stringify(nextSettings));
  };

  const handleSaveFaq = () => {
    if (!faqInput.question || !faqInput.answer) return;

    if (editingFaqId) {
      setFaqsList(prev => prev.map(f => f.id === editingFaqId ? { ...f, ...faqInput } : f));
      setEditingFaqId(null);
    } else {
      const newFaq: FAQItem = {
        id: `f_new_${Date.now()}`,
        ...faqInput
      };
      setFaqsList(prev => [newFaq, ...prev]);
    }
    setFaqInput({ question: '', answer: '', category: 'general' });
  };

  const handleEditFaq = (faq: FAQItem) => {
    setEditingFaqId(faq.id);
    setFaqInput({ question: faq.question, answer: faq.answer, category: faq.category });
  };

  const handleDeleteFaq = (id: string) => {
    setFaqsList(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Info */}
      <section className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground">Admin Management Dashboard</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Configure site metadata, manage FAQs, toggle AdSense units, and monitor platform performance.
          </p>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            Vercel Deployment: Live
          </span>
        </div>
      </section>

      {/* Tabs navigation */}
      <section className="flex gap-2 pb-2 overflow-x-auto border-b border-border/60">
        {[
          { id: 'analytics', name: 'Analytics', icon: BarChart3 },
          { id: 'tools', name: 'Manage Tools', icon: Layout },
          { id: 'blog', name: 'Manage Blog', icon: FileText },
          { id: 'faqs', name: 'Manage FAQs', icon: HelpCircle },
          { id: 'ads', name: 'Monetization & Ads', icon: Settings2 },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.name}
            </button>
          );
        })}
      </section>

      {/* Dynamic Tab Workspace panels */}
      <div className="min-h-[400px]">
        
        {/* Tab 1: Analytics Panel */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Top Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-panel p-5 rounded-2xl space-y-2">
                <div className="flex justify-between items-center text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
                  <span>Sessions (Monthly)</span>
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div className="text-2xl font-black">124,890</div>
                <p className="text-[10px] text-emerald-500 font-bold flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" />
                  +12.4% vs last month
                </p>
              </div>

              <div className="glass-panel p-5 rounded-2xl space-y-2">
                <div className="flex justify-between items-center text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
                  <span>AdSense Earnings</span>
                  <DollarSign className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-2xl font-black">$1,489.20</div>
                <p className="text-[10px] text-emerald-500 font-bold flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" />
                  +8.7% vs last month
                </p>
              </div>

              <div className="glass-panel p-5 rounded-2xl space-y-2">
                <div className="flex justify-between items-center text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
                  <span>Lighthouse Core Vitals</span>
                  <Zap className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl font-black text-emerald-500">100 / 100</div>
                <p className="text-[10px] text-muted-foreground font-bold">
                  All pages pass Core Web Vitals
                </p>
              </div>

              <div className="glass-panel p-5 rounded-2xl space-y-2">
                <div className="flex justify-between items-center text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
                  <span>Total Files Processed</span>
                  <RefreshCw className="w-4 h-4 text-indigo-500" />
                </div>
                <div className="text-2xl font-black">849,200</div>
                <p className="text-[10px] text-muted-foreground font-bold">
                  Calculated client-side locally
                </p>
              </div>
            </div>

            {/* Performance charts mock container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-panel p-6 rounded-2xl space-y-4">
                <h3 className="font-bold text-xs uppercase tracking-wider border-b border-border pb-2">Traffic History (Sessions)</h3>
                <div className="h-48 flex items-end gap-3 pt-4 border-b border-border">
                  {[40, 50, 45, 60, 75, 90, 85, 100, 110, 124].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full bg-gradient-to-t from-primary to-indigo-400 rounded-t-md" style={{ height: `${height}%` }} />
                      <span className="text-[9px] text-muted-foreground font-semibold">M{i+1}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl space-y-4">
                <h3 className="font-bold text-xs uppercase tracking-wider border-b border-border pb-2">AdSense Earnings Progress ($)</h3>
                <div className="h-48 flex items-end gap-3 pt-4 border-b border-border">
                  {[30, 40, 42, 58, 62, 70, 80, 95, 88, 100].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-md" style={{ height: `${height}%` }} />
                      <span className="text-[9px] text-muted-foreground font-semibold">M{i+1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Manage Tools */}
        {activeTab === 'tools' && (
          <div className="glass-panel p-6 rounded-2xl space-y-4 animate-in fade-in duration-200">
            <div className="border-b border-border pb-3 flex justify-between items-center">
              <h3 className="font-bold text-sm text-foreground">Registered SEO Tool Routes ({toolsList.length})</h3>
              <span className="text-xs text-muted-foreground">All statically generated via app router</span>
            </div>
            
            <div className="max-h-[350px] overflow-y-auto space-y-3 pr-1">
              {toolsList.map(t => (
                <div key={t.id} className="flex items-center justify-between p-3 rounded-xl border border-border/80 bg-background/50 hover:bg-muted/10 transition-colors">
                  <div>
                    <h4 className="font-bold text-xs text-foreground">{t.h1}</h4>
                    <p className="text-[9px] text-muted-foreground truncate max-w-xs md:max-w-md">{t.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-bold text-[9px] uppercase">
                      {t.category}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[9px] uppercase">
                      SSG Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Manage Blog */}
        {activeTab === 'blog' && (
          <div className="glass-panel p-6 rounded-2xl space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-border pb-3 flex justify-between items-center">
              <h3 className="font-bold text-sm text-foreground">Manage Articles Database</h3>
              <button className="px-3 py-1.5 bg-primary text-white font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer">
                <Plus className="w-3.5 h-3.5" /> Add Post
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto">
              {BLOG_POSTS.map(p => (
                <div key={p.slug} className="p-4 rounded-xl border border-border bg-background/50 space-y-2 relative group">
                  <h4 className="font-extrabold text-xs text-foreground truncate pr-16">{p.title}</h4>
                  <p className="text-[10px] text-muted-foreground line-clamp-2">{p.description}</p>
                  <div className="flex items-center justify-between pt-2 text-[9px] text-muted-foreground font-semibold">
                    <span>By {p.author.name}</span>
                    <span>{p.date}</span>
                  </div>
                  
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 rounded bg-secondary hover:bg-secondary/80 text-foreground cursor-pointer">
                      <Edit className="w-3 h-3" />
                    </button>
                    <button className="p-1 rounded bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Manage FAQs */}
        {activeTab === 'faqs' && (
          <div className="glass-panel p-6 rounded-2xl space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-border pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h3 className="font-bold text-sm text-foreground">Manage FAQs Database ({faqsList.length})</h3>
              
              {/* Form Input Block */}
              <div className="flex flex-col sm:flex-row gap-2 flex-1 max-w-lg">
                <input
                  type="text"
                  placeholder="Question..."
                  value={faqInput.question}
                  onChange={(e) => setFaqInput(prev => ({ ...prev, question: e.target.value }))}
                  className="px-2 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs"
                />
                <input
                  type="text"
                  placeholder="Answer..."
                  value={faqInput.answer}
                  onChange={(e) => setFaqInput(prev => ({ ...prev, answer: e.target.value }))}
                  className="px-2 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs"
                />
                <button
                  onClick={handleSaveFaq}
                  className="px-3 py-1.5 bg-primary text-white font-bold text-xs rounded-lg shrink-0 cursor-pointer flex items-center gap-1 justify-center"
                >
                  <Save className="w-3.5 h-3.5" />
                  {editingFaqId ? 'Save' : 'Add'}
                </button>
              </div>
            </div>

            <div className="max-h-[300px] overflow-y-auto space-y-3 pr-1">
              {faqsList.map(faq => (
                <div key={faq.id} className="p-3.5 rounded-xl border border-border/80 bg-background/50 flex justify-between items-start gap-4 hover:bg-muted/15 transition-colors group">
                  <div className="space-y-1">
                    <p className="font-bold text-xs text-foreground">{faq.question}</p>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                  <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditFaq(faq)}
                      className="p-1 rounded bg-secondary hover:bg-secondary/80 text-foreground cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteFaq(faq.id)}
                      className="p-1 rounded bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Monetization & Ads Settings */}
        {activeTab === 'ads' && (
          <div className="glass-panel p-6 rounded-2xl space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-border pb-3">
              <h3 className="font-bold text-sm text-foreground">Configure Google AdSense Banners</h3>
              <p className="text-[10px] text-muted-foreground mt-0.5">Toggle live Google AdSense ad units display blocks</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { key: 'anchorAds', label: 'Sticky Anchor Ads (Bottom Footer)', desc: 'Displays a 50px tall responsive anchor ad at the very bottom of the viewport on both mobile and desktop.' },
                { key: 'headerAds', label: 'Top Header Banner Ads', desc: 'Embeds a responsive leaderboard ad directly above the main page headings on all routes.' },
                { key: 'sidebarAds', label: 'Sidebar Rectangle Ads', desc: 'Renders a standard rectangle ad in the right column of all tool pages.' },
                { key: 'inContentAds', label: 'In-Content Inline Ads', desc: 'Inserts contextual ad blocks inside FAQ accordions or article segments.' }
              ].map(adUnit => (
                <div key={adUnit.key} className="p-4 rounded-xl border border-border bg-background/50 flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs text-foreground">{adUnit.label}</h4>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">{adUnit.desc}</p>
                  </div>
                  <button
                    onClick={() => toggleAdSetting(adUnit.key as any)}
                    className="text-primary shrink-0 transition-transform active:scale-95 cursor-pointer"
                  >
                    {adSettings[adUnit.key as keyof typeof adSettings] ? (
                      <ToggleRight className="w-10 h-10 text-primary" />
                    ) : (
                      <ToggleLeft className="w-10 h-10 text-muted-foreground" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

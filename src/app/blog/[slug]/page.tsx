'use client';

import { use } from 'react';
import Link from 'next/link';
import { BLOG_POSTS } from '@/config/blog';
import { Calendar, Clock, ChevronLeft, User, Award, Shield, FileText } from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPost({ params }: BlogPostPageProps) {
  // Resolve params promise in Next.js 15+ App Router
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Article not found</h2>
        <Link href="/blog" className="text-primary hover:underline mt-4 inline-block">
          Back to Blog
        </Link>
      </div>
    );
  }

  // Simple Markdown line parser to render structural layouts cleanly
  const renderMarkdown = (text: string) => {
    return text.split('\n').map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={idx} className="h-4" />;
      
      // Headings
      if (trimmed.startsWith('# ')) {
        return <h1 key={idx} className="text-2xl md:text-3xl font-extrabold text-foreground mt-6 mb-4">{trimmed.replace('# ', '')}</h1>;
      }
      if (trimmed.startsWith('## ')) {
        return <h2 key={idx} className="text-xl md:text-2xl font-bold text-foreground mt-5 mb-3 border-b border-border pb-2">{trimmed.replace('## ', '')}</h2>;
      }
      if (trimmed.startsWith('### ')) {
        return <h3 key={idx} className="text-lg font-bold text-foreground mt-4 mb-2">{trimmed.replace('### ', '')}</h3>;
      }
      
      // Unordered lists
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        return (
          <li key={idx} className="ml-6 list-disc text-xs md:text-sm text-muted-foreground leading-relaxed mb-2">
            {parseInlineStyles(trimmed.substring(2))}
          </li>
        );
      }
      
      // Ordered lists
      if (/^\d+\.\s/.test(trimmed)) {
        const content = trimmed.replace(/^\d+\.\s/, '');
        return (
          <li key={idx} className="ml-6 list-decimal text-xs md:text-sm text-muted-foreground leading-relaxed mb-2">
            {parseInlineStyles(content)}
          </li>
        );
      }

      // Default paragraph
      return (
        <p key={idx} className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4">
          {parseInlineStyles(trimmed)}
        </p>
      );
    });
  };

  // Basic inline formatting: **bold** and [links](url)
  const parseInlineStyles = (line: string) => {
    const parts = [];
    let currentText = line;

    // Matches **bold text**
    const boldRegex = /\*\*(.*?)\*\*/g;
    // Matches [link text](url)
    const linkRegex = /\[(.*?)\]\((.*?)\)/g;

    let index = 0;
    
    // Simple replacements
    const replaced = currentText
      .replace(boldRegex, '<strong>$1</strong>')
      .replace(linkRegex, '<a href="$2" style="color:var(--primary);text-decoration:underline;">$1</a>');

    return <span dangerouslySetInnerHTML={{ __html: replaced }} />;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Back link */}
      <div>
        <Link href="/blog" className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-primary transition-colors cursor-pointer">
          <ChevronLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left: Article Details */}
        <article className="lg:col-span-3 space-y-6">
          <header className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground font-semibold">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                Published {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-bold uppercase tracking-wider text-[9px]">
                {post.category}
              </span>
            </div>

            {/* Featured Image */}
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-border/80 shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </header>

          {/* Render parsed contents */}
          <div className="pt-4 select-text">
            {renderMarkdown(post.content)}
          </div>
        </article>

        {/* Right: Sidebar Author & Navigation */}
        <div className="space-y-6 lg:border-l lg:border-border lg:pl-8">
          {/* Author Card */}
          <div className="glass-panel p-5 rounded-2xl space-y-4 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-primary"
            />
            <div>
              <h4 className="font-extrabold text-sm text-foreground">{post.author.name}</h4>
              <p className="text-[10px] text-muted-foreground font-medium">{post.author.role}</p>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              {post.author.bio}
            </p>
          </div>

          {/* Privacy Note */}
          <div className="glass-panel p-5 rounded-2xl space-y-3 bg-emerald-500/[0.02] border-emerald-500/20">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
              <Shield className="w-4 h-4" />
              100% Client-Side Private
            </div>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              All PDF processing is done inside the browser container using HTML5 and Javascript. Files are not sent to any cloud database.
            </p>
          </div>

          {/* Ad Slot */}
          <div className="w-full min-h-[250px] bg-muted/40 rounded-2xl flex flex-col items-center justify-center border border-border/60 p-4 relative overflow-hidden select-none">
            <div className="text-[10px] text-muted-foreground absolute top-1 left-2 font-bold uppercase tracking-widest scale-75 origin-top-left">ADVERTISEMENT</div>
            <div className="text-xs text-muted-foreground font-semibold text-center mb-1">Standard Rectangle Banner</div>
            <div className="text-[10px] text-muted-foreground font-medium">[AdSense Ready]</div>
          </div>
        </div>

      </div>
    </div>
  );
}

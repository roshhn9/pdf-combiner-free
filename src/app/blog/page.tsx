'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS, BlogPostType } from '@/config/blog';
import { Search, Calendar, Clock, BookOpen, User } from 'lucide-react';

export default function BlogList() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'tutorial' | 'comparison' | 'tips'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      
      {/* Blog Hero Header */}
      <section className="text-center py-10 max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
          PDF Learning Center & Blog
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Expert guides, tutorials, and comparison articles to help you optimize and secure your digital documents.
        </p>
      </section>

      {/* Filter and Search Bar */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto">
          {(['all', 'tutorial', 'comparison', 'tips'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap capitalize transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
              }`}
            >
              {cat === 'all' ? 'All Articles' : `${cat}s`}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border outline-none focus:border-primary text-foreground text-xs"
          />
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5" />
        </div>
      </section>

      {/* Grid List */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="group rounded-2xl border border-border/80 bg-card overflow-hidden hover:border-primary/40 hover-glow transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Visual Image Header */}
                <div className="relative aspect-video bg-muted overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-primary/95 text-white font-bold text-[9px] uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>

                <div className="px-5 space-y-2">
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-sm text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                </div>
              </div>

              {/* Author Bio Footer */}
              <div className="p-5 pt-4 mt-4 border-t border-border/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-6 h-6 rounded-full object-cover border border-border"
                  />
                  <span className="text-[10px] font-bold text-foreground truncate max-w-[120px]">
                    {post.author.name}
                  </span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-[10px] font-bold text-primary hover:underline flex items-center gap-0.5"
                >
                  Read Article
                  <BookOpen className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-sm text-muted-foreground">
            No articles found matching your query.
          </div>
        )}
      </section>

    </div>
  );
}

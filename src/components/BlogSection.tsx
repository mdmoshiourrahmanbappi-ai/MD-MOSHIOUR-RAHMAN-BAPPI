import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  User,
  ArrowRight,
  Search,
  Tag,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { BlogPost } from '../types.ts';

interface BlogSectionProps {
  blogPosts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
  onOrderService: (serviceId?: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  blogPosts,
  onSelectPost,
  onOrderService,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Insights' },
    { id: 'Local SEO', label: 'Local SEO & Maps' },
    { id: 'AI Visibility', label: 'AI Visibility & GEO' },
    { id: 'Web Development', label: 'Web Architecture' },
    { id: 'Organic SEO', label: 'Technical SEO' },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      post.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="blog-section" className="py-20 border-t border-slate-900 bg-slate-950/80 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/30 px-3.5 py-1 text-xs font-semibold text-emerald-300">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Search & AI Engineering Intelligence</span>
          </div>

          <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
            Authoritative Guides, Tutorials & Frameworks
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Written personally by Md Moshiour Rahman Bappi. Practical breakdowns on Google algorithms, Generative Engine Optimization (GEO), and Core Web Vitals.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-lg px-3.5 py-1.5 font-semibold transition ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles & topics..."
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-1.5 pl-9 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
            <Search className="absolute left-3 top-2 h-3.5 w-3.5 text-slate-500" />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition duration-300 group"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="h-full w-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 rounded-md bg-slate-900/90 border border-slate-800 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    {post.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-slate-500" />
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>

                  <h3 className="mt-2.5 text-base font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags.map((t, i) => (
                      <span
                        key={i}
                        className="rounded border border-slate-800 bg-slate-950 px-2 py-0.5 text-[10px] text-slate-400 font-mono"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0 border-t border-slate-800/60 mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold flex items-center justify-center border border-emerald-500/30">
                    MB
                  </div>
                  <span className="text-xs text-slate-300">{post.author.name}</span>
                </div>

                <button
                  onClick={() => onSelectPost(post)}
                  className="flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition"
                >
                  <span>Read Article</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

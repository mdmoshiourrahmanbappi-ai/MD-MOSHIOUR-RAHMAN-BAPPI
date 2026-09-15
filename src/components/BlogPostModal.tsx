import React from 'react';
import {
  X,
  Clock,
  Calendar,
  User,
  Share2,
  Bookmark,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { BlogPost } from '../types.ts';

interface BlogPostModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onOrderRelevantService: (serviceCategory: string) => void;
}

export const BlogPostModal: React.FC<BlogPostModalProps> = ({
  post,
  onClose,
  onOrderRelevantService,
}) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-10 text-left shadow-2xl max-h-[92vh] flex flex-col my-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {post.readTime} Read
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mt-2">
              {post.title}
            </h2>
            <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
              <span>By {post.author.name}</span>
              <span>•</span>
              <span>Published on {new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Article Body */}
        <div className="flex-1 overflow-y-auto py-6 pr-2 space-y-6 text-slate-300 text-sm leading-relaxed">
          {/* Featured Image */}
          <div className="h-64 w-full rounded-xl overflow-hidden bg-slate-900">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Excerpt Lead paragraph */}
          <p className="text-base text-slate-200 font-medium border-l-2 border-emerald-500 pl-4 italic">
            "{post.excerpt}"
          </p>

          {/* Formatted Article Content */}
          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
            {post.content}
          </div>

          {/* In-Article Conversion CTA Box */}
          <div className="my-6 rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/30 to-slate-900 p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider block">
                Implement This Framework
              </span>
              <h4 className="text-base font-bold text-white">
                Want Md Moshiour Rahman Bappi to Optimize Your Brand?
              </h4>
              <p className="text-xs text-slate-300 max-w-md">
                Skip the trial and error. Order a turn-key campaign or diagnostic audit directly through the platform.
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                onOrderRelevantService(post.category);
              }}
              className="rounded-xl bg-emerald-500 px-6 py-3 text-xs font-bold text-slate-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 whitespace-nowrap"
            >
              Order Service Related to This Topic
            </button>
          </div>

          {/* Author Bio Box */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-bold text-emerald-300 shrink-0 text-sm">
              MB
            </div>
            <div>
              <div className="font-bold text-white text-sm">{post.author.name}</div>
              <div className="text-xs text-emerald-400 font-medium">{post.author.role}</div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{post.author.bio}</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-800 pt-4 flex justify-between items-center text-xs">
          <div className="flex gap-2">
            {post.tags.map((t, idx) => (
              <span key={idx} className="text-slate-400 font-mono">
                #{t}
              </span>
            ))}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-800 px-4 py-2 text-slate-300 hover:bg-slate-900"
          >
            Close Reader
          </button>
        </div>
      </div>
    </div>
  );
};

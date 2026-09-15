import React, { useState } from 'react';
import {
  FolderGit2,
  TrendingUp,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { CaseStudy } from '../types.ts';

interface CaseStudiesSectionProps {
  caseStudies: CaseStudy[];
  onOpenOrderModal: (serviceId?: string) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  caseStudies,
  onOpenOrderModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedCaseStudy, setExpandedCaseStudy] = useState<CaseStudy | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'local_seo', label: 'Local SEO & Maps' },
    { id: 'ai_visibility', label: 'AI Visibility & GEO' },
    { id: 'seo', label: 'Technical & Organic SEO' },
    { id: 'web_dev', label: 'Web Platforms' },
  ];

  const filteredStudies =
    selectedCategory === 'all'
      ? caseStudies
      : caseStudies.filter((c) => c.category === selectedCategory);

  return (
    <section id="case-studies-section" className="py-20 border-t border-slate-900 bg-slate-950 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/30 px-3.5 py-1 text-xs font-semibold text-emerald-300">
            <FolderGit2 className="h-3.5 w-3.5" />
            <span>Proven Track Record</span>
          </div>

          <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
            Case Studies & Measurable Client Results
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Real outcomes across local map packs, competitive commercial keywords, generative AI citation shares, and ultra-fast web architectures.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Case Studies Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src={study.screenshotUrl}
                    alt={study.title}
                    className="h-full w-full object-cover opacity-85 hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute top-3 left-3 rounded-md bg-slate-900/90 border border-slate-800 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    {study.industry}
                  </div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-lg font-bold text-white drop-shadow">
                      {study.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="font-medium text-slate-200">{study.clientName}</span>
                      <span>•</span>
                      <span className="text-slate-400">{study.location}</span>
                    </div>
                  </div>
                </div>

                {/* Metrics Highlight Grid */}
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-3 rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-center">
                    {study.results.map((r, i) => (
                      <div key={i}>
                        <div className="text-base font-extrabold text-emerald-400 font-mono">
                          {r.value}
                        </div>
                        <div className="text-[10px] text-slate-400 leading-tight mt-0.5">
                          {r.metric}
                        </div>
                        <div className="text-[9px] text-emerald-500/90 font-medium">
                          {r.change}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary & Strategy */}
                  <div className="mt-4 space-y-2 text-xs text-slate-300">
                    <p className="line-clamp-2 leading-relaxed">
                      <strong className="text-slate-200">The Problem:</strong> {study.problem}
                    </p>
                    <p className="line-clamp-2 leading-relaxed">
                      <strong className="text-slate-200">Strategy:</strong> {study.strategy}
                    </p>
                  </div>

                  {/* Services Tagged */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {study.servicesUsed.map((s, idx) => (
                      <span
                        key={idx}
                        className="rounded-md border border-slate-800 bg-slate-900 px-2 py-0.5 text-[10px] text-slate-400"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="p-6 pt-0 border-t border-slate-800/60 mt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="h-3 w-3 text-slate-500" />
                  {study.timeline}
                </span>

                <button
                  onClick={() => setExpandedCaseStudy(study)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep Case Study Modal */}
      {expandedCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8 text-left shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="rounded bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  {expandedCaseStudy.industry} • {expandedCaseStudy.location}
                </span>
                <h3 className="mt-2 text-xl sm:text-2xl font-bold text-white">
                  {expandedCaseStudy.title}
                </h3>
                <p className="text-xs text-slate-400">Client: {expandedCaseStudy.clientName}</p>
              </div>
              <button
                onClick={() => setExpandedCaseStudy(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-900 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Results Grid */}
            <div className="mt-5 grid grid-cols-3 gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
              {expandedCaseStudy.results.map((r, i) => (
                <div key={i}>
                  <div className="text-lg font-bold text-emerald-400 font-mono">{r.value}</div>
                  <div className="text-xs text-slate-300">{r.metric}</div>
                  <div className="text-[10px] text-emerald-500 font-medium">{r.change}</div>
                </div>
              ))}
            </div>

            {/* Deep Problem & Strategy */}
            <div className="mt-6 space-y-4 text-xs text-slate-300">
              <div>
                <h4 className="font-bold text-white uppercase text-[11px] tracking-wider text-emerald-400">
                  The Client Challenge
                </h4>
                <p className="mt-1 leading-relaxed">{expandedCaseStudy.problem}</p>
              </div>

              <div>
                <h4 className="font-bold text-white uppercase text-[11px] tracking-wider text-emerald-400">
                  The Engineering Strategy
                </h4>
                <p className="mt-1 leading-relaxed">{expandedCaseStudy.strategy}</p>
              </div>

              <div>
                <h4 className="font-bold text-white uppercase text-[11px] tracking-wider text-emerald-400">
                  Work Completed
                </h4>
                <ul className="mt-2 space-y-1.5">
                  {expandedCaseStudy.workCompleted.map((w, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Before vs After */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-3">
                  <span className="text-[10px] font-bold uppercase text-rose-400 block">Before Campaign</span>
                  <p className="mt-1 text-slate-400">{expandedCaseStudy.beforeAfter.before}</p>
                </div>
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-3">
                  <span className="text-[10px] font-bold uppercase text-emerald-400 block">After Results</span>
                  <p className="mt-1 text-emerald-200">{expandedCaseStudy.beforeAfter.after}</p>
                </div>
              </div>
            </div>

            {/* Modal CTA */}
            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Want similar organic growth for your brand?</span>
              <button
                onClick={() => {
                  setExpandedCaseStudy(null);
                  onOpenOrderModal();
                }}
                className="rounded-lg bg-emerald-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 shadow-md shadow-emerald-500/20"
              >
                Discuss Your Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

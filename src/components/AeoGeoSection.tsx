import React from 'react';
import {
  Bot,
  Sparkles,
  Network,
  Share2,
  FileCode,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Cpu,
  BrainCircuit,
  Layers
} from 'lucide-react';

interface AeoGeoSectionProps {
  onOrderAiService: () => void;
  onOpenAuditModal: () => void;
}

export const AeoGeoSection: React.FC<AeoGeoSectionProps> = ({
  onOrderAiService,
  onOpenAuditModal,
}) => {
  return (
    <section className="py-20 border-t border-slate-900 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-950/40 px-3.5 py-1 text-xs font-semibold text-indigo-300">
            <Bot className="h-3.5 w-3.5 text-indigo-400" />
            <span>Next-Generation Organic Search</span>
          </div>

          <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
            AI Visibility, AEO & Generative Engine Optimization (GEO)
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Prospective buyers now ask conversational AI assistants for vendor evaluations instead of browsing 10 blue links.
            We construct the semantic entity foundation so models synthesize your business as an authoritative answer.
          </p>
        </div>

        {/* Ethical Standards Banner */}
        <div className="mt-8 mx-auto max-w-3xl rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-4 text-center">
          <p className="text-xs text-indigo-200 italic font-medium leading-relaxed">
            "We optimize your digital presence to improve your chances of being discovered, understood and referenced across modern search and AI platforms."
          </p>
        </div>

        {/* AI Platform Icons Bar */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-xs text-slate-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            <span className="font-semibold">ChatGPT Search</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-xs text-slate-200">
            <span className="h-2 w-2 rounded-full bg-blue-400"></span>
            <span className="font-semibold">Google AI Overviews</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-xs text-slate-200">
            <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
            <span className="font-semibold">Perplexity AI</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-xs text-slate-200">
            <span className="h-2 w-2 rounded-full bg-indigo-400"></span>
            <span className="font-semibold">Gemini Advanced</span>
          </div>
        </div>

        {/* The 4 Pillars of AI Optimization */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Network className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Entity & Graph Modeling</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standardizing Wikidata, Crunchbase, schema anchors, and semantic relationships so LLMs map your brand unambiguously.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Layers className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-bold text-white">AEO Structured Blocks</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Formatting content with 40-word high-density answer definitions and data tables that RAG parsers extract effortlessly.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Share2 className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Third-Party Citations</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Securing mentions on high-authority repositories indexed by AI training pipelines to validate external trust signals.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <FileCode className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Advanced Multi-Schema</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Deploying rich JSON-LD (Person, Organization, Service, FAQ, Speakable) directly into the DOM for instant machine-readability.
            </p>
          </div>
        </div>

        {/* Action Banner */}
        <div className="mt-12 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-white">
              Is Your Business Visible When AI Searchers Ask for Recommendations?
            </h3>
            <p className="text-xs text-slate-400">
              Request an initial diagnostic audit or book our comprehensive AEO / GEO package today.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onOpenAuditModal}
              className="w-1/2 sm:w-auto rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition"
            >
              Check AI Visibility
            </button>
            <button
              onClick={onOrderAiService}
              className="w-1/2 sm:w-auto rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:to-cyan-400 transition"
            >
              Order AI Visibility Audit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Star,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Bot,
  Code,
  Search,
  ExternalLink
} from 'lucide-react';
import { SiteContent } from '../types.ts';

interface HeroSectionProps {
  content: SiteContent;
  onOpenOrderModal: () => void;
  onOpenAuditModal: () => void;
  onViewServices: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  content,
  onOpenOrderModal,
  onOpenAuditModal,
  onViewServices,
}) => {
  const { hero, about } = content;

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background Decorative Grid and Ambient Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Core Positioning & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs font-medium text-emerald-300 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              <span>{hero.badgeText}</span>
              <span className="h-1 w-1 rounded-full bg-emerald-400"></span>
              <span className="text-slate-400">Global & Local</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]">
              {hero.title}{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                {hero.highlight}
              </span>
            </h1>

            {/* Subtitle / Value Proposition */}
            <p className="max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {hero.subtitle}
            </p>

            {/* Core Competency Badges */}
            <div className="flex flex-wrap gap-2 pt-1 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-900/90 px-2.5 py-1">
                <Search className="h-3 w-3 text-emerald-400" />
                Technical & Monthly SEO
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-900/90 px-2.5 py-1">
                <MapPin className="h-3 w-3 text-teal-400" />
                Google Maps 3-Pack & Citations
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-900/90 px-2.5 py-1">
                <Bot className="h-3 w-3 text-indigo-400" />
                AI Visibility / AEO & GEO
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-900/90 px-2.5 py-1">
                <Code className="h-3 w-3 text-amber-400" />
                Full-Stack Web Development
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                id="btn-hero-order"
                onClick={onOpenOrderModal}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-7 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-500 hover:shadow-emerald-500/35 transition-all transform active:scale-98"
              >
                <span>{hero.primaryCta}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                id="btn-hero-services"
                onClick={onViewServices}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition"
              >
                <span>{hero.secondaryCta}</span>
              </button>

              <button
                id="btn-hero-audit"
                onClick={onOpenAuditModal}
                className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/30 px-5 py-3.5 text-sm font-semibold text-emerald-300 hover:bg-emerald-900/30 transition"
              >
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <span>Free SEO & AI Check</span>
              </button>
            </div>

            {/* Trust Indicators Bar */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-slate-400">
              <div>
                <div className="text-2xl font-bold text-white tracking-tight">850+</div>
                <div className="text-xs text-slate-400">Top 3 Rankings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white tracking-tight">95+</div>
                <div className="text-xs text-slate-400">PageSpeed Scores</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white tracking-tight">100%</div>
                <div className="text-xs text-slate-400">White-Hat Standard</div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-2xl font-bold text-emerald-400 tracking-tight">
                  <span>4.9</span>
                  <Star className="h-4 w-4 fill-emerald-400 text-emerald-400" />
                </div>
                <div className="text-xs text-slate-400">85+ Verified Reviews</div>
              </div>
            </div>
          </div>

          {/* Right Column: Specialist Profile Card with Live Trust Proof */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 shadow-2xl shadow-black/80 backdrop-blur-xl">
              {/* Profile Header */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="h-20 w-20 rounded-full border-2 border-emerald-500/60 overflow-hidden bg-slate-800 shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                      alt="Md Moshiour Rahman Bappi - SEO & AI Visibility Specialist"
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-slate-950 shadow">
                    <ShieldCheck className="h-4 w-4 stroke-[2.5]" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-white">Md Moshiour Rahman Bappi</h2>
                  </div>
                  <p className="text-xs text-emerald-400 font-medium">{about.title}</p>
                  <p className="text-[11px] text-slate-400 pt-0.5">{about.location}</p>
                </div>
              </div>

              {/* Bio Summary */}
              <p className="mt-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                "{about.bio}"
              </p>

              {/* Live Metric Cards inside Profile */}
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-2.5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Average Traffic Lift</span>
                  </div>
                  <div className="mt-1 text-lg font-bold text-emerald-300">+280%</div>
                  <div className="text-[10px] text-slate-400">Within 3-6 months</div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-2.5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Bot className="h-3.5 w-3.5 text-indigo-400" />
                    <span>AI Engine Citations</span>
                  </div>
                  <div className="mt-1 text-lg font-bold text-indigo-300">ChatGPT & Perplexity</div>
                  <div className="text-[10px] text-slate-400">AEO/GEO Structured</div>
                </div>
              </div>

              {/* Client Guarantees & Values */}
              <div className="mt-4 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>Direct communication with Md Moshiour Rahman Bappi</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>100% full code & infrastructure ownership transferred to you</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>Transparent client portal to track deliverables & status</span>
                </div>
              </div>

              {/* Contact Snapshot */}
              <div className="mt-5 rounded-lg border border-slate-800 bg-slate-950 p-3 text-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">Direct Inquiries</span>
                  <span className="font-mono text-slate-200">{content.contact.email}</span>
                </div>
                <button
                  onClick={onOpenAuditModal}
                  className="rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 text-xs font-semibold hover:bg-emerald-500/30 transition"
                >
                  Book Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

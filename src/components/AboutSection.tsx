import React from 'react';
import {
  ShieldCheck,
  Award,
  Terminal,
  Compass,
  CheckCircle2,
  Code2,
  TrendingUp,
  Mail,
  Linkedin,
  Globe
} from 'lucide-react';
import { SiteContent } from '../types.ts';

interface AboutSectionProps {
  content: SiteContent;
  onOpenAuditModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  content,
  onOpenAuditModal,
}) => {
  const { about } = content;

  return (
    <section id="about-section" className="py-20 border-t border-slate-900 bg-slate-950/80 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image & Authenticity Proof */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-2xl">
              <div className="h-80 w-full rounded-xl overflow-hidden bg-slate-950">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                  alt="Md Moshiour Rahman Bappi - SEO & Web Engineering Lead"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="mt-4 flex items-center justify-between px-2">
                <div>
                  <h3 className="font-bold text-white text-base">Md Moshiour Rahman Bappi</h3>
                  <p className="text-xs text-emerald-400 font-medium">{about.title}</p>
                </div>
                <div className="rounded-lg bg-slate-950 border border-slate-800 px-3 py-1 text-[11px] font-mono text-slate-300">
                  8+ Years Exp
                </div>
              </div>
            </div>

            {/* Core Philosophy Box */}
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 text-xs text-slate-300 leading-relaxed">
              <strong className="text-emerald-300 block mb-1">Architecture-First Philosophy:</strong>
              "Modern SEO cannot be separated from modern web engineering. Code performance, entity schema graphs, and user experience directly dictate whether algorithms and AI models choose you."
            </div>
          </div>

          {/* Right Column: Bio, Skills & Guarantees */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/30 px-3.5 py-1 text-xs font-semibold text-emerald-300">
              <Compass className="h-3.5 w-3.5" />
              <span>Direct Practitioner & Technical Founder</span>
            </div>

            <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
              Crafting High-Converting Organic Engines For Modern Businesses
            </h2>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>
                I am <strong>Md Moshiour Rahman Bappi</strong>, an organic search consultant, local map strategist, and full-stack web developer.
                Over the past 8 years, I have built and scaled organic digital presence for over 240+ businesses across the United States, Europe, Australia, and Asia.
              </p>
              <p>
                Unlike traditional agencies that pass your account down to junior interns, every project ordered through this platform is personally reviewed, architected, and executed under my direct supervision.
              </p>
            </div>

            {/* Specialties Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3.5">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                  <span>Technical & Organic SEO</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Crawl budget optimization, internal PageRank distribution, high-intent keyword mapping.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3.5">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <ShieldCheck className="h-4 w-4 text-teal-400" />
                  <span>Local SEO & Google Maps</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Geo-targeted local landing pages, NAP consistency, local citation clusters, GBP optimization.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3.5">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Award className="h-4 w-4 text-indigo-400" />
                  <span>AI Visibility (AEO & GEO)</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Optimizing digital entities for ChatGPT, Perplexity, and Google AI Overviews recommendations.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3.5">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Code2 className="h-4 w-4 text-amber-400" />
                  <span>Full-Stack Development</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Ultra-fast static generation, headless CMS setups, accessible and mobile-first code.
                </p>
              </div>
            </div>

            {/* Infrastructure & Ownership Commitment (Section 25 of brief) */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider block">
                Full Client Ownership Guarantee
              </span>
              <ul className="space-y-1 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>You retain 100% ownership of your domain, hosting, code, and content.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>Full database, credentials, and API keys handed over upon request.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>No proprietary lock-in; another agency can seamlessly continue work.</span>
                </li>
              </ul>
            </div>

            {/* Direct Connect */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenAuditModal}
                className="rounded-lg bg-emerald-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 shadow transition"
              >
                Schedule Strategy Discussion
              </button>
              <a
                href={`mailto:${content.contact.email}`}
                className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition flex items-center gap-2"
              >
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                <span>{content.contact.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

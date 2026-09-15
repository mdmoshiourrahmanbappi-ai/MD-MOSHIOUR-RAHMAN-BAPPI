import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Clock,
  RotateCcw,
  Sparkles,
  HelpCircle,
  FolderGit2,
  Star,
  FileCheck,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { ServiceItem, ServicePackage, CaseStudy, Review } from '../types.ts';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectPackageOrder: (serviceId: string, packageTier: string) => void;
  caseStudies: CaseStudy[];
  reviews: Review[];
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onSelectPackageOrder,
  caseStudies,
  reviews,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'process' | 'packages' | 'faqs' | 'case_studies'>('overview');

  if (!service) return null;

  // Filter related case studies & reviews
  const relatedCaseStudies = caseStudies.filter((c) => c.category === service.category || c.servicesUsed.some((s) => s.toLowerCase().includes(service.category)));
  const relatedReviews = reviews.filter((r) => r.servicePurchased.toLowerCase().includes(service.slug) || r.servicePurchased.toLowerCase().includes(service.title.toLowerCase().slice(0, 10)));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8 text-left shadow-2xl max-h-[90vh] flex flex-col my-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                Service System Specification
              </span>
              {service.isAiSpecialty && (
                <span className="rounded-md bg-indigo-950/60 border border-indigo-500/30 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-300">
                  AI Visibility & GEO Specialist
                </span>
              )}
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {service.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Tabs (12-point coverage) */}
        <div className="flex items-center gap-2 border-b border-slate-800/80 py-3 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('overview')}
            className={`rounded-lg px-3 py-1.5 whitespace-nowrap transition ${
              activeTab === 'overview'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            1-4. Overview & Problems Solved
          </button>
          <button
            onClick={() => setActiveTab('process')}
            className={`rounded-lg px-3 py-1.5 whitespace-nowrap transition ${
              activeTab === 'process'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            5-7. Process & Deliverables
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`rounded-lg px-3 py-1.5 whitespace-nowrap transition ${
              activeTab === 'packages'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            8. Packages & Direct Order
          </button>
          <button
            onClick={() => setActiveTab('faqs')}
            className={`rounded-lg px-3 py-1.5 whitespace-nowrap transition ${
              activeTab === 'faqs'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            9-10. FAQs & Verified Reviews
          </button>
          <button
            onClick={() => setActiveTab('case_studies')}
            className={`rounded-lg px-3 py-1.5 whitespace-nowrap transition ${
              activeTab === 'case_studies'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            11. Case Studies
          </button>
        </div>

        {/* Scrollable Tab Content Body */}
        <div className="flex-1 overflow-y-auto py-5 pr-2 space-y-6">
          {/* TAB 1: Overview, Who Needs It, Problems Solved, Benefits */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* What the service is */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
                  1. What the Service Is
                </h4>
                <p className="mt-1 text-sm text-slate-300 leading-relaxed">
                  {service.longDescription}
                </p>
                {service.isAiSpecialty && (
                  <div className="mt-3 rounded-lg border border-indigo-500/30 bg-indigo-950/20 p-3 text-xs text-indigo-300 flex items-start gap-2.5">
                    <ShieldCheck className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Compliance & Integrity Standard:</strong> "We optimize your digital presence to improve your chances of being discovered, understood and referenced across modern search and AI platforms without misleading guarantees."
                    </span>
                  </div>
                )}
              </div>

              {/* Who needs it */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                    2. Who Needs It
                  </h4>
                  <ul className="mt-2.5 space-y-2 text-xs text-slate-300">
                    {service.whoNeedsIt.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Problems it solves */}
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                    <AlertCircle className="h-3.5 w-3.5 text-rose-400" />
                    3. Problems It Solves
                  </h4>
                  <ul className="mt-2.5 space-y-2 text-xs text-slate-300">
                    {service.problemsSolved.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-400 font-bold shrink-0">✕</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  4. Commercial Impact & Long-Term Benefits
                </h4>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {service.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Process, Deliverables, Timeline */}
          {activeTab === 'process' && (
            <div className="space-y-6">
              {/* 5. Process */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
                  5. Implementation Methodology (4-Step Process)
                </h4>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.process.map((step) => (
                    <div
                      key={step.step}
                      className="rounded-xl border border-slate-800 bg-slate-900/50 p-4"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/40">
                          {step.step}
                        </span>
                        <h5 className="text-xs font-bold text-white">{step.title}</h5>
                      </div>
                      <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. Deliverables */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                  <FileCheck className="h-3.5 w-3.5 text-emerald-400" />
                  6. Concrete Deliverables You Receive
                </h4>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
                  {service.deliverables.map((deliv, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 7. Timeline */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-teal-400" />
                    7. Standard Turnaround Timeline
                  </h4>
                  <p className="mt-1 text-slate-400">
                    Typical deliverables span between 5 to 28 days depending on package tier.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('packages')}
                  className="rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-3 py-1.5 font-semibold hover:bg-emerald-500/30 transition"
                >
                  View Package Timelines
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: Pricing and Packages */}
          {activeTab === 'packages' && (
            <div className="space-y-6">
              <div className="text-left">
                <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
                  8. Available Service Packages
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Select a package tier to proceed directly to the 7-step ordering and secure checkout flow.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {service.packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`relative flex flex-col justify-between rounded-xl border p-5 ${
                      pkg.isFeatured
                        ? 'border-emerald-500/60 bg-gradient-to-b from-emerald-950/30 to-slate-900 shadow-xl shadow-emerald-950/20'
                        : 'border-slate-800 bg-slate-900/50'
                    }`}
                  >
                    {pkg.isFeatured && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-3 py-0.5 text-[10px] font-bold text-slate-950 uppercase tracking-wider">
                        Most Popular
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          {pkg.tier}
                        </span>
                        <span className="text-2xl font-extrabold text-white font-mono">
                          ${pkg.price}
                        </span>
                      </div>

                      <h5 className="mt-2 text-sm font-bold text-white">{pkg.name}</h5>
                      <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                        {pkg.description}
                      </p>

                      <div className="mt-4 flex items-center gap-3 text-[11px] text-slate-400 border-y border-slate-800/80 py-2">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-emerald-400" />
                          <span>{pkg.deliveryDays} Days Delivery</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <RotateCcw className="h-3 w-3 text-cyan-400" />
                          <span>{pkg.revisions}</span>
                        </div>
                      </div>

                      <ul className="mt-4 space-y-2 text-xs text-slate-300">
                        {pkg.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onSelectPackageOrder(service.id, pkg.tier);
                      }}
                      className={`mt-6 w-full rounded-lg py-2.5 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow ${
                        pkg.isFeatured
                          ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-emerald-500/20'
                          : 'bg-slate-800 text-white hover:bg-slate-700'
                      }`}
                    >
                      <span>Order {pkg.tier.toUpperCase()} (${pkg.price})</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: FAQs & Reviews */}
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              {/* 9. FAQs */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
                  9. Frequently Asked Questions
                </h4>
                <div className="mt-3 space-y-3">
                  {service.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-slate-800 bg-slate-900/50 p-4"
                    >
                      <div className="flex items-start gap-2">
                        <HelpCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <h5 className="text-xs font-bold text-white">{faq.question}</h5>
                      </div>
                      <p className="mt-2 text-xs text-slate-300 leading-relaxed pl-6">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 10. Reviews */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
                  10. Verified Client Reviews for this Service
                </h4>
                {relatedReviews.length > 0 ? (
                  <div className="mt-3 grid grid-cols-1 gap-3">
                    {relatedReviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="rounded-xl border border-slate-800 bg-slate-900/40 p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xs font-bold text-white">{rev.customerName}</div>
                            <div className="text-[11px] text-slate-400">{rev.company}</div>
                          </div>
                          <div className="flex items-center gap-0.5 text-emerald-400">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="h-3.5 w-3.5 fill-emerald-400" />
                            ))}
                          </div>
                        </div>
                        <p className="mt-2 text-xs text-slate-300 italic">"{rev.review}"</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 mt-2">
                    Review submissions available in verified client portal.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: Related Case Studies */}
          {activeTab === 'case_studies' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
                11. Proven Results & Case Studies
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {relatedCaseStudies.map((cs) => (
                  <div
                    key={cs.id}
                    className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 flex flex-col sm:flex-row gap-5"
                  >
                    <div className="sm:w-1/3">
                      <img
                        src={cs.screenshotUrl}
                        alt={cs.title}
                        className="h-32 w-full rounded-lg object-cover border border-slate-800"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="sm:w-2/3 space-y-2">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                        {cs.industry} • {cs.location}
                      </span>
                      <h5 className="text-sm font-bold text-white">{cs.title}</h5>
                      <p className="text-xs text-slate-300 line-clamp-2">{cs.strategy}</p>

                      <div className="grid grid-cols-3 gap-2 pt-2">
                        {cs.results.map((r, i) => (
                          <div key={i} className="rounded bg-slate-950 p-2 text-center">
                            <div className="text-xs font-bold text-emerald-300">{r.value}</div>
                            <div className="text-[10px] text-slate-400">{r.metric}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer (12. Final CTA) */}
        <div className="border-t border-slate-800 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            Need custom requirements or multiple locations?{' '}
            <span className="text-emerald-400 font-medium">Bappi handles dedicated custom briefs.</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="rounded-lg border border-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-900 w-1/2 sm:w-auto text-center"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onSelectPackageOrder(service.id, 'standard');
              }}
              className="rounded-lg bg-emerald-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 shadow-md shadow-emerald-500/20 w-1/2 sm:w-auto text-center"
            >
              12. Order This Service Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

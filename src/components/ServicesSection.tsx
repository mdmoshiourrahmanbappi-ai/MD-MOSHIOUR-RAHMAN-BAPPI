import React from 'react';
import {
  Search,
  MapPin,
  Sparkles,
  Code,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Bot
} from 'lucide-react';
import { ServiceItem } from '../types.ts';

interface ServicesSectionProps {
  services: ServiceItem[];
  onSelectServiceDetail: (service: ServiceItem) => void;
  onOrderService: (serviceId: string, tier?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onSelectServiceDetail,
  onOrderService,
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Search':
        return <Search className="h-6 w-6 text-emerald-400" />;
      case 'MapPin':
        return <MapPin className="h-6 w-6 text-teal-400" />;
      case 'Sparkles':
        return <Sparkles className="h-6 w-6 text-indigo-400" />;
      case 'Code':
        return <Code className="h-6 w-6 text-amber-400" />;
      default:
        return <Search className="h-6 w-6 text-emerald-400" />;
    }
  };

  return (
    <section id="services-section" className="py-20 border-t border-slate-900 bg-slate-950/60 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/30 px-3.5 py-1 text-xs font-semibold text-emerald-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Specialized Service Systems</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
            High-Impact Organic Growth & Engineering
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every service is engineered to solve a critical visibility bottleneck. Whether you need top Google Maps
            rankings, high-intent organic buyer keywords, AI engine citations, or an ultra-fast web platform.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => {
            const minPrice = Math.min(...service.packages.map((p) => p.price));
            return (
              <div
                key={service.id}
                className={`relative flex flex-col justify-between rounded-2xl border p-7 transition-all duration-300 hover:translate-y-[-2px] ${
                  service.isAiSpecialty
                    ? 'border-indigo-500/40 bg-gradient-to-b from-indigo-950/20 via-slate-900 to-slate-950 shadow-xl shadow-indigo-950/30'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                {/* Special AI Badge if applicable */}
                {service.isAiSpecialty && (
                  <div className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-3 py-0.5 text-[11px] font-bold text-slate-950 uppercase tracking-wider shadow">
                    Next-Gen Search Pioneer
                  </div>
                )}

                <div>
                  {/* Icon & Title */}
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl border border-slate-800 bg-slate-900 p-3 shadow-inner">
                      {getIcon(service.iconName)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                        {service.title}
                      </h3>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-xs font-medium text-emerald-400">
                          Packages from ${minPrice}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-xs text-slate-400">
                          {service.packages.length} Tier Options
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  {/* Key Problems Solved */}
                  <div className="mt-5 space-y-2 border-t border-slate-800/80 pt-4">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                      Targeted Solved Bottlenecks:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {service.problemsSolved.slice(0, 3).map((prob, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{prob}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Packages Pill Preview */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.packages.map((pkg) => (
                      <div
                        key={pkg.id}
                        className={`rounded-lg border px-2.5 py-1 text-xs flex items-center gap-1.5 ${
                          pkg.isFeatured
                            ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300 font-semibold'
                            : 'border-slate-800 bg-slate-900 text-slate-300'
                        }`}
                      >
                        <span>{pkg.name}</span>
                        <span className="font-mono text-slate-400">${pkg.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Actions */}
                <div className="mt-7 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onSelectServiceDetail(service)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-emerald-400 transition"
                  >
                    <span>View 12-Point Details & FAQs</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={() => onOrderService(service.id)}
                    className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 shadow-md shadow-emerald-500/20 transition"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

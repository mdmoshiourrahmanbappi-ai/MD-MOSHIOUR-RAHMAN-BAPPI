import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Search,
  Bot,
  Send,
  CheckCircle2,
  ShieldCheck,
  Globe,
  MapPin,
  Clock
} from 'lucide-react';
import { Lead } from '../types.ts';

interface FreeAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitAuditRequest: (leadData: Partial<Lead>) => Promise<void>;
}

export const FreeAuditModal: React.FC<FreeAuditModalProps> = ({
  isOpen,
  onClose,
  onSubmitAuditRequest,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [auditType, setAuditType] = useState('Both SEO & AI Visibility Diagnostic');
  const [primaryConcern, setPrimaryConcern] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !websiteUrl) return;

    setLoading(true);
    try {
      await onSubmitAuditRequest({
        name,
        email,
        phone,
        websiteUrl: websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`,
        company,
        location,
        auditType,
        primaryConcern: primaryConcern || 'General organic visibility & AI search readiness check.',
        source: 'Homepage Free Audit Modal',
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3500);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8 text-left shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-0.5 text-[10px] font-bold text-emerald-300">
              <Sparkles className="h-3 w-3" />
              <span>Complimentary Strategic Review</span>
            </div>
            <h3 className="mt-2 text-xl sm:text-2xl font-bold text-white tracking-tight">
              Request Free SEO & AI Visibility Check
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Personalized technical review performed directly by Md Moshiour Rahman Bappi. No automated spam reports.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-900 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-10 text-center space-y-3">
            <div className="h-12 w-12 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Audit Request Received!</h4>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Bappi is analyzing <strong>{websiteUrl}</strong>. You will receive an email breakdown of your top rankings, schema gaps, and AI citation potential within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rachel Adams"
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Business Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rachel@adamsgrowth.com"
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Target Website URL *</label>
                <input
                  type="text"
                  required
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Phone / WhatsApp (Optional)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Company / Business Name</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Adams Practice"
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Business City / Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Miami, Florida"
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-300 block mb-1 font-semibold">Diagnosis Scope</label>
              <select
                value={auditType}
                onChange={(e) => setAuditType(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
              >
                <option>Both SEO & AI Visibility Diagnostic</option>
                <option>Local SEO & Google Business Profile Audit</option>
                <option>AI Visibility / AEO & GEO Entity Check</option>
                <option>Technical SEO & Core Web Vitals Audit</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 block mb-1 font-semibold">
                What is your main problem or primary goal?
              </label>
              <textarea
                rows={2}
                value={primaryConcern}
                onChange={(e) => setPrimaryConcern(e.target.value)}
                placeholder="e.g. Rankings dropped after core update, competitors outranking in Google Maps, or not appearing in ChatGPT answers..."
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock className="h-3 w-3 text-emerald-400" />
                <span>Delivered within 24 hours</span>
              </span>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-slate-800 px-4 py-2 text-slate-400 hover:bg-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-emerald-500 px-6 py-2 font-bold text-slate-950 hover:bg-emerald-400 flex items-center gap-1.5 shadow"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{loading ? 'Submitting...' : 'Request Free Audit'}</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

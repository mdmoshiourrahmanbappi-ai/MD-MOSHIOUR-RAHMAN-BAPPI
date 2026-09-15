import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Send,
  CheckCircle2,
  Clock,
  MessageSquare,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { SiteContent, Lead } from '../types.ts';

interface ContactSectionProps {
  content: SiteContent;
  onSubmitContactForm: (leadData: Partial<Lead>) => Promise<void>;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  content,
  onSubmitContactForm,
}) => {
  const { contact } = content;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setLoading(true);
    try {
      await onSubmitContactForm({
        name,
        email,
        phone,
        websiteUrl: websiteUrl || 'Inquiry only',
        primaryConcern: message,
        auditType: 'General Direct Inquiry',
        source: 'Contact Page Inquiry Form',
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setName('');
        setEmail('');
        setPhone('');
        setWebsiteUrl('');
        setMessage('');
      }, 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-section" className="py-20 border-t border-slate-900 bg-slate-950 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Info & Calendly */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/30 px-3.5 py-1 text-xs font-semibold text-emerald-300">
                <Mail className="h-3.5 w-3.5" />
                <span>Direct Access</span>
              </div>
              <h2 className="mt-3 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                Let's Discuss Your Growth Strategy
              </h2>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Have questions regarding custom retainer scopes, multiple locations, or need a preliminary site audit before placing an order? Contact Bappi directly.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3 text-xs">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3.5 rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-slate-200 hover:border-emerald-500/50 hover:bg-slate-900 transition"
              >
                <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-white">Direct Email</div>
                  <div className="text-slate-400 font-mono">{contact.email}</div>
                </div>
              </a>

              <a
                href={`https://wa.me/8801700000000`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3.5 rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-slate-200 hover:border-emerald-500/50 hover:bg-slate-900 transition"
              >
                <div className="rounded-lg bg-teal-500/10 p-2 text-teal-400">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-white">Phone & WhatsApp</div>
                  <div className="text-slate-400 font-mono">{contact.phone}</div>
                </div>
              </a>

              <div className="flex items-center gap-3.5 rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-slate-200">
                <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-400">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-white">Response Guarantee</div>
                  <div className="text-slate-400">{contact.responseTime}</div>
                </div>
              </div>
            </div>

            {/* Calendly Booking Card */}
            <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 to-slate-900 p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider">
                <Calendar className="h-4 w-4" />
                <span>Instant Consultation Booking</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Prefer a 20-minute video discovery session to go over your Google Search Console or Google Maps ranking report?
              </p>
              <button
                onClick={() => alert('Calendly scheduler simulation active: Calendly integration link configured for mdmoshiourrahmanbappi@gmail.com.')}
                className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition shadow flex items-center justify-center gap-1.5"
              >
                <span>Open Calendar Booking</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-white">Send a Direct Message</h3>
              <p className="text-xs text-slate-400 mt-1 mb-6">
                Fill out your details below and Bappi will reply with actionable insights within 4 to 8 hours.
              </p>

              {submitted ? (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-6 text-center space-y-2">
                  <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-white">Message Delivered Successfully!</h4>
                  <p className="text-xs text-emerald-200">
                    Thank you! Your message has been routed to Md Moshiour Rahman Bappi’s priority inbox.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-200 block mb-1 font-semibold">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Marcus Vance"
                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-slate-200 block mb-1 font-semibold">Business Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="marcus@vancedesign.com"
                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-200 block mb-1 font-semibold">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 345-6789"
                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-slate-200 block mb-1 font-semibold">Website URL</label>
                      <input
                        type="text"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        placeholder="https://yourwebsite.com"
                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-200 block mb-1 font-semibold">
                      Your Project Details & Goals *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell me about your business, current search rankings, target keywords, or timeline..."
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Zero Spam • 100% Confidential</span>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="rounded-lg bg-emerald-500 px-6 py-2.5 font-bold text-slate-950 hover:bg-emerald-400 flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>{loading ? 'Sending...' : 'Send Message to Bappi'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import {
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Heart,
  ExternalLink,
  Bot
} from 'lucide-react';
import { SiteContent } from '../types.ts';

interface FooterProps {
  content: SiteContent;
  onNavigate: (view: string) => void;
  onOpenOrderModal: (serviceId?: string) => void;
  onOpenAuditModal: () => void;
  onOpenSeoViewer: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  content,
  onNavigate,
  onOpenOrderModal,
  onOpenAuditModal,
  onOpenSeoViewer,
}) => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Branding & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-600 font-bold text-white shadow">
                MB
              </div>
              <div>
                <span className="font-bold text-white text-sm block">Md Moshiour Rahman Bappi</span>
                <span className="text-[11px] text-emerald-400">SEO & Web Engineering Platform</span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              Conversion-focused personal agency positioning ambitious businesses at the top of Google Maps, high-intent search results, and modern conversational AI engines.
            </p>

            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <div>Email: <strong className="text-slate-200">{content.contact.email}</strong></div>
              <div>Direct: <strong className="text-slate-200">{content.contact.phone}</strong></div>
              <div>Location: <strong className="text-slate-200">{content.about.location}</strong></div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px]">Flagship Services</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onOpenOrderModal('srv-local-seo')}
                  className="hover:text-emerald-400 transition"
                >
                  Local SEO & Google Maps 3-Pack
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenOrderModal('srv-ai-vis')}
                  className="hover:text-emerald-400 transition flex items-center gap-1 text-emerald-300 font-medium"
                >
                  <Bot className="h-3 w-3" />
                  <span>AI Visibility (AEO / GEO)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenOrderModal('srv-seo')}
                  className="hover:text-emerald-400 transition"
                >
                  Technical & Monthly SEO
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenOrderModal('srv-web-dev')}
                  className="hover:text-emerald-400 transition"
                >
                  SEO-Engineered Web Development
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px]">Platform Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-emerald-400 transition">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('case-studies')} className="hover:text-emerald-400 transition">
                  Case Studies & Metrics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reviews')} className="hover:text-emerald-400 transition">
                  Verified Client Reviews
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-emerald-400 transition">
                  About Moshiour Bappi
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-emerald-400 transition">
                  Search & AI Blog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-emerald-400 transition">
                  Direct Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Legal */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px]">Ethics & Security</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenSeoViewer} className="hover:text-emerald-400 transition text-slate-300">
                  Inspect Schema.org & Robots
                </button>
              </li>
              <li>
                <button onClick={onOpenAuditModal} className="hover:text-emerald-400 transition text-emerald-400">
                  Request Free SEO Audit
                </button>
              </li>
              <li>
                <span className="text-slate-400">100% White-Hat Standard</span>
              </li>
              <li>
                <span className="text-slate-400">Full Code Ownership Guarantee</span>
              </li>
              <li>
                <span className="text-slate-400">256-Bit SSL Encrypted Checkout</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Ethical Disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px]">
          <div className="text-slate-400">
            © {new Date().getFullYear()} Md Moshiour Rahman Bappi. All rights reserved. Built as a scalable agency & client service platform.
          </div>

          <div className="text-slate-400 text-center md:text-right max-w-xl">
            Disclaimer: We optimize your digital presence to improve discoverability and reference rates across modern search and AI models without misleading rank guarantees.
          </div>
        </div>
      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import {
  X,
  Code2,
  FileCode,
  CheckCircle2,
  Copy,
  ExternalLink,
  Bot,
  Network,
  ShieldCheck
} from 'lucide-react';

interface SeoArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SeoArchitectureModal: React.FC<SeoArchitectureModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'schema' | 'sitemap' | 'robots' | 'graph'>('schema');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const sampleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://mdmoshiourrahmanbappi.com/#person",
        "name": "Md Moshiour Rahman Bappi",
        "jobTitle": "SEO Specialist, Local SEO & AI Visibility Consultant",
        "email": "mdmoshiourrahmanbappi@gmail.com",
        "knowsAbout": [
          "Search Engine Optimization",
          "Google Business Profile Optimization",
          "Generative Engine Optimization (GEO)",
          "Answer Engine Optimization (AEO)",
          "Full-Stack Web Engineering"
        ]
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://mdmoshiourrahmanbappi.com/#business",
        "name": "Md Moshiour Rahman Bappi - SEO & AI Agency",
        "url": "https://mdmoshiourrahmanbappi.com",
        "priceRange": "$$$",
        "founder": { "@id": "https://mdmoshiourrahmanbappi.com/#person" },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "85"
        }
      }
    ]
  };

  const sampleRobots = `# robots.txt for https://mdmoshiourrahmanbappi.com
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /client-portal/

# AI Crawlers explicitly welcomed for AEO & Knowledge Graph ingestion
User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://mdmoshiourrahmanbappi.com/sitemap.xml`;

  const sampleSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mdmoshiourrahmanbappi.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://mdmoshiourrahmanbappi.com/services/local-seo</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://mdmoshiourrahmanbappi.com/services/ai-visibility</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://mdmoshiourrahmanbappi.com/services/seo</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://mdmoshiourrahmanbappi.com/services/web-development</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8 text-left shadow-2xl max-h-[90vh] flex flex-col my-auto">
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-0.5 text-[10px] font-bold text-emerald-300">
              <Code2 className="h-3 w-3" />
              <span>Technical SEO & Machine-Readability Proof</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              Live Schema Graph & Search Architecture
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-900 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800/80 py-2.5 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'schema'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:bg-slate-900'
            }`}
          >
            JSON-LD Structured Data
          </button>
          <button
            onClick={() => setActiveTab('graph')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'graph'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:bg-slate-900'
            }`}
          >
            Entity Knowledge Graph
          </button>
          <button
            onClick={() => setActiveTab('robots')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'robots'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:bg-slate-900'
            }`}
          >
            robots.txt (AI Crawlers)
          </button>
          <button
            onClick={() => setActiveTab('sitemap')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'sitemap'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:bg-slate-900'
            }`}
          >
            XML Sitemap
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4 text-xs">
          {activeTab === 'schema' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-slate-400">
                <span>Injected directly into &lt;head&gt; entry point:</span>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(sampleSchema, null, 2))}
                  className="text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>{copied ? 'Copied!' : 'Copy JSON-LD'}</span>
                </button>
              </div>
              <pre className="rounded-xl border border-slate-800 bg-slate-900 p-4 font-mono text-[11px] text-emerald-300 overflow-x-auto leading-relaxed">
                {JSON.stringify(sampleSchema, null, 2)}
              </pre>
            </div>
          )}

          {activeTab === 'graph' && (
            <div className="space-y-4">
              <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-4 text-indigo-200 leading-relaxed">
                <strong>Semantic Entity Graph Architecture:</strong> Md Moshiour Rahman Bappi is modeled as a primary authoritative entity linked with Google Business Profile, Local SEO, and AI Search Optimization. LLMs and knowledge parsers resolve this entity to avoid hallucinations.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-lg border border-slate-800 bg-slate-900 p-3">
                  <div className="text-[10px] text-emerald-400 uppercase font-bold">Node 1: Person</div>
                  <div className="font-bold text-white mt-1">Md Moshiour Rahman Bappi</div>
                  <div className="text-slate-400 mt-1">Specialist, Developer, Founder</div>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-900 p-3">
                  <div className="text-[10px] text-cyan-400 uppercase font-bold">Node 2: Organization</div>
                  <div className="font-bold text-white mt-1">Professional SEO Agency</div>
                  <div className="text-slate-400 mt-1">Verified Services & Packages</div>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-900 p-3">
                  <div className="text-[10px] text-indigo-400 uppercase font-bold">Node 3: Knowledge Domain</div>
                  <div className="font-bold text-white mt-1">GEO & Local Search</div>
                  <div className="text-slate-400 mt-1">Entity-grounded citations</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'robots' && (
            <pre className="rounded-xl border border-slate-800 bg-slate-900 p-4 font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
              {sampleRobots}
            </pre>
          )}

          {activeTab === 'sitemap' && (
            <pre className="rounded-xl border border-slate-800 bg-slate-900 p-4 font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
              {sampleSitemap}
            </pre>
          )}
        </div>

        <div className="border-t border-slate-800 pt-3 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-900"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};

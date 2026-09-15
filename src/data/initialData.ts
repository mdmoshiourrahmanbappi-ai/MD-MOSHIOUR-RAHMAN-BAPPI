import { DatabaseState } from '../types.ts';

export const initialData: DatabaseState = {
  siteContent: {
    hero: {
      title: 'Get Found. Get Chosen.',
      highlight: 'Grow Online.',
      subtitle:
        'Professional SEO, Local SEO, AI Visibility (AEO/GEO), and Web Development engineered to help ambitious businesses capture high-intent searchers and dominate modern AI platforms.',
      primaryCta: 'Get Started',
      secondaryCta: 'View Services',
      badgeText: 'Top-Rated SEO & AI Visibility Specialist',
      ratingText: '4.9/5 from 85+ Global & Local Businesses',
    },
    about: {
      name: 'Md Moshiour Rahman Bappi',
      title: 'SEO Specialist, Local SEO & AI Visibility Architect, Web Developer',
      bio:
        'With over 8 years of hands-on experience in organic search and modern web engineering, I help businesses move past outdated keyword stuffing and build authoritative digital entities that search engines love and AI platforms reference with confidence.',
      location: 'Available for Worldwide Remote Contracts & Local Campaigns',
      yearsExperience: 8,
      completedProjects: 240,
      happyClients: 110,
      topRankingsCount: 850,
    },
    contact: {
      email: 'mdmoshiourrahmanbappi@gmail.com',
      phone: '+1 (555) 382-9104',
      location: 'Serving Clients Globally across USA, UK, Canada, Australia & Europe',
      responseTime: 'Under 4 hours on business days',
      whatsapp: '+1 (555) 382-9104',
      linkedin: 'https://linkedin.com/in/mdmoshiourrahmanbappi',
      calendlyUrl: 'https://calendly.com/mdmoshiourrahmanbappi/strategy-session',
    },
  },

  services: [
    {
      id: 'srv-seo',
      slug: 'seo',
      title: 'Search Engine Optimization (SEO)',
      shortDescription:
        'Comprehensive technical, on-page, and authority building strategies engineered to rank your website at the top of Google search results.',
      longDescription:
        'Modern SEO is no longer about isolated keywords; it is about building technical perfection, topical authority, and high-quality digital footprints that Google prioritizes in competitive search verticals.',
      iconName: 'Search',
      category: 'seo',
      isAiSpecialty: false,
      whoNeedsIt: [
        'Businesses struggling to get consistent organic website traffic',
        'Companies relying solely on expensive paid ads (Google Ads/Meta)',
        'E-commerce brands seeking qualified buyer search intent',
        'Websites with technical crawl errors or legacy architecture',
      ],
      problemsSolved: [
        'Low or stagnant organic traffic',
        'Crawlability and indexing issues holding back new pages',
        'Keyword cannibalization and poor site architecture',
        'Weak domain authority and lack of quality backlinks',
      ],
      benefits: [
        'Sustainable, compound organic traffic growth month-over-month',
        'Higher conversion rates by capturing high-intent commercial keywords',
        'Zero per-click cost compared to paid advertising',
        'Future-proof website health meeting Google Core Web Vitals standards',
      ],
      process: [
        {
          step: 1,
          title: 'Deep Technical & Competitor Audit',
          description:
            'We perform an exhaustive 120-point crawl audit analyzing indexation, site speed, schema, backlink profiles, and competitor gaps.',
        },
        {
          step: 2,
          title: 'Keyword Architecture & Content Roadmap',
          description:
            'Identifying high-value, bottom-of-funnel keywords with realistic ranking difficulty and mapping them directly to dedicated landing pages.',
        },
        {
          step: 3,
          title: 'On-Page & Internal Linking Optimization',
          description:
            'Refactoring title tags, headers, entity-rich body copy, rich snippets, and semantic internal linking clusters.',
        },
        {
          step: 4,
          title: 'Authority Building & Monthly Reporting',
          description:
            'White-hat digital PR outreach, broken link reclamation, and real-time tracking of keyword positions and organic conversions.',
        },
      ],
      deliverables: [
        'Complete Technical SEO Audit Report (PDF & Actionable Sheet)',
        'Target Keyword Map & Intent Categorization',
        'Optimized Metadata & On-Page Content Recommendations',
        'Internal Linking Matrix',
        'Backlink Quality Analysis & Outreach Strategy',
        'Monthly Executive Ranking & Traffic Analytics Dashboard',
      ],
      faqs: [
        {
          question: 'How long does it take to see results from SEO?',
          answer:
            'While technical fixes can show positive crawl improvements within 2 to 4 weeks, significant organic keyword ranking and traffic growth typically materialize between 3 to 6 months depending on competition.',
        },
        {
          question: 'Do you guarantee #1 rankings on Google?',
          answer:
            'No ethical SEO specialist guarantees #1 rankings because Google controls the final algorithms. However, we guarantee strict adherence to Google Search Essentials and proven methodologies that have delivered top 3 rankings for hundreds of commercial keywords.',
        },
        {
          question: 'What access do you need to get started?',
          answer:
            'We typically request Google Search Console, Google Analytics 4, and temporary CMS/developer access (WordPress, Shopify, Next.js, or custom code) for implementing technical fixes.',
        },
      ],
      packages: [
        {
          id: 'pkg-seo-basic',
          tier: 'basic',
          name: 'SEO Foundation Audit & Quick Wins',
          price: 499,
          deliveryDays: 7,
          revisions: '2 rounds',
          description:
            'Perfect for small businesses wanting to fix technical errors and identify immediate ranking opportunities.',
          features: [
            'Complete 120-Point Technical SEO Audit',
            '30 High-Intent Keyword Targets Researched',
            'Competitor Gap Analysis (Top 3 Rivals)',
            'Top 5 Core Pages On-Page Optimization',
            'Google Search Console & GA4 Health Check',
            'Actionable 60-Day Roadmap',
          ],
        },
        {
          id: 'pkg-seo-standard',
          tier: 'standard',
          name: 'Growth SEO & Content Authority',
          price: 899,
          deliveryDays: 14,
          revisions: '3 rounds',
          isFeatured: true,
          description:
            'Designed for established businesses ready to capture top rankings from local and national competitors.',
          features: [
            'Everything in Basic Package',
            'Full On-Page Optimization for up to 15 Pages',
            'Complete Technical Core Web Vitals Fixes',
            'Content Strategy & 4 Optimized Article Outlines',
            'Semantic Internal Link Architecture',
            'High-Authority Niche Citation & Link Strategy',
            'Bi-Weekly Video Strategy & Progress Walkthrough',
          ],
        },
        {
          id: 'pkg-seo-premium',
          tier: 'premium',
          name: 'Enterprise SEO & Authority Dominance',
          price: 1699,
          deliveryDays: 28,
          revisions: 'Unlimited during contract',
          description:
            'End-to-end full-service SEO management for high-competition commercial verticals needing dominant market share.',
          features: [
            'Everything in Standard Package',
            'Unlimited Site-Wide Technical & Schema Implementations',
            'Topical Authority Silo Design (up to 30 Pages)',
            'White-Hat Digital PR & High-DA Outreach Campaign',
            'Competitor Keyword Theft & SERP Feature Takeover',
            'Dedicated Slack/WhatsApp Channel with Md Moshiour Rahman Bappi',
            'Live 24/7 Real-Time Performance Analytics Dashboard',
          ],
        },
      ],
    },
    {
      id: 'srv-local-seo',
      slug: 'local-seo',
      title: 'Local SEO & Google Business Profile Optimization',
      shortDescription:
        'Dominate the Google Maps 3-Pack, local searches, and capture nearby customers ready to call, visit, or buy.',
      longDescription:
        'When local customers search for your services, showing up in the Google Maps 3-Pack is the difference between a ringing phone and invisible silence. We optimize your Google Business Profile, fix NAP consistency, and execute targeted geo-grid local signals.',
      iconName: 'MapPin',
      category: 'local_seo',
      isAiSpecialty: false,
      whoNeedsIt: [
        'Local service businesses (Plumbing, HVAC, Roofing, Electricians, Landscaping)',
        'Medical & Dental clinics, Law firms, Accounting agencies',
        'Restaurants, Retail storefronts, Real estate brokers',
        'Multi-location regional businesses aiming to capture neighborhood market share',
      ],
      problemsSolved: [
        'Failing to rank in the Google Maps Local 3-Pack',
        'Suspended, unverified, or poorly configured Google Business Profile',
        'Conflicting phone numbers, addresses, or business names (NAP inconsistencies)',
        'Lack of systematic customer review generation and response strategy',
      ],
      benefits: [
        'Massive increase in direct phone calls, website visits, and driving directions',
        'Top 3 Google Maps positioning across your primary service radius',
        'Higher trust through verified 5-star customer review strategies',
        'Shield against competitor spam and duplicate map listings',
      ],
      process: [
        {
          step: 1,
          title: 'Google Business Profile Deep Audit & Geo-Grid Scan',
          description:
            'We run high-resolution geo-grid scans across your target zip codes to pinpoint exactly where your listing ranks within a 5 to 20 mile radius.',
        },
        {
          step: 2,
          title: 'Profile Optimization & Category Engineering',
          description:
            'Optimizing primary & secondary categories, business descriptions with localized semantic terms, services catalog, and geotagged high-resolution media.',
        },
        {
          step: 3,
          title: 'Local Citations & NAP Cleanup',
          description:
            'Fixing inconsistent Name, Address, and Phone data across 50+ major directories (Yelp, Apple Maps, Bing Places, YellowPages, BBB).',
        },
        {
          step: 4,
          title: 'Local Schema & Review Acceleration',
          description:
            'Embedding rich LocalBusiness JSON-LD markup on your website and implementing automated post-purchase review collection workflows.',
        },
      ],
      deliverables: [
        'Comprehensive GBP Audit & Geo-Grid Ranking Heatmap',
        '100% Fully Optimized Google Business Profile Assets',
        '50+ High-Authority Local & Industry-Specific Directory Citations',
        'NAP Consistency Audit & Duplicates Removal',
        'LocalBusiness Schema.org Markup Code Ready for Deployment',
        'Customer Review Generation Script & QR Code Kit',
      ],
      faqs: [
        {
          question: 'What is the Google Maps 3-Pack and why does it matter?',
          answer:
            'The 3-Pack is the top section of Google search results displaying a map and the top 3 local businesses. Studies show over 60% of all local mobile clicks go directly to these three listings.',
        },
        {
          question: 'Can you help if my Google Business Profile is suspended?',
          answer:
            'Yes. We audit reinstatement compliance, identify the cause (e.g. address issues, naming violations), prepare the official appeal documentation, and submit to Google support.',
        },
        {
          question: 'How do you prevent competitors from outranking me locally?',
          answer:
            'Through continuous citation velocity, active GBP posting, genuine customer reviews, geotargeted local landing pages, and ongoing monitoring for competitor keyword spam.',
        },
      ],
      packages: [
        {
          id: 'pkg-local-basic',
          tier: 'basic',
          name: 'Local Starter & GBP Audit',
          price: 399,
          deliveryDays: 5,
          revisions: '2 rounds',
          description:
            'Ideal for new or single-location businesses needing an audit and essential GBP setup.',
          features: [
            'Comprehensive Google Business Profile Audit',
            'Primary & Secondary Category Optimization',
            'Keyword-Rich Business Description & Service List',
            'Geo-Grid Ranking Baseline Scan (5-mile radius)',
            '25 Top Local Citations Submitted',
            'Review Collection Strategy Blueprint',
          ],
        },
        {
          id: 'pkg-local-standard',
          tier: 'standard',
          name: 'Local 3-Pack Dominator',
          price: 749,
          deliveryDays: 12,
          revisions: '3 rounds',
          isFeatured: true,
          description:
            'Our most popular package for local companies determined to capture the #1 to #3 spot in their city.',
          features: [
            'Everything in Starter Package',
            '50+ High-Authority Local & Industry Citations',
            'NAP Inconsistency Cleanup Across the Web',
            'Geo-Grid Ranking Expansion (10-mile radius)',
            'LocalBusiness Schema Integration on Main Site',
            '2 Geotargeted City Landing Page Optimization',
            'Monthly GBP Posts & Photo Geotagging Plan',
            'Review Response Playbook & Reputation Template',
          ],
        },
        {
          id: 'pkg-local-premium',
          tier: 'premium',
          name: 'Multi-Location & Regional Market Leader',
          price: 1399,
          deliveryDays: 21,
          revisions: 'Unlimited during project',
          description:
            'Engineered for multi-location businesses, franchises, or competitive service areas requiring aggressive coverage.',
          features: [
            'Everything in 3-Pack Dominator',
            'Coverage for up to 3 Locations or Wider 25-Mile Radius',
            '100+ Premium Direct Citations & Tier-2 Indexing',
            'Competitor Spam Removal via Redressal Complaints',
            'Custom Local Landing Pages & Siloed Location Schema',
            'Automated SMS/Email Review Funnel Integration',
            'Bi-Weekly Live Rank Tracking & Lead Attribution Reports',
          ],
        },
      ],
    },
    {
      id: 'srv-ai-visibility',
      slug: 'ai-visibility',
      title: 'AI Visibility, AEO & GEO Optimization',
      shortDescription:
        'Optimize your digital presence to be discovered, understood, and referenced across modern search and AI platforms like ChatGPT, Perplexity, and Gemini.',
      longDescription:
        'Search is changing rapidly. Millions of prospective clients now ask AI assistants for recommendations instead of clicking through ten blue links. We engineer your brand entity, schema markup, and content citations so modern AI engines understand who you are and recommend your business.',
      iconName: 'Sparkles',
      category: 'ai_visibility',
      isAiSpecialty: true,
      whoNeedsIt: [
        'Forward-thinking businesses preparing for the transition from Google to AI-driven answers',
        'B2B SaaS companies, professional advisors, consultants, and premium service providers',
        'Brands noticing drops in traditional search clicks due to Google AI Overviews',
        'Companies that want their brand cited by ChatGPT, Perplexity, Claude, and Gemini',
      ],
      problemsSolved: [
        'Being completely invisible when prospective clients prompt AI engines for vendor recommendations',
        'AI engines hallucinating or providing outdated, incorrect facts about your services',
        'Competitors dominating the sources and citations referenced in Perplexity and ChatGPT search',
        'Zero structured entity data linking your founder, brand, and authority credentials together',
      ],
      benefits: [
        'Position your brand as the definitive answer for high-intent industry queries',
        'Structured entity verification ensuring AI models describe your services accurately',
        'Placement in citation bibliographies of AI answers with direct source links',
        'Comprehensive defense against traffic losses from Google Search Generative / AI Overviews',
      ],
      process: [
        {
          step: 1,
          title: 'AI Platform Citation & Sentiment Audit',
          description:
            'We prompt major AI platforms (ChatGPT Search, Perplexity, Gemini, Copilot) with 50+ commercial queries to measure your citation share vs competitors.',
        },
        {
          step: 2,
          title: 'Entity & Knowledge Graph Construction',
          description:
            'Standardizing Wikidata, Crunchbase, official schema, and sameAs entity relationships so large language models map your company unambiguously.',
        },
        {
          step: 3,
          title: 'Answer Engine Content Optimization (AEO)',
          description:
            'Restructuring web content with direct conversational definitions, authoritative tabular data, and FAQ schemas that AI parsers extract effortlessly.',
        },
        {
          step: 4,
          title: 'Generative Citation Placement & Monitoring',
          description:
            'Securing mentions on high-authority trusted third-party repositories that LLM training sets and retrieval-augmented generation (RAG) engines rely upon.',
        },
      ],
      deliverables: [
        'AI Visibility Diagnostic Matrix across ChatGPT, Gemini, Perplexity & Google AI',
        'Knowledge Graph & Entity Disambiguation Blueprint',
        'Advanced JSON-LD Schema (Organization, Person, Service, FAQ, Speakable)',
        'AEO-Optimized Content Template & Prompt Library',
        'High-Weight LLM Data Source Placement Recommendations',
        'Ongoing AI Mention & Citation Monitoring Setup',
      ],
      faqs: [
        {
          question: 'Can you guarantee that ChatGPT or Perplexity will always recommend me?',
          answer:
            'No ethical specialist can promise guaranteed AI recommendations because model weights and dynamic RAG algorithms update constantly. We optimize your digital presence to dramatically improve your chances of being discovered, understood, and referenced.',
        },
        {
          question: 'What is the difference between SEO, AEO, and GEO?',
          answer:
            'Traditional SEO focuses on keyword rankings on Google. Answer Engine Optimization (AEO) structures your content to win direct answers in voice search and featured snippets. Generative Engine Optimization (GEO) ensures your brand is understood and cited inside conversational LLM models like ChatGPT, Gemini, and Perplexity.',
        },
        {
          question: 'Will AI Visibility replace traditional SEO?',
          answer:
            'Not replace, but evolve it. AI search engines still crawl the web and look for traditional authority signals like backlinks and clean technical HTML, but they process content using semantic entities rather than simple keyword matches.',
        },
      ],
      packages: [
        {
          id: 'pkg-ai-basic',
          tier: 'basic',
          name: 'AI Visibility Audit & Baseline',
          price: 599,
          deliveryDays: 7,
          revisions: '2 rounds',
          description:
            'Discover how current AI engines perceive your brand and uncover immediate citation gaps.',
          features: [
            'Complete Audit across ChatGPT, Perplexity, Gemini & Google AI',
            '25 Brand & Industry Prompt Benchmark Tests',
            'Knowledge Graph & Entity Consistency Review',
            'Entity Schema.org Markup Code for Website',
            'Competitor AI Citation Share Comparison',
            'Actionable AEO Implementation Checklist',
          ],
        },
        {
          id: 'pkg-ai-standard',
          tier: 'standard',
          name: 'AEO & Generative Search Accelerator',
          price: 1199,
          deliveryDays: 15,
          revisions: '3 rounds',
          isFeatured: true,
          description:
            'Our flagship package to restructure your web assets for maximum visibility in generative search results.',
          features: [
            'Everything in Audit Package',
            'Full Entity Graph Alignment (Wikidata, Crunchbase, sameAs)',
            'Advanced Multi-Tier Schema Suite (Service, Org, FAQ, Person)',
            'Optimization of 8 Core Pages for AI Retrieval (RAG-friendly)',
            'FAQ & Direct Answer Library Implementation',
            'Third-Party Trusted Source Citation Strategy',
            '30-Day Follow-Up AI Citation Benchmark Check',
          ],
        },
        {
          id: 'pkg-ai-premium',
          tier: 'premium',
          name: 'Enterprise AI & Omni-Search Dominance',
          price: 2199,
          deliveryDays: 30,
          revisions: 'Unlimited during project',
          description:
            'Complete transformation integrating classic SEO, Local 3-Pack, and comprehensive Generative AI search visibility.',
          features: [
            'Everything in Accelerator Package',
            'Full Topical Knowledge Silo across 20+ Service Pages',
            'Digital PR on High-Weight LLM Data Repositories',
            'Competitor Citation Infiltration Campaign',
            'Custom AI Query Synthetic Simulation Testing',
            'Executive Briefing on Model Updates & Search Generative Evolution',
            'Direct Access to Md Moshiour Rahman Bappi for Strategy Sessions',
          ],
        },
      ],
    },
    {
      id: 'srv-web-dev',
      slug: 'web-dev',
      title: 'SEO-Engineered Web Development',
      shortDescription:
        'Blazing-fast, modern, conversion-focused websites engineered from the ground up for search engine indexing, Core Web Vitals, and smooth client workflows.',
      longDescription:
        'A beautiful website that loads slowly or hides content from search crawlers will never generate leads. We build custom websites using modern, lightweight frameworks that score 95+ on Google PageSpeed and turn organic visitors into paying customers.',
      iconName: 'Code',
      category: 'web_dev',
      isAiSpecialty: false,
      whoNeedsIt: [
        'Businesses with slow, outdated, or unresponsive websites',
        'Companies launching a new service, brand, or local storefront',
        'Agencies requiring custom client dashboards, booking funnels, or payment flows',
        'Founders who want complete ownership and content control without paying ongoing developer fees',
      ],
      problemsSolved: [
        'Failing Google Core Web Vitals scores resulting in algorithmic ranking penalties',
        'High mobile bounce rates due to clunky navigation or slow load times',
        'Complicated legacy CMS systems that break when updated',
        'Lack of integrated payment gateways and automated lead capture',
      ],
      benefits: [
        'Sub-second page loads with 95+ Google PageSpeed Insights scores',
        'Flawless mobile-responsive experience across all devices and screen sizes',
        'Pre-configured SEO architecture, schema tags, sitemaps, and robots.txt',
        'Full administrative CMS allowing you to publish and modify text, prices, and blogs without code',
      ],
      process: [
        {
          step: 1,
          title: 'UX/UI Architecture & Conversion Wireframing',
          description:
            'Mapping out user journeys, call-to-action touchpoints, and mobile layouts built for maximum lead conversion.',
        },
        {
          step: 2,
          title: 'Modern Frontend & Backend Development',
          description:
            'Clean, modular code built with modern stacks (React, Vite, Express, Tailwind CSS) without bloated plugins.',
        },
        {
          step: 3,
          title: 'SEO & Core Web Vitals Optimization',
          description:
            'Compressing assets, implementing lazy loading, server caching, and embedding comprehensive JSON-LD schemas.',
        },
        {
          step: 4,
          title: 'Payments, CMS Setup & Handover',
          description:
            'Configuring secure payment gateways, client dashboards, automated emails, and training on the admin CMS.',
        },
      ],
      deliverables: [
        'Production-Ready High-Performance Web Application',
        '100% Responsive Layouts for Mobile, Tablet, Desktop, and 4K Displays',
        'Integrated CMS for Services, Blog, Testimonials, and Pricing',
        'Secure Checkout & Payment Gateway Integration',
        'Pre-Configured XML Sitemap, Robots.txt, and Meta Tags',
        'Comprehensive Handover Documentation and Video Guide',
      ],
      faqs: [
        {
          question: 'Will I be able to update text and prices myself?',
          answer:
            'Yes! You receive a dedicated Admin Dashboard where you can update packages, edit prices, publish blog posts, add new case studies, and change text with zero technical knowledge.',
        },
        {
          question: 'Do you build on WordPress, or custom modern code?',
          answer:
            'We specialize in modern, ultra-fast frameworks (React/Vite/Node/Tailwind) that load up to 10x faster than traditional plugin-heavy WordPress sites, but we also support headless and custom CMS architectures tailored to your operational needs.',
        },
        {
          question: 'Who owns the website and source code?',
          answer:
            'You do! Upon completion, 100% full ownership of the source code, hosting credentials, domain DNS, and database are transferred directly to you.',
        },
      ],
      packages: [
        {
          id: 'pkg-dev-basic',
          tier: 'basic',
          name: 'High-Converting Landing Page',
          price: 699,
          deliveryDays: 7,
          revisions: '3 rounds',
          description:
            'A focused, ultra-fast single-page website engineered to convert paid or organic traffic into booked leads.',
          features: [
            'Custom Responsive Design (Mobile & Desktop)',
            'Core Web Vitals Optimized (95+ PageSpeed)',
            'Direct Lead Generation Form with Email Alerts',
            'Full SEO Meta Tags & Schema Integration',
            'Payment / Booking Button Integration',
            'Domain & Hosting Setup Assistance',
          ],
        },
        {
          id: 'pkg-dev-standard',
          tier: 'standard',
          name: 'Complete Business Agency Platform',
          price: 1499,
          deliveryDays: 16,
          revisions: '4 rounds',
          isFeatured: true,
          description:
            'Our standard full-featured business platform with CMS, service catalog, blog, and customer inquiry funnels.',
          features: [
            'Up to 8 Custom Pages (Home, Services, About, Portfolio, Blog, Contact)',
            'Complete Admin CMS to Edit Content, Pricing & Services',
            'Online Service Ordering & Checkout Flow',
            'Customer Inquiry & Lead Management Database',
            'Comprehensive Local SEO & Schema Architecture',
            'Fast CDN & SSL Security Setup',
            'Video Walkthrough & Handover Documentation',
          ],
        },
        {
          id: 'pkg-dev-premium',
          tier: 'premium',
          name: 'Full-Stack Platform & Client Portal',
          price: 2899,
          deliveryDays: 28,
          revisions: 'Unlimited during build',
          description:
            'Complete custom web application with customer dashboard, deliverables portal, role-based admin, and recurring payments.',
          features: [
            'Unlimited Custom Dynamic Pages & Templates',
            'Client Portal with Order Status, Deliverables & Invoicing',
            'Role-Based Agency Access (Admin, SEO Manager, Content, Developer)',
            'Stripe / International Payment Gateway Integration',
            'Automated Email Notification Engine',
            'Priority Post-Launch Support & Maintenance (60 Days)',
            'Direct Architecture Consultation with Md Moshiour Rahman Bappi',
          ],
        },
      ],
    },
  ],

  caseStudies: [
    {
      id: 'cs-1',
      title: 'Dominating Local Dental Map Pack in Austin, TX',
      clientName: 'Austin Smiles Dentistry',
      industry: 'Healthcare / Dental',
      location: 'Austin, Texas, USA',
      category: 'local_seo',
      problem:
        'A modern dental practice was invisible beyond 0.5 miles from their clinic, ranking #14 on Google Maps and losing high-value implant patients to older practices.',
      strategy:
        'Executed complete Google Business Profile optimization, eliminated 38 duplicate citations, created geo-targeted neighborhood service pages, and launched an automated SMS review collection workflow.',
      workCompleted: [
        'Restructured GBP primary categories and localized treatment services',
        'Cleaned NAP data across 65 health directories and local chambers of commerce',
        'Implemented LocalBusiness and MedicalOrganization JSON-LD schemas',
        'Generated 84 authentic 5-star Google reviews in 90 days',
      ],
      results: [
        { metric: 'Google Maps Rank', value: '#1', change: 'Up from #14' },
        { metric: 'Direct Phone Calls', value: '184 / mo', change: '+240%' },
        { metric: 'Direction Requests', value: '310 / mo', change: '+185%' },
      ],
      beforeAfter: {
        before: 'Average 12 new patient inquiries monthly via organic maps.',
        after: 'Consistently generates 45+ verified new patient bookings every month.',
      },
      timeline: '90 Days Campaign',
      servicesUsed: ['Local SEO', 'Google Business Profile Optimization', 'Local Schema'],
      screenshotUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
      isFeatured: true,
    },
    {
      id: 'cs-2',
      title: 'Winning Top AI Citations on Perplexity & ChatGPT',
      clientName: 'CloudMatrix Analytics',
      industry: 'B2B SaaS / FinTech',
      location: 'San Francisco, CA, USA',
      category: 'ai_visibility',
      problem:
        'Despite strong traditional blog traffic, the SaaS product was never mentioned when prospective enterprise buyers asked ChatGPT or Perplexity for "best financial data pipeline software".',
      strategy:
        'Constructed a unified Knowledge Graph entity model, published factual tabular benchmark studies, embedded FAQ schemas, and earned citations on high-weight repositories indexed by AI training pipelines.',
      workCompleted: [
        'Conducted synthetic prompt testing across 100+ B2B commercial intent queries',
        'Disambiguated brand entity across Wikidata, Crunchbase, and LinkedIn',
        'Deployed AEO-structured answer blocks on top 12 comparison pages',
        'Secured editorial mentions in core algorithmic citation sources',
      ],
      results: [
        { metric: 'Perplexity Citation Share', value: '68%', change: 'From 0%' },
        { metric: 'ChatGPT Source Links', value: '#1 Recommended', change: 'Top 3 in category' },
        { metric: 'Enterprise Demo Bookings', value: '+74%', change: 'Direct AI referrals' },
      ],
      beforeAfter: {
        before: 'Zero organic leads traceable to generative AI queries.',
        after: '32 enterprise demo requests per month originating directly from AI search citations.',
      },
      timeline: '60 Days Implementation',
      servicesUsed: ['AI Visibility Audit', 'AEO / GEO Optimization', 'Entity Modeling'],
      screenshotUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      isFeatured: true,
    },
    {
      id: 'cs-3',
      title: '340% Organic Traffic Surge for Commercial HVAC',
      clientName: 'ProTech Climate Systems',
      industry: 'Commercial Construction & HVAC',
      location: 'Chicago, Illinois, USA',
      category: 'seo',
      problem:
        'Website suffered from severe keyword cannibalization, slow mobile speeds (28 PageSpeed score), and zero high-value rankings for commercial installation terms.',
      strategy:
        'Refactored site architecture into clear topical clusters, resolved 420 crawl errors, rebuilt page templates for 98 PageSpeed score, and launched high-authority digital PR link building.',
      workCompleted: [
        'Complete technical crawl remediation and Core Web Vitals speed optimization',
        'Created 24 commercial topical authority pages targeting high-ticket buyers',
        'Built 35 high-DA niche contextual backlinks through industry outreach',
        'Implemented semantic internal linking matrix',
      ],
      results: [
        { metric: 'Organic Traffic', value: '42,000 / mo', change: '+340%' },
        { metric: 'Top 3 Commercial Keywords', value: '118 Terms', change: 'Up from 9' },
        { metric: 'Organic Commercial Contracts', value: '$420,000', change: 'Attributed pipeline' },
      ],
      beforeAfter: {
        before: 'Stagnant at 9,500 monthly visits relying heavily on Google Ads.',
        after: 'Over 42,000 qualified monthly visits with paid ad spend cut by 60%.',
      },
      timeline: '6 Months Ongoing Growth',
      servicesUsed: ['Technical SEO', 'Content Authority', 'White-Hat Link Building'],
      screenshotUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      isFeatured: true,
    },
    {
      id: 'cs-4',
      title: 'Sub-Second Web Platform & Booking Engine',
      clientName: 'Vanguard Wealth Advisory',
      industry: 'Wealth Management',
      location: 'London, UK',
      category: 'web_dev',
      problem:
        'Outdated WordPress site with 45 plugins took 6.2 seconds to load on mobile. Prospective high-net-worth clients abandoned booking forms before finishing.',
      strategy:
        'Rebuilt the entire digital platform with React/Vite/Tailwind, integrated a custom multi-step consultation funnel, and connected automated CRM synchronization.',
      workCompleted: [
        'Custom lightweight frontend achieving 99/100 Google PageSpeed score',
        'Secure multi-step financial assessment questionnaire with instant PDF summary',
        'Full JSON-LD FinancialService schema implementation',
        'Client portal with document upload and encrypted review status',
      ],
      results: [
        { metric: 'Page Load Speed', value: '0.6s', change: 'From 6.2s' },
        { metric: 'Form Completion Rate', value: '38%', change: '+180%' },
        { metric: 'Bounce Rate', value: '22%', change: '-64%' },
      ],
      beforeAfter: {
        before: '6.2s load speed, 72% mobile bounce rate, 4 bookings per week.',
        after: '0.6s load speed, 22% bounce rate, 19 qualified consultations booked weekly.',
      },
      timeline: '4 Weeks Build & Deployment',
      servicesUsed: ['SEO-Engineered Web Development', 'Core Web Vitals', 'Conversion Optimization'],
      screenshotUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      isFeatured: true,
    },
  ],

  reviews: [
    {
      id: 'rev-1',
      customerName: 'Dr. Michael Harrison',
      company: 'Austin Smiles Dental Clinic',
      role: 'Founder & Lead Dentist',
      review:
        'Bappi completely transformed our local visibility. We went from being buried on page 2 of Google Maps to the #1 spot for emergency dentist and dental implants in Austin. Our front desk receives new patient calls every single morning directly from the 3-Pack. Outstanding communication and genuine expertise.',
      rating: 5,
      servicePurchased: 'Local SEO & Google Business Profile Optimization',
      date: '2026-07-14',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      isFeatured: true,
      isApproved: true,
      source: 'Google Verified Review',
    },
    {
      id: 'rev-2',
      customerName: 'Sarah Lin',
      company: 'CloudMatrix Analytics',
      role: 'VP of Marketing',
      review:
        'When ChatGPT Search and Perplexity started steering users away from traditional search results, we knew we had to adapt. Bappi conducted an AI Visibility audit that uncovered exactly why we were being ignored by LLMs. Within weeks of implementing his entity schemas and AEO guidelines, Perplexity and ChatGPT began quoting our platform as an authority. Truly ahead of the curve.',
      rating: 5,
      servicePurchased: 'AI Visibility & AEO Optimization',
      date: '2026-08-02',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
      isFeatured: true,
      isApproved: true,
      source: 'Direct Client Feedback',
    },
    {
      id: 'rev-3',
      customerName: 'Robert Gallagher',
      company: 'ProTech Climate Systems',
      role: 'Managing Director',
      review:
        'We had worked with two previous SEO agencies that promised the moon and produced zero revenue. Bappi was honest, transparent, and started with a thorough technical audit that fixed our fundamental indexing bottlenecks. Our organic traffic increased by 340%, yielding over $400k in commercial HVAC contracts. Best marketing investment we have ever made.',
      rating: 5,
      servicePurchased: 'Comprehensive Technical & Monthly SEO',
      date: '2026-06-20',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      isFeatured: true,
      isApproved: true,
      source: 'Google Verified Review',
    },
    {
      id: 'rev-4',
      customerName: 'Julian Thorne',
      company: 'Vanguard Wealth Advisory',
      role: 'Partner',
      review:
        'Bappi developed our new web platform with unmatched precision. It loads almost instantly on mobile, and the client portal allows our prospective clients to securely complete assessment forms. He delivers clean code, excellent SEO structure, and provided complete training so we can manage content ourselves.',
      rating: 5,
      servicePurchased: 'SEO-Engineered Web Development',
      date: '2026-08-28',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      isFeatured: true,
      isApproved: true,
      source: 'Direct Client Feedback',
    },
  ],

  blogPosts: [
    {
      id: 'blog-1',
      slug: 'ai-search-visibility-aeo-geo-guide-2026',
      title: 'The 2026 Guide to AI Search Visibility: How to Be Cited by ChatGPT, Gemini & Perplexity',
      excerpt:
        'Learn the foundational strategies behind Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) to ensure modern AI models reference your business.',
      content: `### The Fundamental Shift in Search

Search is undergoing its most profound transformation since Google introduced PageRank in 1998. Prospective clients no longer scan ten blue links and evaluate meta snippets; increasingly, they prompt conversational AI assistants like ChatGPT, Google AI Overviews, Perplexity, and Gemini to summarize, recommend, and vet options directly.

If your website is not engineered to be consumed by Retrieval-Augmented Generation (RAG) pipelines, your organic traffic will diminish even if you rank on page one of classic SERPs.

### 1. Entity Disambiguation and Knowledge Graphs

AI models do not index isolated keywords; they construct relationships between semantic entities (Person, Organization, Place, Service, Product).

To establish entity clarity:
* Implement explicit \`@id\` URI anchors in your Schema.org JSON-LD markup.
* Bind your business to verified knowledge repositories using the \`sameAs\` property linking to Wikidata, Crunchbase, official social channels, and authoritative directories.
* Ensure consistent Name, Address, Phone (NAP), and founder identity across the entire digital ecosystem.

### 2. Crafting RAG-Friendly Answer Blocks

Generative search engines extract concise, factual passages to construct their synthesized answers. 

Follow these formatting principles:
* **Direct 40-word definitions:** Place clear, unambiguous definitions immediately beneath H2/H3 question headers before elaborating.
* **Information density:** Eliminate fluff and generic filler phrases. LLM parsers prioritize high-density data, numerical statistics, and comparative tables.
* **Semantic FAQ Schemas:** Every high-value service page should include structured FAQ markup answering specific pricing, timeline, and qualification questions.

### 3. Third-Party Citation Authority

Perplexity and ChatGPT rely heavily on authoritative third-party publications to validate factual claims. Securing mentions in industry publications, verified reviews, and specialized niche databases provides the external verification LLMs require before recommending your business to prospective buyers.`,
      category: 'AI Visibility',
      tags: ['AEO', 'GEO', 'AI Search', 'ChatGPT', 'Perplexity', 'Schema'],
      author: {
        name: 'Md Moshiour Rahman Bappi',
        role: 'SEO & AI Visibility Specialist',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      },
      publishedAt: '2026-09-01',
      status: 'published',
      featuredImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      seoTitle: 'AI Visibility & GEO Guide 2026 | Md Moshiour Rahman Bappi',
      metaDescription:
        'Comprehensive guide on optimizing your brand for AI search engines: ChatGPT, Perplexity, Gemini, and Google AI Overviews using AEO and GEO strategies.',
      readingTime: '6 min read',
    },
    {
      id: 'blog-2',
      slug: 'local-seo-google-maps-3-pack-playbook',
      title: 'Google Business Profile Mastery: How to Dominate the Local 3-Pack in 2026',
      excerpt:
        'A battle-tested blueprint for local businesses to outrank competitors on Google Maps, eliminate spam, and capture high-intent phone calls.',
      content: `### Why the Google Maps 3-Pack Dominates Local Conversions

Over 65% of mobile users seeking local services click on one of the top three businesses featured in the Google Maps 3-Pack. If you are not in the top 3, your competitors are capturing the vast majority of calls and walk-ins.

### Pillar 1: Strategic Category Architecture

Your Primary Category in Google Business Profile holds up to 60% of your initial ranking weight.
* Choose the most specific, revenue-driving primary category rather than a generic broad classification.
* Add relevant secondary categories that accurately reflect your secondary service lines.
* Avoid keyword stuffing in your registered business name unless it is legally registered, as Google actively suspends accounts for naming violations.

### Pillar 2: The Geo-Grid Expansion Method

Rankings naturally fade as distance increases from your physical address. To expand your ranking radius across your entire city:
* Create dedicated, content-rich neighborhood service landing pages on your primary website.
* Embed your official Google Map listing with clean geo-coordinates on your contact and location pages.
* Regularly publish geotagged updates, recent project photos, and local community case studies inside your GBP dashboard.

### Pillar 3: Review Velocity & Semantic Keywords

Review count matters, but review velocity (the steady arrival of authentic reviews) and review content matter even more. When satisfied clients mention specific service names and city neighborhoods in their reviews, Google’s NLP algorithm directly associates your listing with those high-intent search queries.`,
      category: 'Local SEO',
      tags: ['Local SEO', 'Google Maps', 'Google Business Profile', 'Citations', 'Reviews'],
      author: {
        name: 'Md Moshiour Rahman Bappi',
        role: 'SEO & AI Visibility Specialist',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      },
      publishedAt: '2026-08-18',
      status: 'published',
      featuredImage: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80',
      seoTitle: 'Google Maps 3-Pack Local SEO Playbook | Md Moshiour Rahman Bappi',
      metaDescription:
        'Step-by-step strategy to rank your business #1 in the Google Maps 3-Pack, optimize your GBP listing, and generate consistent local leads.',
      readingTime: '5 min read',
    },
    {
      id: 'blog-3',
      slug: 'technical-seo-core-web-vitals-modern-web',
      title: 'Technical SEO for Modern Web Frameworks: Core Web Vitals & Crawl Budget',
      excerpt:
        'How modern single-page applications and modern web platforms can achieve perfect 100/100 Core Web Vitals while ensuring seamless Googlebot indexing.',
      content: `### The Technical Speed & Indexation Challenge

Modern web applications offer incredible user experiences, but poorly implemented client-side rendering can result in delayed indexation and poor Core Web Vitals metrics.

### Key Optimization Checkpoints:
1. **Interaction to Next Paint (INP):** Ensure main-thread JavaScript execution remains under 200ms by debouncing intensive listeners and code-splitting heavy third-party tracking scripts.
2. **Largest Contentful Paint (LCP):** Preload critical display fonts and hero images with explicit width/height dimensions to prevent layout shifts (CLS).
3. **Structured Semantic HTML:** Googlebot requires clear heading hierarchy (\`h1\` to \`h3\`), semantic landmarks (\`<header>\`, \`<main>\`, \`<nav>\`), and proper \`rel="canonical"\` links to establish indexing authority.`,
      category: 'SEO',
      tags: ['Technical SEO', 'Core Web Vitals', 'PageSpeed', 'Web Development'],
      author: {
        name: 'Md Moshiour Rahman Bappi',
        role: 'SEO & AI Visibility Specialist',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      },
      publishedAt: '2026-07-29',
      status: 'published',
      featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
      seoTitle: 'Technical SEO & Core Web Vitals for Modern Web | Md Moshiour Rahman Bappi',
      metaDescription:
        'Master technical SEO in 2026: Core Web Vitals, INP optimization, crawl budgets, and server-side rendering for top Google rankings.',
      readingTime: '7 min read',
    },
  ],

  users: [
    {
      id: 'usr-bappi',
      name: 'Md Moshiour Rahman Bappi',
      email: 'mdmoshiourrahmanbappi@gmail.com',
      role: 'super_admin',
      company: 'Md Moshiour Rahman Bappi Agency',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      createdAt: '2026-01-01T00:00:00Z',
    },
    {
      id: 'usr-sarah',
      name: 'Sarah Jenkins',
      email: 'sarah.ops@bappi-agency.com',
      role: 'admin',
      company: 'Bappi Agency Operations',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
      createdAt: '2026-02-15T00:00:00Z',
    },
    {
      id: 'usr-alex',
      name: 'Alex Rivera',
      email: 'alex.seo@bappi-agency.com',
      role: 'seo_manager',
      company: 'Bappi Agency Technical Team',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      createdAt: '2026-03-01T00:00:00Z',
    },
    {
      id: 'usr-elena',
      name: 'Elena Rostova',
      email: 'elena.content@bappi-agency.com',
      role: 'content_manager',
      company: 'Bappi Agency Editorial',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      createdAt: '2026-03-10T00:00:00Z',
    },
    {
      id: 'usr-marcus',
      name: 'Marcus Vance',
      email: 'marcus.orders@bappi-agency.com',
      role: 'order_manager',
      company: 'Bappi Agency Client Success',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      createdAt: '2026-04-05T00:00:00Z',
    },
    {
      id: 'usr-david',
      name: 'David Sterling',
      email: 'david@sterlinglegal.com',
      role: 'client',
      company: 'Sterling & Partners Law Firm',
      phone: '+1 (555) 729-1049',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      createdAt: '2026-08-10T00:00:00Z',
    },
  ],

  orders: [
    {
      id: 'ord-84920',
      orderNumber: 'ORD-84920',
      serviceId: 'srv-local-seo',
      serviceName: 'Local SEO & Google Business Profile Optimization',
      packageTier: 'standard',
      packageName: 'Local 3-Pack Dominator',
      price: 749,
      customerName: 'David Sterling',
      customerEmail: 'david@sterlinglegal.com',
      customerPhone: '+1 (555) 729-1049',
      company: 'Sterling & Partners Law Firm',
      websiteUrl: 'https://sterlinglegal.com',
      businessLocation: 'Dallas, Texas',
      gbpUrl: 'https://maps.google.com/?cid=849201948201948',
      targetKeywords: 'commercial litigation attorney dallas, corporate lawyer near me',
      requirements:
        'We want to rank in the Google Maps 3-Pack for commercial litigation in Dallas. Currently stuck at position #9 on maps.',
      files: [
        {
          id: 'f-1',
          name: 'sterling-bar-accreditation-and-logos.zip',
          size: 4200000,
          type: 'application/zip',
          url: 'https://placehold.co/download/sterling-bar-accreditation-and-logos.zip',
          uploadedAt: '2026-08-10T14:22:00Z',
        },
      ],
      status: 'in_progress',
      paymentStatus: 'paid',
      transactionId: 'TXN-98420-STRIPE',
      paymentMethod: 'Credit Card (Stripe Verified)',
      createdAt: '2026-08-10T14:25:00Z',
      deliverables: [
        {
          id: 'del-1',
          title: 'Initial Geo-Grid Baseline Scan & GBP Audit Report',
          fileUrl: 'https://placehold.co/download/sterling-local-audit.pdf',
          fileSize: '3.4 MB (PDF)',
          uploadedAt: '2026-08-12T10:15:00Z',
          notes: 'Baseline scan shows rank #9 in downtown Dallas. Citations cleanup initiated.',
        },
      ],
      internalNotes: 'Client is an attorney. Verified bar status. Target delivery of citations list by Friday.',
      messages: [
        {
          id: 'msg-1',
          sender: 'David Sterling',
          role: 'client',
          message: 'Hello Bappi, we have uploaded our bar accreditation and logo files. Looking forward to getting started!',
          timestamp: '2026-08-10T14:30:00Z',
        },
        {
          id: 'msg-2',
          sender: 'Md Moshiour Rahman Bappi',
          role: 'super_admin',
          message: 'Welcome David! We have received your project details and the baseline audit is now in progress. You will see the first deliverable in your portal within 48 hours.',
          timestamp: '2026-08-10T15:05:00Z',
        },
      ],
    },
    {
      id: 'ord-84918',
      orderNumber: 'ORD-84918',
      serviceId: 'srv-ai-visibility',
      serviceName: 'AI Visibility, AEO & GEO Optimization',
      packageTier: 'standard',
      packageName: 'AEO & Generative Search Accelerator',
      price: 1199,
      customerName: 'Sarah Lin',
      customerEmail: 'sarah.lin@cloudmatrix.io',
      customerPhone: '+1 (555) 830-4921',
      company: 'CloudMatrix Analytics',
      websiteUrl: 'https://cloudmatrix.io',
      businessLocation: 'San Francisco, CA',
      targetKeywords: 'financial data pipeline software, ai analytics platform',
      requirements:
        'Need entity schema and AEO optimizations to be cited in ChatGPT Search and Perplexity comparisons.',
      files: [
        {
          id: 'f-2',
          name: 'cloudmatrix-product-specifications.pdf',
          size: 1800000,
          type: 'application/pdf',
          url: 'https://placehold.co/download/cloudmatrix-product-specifications.pdf',
          uploadedAt: '2026-08-01T09:12:00Z',
        },
      ],
      status: 'completed',
      paymentStatus: 'paid',
      transactionId: 'TXN-74192-STRIPE',
      paymentMethod: 'Credit Card (Stripe Verified)',
      createdAt: '2026-08-01T09:15:00Z',
      deliverables: [
        {
          id: 'del-2',
          title: 'Final AI Visibility Diagnostic & Schema Code Pack',
          fileUrl: 'https://placehold.co/download/cloudmatrix-aeo-deliverable.zip',
          fileSize: '8.2 MB (ZIP)',
          uploadedAt: '2026-08-14T16:00:00Z',
          notes: 'Full JSON-LD schema deployed and verified with Google Rich Results test. Citations active in Perplexity.',
        },
      ],
      internalNotes: 'Project completed successfully. Client left a glowing review.',
      messages: [
        {
          id: 'msg-3',
          sender: 'Md Moshiour Rahman Bappi',
          role: 'super_admin',
          message: 'Sarah, all schema files and AEO content modifications have been completed and verified. Check out the final report attached!',
          timestamp: '2026-08-14T16:10:00Z',
        },
        {
          id: 'msg-4',
          sender: 'Sarah Lin',
          role: 'client',
          message: 'Phenomenal work Bappi! Perplexity is already referencing our brand in prompt searches. Thank you!',
          timestamp: '2026-08-15T09:00:00Z',
        },
      ],
    },
  ],

  leads: [
    {
      id: 'lead-1',
      name: 'Jonathan Miller',
      email: 'jonathan@premierplumbingchicago.com',
      website: 'https://premierplumbingchicago.com',
      businessName: 'Premier Plumbing Chicago',
      location: 'Chicago, IL',
      mainConcern: 'Dropped from Google Maps 3-Pack after a competitor added keyword stuffing to their profile.',
      type: 'audit',
      status: 'new',
      createdAt: '2026-09-14T18:20:00Z',
      notes: 'High potential local client. Follow up with geo-grid scan proposal.',
    },
    {
      id: 'lead-2',
      name: 'Amanda Brooks',
      email: 'abrooks@nextgensolar.io',
      website: 'https://nextgensolar.io',
      businessName: 'NextGen Solar Solutions',
      location: 'Phoenix, AZ',
      mainConcern: 'Want to optimize brand entity so ChatGPT and Gemini recommend our commercial solar panels.',
      type: 'consultation',
      status: 'contacted',
      createdAt: '2026-09-13T11:45:00Z',
      notes: 'Scheduled strategy call for Thursday 2 PM.',
    },
  ],

  auditLogs: [
    {
      id: 'log-1',
      userId: 'usr-bappi',
      userName: 'Md Moshiour Rahman Bappi',
      userRole: 'super_admin',
      action: 'System Initialized',
      details: 'Agency database seeded with core services, packages, and RBAC policies.',
      timestamp: '2026-09-15T08:00:00Z',
    },
    {
      id: 'log-2',
      userId: 'usr-marcus',
      userName: 'Marcus Vance',
      userRole: 'order_manager',
      action: 'Order Status Updated',
      details: 'Updated order ORD-84920 to "in_progress".',
      timestamp: '2026-09-15T08:15:00Z',
    },
  ],
};

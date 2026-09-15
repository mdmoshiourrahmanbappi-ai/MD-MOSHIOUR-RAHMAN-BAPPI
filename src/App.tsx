import React, { useState, useEffect } from 'react';
import { initialData } from './data/initialData.ts';
import {
  SiteData,
  ServiceItem,
  Order,
  Lead,
  Review,
  CaseStudy,
  BlogPost,
  SiteContent,
  UserRole,
  AuditLog,
  OrderFile,
  OrderDeliverable,
  OrderMessage,
} from './types.ts';
import { fetchSiteData } from './services/api.ts';

// Components
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { ServiceDetailModal } from './components/ServiceDetailModal.tsx';
import { AeoGeoSection } from './components/AeoGeoSection.tsx';
import { CaseStudiesSection } from './components/CaseStudiesSection.tsx';
import { ReviewsSection } from './components/ReviewsSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { BlogSection } from './components/BlogSection.tsx';
import { BlogPostModal } from './components/BlogPostModal.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { OrderCheckoutModal } from './components/OrderCheckoutModal.tsx';
import { CustomerDashboard } from './components/CustomerDashboard.tsx';
import { AdminDashboard } from './components/AdminDashboard.tsx';
import { FreeAuditModal } from './components/FreeAuditModal.tsx';
import { SeoArchitectureModal } from './components/SeoArchitectureModal.tsx';

export default function App() {
  // Main data state initialized with rich seed data for immediate render
  const [data, setData] = useState<SiteData>(initialData);
  const [loading, setLoading] = useState(true);

  // Active view routing
  const [currentView, setCurrentView] = useState<string>('home');

  // RBAC User simulation state
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('super_admin');
  const [currentUserName, setCurrentUserName] = useState<string>('Md Moshiour Rahman Bappi');

  // Modals state
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>();
  const [preselectedTier, setPreselectedTier] = useState<string | undefined>();
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [seoViewerOpen, setSeoViewerOpen] = useState(false);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceItem | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);

  // Fetch live persisted database on mount
  useEffect(() => {
    fetchSiteData()
      .then((liveData) => {
        if (liveData && liveData.services?.length) {
          setData(liveData);
        }
      })
      .catch((err) => {
        console.warn('Backend API connection: using local cached state', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Sync role name changes
  const handleSelectRole = (role: UserRole) => {
    setCurrentUserRole(role);
    switch (role) {
      case 'super_admin':
        setCurrentUserName('Md Moshiour Rahman Bappi (Owner)');
        break;
      case 'admin':
        setCurrentUserName('Agency Operations Admin');
        break;
      case 'seo_manager':
        setCurrentUserName('Technical SEO Lead');
        break;
      case 'content_manager':
        setCurrentUserName('Content & Blog Strategist');
        break;
      case 'developer':
        setCurrentUserName('Full-Stack Web Engineer');
        break;
      case 'order_manager':
        setCurrentUserName('Client Accounts Manager');
        break;
      case 'client':
        setCurrentUserName('David Sterling (Sterling Legal)');
        break;
      default:
        setCurrentUserName('Team Member');
    }
  };

  // Open Order Modal with pre-selections
  const handleOpenOrder = (serviceId?: string, tier?: string) => {
    setPreselectedServiceId(serviceId || 'srv-local-seo');
    setPreselectedTier(tier || 'standard');
    setOrderModalOpen(true);
  };

  // Order creation callback
  const handleOrderCompleted = (newOrder: Order) => {
    setData((prev) => ({
      ...prev,
      orders: [newOrder, ...prev.orders],
      auditLogs: [
        {
          id: `log-${Date.now()}`,
          userId: 'guest',
          userName: newOrder.customerName,
          userRole: 'client',
          action: 'CREATED_ORDER',
          entityType: 'order',
          entityId: newOrder.id,
          timestamp: new Date().toISOString(),
          details: `Order #${newOrder.orderNumber} placed for ${newOrder.serviceName}`,
        },
        ...prev.auditLogs,
      ],
    }));
  };

  // Client Dashboard File Upload
  const handleUploadOrderFile = async (orderId: string, file: OrderFile) => {
    setData((prev) => ({
      ...prev,
      orders: prev.orders.map((o) =>
        o.id === orderId ? { ...o, files: [...o.files, file] } : o
      ),
    }));
    try {
      await fetch(`/api/orders/${orderId}/files`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(file),
      });
    } catch (e) {
      console.error(e);
    }
  };

  // Client Dashboard Send Message
  const handleSendMessage = async (orderId: string, message: OrderMessage) => {
    setData((prev) => ({
      ...prev,
      orders: prev.orders.map((o) =>
        o.id === orderId ? { ...o, messages: [...o.messages, message] } : o
      ),
    }));
    try {
      await fetch(`/api/orders/${orderId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
      });
    } catch (e) {
      console.error(e);
    }
  };

  // Admin: Update order status
  const handleUpdateOrderStatus = async (
    orderId: string,
    status: Order['status'],
    internalNotes?: string
  ) => {
    setData((prev) => ({
      ...prev,
      orders: prev.orders.map((o) =>
        o.id === orderId ? { ...o, status, internalNotes: internalNotes || o.internalNotes } : o
      ),
      auditLogs: [
        {
          id: `log-${Date.now()}`,
          userId: 'admin',
          userName: currentUserName,
          userRole: currentUserRole,
          action: 'UPDATE_ORDER_STATUS',
          entityType: 'order',
          entityId: orderId,
          timestamp: new Date().toISOString(),
          details: `Status set to ${status}`,
        },
        ...prev.auditLogs,
      ],
    }));
    try {
      await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, internalNotes, updatedBy: currentUserName, userRole: currentUserRole }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  // Admin: Upload deliverable
  const handleAddDeliverable = async (orderId: string, deliverable: OrderDeliverable) => {
    setData((prev) => ({
      ...prev,
      orders: prev.orders.map((o) =>
        o.id === orderId ? { ...o, deliverables: [...o.deliverables, deliverable] } : o
      ),
    }));
    try {
      await fetch(`/api/orders/${orderId}/deliverables`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deliverable),
      });
    } catch (e) {
      console.error(e);
    }
  };

  // Submit new review
  const handleSubmitReview = async (reviewData: Partial<Review>) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      customerName: reviewData.customerName || 'Anonymous',
      company: reviewData.company || 'Business Owner',
      role: reviewData.role || 'Founder',
      rating: reviewData.rating || 5,
      review: reviewData.review || '',
      servicePurchased: reviewData.servicePurchased || 'Local SEO',
      date: new Date().toISOString().split('T')[0],
      source: reviewData.source || 'Website Submission',
      isApproved: false, // Goes to Admin approval queue
      isFeatured: false,
    };
    setData((prev) => ({
      ...prev,
      reviews: [newRev, ...prev.reviews],
    }));
    try {
      await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRev),
      });
    } catch (e) {
      console.error(e);
    }
  };

  // Admin: Update Review status
  const handleUpdateReviewStatus = async (
    reviewId: string,
    isApproved: boolean,
    isFeatured: boolean
  ) => {
    setData((prev) => ({
      ...prev,
      reviews: prev.reviews.map((r) =>
        r.id === reviewId ? { ...r, isApproved, isFeatured } : r
      ),
    }));
    try {
      await fetch(`/api/reviews/${reviewId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isApproved, isFeatured }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  // Submit Lead (from Free Audit modal or Contact form)
  const handleSubmitLead = async (leadData: Partial<Lead>) => {
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: leadData.name || '',
      email: leadData.email || '',
      phone: leadData.phone || '',
      websiteUrl: leadData.websiteUrl || '',
      company: leadData.company || '',
      location: leadData.location || '',
      auditType: leadData.auditType || 'SEO & AI Visibility Check',
      primaryConcern: leadData.primaryConcern || '',
      status: 'new',
      createdAt: new Date().toISOString(),
      source: leadData.source || 'Website Form',
    };
    setData((prev) => ({
      ...prev,
      leads: [newLead, ...prev.leads],
    }));
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead),
      });
    } catch (e) {
      console.error(e);
    }
  };

  // Admin: Update lead status
  const handleUpdateLeadStatus = async (leadId: string, status: Lead['status']) => {
    setData((prev) => ({
      ...prev,
      leads: prev.leads.map((l) => (l.id === leadId ? { ...l, status } : l)),
    }));
    try {
      await fetch(`/api/leads/${leadId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  // Admin: Update service & packages
  const handleUpdateService = async (updatedService: ServiceItem) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === updatedService.id ? updatedService : s)),
    }));
    try {
      await fetch(`/api/services/${updatedService.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedService),
      });
    } catch (e) {
      console.error(e);
    }
  };

  // Admin: Save Site Content
  const handleSaveSiteContent = async (updatedContent: SiteContent) => {
    setData((prev) => ({
      ...prev,
      siteContent: updatedContent,
    }));
    try {
      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedContent),
      });
    } catch (e) {
      console.error(e);
    }
  };

  // Admin: Add blog post
  const handleAddBlogPost = async (post: Partial<BlogPost>) => {
    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      slug: (post.title || 'new-post').toLowerCase().replace(/\s+/g, '-'),
      title: post.title || 'Untitled Post',
      excerpt: post.excerpt || '',
      content: post.content || '',
      category: post.category || 'General SEO',
      tags: post.tags || ['seo'],
      readTime: '5 min',
      publishedAt: new Date().toISOString(),
      featuredImage: post.featuredImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      author: {
        name: 'Md Moshiour Rahman Bappi',
        role: 'SEO & AI Specialist',
        bio: '8+ years helping local and global enterprises achieve top rankings.',
      },
    };
    setData((prev) => ({
      ...prev,
      blogPosts: [newPost, ...prev.blogPosts],
    }));
    try {
      await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950 flex flex-col justify-between">
      {/* Primary Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenOrderModal={handleOpenOrder}
        onOpenAuditModal={() => setAuditModalOpen(true)}
        onOpenSeoViewer={() => setSeoViewerOpen(true)}
        currentUserRole={currentUserRole}
        currentUserName={currentUserName}
        onSelectRole={handleSelectRole}
      />

      {/* Main Content Router */}
      <main className="flex-grow">
        {/* VIEW: CLIENT PORTAL */}
        {currentView === 'client-portal' && (
          <CustomerDashboard
            orders={data.orders}
            onUploadFile={handleUploadOrderFile}
            onSendMessage={handleSendMessage}
            onBackToSite={() => setCurrentView('home')}
          />
        )}

        {/* VIEW: ADMIN / AGENCY CMS */}
        {currentView === 'admin-dashboard' && (
          <AdminDashboard
            currentUserRole={currentUserRole}
            currentUserName={currentUserName}
            services={data.services}
            orders={data.orders}
            leads={data.leads}
            reviews={data.reviews}
            caseStudies={data.caseStudies}
            blogPosts={data.blogPosts}
            siteContent={data.siteContent}
            auditLogs={data.auditLogs}
            onUpdateService={handleUpdateService}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onAddDeliverable={handleAddDeliverable}
            onUpdateReviewStatus={handleUpdateReviewStatus}
            onUpdateLeadStatus={handleUpdateLeadStatus}
            onSaveSiteContent={handleSaveSiteContent}
            onAddBlogPost={handleAddBlogPost}
            onBackToSite={() => setCurrentView('home')}
          />
        )}

        {/* VIEW: SERVICES DEDICATED VIEW */}
        {currentView === 'services' && (
          <div>
            <div className="py-12 bg-slate-900/40 border-b border-slate-900 text-center px-4">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                Specialized Growth & Engineering Services
              </h1>
              <p className="mt-2 text-slate-300 text-sm max-w-2xl mx-auto">
                Select any package below to inspect the complete 12-point specification or order directly online.
              </p>
            </div>
            <ServicesSection
              services={data.services}
              onSelectServiceDetail={(s) => setSelectedServiceDetail(s)}
              onOrderService={handleOpenOrder}
            />
            <AeoGeoSection
              onOrderAiService={() => handleOpenOrder('srv-ai-vis')}
              onOpenAuditModal={() => setAuditModalOpen(true)}
            />
          </div>
        )}

        {/* VIEW: CASE STUDIES DEDICATED VIEW */}
        {currentView === 'case-studies' && (
          <div>
            <CaseStudiesSection
              caseStudies={data.caseStudies}
              onOpenOrderModal={handleOpenOrder}
            />
          </div>
        )}

        {/* VIEW: REVIEWS DEDICATED VIEW */}
        {currentView === 'reviews' && (
          <div>
            <ReviewsSection
              reviews={data.reviews}
              onSubmitReview={handleSubmitReview}
            />
          </div>
        )}

        {/* VIEW: ABOUT DEDICATED VIEW */}
        {currentView === 'about' && (
          <div>
            <AboutSection
              content={data.siteContent}
              onOpenAuditModal={() => setAuditModalOpen(true)}
            />
          </div>
        )}

        {/* VIEW: BLOG DEDICATED VIEW */}
        {currentView === 'blog' && (
          <div>
            <BlogSection
              blogPosts={data.blogPosts}
              onSelectPost={(post) => setSelectedBlogPost(post)}
              onOrderService={handleOpenOrder}
            />
          </div>
        )}

        {/* VIEW: CONTACT DEDICATED VIEW */}
        {currentView === 'contact' && (
          <div>
            <ContactSection
              content={data.siteContent}
              onSubmitContactForm={handleSubmitLead}
            />
          </div>
        )}

        {/* VIEW: HOME (Complete full landing experience with all interconnected components) */}
        {currentView === 'home' && (
          <>
            <HeroSection
              content={data.siteContent}
              onOpenOrderModal={() => handleOpenOrder()}
              onOpenAuditModal={() => setAuditModalOpen(true)}
              onViewServices={() => {
                const el = document.getElementById('services-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setCurrentView('services');
              }}
            />

            <ServicesSection
              services={data.services}
              onSelectServiceDetail={(s) => setSelectedServiceDetail(s)}
              onOrderService={handleOpenOrder}
            />

            <AeoGeoSection
              onOrderAiService={() => handleOpenOrder('srv-ai-vis')}
              onOpenAuditModal={() => setAuditModalOpen(true)}
            />

            <CaseStudiesSection
              caseStudies={data.caseStudies}
              onOpenOrderModal={handleOpenOrder}
            />

            <ReviewsSection
              reviews={data.reviews}
              onSubmitReview={handleSubmitReview}
            />

            <AboutSection
              content={data.siteContent}
              onOpenAuditModal={() => setAuditModalOpen(true)}
            />

            <BlogSection
              blogPosts={data.blogPosts}
              onSelectPost={(post) => setSelectedBlogPost(post)}
              onOrderService={handleOpenOrder}
            />

            <ContactSection
              content={data.siteContent}
              onSubmitContactForm={handleSubmitLead}
            />
          </>
        )}
      </main>

      {/* Global Footer */}
      <Footer
        content={data.siteContent}
        onNavigate={setCurrentView}
        onOpenOrderModal={handleOpenOrder}
        onOpenAuditModal={() => setAuditModalOpen(true)}
        onOpenSeoViewer={() => setSeoViewerOpen(true)}
      />

      {/* Modals */}
      {orderModalOpen && (
        <OrderCheckoutModal
          isOpen={orderModalOpen}
          onClose={() => setOrderModalOpen(false)}
          services={data.services}
          preselectedServiceId={preselectedServiceId}
          preselectedTier={preselectedTier}
          onCompleteOrder={handleOrderCompleted}
          onNavigateToPortal={() => {
            setCurrentView('client-portal');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {selectedServiceDetail && (
        <ServiceDetailModal
          service={selectedServiceDetail}
          onClose={() => setSelectedServiceDetail(null)}
          onSelectPackageOrder={(serviceId, tier) => {
            handleOpenOrder(serviceId, tier);
          }}
          caseStudies={data.caseStudies}
          reviews={data.reviews}
        />
      )}

      {selectedBlogPost && (
        <BlogPostModal
          post={selectedBlogPost}
          onClose={() => setSelectedBlogPost(null)}
          onOrderRelevantService={(category) => {
            if (category.toLowerCase().includes('local')) handleOpenOrder('srv-local-seo');
            else if (category.toLowerCase().includes('ai')) handleOpenOrder('srv-ai-vis');
            else if (category.toLowerCase().includes('web')) handleOpenOrder('srv-web-dev');
            else handleOpenOrder('srv-seo');
          }}
        />
      )}

      {auditModalOpen && (
        <FreeAuditModal
          isOpen={auditModalOpen}
          onClose={() => setAuditModalOpen(false)}
          onSubmitAuditRequest={handleSubmitLead}
        />
      )}

      {seoViewerOpen && (
        <SeoArchitectureModal
          isOpen={seoViewerOpen}
          onClose={() => setSeoViewerOpen(false)}
        />
      )}
    </div>
  );
}

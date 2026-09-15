import React, { useState } from 'react';
import {
  Shield,
  Package,
  Layers,
  Users,
  Star,
  FolderGit2,
  BookOpen,
  FileText,
  Sliders,
  History,
  Plus,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Download,
  Trash2,
  Edit,
  Save,
  Send,
  Lock,
  Search
} from 'lucide-react';
import {
  UserRole,
  ServiceItem,
  Order,
  Lead,
  Review,
  CaseStudy,
  BlogPost,
  SiteContent,
  AuditLog,
  OrderDeliverable
} from '../types.ts';

interface AdminDashboardProps {
  currentUserRole: UserRole;
  currentUserName: string;
  services: ServiceItem[];
  orders: Order[];
  leads: Lead[];
  reviews: Review[];
  caseStudies: CaseStudy[];
  blogPosts: BlogPost[];
  siteContent: SiteContent;
  auditLogs: AuditLog[];
  onUpdateService: (updated: ServiceItem) => Promise<void>;
  onUpdateOrderStatus: (orderId: string, status: Order['status'], internalNotes?: string) => Promise<void>;
  onAddDeliverable: (orderId: string, deliv: OrderDeliverable) => Promise<void>;
  onUpdateReviewStatus: (reviewId: string, isApproved: boolean, isFeatured: boolean) => Promise<void>;
  onUpdateLeadStatus: (leadId: string, status: Lead['status']) => Promise<void>;
  onSaveSiteContent: (updatedContent: SiteContent) => Promise<void>;
  onAddBlogPost: (post: Partial<BlogPost>) => Promise<void>;
  onBackToSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUserRole,
  currentUserName,
  services,
  orders,
  leads,
  reviews,
  caseStudies,
  blogPosts,
  siteContent,
  auditLogs,
  onUpdateService,
  onUpdateOrderStatus,
  onAddDeliverable,
  onUpdateReviewStatus,
  onUpdateLeadStatus,
  onSaveSiteContent,
  onAddBlogPost,
  onBackToSite,
}) => {
  const [activeTab, setActiveTab] = useState<
    'orders' | 'services' | 'leads' | 'reviews' | 'blog' | 'content' | 'audit'
  >('orders');

  // Order detail modal in admin
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [adminStatusInput, setAdminStatusInput] = useState<Order['status']>('in_progress');
  const [adminNotesInput, setAdminNotesInput] = useState('');

  // Deliverable upload simulation
  const [delivTitle, setDelivTitle] = useState('');
  const [delivDesc, setDelivDesc] = useState('');
  const [delivUrl, setDelivUrl] = useState('');

  // Service Edit
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Site Content Edit State
  const [editableHeroTitle, setEditableHeroTitle] = useState(siteContent.hero.title);
  const [editableHeroSubtitle, setEditableHeroSubtitle] = useState(siteContent.hero.subtitle);
  const [editableEmail, setEditableEmail] = useState(siteContent.contact.email);
  const [editablePhone, setEditablePhone] = useState(siteContent.contact.phone);
  const [contentSaved, setContentSaved] = useState(false);

  // Check RBAC Permissions
  const canManageBillingAndUsers = currentUserRole === 'super_admin';
  const canManageServices = ['super_admin', 'admin', 'seo_manager'].includes(currentUserRole);
  const canManageOrders = ['super_admin', 'admin', 'order_manager', 'seo_manager'].includes(currentUserRole);
  const canManageContent = ['super_admin', 'admin', 'content_manager'].includes(currentUserRole);
  const canManageReviews = ['super_admin', 'admin'].includes(currentUserRole);

  const handleSaveOrderUpdate = async () => {
    if (!selectedOrder) return;
    await onUpdateOrderStatus(selectedOrder.id, adminStatusInput, adminNotesInput);
    setSelectedOrder({
      ...selectedOrder,
      status: adminStatusInput,
      internalNotes: adminNotesInput,
    });
    alert('Order status & notes updated successfully.');
  };

  const handleAddDeliverableSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder || !delivTitle) return;
    const newDeliv: OrderDeliverable = {
      id: `deliv-${Date.now()}`,
      title: delivTitle,
      description: delivDesc || 'Official campaign report compiled by agency team.',
      fileUrl: delivUrl || '/uploads/SEO-Audit-Deliverable.pdf',
      deliveredAt: new Date().toISOString(),
    };
    await onAddDeliverable(selectedOrder.id, newDeliv);
    setSelectedOrder({
      ...selectedOrder,
      deliverables: [...selectedOrder.deliverables, newDeliv],
    });
    setDelivTitle('');
    setDelivDesc('');
    setDelivUrl('');
    alert('Deliverable uploaded and made accessible in client dashboard.');
  };

  const handleSaveContentChanges = async () => {
    const updated: SiteContent = {
      ...siteContent,
      hero: {
        ...siteContent.hero,
        title: editableHeroTitle,
        subtitle: editableHeroSubtitle,
      },
      contact: {
        ...siteContent.contact,
        email: editableEmail,
        phone: editablePhone,
      },
    };
    await onSaveSiteContent(updated);
    setContentSaved(true);
    setTimeout(() => setContentSaved(false), 3000);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Admin Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-indigo-950/60 border border-indigo-500/40 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-300">
              Agency Management Platform (CMS)
            </span>
            <span className="text-xs text-slate-400">
              Logged in as: <strong className="text-white">{currentUserName}</strong> ({currentUserRole})
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Agency Operations & Pipeline
          </h1>
        </div>

        <button
          onClick={onBackToSite}
          className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition"
        >
          View Live Website
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto text-xs font-semibold pb-1">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-emerald-500 text-slate-950 font-bold'
              : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
          }`}
        >
          <Package className="h-4 w-4" />
          <span>Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('leads')}
          className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
            activeTab === 'leads'
              ? 'bg-emerald-500 text-slate-950 font-bold'
              : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
          }`}
        >
          <Users className="h-4 w-4" />
          <span>Leads & Audits ({leads.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
            activeTab === 'services'
              ? 'bg-emerald-500 text-slate-950 font-bold'
              : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>Services & Packages</span>
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
            activeTab === 'reviews'
              ? 'bg-emerald-500 text-slate-950 font-bold'
              : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
          }`}
        >
          <Star className="h-4 w-4" />
          <span>Reviews ({reviews.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('content')}
          className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
            activeTab === 'content'
              ? 'bg-emerald-500 text-slate-950 font-bold'
              : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
          }`}
        >
          <Sliders className="h-4 w-4" />
          <span>Site Content CMS</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
            activeTab === 'audit'
              ? 'bg-emerald-500 text-slate-950 font-bold'
              : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
          }`}
        >
          <History className="h-4 w-4" />
          <span>Audit Logs ({auditLogs.length})</span>
        </button>
      </div>

      {/* TAB 1: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Client Order Pipeline & Status Management
            </h3>
            <span className="text-xs text-slate-400">
              Authorized roles: Super Admin, Admin, SEO Manager, Order Manager
            </span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden text-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 uppercase text-[10px] font-bold">
                    <th className="p-3.5">Order #</th>
                    <th className="p-3.5">Client & Website</th>
                    <th className="p-3.5">Service / Tier</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Payment</th>
                    <th className="p-3.5">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-800/40 transition">
                      <td className="p-3.5 font-mono font-bold text-white">{ord.orderNumber}</td>
                      <td className="p-3.5">
                        <div className="font-semibold text-slate-200">{ord.customerName}</div>
                        <div className="text-[11px] text-slate-400">{ord.company}</div>
                        <a
                          href={ord.websiteUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-400 hover:underline"
                        >
                          {ord.websiteUrl}
                        </a>
                      </td>
                      <td className="p-3.5">
                        <div className="text-slate-200 font-medium">{ord.serviceName}</div>
                        <div className="text-slate-400 text-[11px]">{ord.packageName}</div>
                      </td>
                      <td className="p-3.5 font-mono font-bold text-emerald-400">
                        ${ord.price}
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                            ord.status === 'completed'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                              : ord.status === 'review'
                              ? 'bg-purple-950 text-purple-400 border border-purple-500/30'
                              : ord.status === 'in_progress'
                              ? 'bg-blue-950 text-blue-400 border border-blue-500/30'
                              : 'bg-amber-950 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {ord.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className="text-emerald-400 font-bold uppercase text-[10px]">
                          PAID
                        </span>
                      </td>
                      <td className="p-3.5">
                        <button
                          onClick={() => {
                            setSelectedOrder(ord);
                            setAdminStatusInput(ord.status);
                            setAdminNotesInput(ord.internalNotes || '');
                          }}
                          className="rounded bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-1 text-emerald-300 hover:bg-emerald-500/30 transition font-semibold"
                        >
                          Manage Order
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LEADS CRM */}
      {activeTab === 'leads' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Free SEO & AI Audit Inquiries (Leads CRM)
            </h3>
            <span className="text-xs text-slate-400">High-intent prospective buyers</span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 uppercase text-[10px] font-bold">
                  <th className="p-3.5">Name</th>
                  <th className="p-3.5">Contact / Location</th>
                  <th className="p-3.5">Website URL</th>
                  <th className="p-3.5">Primary Concern</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {leads.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-3.5 font-bold text-white">{l.name}</td>
                    <td className="p-3.5">
                      <div className="text-slate-300">{l.email}</div>
                      <div className="text-[11px] text-slate-400">{l.location || 'Online'}</div>
                    </td>
                    <td className="p-3.5">
                      <a href={l.websiteUrl} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                        {l.websiteUrl}
                      </a>
                    </td>
                    <td className="p-3.5 text-slate-300 max-w-xs">{l.primaryConcern}</td>
                    <td className="p-3.5">
                      <select
                        value={l.status}
                        onChange={(e) => onUpdateLeadStatus(l.id, e.target.value as any)}
                        className="rounded border border-slate-800 bg-slate-950 px-2 py-1 text-xs text-white"
                      >
                        <option value="new">New Lead</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="converted">Converted</option>
                      </select>
                    </td>
                    <td className="p-3.5">
                      <a
                        href={`mailto:${l.email}?subject=SEO%20and%20AI%20Audit%20Review%20-%20Md%20Moshiour%20Rahman%20Bappi`}
                        className="rounded bg-slate-800 px-2.5 py-1 text-slate-200 hover:bg-slate-700"
                      >
                        Email Lead
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SERVICES & PACKAGES CMS */}
      {activeTab === 'services' && (
        <div className="space-y-6 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Services & Package Tier Configuration
              </h3>
              <p className="text-slate-400 mt-0.5">
                Update prices, delivery days, and package features dynamically without modifying source code.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-white text-base">{srv.title}</h4>
                    <p className="text-slate-400 text-xs mt-1">{srv.shortDescription}</p>
                  </div>
                  <button
                    onClick={() => setEditingService(srv)}
                    className="rounded bg-slate-800 px-3 py-1.5 text-xs text-emerald-400 font-semibold hover:bg-slate-700 flex items-center gap-1"
                  >
                    <Edit className="h-3.5 w-3.5" />
                    <span>Edit Packages</span>
                  </button>
                </div>

                <div className="space-y-2 border-t border-slate-800/80 pt-3">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Package Tiers</span>
                  <div className="grid grid-cols-3 gap-2">
                    {srv.packages.map((p) => (
                      <div key={p.id} className="rounded-lg border border-slate-800 bg-slate-950 p-2.5">
                        <div className="text-[10px] uppercase font-bold text-slate-400">{p.tier}</div>
                        <div className="text-sm font-bold text-white font-mono">${p.price}</div>
                        <div className="text-[10px] text-emerald-400 mt-1">{p.deliveryDays} Days</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Service Editor Modal */}
          {editingService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h4 className="font-bold text-white text-base">Edit {editingService.title}</h4>
                  <button onClick={() => setEditingService(null)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-slate-300 block mb-1">Service Title</label>
                    <input
                      type="text"
                      value={editingService.title}
                      onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                      className="w-full rounded border border-slate-800 bg-slate-900 px-3 py-1.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">Short Description</label>
                    <textarea
                      rows={2}
                      value={editingService.shortDescription}
                      onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                      className="w-full rounded border border-slate-800 bg-slate-900 px-3 py-1.5 text-white"
                    />
                  </div>

                  <div className="border-t border-slate-800 pt-3">
                    <span className="text-slate-400 block mb-2 font-bold">Package Prices ($ USD)</span>
                    <div className="grid grid-cols-3 gap-3">
                      {editingService.packages.map((pkg, idx) => (
                        <div key={pkg.id} className="rounded border border-slate-800 bg-slate-900 p-2">
                          <label className="text-slate-400 text-[10px] uppercase font-bold block">{pkg.tier} Price</label>
                          <input
                            type="number"
                            value={pkg.price}
                            onChange={(e) => {
                              const updatedPkgs = [...editingService.packages];
                              updatedPkgs[idx] = { ...pkg, price: Number(e.target.value) };
                              setEditingService({ ...editingService, packages: updatedPkgs });
                            }}
                            className="w-full rounded border border-slate-700 bg-slate-950 px-2 py-1 text-white font-mono mt-1"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                  <button
                    onClick={() => setEditingService(null)}
                    className="rounded border border-slate-800 px-4 py-2 text-slate-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      await onUpdateService(editingService);
                      setEditingService(null);
                      alert('Service updated successfully.');
                    }}
                    className="rounded bg-emerald-500 px-5 py-2 font-bold text-slate-950 hover:bg-emerald-400"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: REVIEWS CMS */}
      {activeTab === 'reviews' && (
        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Customer Reviews Approval Queue & Moderation
            </h3>
            <span className="text-xs text-slate-400">Approved reviews display publicly on homepage</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{r.customerName} ({r.company})</span>
                    <span className="text-emerald-400 font-mono font-bold">{r.rating}/5 Stars</span>
                  </div>
                  <p className="mt-2 text-slate-300 italic">"{r.review}"</p>
                  <div className="text-[11px] text-slate-400 mt-2">Service: {r.servicePurchased}</div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateReviewStatus(r.id, !r.isApproved, r.isFeatured)}
                      className={`rounded px-2.5 py-1 text-[11px] font-bold ${
                        r.isApproved
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                          : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      {r.isApproved ? 'Approved (Public)' : 'Pending Approval'}
                    </button>

                    <button
                      onClick={() => onUpdateReviewStatus(r.id, r.isApproved, !r.isFeatured)}
                      className={`rounded px-2 py-1 text-[11px] ${
                        r.isFeatured
                          ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/40'
                          : 'text-slate-400 border border-slate-800'
                      }`}
                    >
                      {r.isFeatured ? 'Featured ★' : 'Feature on Home'}
                    </button>
                  </div>

                  <span className="text-slate-400 text-[10px]">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: SITE CONTENT CMS */}
      {activeTab === 'content' && (
        <div className="space-y-6 text-xs max-w-3xl">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Website Content CMS (No-Code Content Updates)
            </h3>
            <p className="text-slate-400 mt-0.5">
              Edit hero headlines, contact information, and about text directly.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-4">
            <div>
              <label className="text-slate-200 block mb-1 font-bold">Homepage Hero Headline</label>
              <input
                type="text"
                value={editableHeroTitle}
                onChange={(e) => setEditableHeroTitle(e.target.value)}
                className="w-full rounded border border-slate-800 bg-slate-950 px-3 py-2 text-white font-medium"
              />
            </div>

            <div>
              <label className="text-slate-200 block mb-1 font-bold">Homepage Subtitle / Positioning</label>
              <textarea
                rows={3}
                value={editableHeroSubtitle}
                onChange={(e) => setEditableHeroSubtitle(e.target.value)}
                className="w-full rounded border border-slate-800 bg-slate-950 px-3 py-2 text-white leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-200 block mb-1 font-bold">Contact Email</label>
                <input
                  type="email"
                  value={editableEmail}
                  onChange={(e) => setEditableEmail(e.target.value)}
                  className="w-full rounded border border-slate-800 bg-slate-950 px-3 py-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-slate-200 block mb-1 font-bold">Phone Number</label>
                <input
                  type="text"
                  value={editablePhone}
                  onChange={(e) => setEditablePhone(e.target.value)}
                  className="w-full rounded border border-slate-800 bg-slate-950 px-3 py-2 text-white font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              {contentSaved ? (
                <span className="text-emerald-400 font-bold">Changes saved to site database!</span>
              ) : (
                <span className="text-slate-400">Updates reflect immediately across all site components.</span>
              )}

              <button
                onClick={handleSaveContentChanges}
                className="rounded-lg bg-emerald-500 px-6 py-2.5 font-bold text-slate-950 hover:bg-emerald-400 flex items-center gap-1.5 shadow"
              >
                <Save className="h-4 w-4" />
                <span>Save Content Updates</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Security & Action Audit Trail
            </h3>
            <span className="text-xs text-slate-400">Every administrative action is immutably logged</span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 space-y-2">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="rounded-lg border border-slate-800/80 bg-slate-950 px-4 py-2.5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <History className="h-4 w-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-semibold text-white">{log.action}</span> on{' '}
                    <span className="text-slate-300">{log.entityType} ({log.entityId})</span>
                    <div className="text-[11px] text-slate-400">{log.details}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-slate-300">{log.userName}</div>
                  <div className="text-[10px] text-slate-500">{new Date(log.timestamp).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal to Manage Individual Order */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8 space-y-5 text-xs text-slate-300 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="rounded bg-emerald-950 text-emerald-400 px-2 py-0.5 font-bold uppercase font-mono text-[10px]">
                  Order #{selectedOrder.orderNumber}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {selectedOrder.serviceName} ({selectedOrder.packageName})
                </h3>
                <p className="text-slate-400">Client: {selectedOrder.customerName} ({selectedOrder.customerEmail})</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            {/* Change Status Form */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">Update Order Pipeline Status</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Status</label>
                  <select
                    value={adminStatusInput}
                    onChange={(e) => setAdminStatusInput(e.target.value as any)}
                    className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="in_progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Staff Note</label>
                  <input
                    type="text"
                    value={adminNotesInput}
                    onChange={(e) => setAdminNotesInput(e.target.value)}
                    placeholder="e.g. Audit complete, awaiting client confirmation"
                    className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={handleSaveOrderUpdate}
                  className="rounded bg-emerald-500 px-4 py-1.5 font-bold text-slate-950 hover:bg-emerald-400"
                >
                  Save Status
                </button>
              </div>
            </div>

            {/* Upload Deliverable Form */}
            <form onSubmit={handleAddDeliverableSubmit} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Plus className="h-3.5 w-3.5 text-emerald-400" />
                <span>Upload Deliverable for Client</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Deliverable Title *</label>
                  <input
                    type="text"
                    required
                    value={delivTitle}
                    onChange={(e) => setDelivTitle(e.target.value)}
                    placeholder="e.g. Comprehensive GBP Audit & Citation Sheet"
                    className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">File Link / URL</label>
                  <input
                    type="text"
                    value={delivUrl}
                    onChange={(e) => setDelivUrl(e.target.value)}
                    placeholder="/uploads/Audit-Report.pdf"
                    className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-1.5 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Summary / Recommendations</label>
                <input
                  type="text"
                  value={delivDesc}
                  onChange={(e) => setDelivDesc(e.target.value)}
                  placeholder="Key findings and next steps..."
                  className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-1.5 text-white"
                />
              </div>

              <button
                type="submit"
                className="rounded bg-indigo-600 px-4 py-1.5 font-bold text-white hover:bg-indigo-500"
              >
                Upload Deliverable
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

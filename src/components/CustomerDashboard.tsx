import React, { useState } from 'react';
import {
  Package,
  Clock,
  CheckCircle2,
  FileText,
  Download,
  UploadCloud,
  Send,
  MessageSquare,
  Receipt,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Building,
  User,
  Sparkles
} from 'lucide-react';
import { Order, OrderFile, OrderDeliverable, OrderMessage } from '../types.ts';

interface CustomerDashboardProps {
  orders: Order[];
  onUploadFile: (orderId: string, file: OrderFile) => void;
  onSendMessage: (orderId: string, message: OrderMessage) => void;
  onBackToSite: () => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  orders,
  onUploadFile,
  onSendMessage,
  onBackToSite,
}) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'status' | 'files' | 'deliverables' | 'messages' | 'invoices'>('status');

  // New message state
  const [newMessageText, setNewMessageText] = useState('');

  // Selected order
  const currentOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  const statusPipeline = [
    { key: 'pending', label: 'Order Placed' },
    { key: 'paid', label: 'Payment Verified' },
    { key: 'in_progress', label: 'In Production' },
    { key: 'review', label: 'Quality Review' },
    { key: 'completed', label: 'Completed' },
  ];

  const getStatusIndex = (status: string) => {
    switch (status) {
      case 'pending': return 0;
      case 'paid': return 1;
      case 'in_progress': return 2;
      case 'review': return 3;
      case 'completed': return 4;
      default: return 1;
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !currentOrder) return;
    const f = e.target.files[0];
    const newFile: OrderFile = {
      id: `f-${Date.now()}`,
      name: f.name,
      size: f.size,
      type: f.type || 'document',
      url: `/uploads/${encodeURIComponent(f.name)}`,
      uploadedAt: new Date().toISOString(),
    };
    onUploadFile(currentOrder.id, newFile);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim() || !currentOrder) return;

    const msg: OrderMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'client-user',
      senderName: currentOrder.customerName || 'Client',
      senderRole: 'client',
      content: newMessageText,
      createdAt: new Date().toISOString(),
    };

    onSendMessage(currentOrder.id, msg);
    setNewMessageText('');
  };

  if (!currentOrder) {
    return (
      <div className="py-20 text-center px-4 max-w-xl mx-auto space-y-4">
        <Package className="h-12 w-12 text-slate-600 mx-auto" />
        <h3 className="text-xl font-bold text-white">No Orders Found Yet</h3>
        <p className="text-xs text-slate-400">
          You have not placed an order yet. When you complete checkout, your real-time campaign tracking appears here.
        </p>
        <button
          onClick={onBackToSite}
          className="rounded-lg bg-emerald-500 px-5 py-2 text-xs font-bold text-slate-950"
        >
          Return to Services
        </button>
      </div>
    );
  }

  const currentStatusIdx = getStatusIndex(currentOrder.status);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Top Banner & Order Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              Customer Portal
            </span>
            <span className="text-xs text-slate-400">
              Welcome, {currentOrder.customerName}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Project Dashboard & Deliverables
          </h1>
        </div>

        {/* Order Selector Dropdown if multiple orders */}
        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-400">Active Order:</div>
          <select
            value={currentOrder.id}
            onChange={(e) => setSelectedOrderId(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
          >
            {orders.map((ord) => (
              <option key={ord.id} value={ord.id}>
                {ord.orderNumber} - {ord.serviceName}
              </option>
            ))}
          </select>
          <button
            onClick={onBackToSite}
            className="rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 transition"
          >
            Back to Site
          </button>
        </div>
      </div>

      {/* Main Order Info Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
        {/* Order Header Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-slate-800/80 pb-5 text-xs">
          <div>
            <span className="text-slate-400 block">Order Number</span>
            <span className="text-base font-bold text-white font-mono">{currentOrder.orderNumber}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Service & Package</span>
            <span className="font-semibold text-emerald-400">{currentOrder.serviceName}</span>
            <div className="text-[11px] text-slate-400">{currentOrder.packageName} (${currentOrder.price})</div>
          </div>
          <div>
            <span className="text-slate-400 block">Target Website</span>
            <a
              href={currentOrder.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>{currentOrder.websiteUrl.replace('https://', '')}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <div>
            <span className="text-slate-400 block">Transaction Reference</span>
            <span className="font-mono text-slate-300 text-[11px]">{currentOrder.transactionId}</span>
          </div>
        </div>

        {/* 1. View Order Status Pipeline */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              1. Campaign Progress Pipeline
            </h3>
            <span className="rounded bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 uppercase">
              Current: {currentOrder.status.replace('_', ' ')}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {statusPipeline.map((step, idx) => {
              const isPastOrCurrent = idx <= currentStatusIdx;
              const isCurrent = idx === currentStatusIdx;
              return (
                <div key={step.key} className="space-y-1.5">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      isCurrent
                        ? 'bg-emerald-400 shadow-md shadow-emerald-400/50'
                        : isPastOrCurrent
                        ? 'bg-emerald-500/80'
                        : 'bg-slate-800'
                    }`}
                  />
                  <div className="flex items-center justify-between text-[11px]">
                    <span
                      className={`font-medium ${
                        isCurrent
                          ? 'text-emerald-300 font-bold'
                          : isPastOrCurrent
                          ? 'text-slate-300'
                          : 'text-slate-400'
                      }`}
                    >
                      {step.label}
                    </span>
                    {isPastOrCurrent && <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex items-center gap-2 border-b border-slate-800 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('status')}
          className={`pb-3 px-3 transition border-b-2 ${
            activeTab === 'status'
              ? 'border-emerald-500 text-emerald-400 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          2. Project Requirements & Brief
        </button>
        <button
          onClick={() => setActiveTab('files')}
          className={`pb-3 px-3 transition border-b-2 ${
            activeTab === 'files'
              ? 'border-emerald-500 text-emerald-400 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          3. Uploaded Assets ({currentOrder.files.length})
        </button>
        <button
          onClick={() => setActiveTab('deliverables')}
          className={`pb-3 px-3 transition border-b-2 flex items-center gap-1.5 ${
            activeTab === 'deliverables'
              ? 'border-emerald-500 text-emerald-400 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>4. Deliverables & Reports</span>
          <span className="rounded-full bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 text-[10px]">
            {currentOrder.deliverables.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`pb-3 px-3 transition border-b-2 flex items-center gap-1.5 ${
            activeTab === 'messages'
              ? 'border-emerald-500 text-emerald-400 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>5. Project Chat & Messages</span>
          <span className="rounded-full bg-slate-800 text-slate-300 px-1.5 py-0.2 text-[10px]">
            {currentOrder.messages.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('invoices')}
          className={`pb-3 px-3 transition border-b-2 ${
            activeTab === 'invoices'
              ? 'border-emerald-500 text-emerald-400 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          6. Invoices & Receipts
        </button>
      </div>

      {/* Tab Panels */}
      <div className="space-y-6">
        {/* TAB 1: Requirements */}
        {activeTab === 'status' && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4 text-xs">
            <h4 className="font-bold text-white text-sm">Submitted Campaign Scope</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
                <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">
                  Target Keywords
                </span>
                <p className="text-slate-200 font-mono text-xs leading-relaxed">
                  {currentOrder.targetKeywords || 'Keywords submitted in project brief'}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
                <span className="text-[10px] font-bold uppercase text-teal-400 tracking-wider">
                  Business Location & Google Maps
                </span>
                <p className="text-slate-200 text-xs">
                  Location: {currentOrder.businessLocation || 'Not specified'}
                </p>
                {currentOrder.gbpUrl && (
                  <a
                    href={currentOrder.gbpUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 text-xs hover:underline flex items-center gap-1"
                  >
                    <span>View GBP Map Listing</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                Project Requirements & Client Brief
              </span>
              <p className="text-slate-300 text-xs leading-relaxed">
                {currentOrder.requirements}
              </p>
            </div>

            {currentOrder.internalNotes && (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 text-xs text-emerald-200">
                <strong>Agency Status Note:</strong> {currentOrder.internalNotes}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Upload Files */}
        {activeTab === 'files' && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-5 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white text-sm">Upload Additional Project Files</h4>
                <p className="text-slate-400 mt-0.5">
                  Forgot to upload something during checkout? Upload documentation, access credentials or spreadsheets here.
                </p>
              </div>

              <label className="cursor-pointer rounded-lg bg-emerald-500 px-4 py-2 font-bold text-slate-950 hover:bg-emerald-400 flex items-center gap-1.5 shadow">
                <UploadCloud className="h-4 w-4" />
                <span>Upload New File</span>
                <input type="file" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            {/* Files List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {currentOrder.files.map((f) => (
                <div
                  key={f.id}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-medium text-white truncate max-w-[200px]">{f.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {(f.size / 1024 / 1024).toFixed(2)} MB • {new Date(f.uploadedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <a
                    href={f.url}
                    download
                    className="rounded border border-slate-800 p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-900"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Deliverables */}
        {activeTab === 'deliverables' && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4 text-xs">
            <div>
              <h4 className="font-bold text-white text-sm">Campaign Deliverables & Final Reports</h4>
              <p className="text-slate-400 mt-0.5">
                Download completed technical audits, GBP optimization proof sheets, schema deployment packages, and rankings reports.
              </p>
            </div>

            {currentOrder.deliverables.length === 0 ? (
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-8 text-center text-slate-400">
                <Clock className="h-8 w-8 mx-auto text-slate-600 mb-2" />
                <div>Deliverables are currently being compiled by Md Moshiour Rahman Bappi.</div>
                <div className="text-[11px] text-slate-400 mt-1">
                  You will receive an automated notification as soon as files are uploaded.
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentOrder.deliverables.map((deliv) => (
                  <div
                    key={deliv.id}
                    className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <h5 className="font-bold text-white text-sm">{deliv.title}</h5>
                      </div>
                      <p className="text-slate-300 text-xs mt-1.5 leading-relaxed">
                        {deliv.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-mono">
                        Delivered on {new Date(deliv.deliveredAt).toLocaleDateString()}
                      </span>
                      <a
                        href={deliv.fileUrl}
                        download
                        className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 flex items-center gap-1 shadow"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: Project Chat */}
        {activeTab === 'messages' && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4 text-xs">
            <div>
              <h4 className="font-bold text-white text-sm">Direct Project Message Thread</h4>
              <p className="text-slate-400 mt-0.5">
                Chat directly with Md Moshiour Rahman Bappi and your assigned agency engineers.
              </p>
            </div>

            {/* Chat message box */}
            <div className="h-72 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3">
              {currentOrder.messages.length === 0 ? (
                <div className="text-center text-slate-400 pt-16">
                  No messages yet. Send a message below to reach Bappi.
                </div>
              ) : (
                currentOrder.messages.map((m) => {
                  const isMe = m.senderRole === 'client';
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1">
                        <span className="font-semibold text-slate-300">{m.senderName}</span>
                        <span>•</span>
                        <span>{new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div
                        className={`max-w-md rounded-xl px-4 py-2.5 leading-relaxed ${
                          isMe
                            ? 'bg-emerald-600 text-white font-medium rounded-tr-none'
                            : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'
                        }`}
                      >
                        {m.content}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendChatMessage} className="flex gap-2">
              <input
                type="text"
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                placeholder="Type your message, inquiry, or question for Bappi..."
                className="flex-1 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-emerald-500 px-5 py-2 font-bold text-slate-950 hover:bg-emerald-400 flex items-center gap-1.5 shadow"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 5: Invoices */}
        {activeTab === 'invoices' && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white text-sm">Official Commercial Invoice & Payment Receipt</h4>
                <p className="text-slate-400 mt-0.5">
                  Download or print your tax invoice for business accounting.
                </p>
              </div>
              <button
                onClick={() => window.print()}
                className="rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-1.5 text-xs text-slate-200 hover:bg-slate-800"
              >
                Print Invoice
              </button>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8 space-y-6 max-w-2xl mx-auto shadow-xl">
              {/* Invoice Top */}
              <div className="flex justify-between items-start border-b border-slate-800 pb-5">
                <div>
                  <h3 className="text-lg font-bold text-white">INVOICE</h3>
                  <div className="text-xs text-slate-400 font-mono">Invoice #{currentOrder.orderNumber}</div>
                  <div className="text-xs text-slate-400">Date: {new Date(currentOrder.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-white text-sm">Md Moshiour Rahman Bappi</div>
                  <div className="text-[11px] text-slate-400">SEO & Web Engineering Agency</div>
                  <div className="text-[11px] text-slate-400">mdmoshiourrahmanbappi@gmail.com</div>
                </div>
              </div>

              {/* Billed To */}
              <div className="grid grid-cols-2 gap-4 border-b border-slate-800 pb-5">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Billed To:</span>
                  <div className="font-bold text-white">{currentOrder.customerName}</div>
                  <div className="text-slate-300">{currentOrder.company || 'Private Client'}</div>
                  <div className="text-slate-400">{currentOrder.customerEmail}</div>
                  <div className="text-slate-400">{currentOrder.businessLocation}</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Payment Status:</span>
                  <div className="text-emerald-400 font-bold uppercase mt-0.5">PAID IN FULL</div>
                  <div className="text-slate-400 text-[11px] font-mono mt-1">TXN: {currentOrder.transactionId}</div>
                  <div className="text-slate-400 text-[11px]">Method: {currentOrder.paymentMethod}</div>
                </div>
              </div>

              {/* Line Items */}
              <div className="space-y-2">
                <div className="flex justify-between font-bold text-slate-400 text-[11px] uppercase border-b border-slate-800/80 pb-1">
                  <span>Description</span>
                  <span>Amount</span>
                </div>
                <div className="flex justify-between text-slate-200 py-1">
                  <div>
                    <div className="font-semibold text-white">{currentOrder.serviceName}</div>
                    <div className="text-slate-400 text-[11px]">{currentOrder.packageName} Package</div>
                  </div>
                  <span className="font-mono font-bold">${currentOrder.price}.00</span>
                </div>
                <div className="flex justify-between text-slate-400 py-1 border-t border-slate-800/80 pt-2">
                  <span>Subtotal</span>
                  <span className="font-mono">${currentOrder.price}.00</span>
                </div>
                <div className="flex justify-between text-slate-400 py-0.5">
                  <span>Tax (0% International B2B)</span>
                  <span className="font-mono">$0.00</span>
                </div>
                <div className="flex justify-between font-bold text-white text-sm border-t border-slate-800 pt-2">
                  <span>Total Paid</span>
                  <span className="font-mono text-emerald-400">${currentOrder.price}.00 USD</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

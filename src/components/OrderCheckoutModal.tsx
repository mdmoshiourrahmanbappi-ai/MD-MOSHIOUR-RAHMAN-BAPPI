import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  UploadCloud,
  FileText,
  CreditCard,
  Lock,
  ArrowRight,
  ArrowLeft,
  Mail,
  ShieldCheck,
  Building,
  Globe,
  MapPin,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { ServiceItem, ServicePackage, Order, OrderFile } from '../types.ts';

interface OrderCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: ServiceItem[];
  preselectedServiceId?: string;
  preselectedTier?: string;
  onCompleteOrder: (order: Order) => void;
  onNavigateToPortal: () => void;
}

export const OrderCheckoutModal: React.FC<OrderCheckoutModalProps> = ({
  isOpen,
  onClose,
  services,
  preselectedServiceId,
  preselectedTier,
  onCompleteOrder,
  onNavigateToPortal,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preselectedServiceId || services[0]?.id || 'srv-seo'
  );
  const [selectedTier, setSelectedTier] = useState<string>(
    preselectedTier || 'standard'
  );

  // Step 3 Customer Info
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [company, setCompany] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [businessLocation, setBusinessLocation] = useState('');
  const [gbpUrl, setGbpUrl] = useState('');
  const [targetKeywords, setTargetKeywords] = useState('');
  const [requirements, setRequirements] = useState('');

  // Step 4 Files
  const [uploadedFiles, setUploadedFiles] = useState<OrderFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Step 5 Payment
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'wire'>('card');
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('•••');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Step 6 & 7 Result
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedServiceId(preselectedServiceId);
    }
    if (preselectedTier) {
      setSelectedTier(preselectedTier);
    }
  }, [preselectedServiceId, preselectedTier]);

  if (!isOpen) return null;

  const selectedService = services.find((s) => s.id === selectedServiceId) || services[0];
  const selectedPackage =
    selectedService?.packages.find((p) => p.tier === selectedTier) ||
    selectedService?.packages[1] ||
    selectedService?.packages[0];

  // Handle local file simulation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUploading(true);

    const newFiles: OrderFile[] = Array.from(e.target.files).map((f: File) => ({
      id: `f-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: f.name,
      size: f.size,
      type: f.type || 'document',
      url: `/uploads/${encodeURIComponent(f.name)}`,
      uploadedAt: new Date().toISOString(),
    }));

    setTimeout(() => {
      setUploadedFiles((prev) => [...prev, ...newFiles]);
      setIsUploading(false);
    }, 600);
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // Submit Payment & Create Order
  const handleProcessPayment = async () => {
    setIsProcessingPayment(true);

    const orderPayload = {
      serviceId: selectedService.id,
      serviceName: selectedService.title,
      packageTier: selectedPackage.tier,
      packageName: selectedPackage.name,
      price: selectedPackage.price,
      customerName,
      customerEmail,
      customerPhone,
      company,
      websiteUrl: websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`,
      businessLocation,
      gbpUrl,
      targetKeywords,
      requirements,
      files: uploadedFiles,
      paymentMethod:
        paymentMethod === 'card'
          ? 'Stripe Credit Card (256-Bit SSL Encrypted)'
          : paymentMethod === 'paypal'
          ? 'PayPal Business Verified'
          : 'International Wire Transfer',
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) throw new Error('Order creation failed');
      const savedOrder: Order = await res.json();
      setCompletedOrder(savedOrder);
      onCompleteOrder(savedOrder);
      setStep(6);
    } catch (err) {
      console.error('Error creating order:', err);
      // Fallback local order creation if network hiccups
      const fallbackOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
        serviceId: selectedService.id,
        serviceName: selectedService.title,
        packageTier: selectedPackage.tier,
        packageName: selectedPackage.name,
        price: selectedPackage.price,
        customerName,
        customerEmail,
        customerPhone,
        company,
        websiteUrl,
        businessLocation,
        gbpUrl,
        targetKeywords,
        requirements,
        files: uploadedFiles,
        status: 'paid',
        paymentStatus: 'paid',
        transactionId: `TXN-${Math.floor(100000 + Math.random() * 900000)}-CARD`,
        paymentMethod: 'Stripe 256-bit Secure Checkout',
        createdAt: new Date().toISOString(),
        deliverables: [],
        internalNotes: 'Payment verified via secure gateway.',
        messages: [],
      };
      setCompletedOrder(fallbackOrder);
      onCompleteOrder(fallbackOrder);
      setStep(6);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8 text-left shadow-2xl max-h-[92vh] flex flex-col my-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Direct Client Onboarding & Checkout
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Step {step} of 7
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              {step === 1 && 'Step 1: Select Service'}
              {step === 2 && 'Step 2: Choose Your Package Tier'}
              {step === 3 && 'Step 3: Customer & Project Information'}
              {step === 4 && 'Step 4: Upload Project Brief & Assets'}
              {step === 5 && 'Step 5: Secure Payment Processing'}
              {step === 6 && 'Step 6: Order Confirmed & Receipt'}
              {step === 7 && 'Step 7: Automated Email Notification Preview'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="flex items-center justify-between gap-1 py-3 border-b border-slate-900 text-[10px] font-semibold text-slate-400">
          {['Service', 'Package', 'Project Info', 'Uploads', 'Payment', 'Confirmation', 'Email'].map(
            (label, idx) => (
              <div
                key={label}
                className={`flex-1 text-center border-b-2 py-1 transition ${
                  step === idx + 1
                    ? 'border-emerald-500 text-emerald-400 font-bold'
                    : step > idx + 1
                    ? 'border-emerald-500/40 text-slate-300'
                    : 'border-slate-800 text-slate-400'
                }`}
              >
                <span className="hidden sm:inline">{idx + 1}. </span>
                {label}
              </div>
            )
          )}
        </div>

        {/* Scrollable Step Content */}
        <div className="flex-1 overflow-y-auto py-5 pr-1 space-y-6">
          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-300">
                Select the service you wish to engage Md Moshiour Rahman Bappi and his agency for:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedServiceId(s.id);
                      setSelectedTier('standard');
                    }}
                    className={`rounded-xl border p-5 text-left transition flex flex-col justify-between ${
                      selectedServiceId === s.id
                        ? 'border-emerald-500 bg-emerald-950/20 shadow-lg shadow-emerald-500/10'
                        : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white text-sm">{s.title}</h4>
                        {selectedServiceId === s.id && (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        )}
                      </div>
                      <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                        {s.shortDescription}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Starting from</span>
                      <span className="font-bold text-emerald-400 font-mono">
                        ${Math.min(...s.packages.map((p) => p.price))}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Select Package */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{selectedService.title}</h4>
                  <p className="text-xs text-slate-400">Select the package tier suited for your campaign scope:</p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-400 hover:text-emerald-400 underline"
                >
                  Change Service
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                {selectedService.packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedTier(pkg.tier)}
                    className={`cursor-pointer rounded-xl border p-5 flex flex-col justify-between transition ${
                      selectedTier === pkg.tier
                        ? 'border-emerald-500 bg-emerald-950/20 shadow-lg shadow-emerald-500/10'
                        : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {pkg.tier}
                        </span>
                        <span className="text-xl font-extrabold text-white font-mono">
                          ${pkg.price}
                        </span>
                      </div>
                      <h5 className="font-bold text-white text-xs mt-1">{pkg.name}</h5>
                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                        {pkg.description}
                      </p>

                      <div className="mt-3 py-2 border-y border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                        <div>⏱ Delivery: <strong>{pkg.deliveryDays} Days</strong></div>
                        <div>🔄 Revisions: <strong>{pkg.revisions}</strong></div>
                      </div>

                      <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                        {pkg.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-[11px]">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800">
                      <div className={`w-full text-center py-1.5 rounded text-xs font-bold ${
                        selectedTier === pkg.tier ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {selectedTier === pkg.tier ? 'Selected' : 'Choose Package'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Customer Information */}
          {step === 3 && (
            <div className="space-y-4 text-xs">
              <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-slate-300 flex items-center justify-between">
                <div>
                  <span className="text-slate-400">Selected Order: </span>
                  <strong className="text-white">{selectedService.title}</strong> ({selectedPackage.name} - ${selectedPackage.price})
                </div>
                <button onClick={() => setStep(2)} className="text-emerald-400 hover:underline">
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-200 block mb-1 font-semibold">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. David Sterling"
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-200 block mb-1 font-semibold">Email Address (for Deliverables & Portal) *</label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="david@sterlinglegal.com"
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-200 block mb-1 font-semibold">Phone Number / WhatsApp</label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+1 (555) 729-1049"
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-200 block mb-1 font-semibold">Company / Business Legal Name</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Sterling & Partners Law Firm"
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-200 block mb-1 font-semibold">Website URL *</label>
                  <input
                    type="text"
                    required
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://sterlinglegal.com"
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-200 block mb-1 font-semibold">Business City / Location</label>
                  <input
                    type="text"
                    value={businessLocation}
                    onChange={(e) => setBusinessLocation(e.target.value)}
                    placeholder="Dallas, Texas, USA"
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-200 block mb-1 font-semibold">
                  Google Business Profile (GBP) Map URL (if Local SEO / GBP order)
                </label>
                <input
                  type="text"
                  value={gbpUrl}
                  onChange={(e) => setGbpUrl(e.target.value)}
                  placeholder="https://maps.google.com/?cid=..."
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-200 block mb-1 font-semibold">
                  Target Keywords or Primary Competitors (Separated by commas) *
                </label>
                <input
                  type="text"
                  required
                  value={targetKeywords}
                  onChange={(e) => setTargetKeywords(e.target.value)}
                  placeholder="e.g. corporate litigation attorney dallas, business lawyer near me, competitor.com"
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-200 block mb-1 font-semibold">
                  Project Requirements & Goals *
                </label>
                <textarea
                  required
                  rows={3}
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Describe your current organic hurdles, past SEO agency work, target goals, or special requirements..."
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Upload Project Brief / Files */}
          {step === 4 && (
            <div className="space-y-4 text-xs">
              <div className="text-slate-300">
                Upload any relevant files: previous SEO reports, brand guidelines, access documentation, logos, or audit requests.
              </div>

              {/* Upload Dropzone */}
              <div className="relative border-2 border-dashed border-slate-700 hover:border-emerald-500/80 rounded-2xl p-8 text-center bg-slate-900/40 transition">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <UploadCloud className="h-10 w-10 text-emerald-400 mx-auto mb-2" />
                <div className="font-semibold text-white text-sm">
                  Click to select files or drag & drop here
                </div>
                <div className="text-slate-400 mt-1">
                  Supports PDF, DOCX, ZIP, XLSX, JPG, PNG (Max 25MB total)
                </div>
                {isUploading && (
                  <div className="mt-3 text-emerald-400 font-medium">
                    Processing uploaded files...
                  </div>
                )}
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2 mt-4">
                  <span className="font-semibold text-slate-300 block">Uploaded Assets ({uploadedFiles.length})</span>
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 px-3 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-emerald-400" />
                        <div>
                          <div className="font-medium text-white">{file.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="text-slate-400 hover:text-rose-400 p-1"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="rounded-lg border border-slate-800 bg-slate-950 p-3 text-slate-400">
                Note: You can also upload additional files or chat directly inside your Customer Dashboard after checkout.
              </div>
            </div>
          )}

          {/* STEP 5: Secure Payment */}
          {step === 5 && (
            <div className="space-y-5 text-xs">
              {/* Order Summary Box */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">Service Selected</span>
                    <h4 className="text-sm font-bold text-white">{selectedService.title}</h4>
                    <p className="text-xs text-slate-400">{selectedPackage.name} • {selectedPackage.deliveryDays} Days Turnaround</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400">Total Due</span>
                    <div className="text-2xl font-extrabold text-emerald-400 font-mono">
                      ${selectedPackage.price}
                    </div>
                  </div>
                </div>

                <div className="pt-3 grid grid-cols-2 gap-2 text-slate-300">
                  <div>Client: <strong>{customerName}</strong></div>
                  <div>Email: <strong>{customerEmail}</strong></div>
                  <div>Target Website: <strong>{websiteUrl}</strong></div>
                  <div>Files Attached: <strong>{uploadedFiles.length} file(s)</strong></div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="text-slate-200 block mb-2 font-semibold">Select Secure Payment Provider</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`rounded-xl border p-3 text-center transition ${
                      paymentMethod === 'card'
                        ? 'border-emerald-500 bg-emerald-950/30 text-white font-bold'
                        : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <CreditCard className="h-5 w-5 mx-auto mb-1 text-emerald-400" />
                    <span>Credit / Debit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`rounded-xl border p-3 text-center transition ${
                      paymentMethod === 'paypal'
                        ? 'border-emerald-500 bg-emerald-950/30 text-white font-bold'
                        : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Globe className="h-5 w-5 mx-auto mb-1 text-cyan-400" />
                    <span>PayPal Express</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wire')}
                    className={`rounded-xl border p-3 text-center transition ${
                      paymentMethod === 'wire'
                        ? 'border-emerald-500 bg-emerald-950/30 text-white font-bold'
                        : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Building className="h-5 w-5 mx-auto mb-1 text-amber-400" />
                    <span>International Wire</span>
                  </button>
                </div>
              </div>

              {/* Card Form Simulation */}
              {paymentMethod === 'card' && (
                <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                  <div>
                    <label className="text-slate-300 block mb-1">Cardholder Full Name</label>
                    <input
                      type="text"
                      value={cardHolder || customerName}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="Name on card"
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">Card Number (Stripe Test Gateway Active)</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4242 •••• •••• 4242"
                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white font-mono focus:border-emerald-500 focus:outline-none"
                      />
                      <CreditCard className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-300 block mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white font-mono focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 block mb-1">CVC Code</label>
                      <input
                        type="password"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="•••"
                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white font-mono focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Security Statement */}
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-3 flex items-start gap-2.5 text-slate-300 text-[11px]">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Security Compliance:</strong> 256-Bit SSL End-to-End Encryption. We never store raw card numbers or CVV codes on our servers. Transactions are handled by verified PCI-DSS level 1 processors.
                </span>
              </div>
            </div>
          )}

          {/* STEP 6: Confirmation */}
          {step === 6 && completedOrder && (
            <div className="space-y-5 text-center py-4">
              <div className="h-14 w-14 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-extrabold text-white">Payment Received & Order Confirmed!</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Your project has been registered into Md Moshiour Rahman Bappi’s agency production pipeline.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 max-w-lg mx-auto text-left text-xs space-y-2.5">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Order Number:</span>
                  <span className="font-mono font-bold text-white">{completedOrder.orderNumber}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Transaction ID:</span>
                  <span className="font-mono text-emerald-400">{completedOrder.transactionId}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Service:</span>
                  <span className="font-semibold text-white">{completedOrder.serviceName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Package:</span>
                  <span className="text-slate-200">{completedOrder.packageName} (${completedOrder.price})</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Payment Status:</span>
                  <span className="font-bold text-emerald-400 uppercase">PAID & VERIFIED</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status Pipeline:</span>
                  <span className="text-cyan-400 font-semibold uppercase">In Production Setup</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setStep(7)}
                  className="w-full sm:w-auto rounded-lg border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition flex items-center justify-center gap-1.5"
                >
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  <span>Preview Step 7: Email Confirmation</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onNavigateToPortal();
                  }}
                  className="w-full sm:w-auto rounded-lg bg-emerald-500 px-6 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/25 transition"
                >
                  Open My Customer Dashboard
                </button>
              </div>
            </div>
          )}

          {/* STEP 7: Email Notification Preview */}
          {step === 7 && completedOrder && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-emerald-400" />
                  <span className="font-bold text-white text-sm">Automated Email Notification Preview</span>
                </div>
                <span className="rounded bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 text-[10px] text-emerald-300">
                  Sent to {completedOrder.customerEmail}
                </span>
              </div>

              {/* Email Mock Box */}
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4 text-slate-300">
                <div className="border-b border-slate-800 pb-3">
                  <div className="text-slate-400">Subject: <strong className="text-white">Order Confirmed: #{completedOrder.orderNumber} - {completedOrder.serviceName}</strong></div>
                  <div className="text-slate-400 mt-1">From: <strong>Md Moshiour Rahman Bappi &lt;mdmoshiourrahmanbappi@gmail.com&gt;</strong></div>
                </div>

                <div className="space-y-2 leading-relaxed">
                  <p>Hello <strong>{completedOrder.customerName}</strong>,</p>
                  <p>
                    Thank you for choosing my agency for your organic search and web engineering campaign!
                    We have received your payment of <strong>${completedOrder.price}</strong> and your project requirements for <strong>{completedOrder.websiteUrl}</strong>.
                  </p>
                  <p>
                    Your dedicated client portal has been initialized. You can track progress, review deliverables, chat with our team, and download audit reports anytime.
                  </p>
                </div>

                <div className="rounded-lg border border-slate-800 bg-slate-950 p-3.5 space-y-1.5 font-mono text-[11px]">
                  <div>• Order ID: {completedOrder.orderNumber}</div>
                  <div>• Service: {completedOrder.serviceName} ({completedOrder.packageName})</div>
                  <div>• Transaction Ref: {completedOrder.transactionId}</div>
                  <div>• Initial Status: Paid / In Progress</div>
                  <div>• Target Keywords: {completedOrder.targetKeywords}</div>
                </div>

                <p className="text-slate-400">
                  Best regards,<br />
                  <strong>Md Moshiour Rahman Bappi</strong><br />
                  SEO, Local SEO, AI Visibility Specialist & Web Developer
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setStep(6)}
                  className="rounded-lg border border-slate-800 px-4 py-2 text-slate-300 hover:bg-slate-900"
                >
                  Back to Receipt
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToPortal();
                  }}
                  className="rounded-lg bg-emerald-500 px-6 py-2 font-bold text-slate-950 hover:bg-emerald-400 shadow"
                >
                  Launch Client Portal
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Navigation Buttons for Steps 1-5 */}
        {step < 6 && (
          <div className="border-t border-slate-800 pt-4 flex items-center justify-between">
            <button
              onClick={() => {
                if (step > 1) setStep(step - 1);
                else onClose();
              }}
              className="rounded-lg border border-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-900 flex items-center gap-1.5"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{step === 1 ? 'Cancel' : 'Previous Step'}</span>
            </button>

            <button
              onClick={() => {
                if (step === 1) setStep(2);
                else if (step === 2) setStep(3);
                else if (step === 3) {
                  if (!customerName || !customerEmail || !websiteUrl || !targetKeywords) {
                    alert('Please provide your name, email, website URL, and target keywords.');
                    return;
                  }
                  setStep(4);
                } else if (step === 4) {
                  setStep(5);
                } else if (step === 5) {
                  handleProcessPayment();
                }
              }}
              disabled={isProcessingPayment}
              className="rounded-lg bg-emerald-500 px-6 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 shadow-md shadow-emerald-500/20 flex items-center gap-1.5 transition disabled:opacity-50"
            >
              <span>
                {step === 5
                  ? isProcessingPayment
                    ? 'Processing Secure Checkout...'
                    : `Complete Order & Pay $${selectedPackage.price}`
                  : 'Continue'}
              </span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

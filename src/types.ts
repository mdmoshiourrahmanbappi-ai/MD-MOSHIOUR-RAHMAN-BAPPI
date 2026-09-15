export type UserRole =
  | 'super_admin'
  | 'admin'
  | 'seo_manager'
  | 'content_manager'
  | 'developer'
  | 'order_manager'
  | 'client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  company?: string;
  phone?: string;
  createdAt: string;
}

export type PackageTier = 'basic' | 'standard' | 'premium';

export interface ServicePackage {
  id: string;
  tier: PackageTier;
  name: string;
  price: number;
  deliveryDays: number;
  revisions: string;
  description: string;
  features: string[];
  isFeatured?: boolean;
  discountPercentage?: number;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  iconName: string;
  category: 'seo' | 'local_seo' | 'ai_visibility' | 'web_dev';
  problemsSolved: string[];
  whoNeedsIt: string[];
  benefits: string[];
  process: { step: number; title: string; description: string }[];
  deliverables: string[];
  faqs: { question: string; answer: string }[];
  packages: ServicePackage[];
  isAiSpecialty?: boolean;
}

export type OrderStatus = 'pending' | 'paid' | 'in_progress' | 'review' | 'completed';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface OrderFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface OrderDeliverable {
  id: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileSize?: string;
  deliveredAt?: string;
  uploadedAt?: string;
  notes?: string;
}

export interface OrderMessage {
  id: string;
  senderId?: string;
  senderName?: string;
  senderRole?: string;
  sender?: string;
  role?: string;
  message?: string;
  content?: string;
  timestamp?: string;
  createdAt?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  serviceId: string;
  serviceName: string;
  packageTier: PackageTier;
  packageName: string;
  price: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  company?: string;
  websiteUrl: string;
  businessLocation?: string;
  gbpUrl?: string;
  targetKeywords: string;
  requirements: string;
  files: OrderFile[];
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  transactionId: string;
  paymentMethod: string;
  createdAt: string;
  deliverables: OrderDeliverable[];
  internalNotes?: string;
  messages: OrderMessage[];
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  website?: string;
  websiteUrl?: string;
  businessName?: string;
  company?: string;
  location?: string;
  mainConcern?: string;
  primaryConcern?: string;
  auditType?: string;
  type?: 'audit' | 'contact' | 'consultation';
  status: 'new' | 'contacted' | 'qualified' | 'converted';
  source?: string;
  createdAt: string;
  notes?: string;
}

export interface Review {
  id: string;
  customerName: string;
  company: string;
  role?: string;
  review: string;
  rating: number;
  servicePurchased: string;
  date: string;
  avatarUrl?: string;
  isFeatured: boolean;
  isApproved: boolean;
  source?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  clientName: string;
  industry: string;
  location: string;
  category: 'seo' | 'local_seo' | 'ai_visibility' | 'web_dev';
  problem: string;
  strategy: string;
  workCompleted: string[];
  results: { metric: string; value: string; change: string }[];
  beforeAfter: { before: string; after: string };
  timeline: string;
  servicesUsed: string[];
  screenshotUrl?: string;
  isFeatured?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    role: string;
    avatarUrl?: string;
    bio?: string;
  };
  publishedAt: string;
  readTime?: string;
  readingTime?: string;
  status?: 'draft' | 'published' | 'scheduled';
  featuredImage: string;
  seoTitle?: string;
  metaDescription?: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  entityType?: string;
  entityId?: string;
  details: string;
  timestamp: string;
}

export interface SiteContent {
  hero: {
    title: string;
    highlight: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    badgeText: string;
    ratingText: string;
  };
  about: {
    name: string;
    title: string;
    bio: string;
    location: string;
    yearsExperience: number;
    completedProjects: number;
    happyClients: number;
    topRankingsCount: number;
  };
  contact: {
    email: string;
    phone: string;
    location: string;
    responseExpectation?: string;
    responseTime?: string;
    whatsapp?: string;
    linkedin?: string;
    calendlyUrl?: string;
  };
}

export interface DatabaseState {
  services: ServiceItem[];
  orders: Order[];
  leads: Lead[];
  reviews: Review[];
  caseStudies: CaseStudy[];
  blogPosts: BlogPost[];
  users: User[];
  auditLogs: AuditLog[];
  siteContent: SiteContent;
}

export type SiteData = DatabaseState;

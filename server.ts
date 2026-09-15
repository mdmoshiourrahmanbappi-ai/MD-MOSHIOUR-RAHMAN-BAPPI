import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { initialData } from './src/data/initialData.ts';
import { DatabaseState, Order, Lead, Review, BlogPost, CaseStudy, ServiceItem, User, AuditLog, SiteContent } from './src/types.ts';

const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');

// Ensure data and uploads directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Initialize Database
let db: DatabaseState;
try {
  if (fs.existsSync(DB_FILE)) {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    db = JSON.parse(raw);
  } else {
    db = { ...initialData };
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  }
} catch (err) {
  console.error('Error loading database, falling back to initial data:', err);
  db = { ...initialData };
}

// Helper to persist database changes
function saveDb() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to persist database:', err);
  }
}

// Log audit action
function logAudit(userId: string, userName: string, userRole: any, action: string, details: string) {
  const entry: AuditLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    userId,
    userName,
    userRole,
    action,
    details,
    timestamp: new Date().toISOString(),
  };
  db.auditLogs.unshift(entry);
  if (db.auditLogs.length > 200) {
    db.auditLogs = db.auditLogs.slice(0, 200);
  }
  saveDb();
  return entry;
}

async function startServer() {
  const app = express();

  // Middleware for JSON parsing with ample limit for document uploads
  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

  // Static uploads serving
  app.use('/uploads', express.static(UPLOADS_DIR));

  // --- API ROUTES ---

  // Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString(), database: 'active' });
  });

  // Get full database state
  app.get('/api/database', (req, res) => {
    res.json(db);
  });

  // Reset database to initial seed (for testing)
  app.post('/api/database/reset', (req, res) => {
    db = JSON.parse(JSON.stringify(initialData));
    saveDb();
    logAudit('usr-bappi', 'Md Moshiour Rahman Bappi', 'super_admin', 'Database Reset', 'Restored initial sample data');
    res.json({ success: true, message: 'Database reset to initial demo state', db });
  });

  // Services & Packages
  app.get('/api/services', (req, res) => {
    res.json(db.services);
  });

  app.put('/api/services/:id', (req, res) => {
    const { id } = req.params;
    const updated = req.body;
    const idx = db.services.findIndex((s) => s.id === id);
    if (idx !== -1) {
      db.services[idx] = { ...db.services[idx], ...updated };
      saveDb();
      logAudit(req.body.userId || 'admin', req.body.userName || 'Admin', 'admin', 'Service Updated', `Updated service: ${db.services[idx].title}`);
      res.json(db.services[idx]);
    } else {
      res.status(404).json({ error: 'Service not found' });
    }
  });

  app.put('/api/services/:serviceId/packages/:packageId', (req, res) => {
    const { serviceId, packageId } = req.params;
    const updatedPkg = req.body;
    const service = db.services.find((s) => s.id === serviceId);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    const pkgIdx = service.packages.findIndex((p) => p.id === packageId);
    if (pkgIdx !== -1) {
      service.packages[pkgIdx] = { ...service.packages[pkgIdx], ...updatedPkg };
      saveDb();
      logAudit(
        req.body.userId || 'admin',
        req.body.userName || 'Admin',
        'admin',
        'Package Pricing Updated',
        `Updated pricing for package ${service.packages[pkgIdx].name} to $${service.packages[pkgIdx].price}`
      );
      res.json(service.packages[pkgIdx]);
    } else {
      res.status(404).json({ error: 'Package not found' });
    }
  });

  // Orders Management
  app.get('/api/orders', (req, res) => {
    const { email } = req.query;
    if (email) {
      const userOrders = db.orders.filter(
        (o) => o.customerEmail.toLowerCase() === String(email).toLowerCase()
      );
      return res.json(userOrders);
    }
    res.json(db.orders);
  });

  app.post('/api/orders', (req, res) => {
    const payload = req.body;
    const orderNumber = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      serviceId: payload.serviceId || 'srv-seo',
      serviceName: payload.serviceName || 'SEO Service',
      packageTier: payload.packageTier || 'standard',
      packageName: payload.packageName || 'Standard Package',
      price: Number(payload.price) || 499,
      customerName: payload.customerName,
      customerEmail: payload.customerEmail,
      customerPhone: payload.customerPhone || '',
      company: payload.company || '',
      websiteUrl: payload.websiteUrl,
      businessLocation: payload.businessLocation || '',
      gbpUrl: payload.gbpUrl || '',
      targetKeywords: payload.targetKeywords || '',
      requirements: payload.requirements || '',
      files: payload.files || [],
      status: 'paid', // Instant confirmation upon simulated payment
      paymentStatus: 'paid',
      transactionId: `TXN-${Math.floor(100000 + Math.random() * 900000)}-PAY`,
      paymentMethod: payload.paymentMethod || 'Credit Card (Stripe Verified)',
      createdAt: new Date().toISOString(),
      deliverables: [],
      internalNotes: 'New online order received via website checkout flow.',
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'System Automation',
          role: 'system',
          message: `Order #${orderNumber} created. Project onboarding initiated. Md Moshiour Rahman Bappi and the technical team have been notified.`,
          timestamp: new Date().toISOString(),
        },
      ],
    };

    // Auto-create or link client user account if not exists
    const existingUser = db.users.find(
      (u) => u.email.toLowerCase() === newOrder.customerEmail.toLowerCase()
    );
    if (!existingUser) {
      db.users.push({
        id: `usr-${Date.now()}`,
        name: newOrder.customerName,
        email: newOrder.customerEmail,
        role: 'client',
        company: newOrder.company,
        phone: newOrder.customerPhone,
        createdAt: new Date().toISOString(),
      });
    }

    db.orders.unshift(newOrder);
    saveDb();
    logAudit(
      'system',
      'Checkout Engine',
      'client',
      'New Order Placed',
      `Order ${orderNumber} placed by ${newOrder.customerName} for ${newOrder.serviceName} ($${newOrder.price})`
    );
    res.status(201).json(newOrder);
  });

  app.put('/api/orders/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const idx = db.orders.findIndex((o) => o.id === id);
    if (idx === -1) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Deliverable upload
    if (updates.newDeliverable) {
      db.orders[idx].deliverables.push({
        id: `del-${Date.now()}`,
        title: updates.newDeliverable.title,
        fileUrl: updates.newDeliverable.fileUrl,
        fileSize: updates.newDeliverable.fileSize || 'PDF Document',
        uploadedAt: new Date().toISOString(),
        notes: updates.newDeliverable.notes || '',
      });
    }

    // New Message
    if (updates.newMessage) {
      db.orders[idx].messages.push({
        id: `msg-${Date.now()}`,
        sender: updates.newMessage.sender,
        role: updates.newMessage.role,
        message: updates.newMessage.message,
        timestamp: new Date().toISOString(),
      });
    }

    // Other updates (status, internalNotes, etc.)
    if (updates.status) db.orders[idx].status = updates.status;
    if (updates.paymentStatus) db.orders[idx].paymentStatus = updates.paymentStatus;
    if (updates.internalNotes !== undefined) db.orders[idx].internalNotes = updates.internalNotes;

    saveDb();
    logAudit(
      updates.adminUserId || 'staff',
      updates.adminUserName || 'Agency Staff',
      updates.adminRole || 'admin',
      'Order Updated',
      `Order ${db.orders[idx].orderNumber} updated. Status: ${db.orders[idx].status}`
    );
    res.json(db.orders[idx]);
  });

  // Leads CRM (Free Audits & Contact inquiries)
  app.get('/api/leads', (req, res) => {
    res.json(db.leads);
  });

  app.post('/api/leads', (req, res) => {
    const payload = req.body;
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: payload.name,
      email: payload.email,
      website: payload.website || '',
      businessName: payload.businessName || '',
      location: payload.location || '',
      mainConcern: payload.mainConcern || '',
      type: payload.type || 'audit',
      status: 'new',
      createdAt: new Date().toISOString(),
      notes: payload.notes || 'Submitted via website lead capture.',
    };
    db.leads.unshift(newLead);
    saveDb();
    logAudit(
      'system',
      'Lead Engine',
      'client',
      'New Lead Captured',
      `New ${newLead.type} request from ${newLead.name} (${newLead.email}) for ${newLead.businessName || newLead.website}`
    );
    res.status(201).json(newLead);
  });

  app.put('/api/leads/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const idx = db.leads.findIndex((l) => l.id === id);
    if (idx !== -1) {
      db.leads[idx] = { ...db.leads[idx], ...updates };
      saveDb();
      res.json(db.leads[idx]);
    } else {
      res.status(404).json({ error: 'Lead not found' });
    }
  });

  // Reviews
  app.get('/api/reviews', (req, res) => {
    res.json(db.reviews);
  });

  app.post('/api/reviews', (req, res) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      customerName: req.body.customerName,
      company: req.body.company,
      role: req.body.role || 'Client',
      review: req.body.review,
      rating: Number(req.body.rating) || 5,
      servicePurchased: req.body.servicePurchased,
      date: new Date().toISOString().split('T')[0],
      isFeatured: Boolean(req.body.isFeatured),
      isApproved: true,
      source: req.body.source || 'Website Submission',
    };
    db.reviews.unshift(newRev);
    saveDb();
    logAudit('admin', 'Admin', 'admin', 'Review Created', `Added review from ${newRev.customerName}`);
    res.status(201).json(newRev);
  });

  app.put('/api/reviews/:id', (req, res) => {
    const { id } = req.params;
    const idx = db.reviews.findIndex((r) => r.id === id);
    if (idx !== -1) {
      db.reviews[idx] = { ...db.reviews[idx], ...req.body };
      saveDb();
      res.json(db.reviews[idx]);
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  });

  // Portfolio / Case Studies
  app.get('/api/case-studies', (req, res) => {
    res.json(db.caseStudies);
  });

  app.post('/api/case-studies', (req, res) => {
    const newCs: CaseStudy = {
      id: `cs-${Date.now()}`,
      title: req.body.title,
      clientName: req.body.clientName,
      industry: req.body.industry,
      location: req.body.location,
      category: req.body.category || 'seo',
      problem: req.body.problem,
      strategy: req.body.strategy,
      workCompleted: req.body.workCompleted || [],
      results: req.body.results || [],
      beforeAfter: req.body.beforeAfter || { before: '', after: '' },
      timeline: req.body.timeline || '60 Days',
      servicesUsed: req.body.servicesUsed || [],
      screenshotUrl: req.body.screenshotUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      isFeatured: Boolean(req.body.isFeatured),
    };
    db.caseStudies.unshift(newCs);
    saveDb();
    logAudit('admin', 'Admin', 'admin', 'Case Study Added', `Published case study: ${newCs.title}`);
    res.status(201).json(newCs);
  });

  app.put('/api/case-studies/:id', (req, res) => {
    const { id } = req.params;
    const idx = db.caseStudies.findIndex((c) => c.id === id);
    if (idx !== -1) {
      db.caseStudies[idx] = { ...db.caseStudies[idx], ...req.body };
      saveDb();
      res.json(db.caseStudies[idx]);
    } else {
      res.status(404).json({ error: 'Case study not found' });
    }
  });

  app.delete('/api/case-studies/:id', (req, res) => {
    const { id } = req.params;
    db.caseStudies = db.caseStudies.filter((c) => c.id !== id);
    saveDb();
    res.json({ success: true });
  });

  // Blog CMS
  app.get('/api/blog', (req, res) => {
    res.json(db.blogPosts);
  });

  app.post('/api/blog', (req, res) => {
    const newPost: BlogPost = {
      id: `blog-${Date.now()}`,
      slug: req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: req.body.title,
      excerpt: req.body.excerpt,
      content: req.body.content,
      category: req.body.category || 'SEO',
      tags: req.body.tags || ['SEO'],
      author: req.body.author || {
        name: 'Md Moshiour Rahman Bappi',
        role: 'SEO & AI Visibility Specialist',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      },
      publishedAt: new Date().toISOString().split('T')[0],
      status: req.body.status || 'published',
      featuredImage: req.body.featuredImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      seoTitle: req.body.seoTitle || req.body.title,
      metaDescription: req.body.metaDescription || req.body.excerpt,
      readingTime: `${Math.ceil((req.body.content || '').split(' ').length / 200)} min read`,
    };
    db.blogPosts.unshift(newPost);
    saveDb();
    logAudit('content_manager', 'Elena Rostova', 'content_manager', 'Blog Post Published', `Published post: ${newPost.title}`);
    res.status(201).json(newPost);
  });

  app.put('/api/blog/:id', (req, res) => {
    const { id } = req.params;
    const idx = db.blogPosts.findIndex((b) => b.id === id);
    if (idx !== -1) {
      db.blogPosts[idx] = { ...db.blogPosts[idx], ...req.body };
      saveDb();
      res.json(db.blogPosts[idx]);
    } else {
      res.status(404).json({ error: 'Blog post not found' });
    }
  });

  app.delete('/api/blog/:id', (req, res) => {
    const { id } = req.params;
    db.blogPosts = db.blogPosts.filter((b) => b.id !== id);
    saveDb();
    res.json({ success: true });
  });

  // Website Content CMS
  app.get('/api/site-content', (req, res) => {
    res.json(db.siteContent);
  });

  app.put('/api/site-content', (req, res) => {
    db.siteContent = { ...db.siteContent, ...req.body };
    saveDb();
    logAudit('admin', 'Md Moshiour Rahman Bappi', 'super_admin', 'Website Content Modified', 'Updated homepage hero/about/contact copy');
    res.json(db.siteContent);
  });

  // Agency Users & RBAC
  app.get('/api/users', (req, res) => {
    res.json(db.users);
  });

  app.post('/api/users', (req, res) => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: req.body.name,
      email: req.body.email,
      role: req.body.role || 'client',
      company: req.body.company || '',
      phone: req.body.phone || '',
      createdAt: new Date().toISOString(),
    };
    db.users.push(newUser);
    saveDb();
    logAudit('usr-bappi', 'Md Moshiour Rahman Bappi', 'super_admin', 'Staff / User Account Created', `Created user ${newUser.name} with role ${newUser.role}`);
    res.status(201).json(newUser);
  });

  app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const idx = db.users.findIndex((u) => u.id === id);
    if (idx !== -1) {
      db.users[idx] = { ...db.users[idx], ...req.body };
      saveDb();
      res.json(db.users[idx]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });

  app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.users = db.users.filter((u) => u.id !== id);
    saveDb();
    res.json({ success: true });
  });

  // Audit logs
  app.get('/api/audit-logs', (req, res) => {
    res.json(db.auditLogs);
  });

  // File Upload endpoint (stores files on disk & returns access URL)
  app.post('/api/upload', (req, res) => {
    const { fileName, fileData, fileType } = req.body;
    if (!fileName || !fileData) {
      return res.status(400).json({ error: 'Missing fileName or fileData' });
    }

    try {
      const sanitizedName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filePath = path.join(UPLOADS_DIR, sanitizedName);
      
      // If fileData is base64
      const base64Data = fileData.replace(/^data:([A-Za-z-+\/]+);base64,/, '');
      fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

      const publicUrl = `/uploads/${sanitizedName}`;
      res.json({
        success: true,
        fileName: sanitizedName,
        url: publicUrl,
        size: fs.statSync(filePath).size,
      });
    } catch (err: any) {
      console.error('File upload error:', err);
      res.status(500).json({ error: 'File upload failed', message: err.message });
    }
  });

  // XML Sitemap endpoint
  app.get('/api/sitemap.xml', (req, res) => {
    const baseUrl = process.env.APP_URL || 'https://mdmoshiourrahmanbappi.com';
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/services/seo</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/services/local-seo</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/services/ai-visibility</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/services/web-dev</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/portfolio</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/reviews</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  ${db.blogPosts
    .map(
      (b) => `  <url>
    <loc>${baseUrl}/blog/${b.slug}</loc>
    <lastmod>${b.publishedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('\n')}
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(sitemapXml);
  });

  // Robots.txt endpoint
  app.get('/api/robots.txt', (req, res) => {
    const baseUrl = process.env.APP_URL || 'https://mdmoshiourrahmanbappi.com';
    const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /client-portal

Sitemap: ${baseUrl}/api/sitemap.xml`;
    res.header('Content-Type', 'text/plain');
    res.send(robotsTxt);
  });

  // --- VITE MIDDLEWARE OR PRODUCTION STATIC SERVING ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();

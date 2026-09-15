import { DatabaseState, Order, Lead, Review, BlogPost, CaseStudy, ServiceItem, User, SiteContent } from '../types.ts';
import { initialData } from '../data/initialData.ts';

export async function fetchDatabase(): Promise<DatabaseState> {
  try {
    const res = await fetch('/api/database');
    if (!res.ok) throw new Error('Failed to fetch from server');
    return await res.json();
  } catch (err) {
    console.warn('API unavailable, returning local cache/fallback:', err);
    return initialData;
  }
}

export const fetchSiteData = fetchDatabase;

export async function createOrder(data: Partial<Order>): Promise<Order> {
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Order creation failed');
  return await res.json();
}

export async function updateOrder(
  id: string,
  updates: any
): Promise<Order> {
  const res = await fetch(`/api/orders/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update order');
  return await res.json();
}

export async function updatePackagePricing(
  serviceId: string,
  packageId: string,
  updates: any,
  adminUser: { id: string; name: string }
): Promise<any> {
  const res = await fetch(`/api/services/${serviceId}/packages/${packageId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...updates, userId: adminUser.id, userName: adminUser.name }),
  });
  if (!res.ok) throw new Error('Failed to update package');
  return await res.json();
}

export async function updateService(
  id: string,
  updates: Partial<ServiceItem>,
  adminUser: { id: string; name: string }
): Promise<ServiceItem> {
  const res = await fetch(`/api/services/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...updates, userId: adminUser.id, userName: adminUser.name }),
  });
  if (!res.ok) throw new Error('Failed to update service');
  return await res.json();
}

export async function createLead(data: Partial<Lead>): Promise<Lead> {
  const res = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to submit lead inquiry');
  return await res.json();
}

export async function updateLead(id: string, updates: Partial<Lead>): Promise<Lead> {
  const res = await fetch(`/api/leads/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update lead');
  return await res.json();
}

export async function createReview(data: Partial<Review>): Promise<Review> {
  const res = await fetch('/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to submit review');
  return await res.json();
}

export async function updateReview(id: string, updates: Partial<Review>): Promise<Review> {
  const res = await fetch(`/api/reviews/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update review');
  return await res.json();
}

export async function createCaseStudy(data: Partial<CaseStudy>): Promise<CaseStudy> {
  const res = await fetch('/api/case-studies', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create case study');
  return await res.json();
}

export async function updateCaseStudy(id: string, updates: Partial<CaseStudy>): Promise<CaseStudy> {
  const res = await fetch(`/api/case-studies/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update case study');
  return await res.json();
}

export async function deleteCaseStudy(id: string): Promise<void> {
  const res = await fetch(`/api/case-studies/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete case study');
}

export async function createBlogPost(data: Partial<BlogPost>): Promise<BlogPost> {
  const res = await fetch('/api/blog', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create blog post');
  return await res.json();
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
  const res = await fetch(`/api/blog/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update blog post');
  return await res.json();
}

export async function deleteBlogPost(id: string): Promise<void> {
  const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete blog post');
}

export async function updateSiteContent(content: Partial<SiteContent>): Promise<SiteContent> {
  const res = await fetch('/api/site-content', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content),
  });
  if (!res.ok) throw new Error('Failed to update site content');
  return await res.json();
}

export async function createUser(user: Partial<User>): Promise<User> {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error('Failed to create user');
  return await res.json();
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User> {
  const res = await fetch(`/api/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update user');
  return await res.json();
}

export async function deleteUser(id: string): Promise<void> {
  const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete user');
}

export async function uploadFile(fileName: string, fileData: string, fileType: string): Promise<{ url: string; size: number }> {
  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileName, fileData, fileType }),
  });
  if (!res.ok) throw new Error('Upload failed');
  return await res.json();
}

export async function resetDatabase(): Promise<void> {
  await fetch('/api/database/reset', { method: 'POST' });
}

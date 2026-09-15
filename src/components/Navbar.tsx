import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Sparkles,
  Code,
  Shield,
  User,
  ShoppingBag,
  FileCheck,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Sparkle
} from 'lucide-react';
import { UserRole } from '../types.ts';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  onOpenOrderModal: (serviceId?: string, tier?: string) => void;
  onOpenAuditModal: () => void;
  onOpenSeoViewer: () => void;
  currentUserRole: UserRole;
  currentUserName: string;
  onSelectRole: (role: UserRole) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  onOpenOrderModal,
  onOpenAuditModal,
  onOpenSeoViewer,
  currentUserRole,
  currentUserName,
  onSelectRole,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const roleLabels: Record<UserRole, { label: string; badgeColor: string }> = {
    super_admin: { label: 'Super Admin (Bappi)', badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
    admin: { label: 'Agency Admin', badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
    seo_manager: { label: 'SEO Manager', badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
    content_manager: { label: 'Content Manager', badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
    developer: { label: 'Developer', badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    order_manager: { label: 'Order Manager', badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
    client: { label: 'Client Portal', badgeColor: 'bg-slate-700/50 text-slate-300 border-slate-600' },
  };

  const navLinks = [
    { label: 'Home', view: 'home' },
    { label: 'Services', view: 'services' },
    { label: 'Case Studies', view: 'case-studies' },
    { label: 'Reviews', view: 'reviews' },
    { label: 'About', view: 'about' },
    { label: 'Blog', view: 'blog' },
    { label: 'Contact', view: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      {/* Top Banner with Quick Status & Role Switcher */}
      <div className="border-b border-slate-900 bg-slate-900/40 px-4 py-1.5 text-xs text-slate-400">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Accepting New Clients & Local Campaigns
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-400">
              Verified SEO, GBP, AEO/GEO & Web Development
            </span>
          </div>

          {/* Quick RBAC Role Demo Switcher */}
          <div className="relative flex items-center gap-2">
            <span className="text-slate-400 hidden sm:inline">Active View:</span>
            <button
              id="btn-role-switcher"
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className={`flex items-center gap-1.5 rounded border px-2 py-0.5 text-xs font-medium transition ${roleLabels[currentUserRole].badgeColor}`}
            >
              <Shield className="h-3 w-3" />
              <span>{roleLabels[currentUserRole].label}</span>
              <ChevronDown className="h-3 w-3" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 top-7 z-50 w-56 rounded-lg border border-slate-800 bg-slate-900 p-1.5 shadow-xl shadow-black/50">
                <div className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800 mb-1">
                  Switch RBAC Role (Test Suite)
                </div>
                {(Object.keys(roleLabels) as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      onSelectRole(r);
                      setRoleDropdownOpen(false);
                      if (r === 'client') {
                        setCurrentView('client-portal');
                      } else {
                        setCurrentView('admin-dashboard');
                      }
                    }}
                    className={`w-full text-left rounded px-2.5 py-1.5 text-xs flex items-center justify-between hover:bg-slate-800 transition ${
                      currentUserRole === r ? 'bg-slate-800/80 font-semibold text-emerald-400' : 'text-slate-300'
                    }`}
                  >
                    <span>{roleLabels[r].label}</span>
                    {currentUserRole === r && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo */}
        <button
          onClick={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 text-left group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-indigo-600 font-bold text-white shadow-md shadow-emerald-500/10 group-hover:scale-105 transition-transform">
            MB
          </div>
          <div>
            <div className="font-bold text-slate-100 leading-tight group-hover:text-emerald-400 transition-colors">
              Md Moshiour Rahman Bappi
            </div>
            <div className="text-[11px] tracking-wide text-slate-400">
              SEO • Local GBP • AI Visibility • Web Dev
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.view}
              onClick={() => {
                setCurrentView(link.view);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                currentView === link.view
                  ? 'bg-slate-800/80 text-emerald-400 font-semibold shadow-inner'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}

          {/* Quick Technical Architecture & Schema Inspector */}
          <button
            onClick={onOpenSeoViewer}
            title="Inspect Schema.org & SEO Architecture"
            className="ml-1 rounded-lg px-2.5 py-2 text-xs text-slate-400 hover:bg-slate-900 hover:text-emerald-300 border border-slate-800/60 transition"
          >
            SEO / Schema
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Free Audit Button */}
          <button
            id="btn-nav-free-audit"
            onClick={onOpenAuditModal}
            className="flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-950/30 px-3.5 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/40 transition"
          >
            <Sparkle className="h-3.5 w-3.5 text-emerald-400" />
            <span>Free Audit</span>
          </button>

          {/* Direct Order Now CTA */}
          <button
            id="btn-nav-order"
            onClick={() => onOpenOrderModal()}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-500 hover:shadow-emerald-500/30 transition transform active:scale-95"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>Order Now</span>
          </button>

          {/* Dashboard Portal Button */}
          {currentUserRole === 'client' ? (
            <button
              onClick={() => setCurrentView('client-portal')}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800 transition"
            >
              <User className="h-3.5 w-3.5 text-slate-400" />
              <span>Client Portal</span>
            </button>
          ) : (
            <button
              onClick={() => setCurrentView('admin-dashboard')}
              className="flex items-center gap-1.5 rounded-lg border border-indigo-500/40 bg-indigo-950/30 px-3 py-2 text-xs font-medium text-indigo-300 hover:bg-indigo-900/40 transition"
            >
              <Shield className="h-3.5 w-3.5 text-indigo-400" />
              <span>Agency CMS</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-white"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => {
                  setCurrentView(link.view);
                  setMobileMenuOpen(false);
                }}
                className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                  currentView === link.view
                    ? 'bg-slate-800 text-emerald-400 font-semibold'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenAuditModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-950/40 py-2.5 text-sm font-semibold text-emerald-300"
            >
              <Sparkle className="h-4 w-4" />
              <span>Request Free SEO & AI Check</span>
            </button>

            <button
              onClick={() => {
                onOpenOrderModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-500 py-2.5 text-sm font-bold text-slate-950 shadow-md shadow-emerald-500/20"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Order Services Online</span>
            </button>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  setCurrentView('client-portal');
                  setMobileMenuOpen(false);
                }}
                className="rounded-lg border border-slate-700 bg-slate-900 py-2 text-xs font-medium text-slate-300 text-center"
              >
                Client Portal
              </button>
              <button
                onClick={() => {
                  setCurrentView('admin-dashboard');
                  setMobileMenuOpen(false);
                }}
                className="rounded-lg border border-indigo-500/40 bg-indigo-950/40 py-2 text-xs font-medium text-indigo-300 text-center"
              >
                Agency Admin CMS
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

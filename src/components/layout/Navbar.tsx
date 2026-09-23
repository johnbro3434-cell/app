import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Bell, Wallet, ShieldCheck, LogOut, LayoutDashboard, Crown, Sparkles } from 'lucide-react';
import { NotificationsModal } from '../notifications/NotificationsModal';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  isAdminMode: boolean;
  setIsAdminMode: (mode: boolean) => void;
}

export function Navbar({ currentView, setCurrentView, isAdminMode, setIsAdminMode }: NavbarProps) {
  const { user, admin, isAdmin, wallet, settings, logout, unreadCount } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const websiteName = settings?.websiteName || 'EarnNetwork BD';

  const getRoleBadgeStyle = (role?: string) => {
    switch (role) {
      case 'VIP':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Senior Manager':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'Middle Manager':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'Manager':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-slate-700/50 text-slate-300 border-slate-600/40';
    }
  };

  return (
    <>
      <header
        id="app-header"
        className="sticky top-0 z-40 bg-slate-950/70 border-b border-white/[0.08] backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.35)] transition-all"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Branding */}
          <div
            id="brand-logo-btn"
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2.5 cursor-pointer group min-w-0"
          >
            {settings?.logoUrl ? (
              <img
                src={settings.logoUrl}
                alt="EarnNetwork BD Logo"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)] shrink-0 group-hover:scale-105 transition-transform"
              />
            ) : (
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 flex items-center justify-center text-slate-950 font-black shadow-[0_0_15px_rgba(16,185,129,0.35)] border border-white/20 shrink-0 group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              </div>
            )}
            <div className="min-w-0">
              <span className="font-extrabold text-sm sm:text-base md:text-lg text-white tracking-tight truncate block max-w-[130px] xs:max-w-[180px] sm:max-w-[240px] md:max-w-none group-hover:text-emerald-300 transition-colors">
                {websiteName}
              </span>
              <span className="hidden sm:inline-block text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.15)]">
                Official MFS Platform
              </span>
            </div>
          </div>

          {/* Navigation Links (Public vs Authenticated) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {!user && !admin ? (
              // Public Navigation: Strictly Home, Login, Register (NO PACKAGE PRICING!)
              <nav className="flex items-center gap-1.5 sm:gap-2">
                <button
                  id="nav-link-home"
                  onClick={() => setCurrentView('home')}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition min-h-[38px] flex items-center cursor-pointer ${
                    currentView === 'home'
                      ? 'text-white bg-white/10 border border-white/15 shadow-inner'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  Home
                </button>
                <button
                  id="nav-link-login"
                  onClick={() => setCurrentView('login')}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition min-h-[38px] flex items-center cursor-pointer ${
                    currentView === 'login'
                      ? 'text-white bg-white/10 border border-white/15 shadow-inner'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  Login
                </button>
                <button
                  id="nav-link-register"
                  onClick={() => setCurrentView('register')}
                  className="glass-btn-primary text-slate-950 font-bold text-xs sm:text-sm px-3.5 sm:px-4 py-1.5 rounded-xl transition min-h-[38px] flex items-center cursor-pointer"
                >
                  Register
                </button>
              </nav>
            ) : (
              // Authenticated Navigation
              <div className="flex items-center gap-2 sm:gap-2.5">
                {/* Admin Mode Switcher if user is admin */}
                {isAdmin && (
                  <button
                    id="btn-toggle-admin-mode"
                    onClick={() => setIsAdminMode(!isAdminMode)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition min-h-[38px] cursor-pointer ${
                      isAdminMode
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                        : 'bg-white/[0.06] hover:bg-white/10 text-slate-200 border-white/10'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline">{isAdminMode ? 'Exit Admin' : 'Admin CRM'}</span>
                  </button>
                )}

                {/* Real-Time Live Wallet Balance Pill */}
                {wallet && !isAdminMode && (
                  <div
                    id="wallet-balance-pill"
                    onClick={() => setCurrentView('wallet')}
                    className="flex items-center gap-2 bg-gradient-to-r from-emerald-950/60 to-teal-950/60 hover:from-emerald-900/70 hover:to-teal-900/70 border border-emerald-500/40 px-3 sm:px-3.5 py-1.5 rounded-full cursor-pointer transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)] select-none min-h-[38px] group"
                    title="Live Wallet Balance - Click to view Wallet"
                  >
                    <div className="p-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 group-hover:scale-110 transition-transform">
                      <Wallet className="w-3 h-3 text-emerald-400 shrink-0" />
                    </div>
                    <span className="text-xs sm:text-sm font-black text-emerald-300 tracking-tight whitespace-nowrap">
                      ৳ {(wallet.balance || 0).toLocaleString()}
                    </span>
                  </div>
                )}

                {/* Notifications Bell */}
                <button
                  id="btn-navbar-notifications"
                  onClick={() => setShowNotifications(true)}
                  className="relative p-2 min-h-[38px] min-w-[38px] flex items-center justify-center text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/10 border border-white/[0.08] rounded-xl transition cursor-pointer"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  {unreadCount > 0 && (
                    <span
                      id="badge-unread-notifications"
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shadow-[0_0_8px_rgba(244,63,94,0.6)] animate-pulse"
                    >
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {/* User Role Badge */}
                {user && (
                  <div className="hidden md:flex items-center gap-1.5">
                    <span
                      id="badge-user-role"
                      className={`text-xs font-bold border px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md shadow-sm ${getRoleBadgeStyle(
                        user.role
                      )}`}
                    >
                      <Crown className="w-3 h-3" />
                      {user.role}
                    </span>
                  </div>
                )}

                {/* Logout Button */}
                <button
                  id="btn-navbar-logout"
                  onClick={logout}
                  className="p-2 min-h-[38px] min-w-[38px] flex items-center justify-center text-slate-400 hover:text-rose-400 bg-white/[0.05] hover:bg-rose-500/10 border border-white/[0.08] hover:border-rose-500/30 rounded-xl transition cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Notifications Modal */}
      <NotificationsModal isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
    </>
  );
}

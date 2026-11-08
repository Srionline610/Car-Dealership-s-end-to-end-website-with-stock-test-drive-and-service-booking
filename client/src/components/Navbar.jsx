// client/src/components/Navbar.jsx
import React from 'react';
import { Car, Globe, Sparkles, User, LogOut, Settings } from 'lucide-react';

export default function Navbar({
  activeView,
  setActiveView,
  lang,
  setLang,
  t,
  currentUser,
  onOpenAuthModal,
  onSignOut,
  onOpenTestDriveModal
}) {
  const handleNavClick = (view) => {
    setActiveView(view);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800 text-white shadow-xl transition-all duration-300">
      {/* Top micro-bar */}
      <div className="bg-slate-950 border-b border-slate-800/80 text-xs px-4 py-1.5 flex flex-wrap justify-between items-center text-slate-400">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 font-semibold tracking-wide">Authorised Brand X Dealership:</span>
            <span className="hidden sm:inline text-slate-400">Lucknow (3 Showrooms & 2 Workshops)</span>
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          {currentUser && (
            <span className="text-xs text-sky-400 font-medium">
              {currentUser.role === 'admin' || currentUser.role === 'dealer_principal' ? (
                <span className="text-amber-400 font-bold">Admin: {currentUser.name}</span>
              ) : (
                <span>Welcome, <strong className="text-white">{currentUser.name}</strong>!</span>
              )}
            </span>
          )}

          {/* Role-differentiated micro bar action */}
          {currentUser && (currentUser.role === 'admin' || currentUser.role === 'dealer_principal' || currentUser.role === 'used_car_manager') ? (
            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                activeView === 'admin'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
              }`}
              title="Dealership Admin Portal"
            >
              <Settings className="w-3 h-3 text-amber-400" />
              <span>Admin CMS</span>
            </button>
          ) : (
            <button
              onClick={() => handleNavClick('admin')}
              className="text-[11px] text-slate-500 hover:text-slate-300 flex items-center space-x-1 transition cursor-pointer"
              title="Dealership Staff Portal"
            >
              <Settings className="w-3 h-3 text-slate-500" />
              <span>Dealership Staff Portal</span>
            </button>
          )}

          <button
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            className="flex items-center space-x-1 text-slate-300 hover:text-white px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 hover:border-sky-500 transition-all duration-200 cursor-pointer shadow-xs"
            aria-label="Toggle language between English and Hindi"
          >
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-semibold text-xs">{lang === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Dealership name */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavClick('showroom')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 group-hover:shadow-sky-500/40 transition-all duration-300">
              <Car className="w-6 h-6 text-white transform group-hover:-rotate-3 transition duration-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-black tracking-widest text-white group-hover:text-sky-300 transition duration-300">BRAND X</span>
                <span className="text-[10px] bg-gradient-to-r from-sky-500/20 to-indigo-500/20 text-sky-300 border border-sky-400/30 px-2 py-0.5 rounded-full font-bold tracking-wider">
                  COMPANY A
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wide font-medium">Authorised Dealer • Lucknow</p>
            </div>
          </div>

          {/* Role-Differentiated Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 text-sm font-medium">
            <button
              onClick={() => handleNavClick('showroom')}
              className={`px-3.5 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                activeView === 'showroom'
                  ? 'bg-sky-600 text-white font-semibold shadow-md shadow-sky-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
              }`}
            >
              {t.navShowroom}
            </button>
            <button
              onClick={() => handleNavClick('used')}
              className={`px-3.5 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                activeView === 'used'
                  ? 'bg-sky-600 text-white font-semibold shadow-md shadow-sky-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
              }`}
            >
              {t.navUsed}
            </button>

            {/* Admin only sees Admin CMS here */}
            {currentUser && ['admin', 'dealer_principal', 'used_car_manager'].includes(currentUser.role) ? (
              <button
                onClick={() => handleNavClick('admin')}
                className={`px-3.5 py-2 rounded-xl transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${
                  activeView === 'admin'
                    ? 'bg-amber-600 text-white font-bold shadow-md shadow-amber-600/30'
                    : 'text-amber-400 hover:text-amber-300 hover:bg-slate-900/80 border border-amber-500/30'
                }`}
                title="Dealership Admin CMS (Fleet, Models, Pricing & Valuation)"
              >
                <Settings className="w-3.5 h-3.5 text-amber-400" />
                <span>Admin CMS (Add Brand & Pricing)</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick('test-drive')}
                  className={`px-3.5 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                    activeView === 'test-drive'
                      ? 'bg-sky-600 text-white font-semibold shadow-md shadow-sky-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                  }`}
                >
                  {t.navTestDrive}
                </button>
                <button
                  onClick={() => handleNavClick('service')}
                  className={`px-3.5 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                    activeView === 'service'
                      ? 'bg-sky-600 text-white font-semibold shadow-md shadow-sky-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                  }`}
                >
                  {t.navService}
                </button>
                {currentUser && currentUser.role === 'customer' && (
                  <button
                    onClick={() => handleNavClick('customer-dashboard')}
                    className={`px-3.5 py-2 rounded-xl transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${
                      activeView === 'customer-dashboard'
                        ? 'bg-sky-600 text-white font-semibold shadow-md shadow-sky-600/30'
                        : 'text-sky-300 hover:text-white hover:bg-slate-900/80 border border-sky-500/30'
                    }`}
                  >
                    <User className="w-3.5 h-3.5 text-sky-400" />
                    <span>My Account & Bookings</span>
                  </button>
                )}
              </>
            )}
          </nav>

          {/* Right Actions: Customer Login / Profile & Test Drive CTA */}
          <div className="flex items-center space-x-2.5">
            {currentUser ? (
              <div className="flex items-center space-x-2 bg-slate-900 border border-slate-700/80 px-3 py-1.5 rounded-xl text-xs">
                <User className="w-3.5 h-3.5 text-sky-400" />
                <span className="font-bold text-white max-w-[120px] truncate">{currentUser.name}</span>
                <button
                  onClick={onSignOut}
                  className="flex items-center space-x-1 text-[11px] text-slate-400 hover:text-red-400 ml-1.5 pl-1.5 border-l border-slate-700 cursor-pointer transition"
                  title="Sign Out"
                >
                  <LogOut className="w-3 h-3" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => onOpenAuthModal('login')}
                className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-700 hover:border-sky-500 text-sky-400 hover:text-white px-3 py-2 rounded-xl text-xs font-bold transition duration-200 cursor-pointer shadow-xs"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In / Register</span>
              </button>
            )}

            <button
              onClick={() => {
                if (onOpenTestDriveModal) {
                  onOpenTestDriveModal('model-h');
                } else {
                  handleNavClick('test-drive');
                }
              }}
              className="hidden sm:flex relative overflow-hidden group bg-gradient-to-r from-sky-600 via-sky-500 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold px-3.5 py-2 rounded-xl shadow-lg shadow-sky-600/30 transition-all duration-300 transform hover:scale-103 cursor-pointer items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Book Test Drive</span>
            </button>
          </div>
        </div>

        {/* Mobile secondary tab strip */}
        <div className="flex lg:hidden overflow-x-auto py-2.5 space-x-2 border-t border-slate-800/80 text-xs no-scrollbar">
          <button
            onClick={() => handleNavClick('showroom')}
            className={`px-3 py-1.5 whitespace-nowrap rounded-lg transition cursor-pointer ${activeView === 'showroom' ? 'bg-sky-600 text-white font-semibold' : 'text-slate-300'}`}
          >
            {t.navShowroom}
          </button>
          <button
            onClick={() => handleNavClick('used')}
            className={`px-3 py-1.5 whitespace-nowrap rounded-lg transition cursor-pointer ${activeView === 'used' ? 'bg-sky-600 text-white font-semibold' : 'text-slate-300'}`}
          >
            {t.navUsed}
          </button>

          {currentUser && ['admin', 'dealer_principal', 'used_car_manager'].includes(currentUser.role) ? (
            <button
              onClick={() => handleNavClick('admin')}
              className={`px-3 py-1.5 whitespace-nowrap rounded-lg transition cursor-pointer flex items-center space-x-1 ${
                activeView === 'admin' ? 'bg-amber-600 text-white font-semibold' : 'text-amber-400 border border-amber-500/30'
              }`}
            >
              <Settings className="w-3 h-3 text-amber-400" />
              <span>Admin CMS</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => handleNavClick('test-drive')}
                className={`px-3 py-1.5 whitespace-nowrap rounded-lg transition cursor-pointer ${activeView === 'test-drive' ? 'bg-sky-600 text-white font-semibold' : 'text-slate-300'}`}
              >
                {t.navTestDrive}
              </button>
              <button
                onClick={() => handleNavClick('service')}
                className={`px-3 py-1.5 whitespace-nowrap rounded-lg transition cursor-pointer ${activeView === 'service' ? 'bg-sky-600 text-white font-semibold' : 'text-slate-300'}`}
              >
                {t.navService}
              </button>
              {currentUser && currentUser.role === 'customer' && (
                <button
                  onClick={() => handleNavClick('customer-dashboard')}
                  className={`px-3 py-1.5 whitespace-nowrap rounded-lg transition cursor-pointer flex items-center space-x-1 ${
                    activeView === 'customer-dashboard' ? 'bg-sky-600 text-white font-semibold' : 'text-sky-300 border border-sky-500/30'
                  }`}
                >
                  <User className="w-3 h-3 text-sky-400" />
                  <span>My Account</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

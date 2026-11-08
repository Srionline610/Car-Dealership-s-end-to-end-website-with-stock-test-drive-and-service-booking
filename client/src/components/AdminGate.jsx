// client/src/components/AdminGate.jsx
import React, { useState } from 'react';
import { Lock, ShieldAlert, ArrowLeft, ArrowRight, UserCheck, AlertCircle } from 'lucide-react';

export default function AdminGate({
  currentUser,
  onAdminLoginSuccess,
  onBackToShowroom,
  onOpenCustomerDashboard
}) {
  const [email, setEmail] = useState('admin@companya.com');
  const [password, setPassword] = useState('Admin@2026');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleStaffLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password })
      });

      const json = await res.json();
      if (res.ok && json.success) {
        if (['admin', 'dealer_principal', 'used_car_manager', 'lead_supervisor'].includes(json.user?.role)) {
          onAdminLoginSuccess(json.user);
        } else {
          setErrorMsg('The entered account does not have Dealership Administrative privileges.');
        }
      } else {
        setErrorMsg(json.message || 'Staff authentication failed. Please check credentials.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error connecting to staff authentication server.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoAdmin = () => {
    const demoAdmin = {
      id: 'EMP-07',
      name: 'Siddharth Malhotra',
      email: 'admin@companya.com',
      role: 'admin',
      roleLabel: 'Dealership Administrator',
      badgeColor: 'bg-amber-500/20 text-amber-300'
    };
    onAdminLoginSuccess(demoAdmin);
  };

  return (
    <div className="py-16 bg-slate-900 min-h-screen text-slate-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header Icon */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto shadow-lg">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">Dealership Staff & Admin Access</h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            This internal console is restricted to Company A dealership staff. Public customers can access test drives and bookings from their personal account.
          </p>
        </div>

        {/* Notice for Customer */}
        {currentUser?.role === 'customer' && (
          <div className="bg-amber-500/10 border border-amber-500/30 text-amber-300 p-4 rounded-2xl text-xs space-y-2">
            <div className="flex items-center space-x-2 font-bold">
              <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
              <span>Signed In As Customer: {currentUser.name}</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Your customer account cannot edit vehicle prices, add fleet brands, or evaluate used-car comps. Please return to your Customer Dashboard or sign in with Staff credentials below.
            </p>
            <div className="pt-1 flex gap-2">
              <button
                onClick={onOpenCustomerDashboard}
                className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold px-3 py-1.5 rounded-lg text-[11px] transition cursor-pointer"
              >
                Go to My Customer Account
              </button>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-2xl text-xs flex items-center space-x-2 animate-scale-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleStaffLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
              Staff Email Address:
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. admin@companya.com"
              className="w-full p-3 rounded-xl border border-slate-300 bg-white text-black font-bold shadow-xs"
              style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
              Staff Password:
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter staff password"
              className="w-full p-3 rounded-xl border border-slate-300 bg-white text-black font-bold shadow-xs"
              style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-black py-3 rounded-xl text-xs sm:text-sm shadow-xl shadow-amber-500/20 transition cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating Staff...' : 'Sign In as Dealership Administrator'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Bypass for Testing */}
        <div className="pt-2 border-t border-slate-800 text-center space-y-2.5">
          <span className="text-[11px] text-slate-500 block">Fast 1-Click Administrator Testing:</span>
          <button
            type="button"
            onClick={handleQuickDemoAdmin}
            className="w-full bg-slate-900 hover:bg-slate-850 border border-slate-700 text-slate-200 text-xs font-bold py-2.5 rounded-xl transition cursor-pointer flex items-center justify-center space-x-2"
          >
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>1-Click Dealership Admin (Siddharth Malhotra)</span>
          </button>
        </div>

        {/* Back Link */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onBackToShowroom}
            className="text-xs text-sky-400 hover:text-sky-300 font-semibold inline-flex items-center space-x-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Car Showroom</span>
          </button>
        </div>

      </div>
    </div>
  );
}

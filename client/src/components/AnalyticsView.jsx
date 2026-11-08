// client/src/components/AnalyticsView.jsx
import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, ShieldAlert, Award, Clock, IndianRupee, Users, ArrowUpRight, Lock, CheckCircle2, UserCheck, RefreshCw } from 'lucide-react';
import { availableUsers } from './RoleSwitcher';

export const defaultAnalyticsData = {
  kpis: {
    slaComplianceRate: 88,
    slaTargetPct: 90,
    monthlyTestDrives: 152,
    monthlyTestDriveTarget: 400,
    monthlyServiceBookings: 216,
    serviceCallAbandonmentRate: '3.8% (Target < 5%)'
  },
  businessImpactRecovery: {
    annualPotentialRecovery: '₹2.11 Crore',
    salesContributionSavedAnnual: '₹1.62 Crore',
    serviceContributionSavedAnnual: '₹48.6 Lakh',
    leadsProtectedThisMonth: 1350
  },
  leadSources: [
    { source: 'Website On-Road Quote', count: 48 },
    { source: 'Website Test Drive', count: 32 },
    { source: 'CarWale CSV Import', count: 24 },
    { source: 'CarDekho CSV Import', count: 18 },
    { source: 'Social Ads / Walk-in', count: 12 }
  ]
};

export default function AnalyticsView({ currentUser = { id: 'EMP-08', name: 'Anand Agarwal', role: 'dealer_principal' }, onSelectUser }) {
  const [analytics, setAnalytics] = useState(defaultAnalyticsData);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/analytics', {
          headers: { 'x-user-id': currentUser?.id || 'EMP-08' }
        });
        const json = await res.json();
        if (isMounted && json && json.success && json.data) {
          setAnalytics(json.data);
        }
      } catch (err) {
        console.warn('Using client-side fallback analytics data:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchAnalytics();
    return () => { isMounted = false; };
  }, [currentUser?.id, refreshKey]);

  const kpis = analytics?.kpis || defaultAnalyticsData.kpis;
  const businessImpactRecovery = analytics?.businessImpactRecovery || defaultAnalyticsData.businessImpactRecovery;
  const leadSources = analytics?.leadSources || defaultAnalyticsData.leadSources;

  const isExecutive = ['dealer_principal', 'admin', 'lead_supervisor'].includes(currentUser?.role);

  return (
    <div className="py-8 bg-slate-900 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Executive Identity / Persona Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-xs text-slate-300">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Active Persona: <strong className="text-white">{currentUser?.name || 'Anand Agarwal'}</strong> ({currentUser?.roleLabel || 'Dealer Principal'})</span>
          </div>

          <div className="flex items-center space-x-2">
            {!isExecutive && onSelectUser && (
              <button
                onClick={() => {
                  const dpUser = availableUsers.find(u => u.role === 'dealer_principal') || availableUsers[7];
                  onSelectUser(dpUser);
                }}
                className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-3 py-1.5 rounded-xl transition cursor-pointer text-xs flex items-center space-x-1.5 shadow-sm"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Switch to Anand Agarwal (Dealer Principal)</span>
              </button>
            )}

            <button
              onClick={() => setRefreshKey(k => k + 1)}
              className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-xl border border-slate-700 transition cursor-pointer flex items-center space-x-1"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-sky-400' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="bg-slate-950/90 text-white rounded-3xl p-6 shadow-2xl border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold tracking-wide mb-2">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>EXECUTIVE RECOVERY DASHBOARD</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black">Dealership Performance & ₹2.11 Cr Recovery</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Operational metrics for Company A, Lucknow tracking lead turnaround times, test-drive conversions, and service retention.
              </p>
            </div>

            <div className="bg-emerald-950/80 border border-emerald-800/80 p-4 rounded-2xl text-right shadow-inner">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block tracking-wider">Annual Potential Recovery</span>
              <span className="text-3xl font-black text-emerald-300">{businessImpactRecovery.annualPotentialRecovery}</span>
              <p className="text-[10px] text-emerald-400/80 mt-0.5">Based on client conversion gap assumptions</p>
            </div>
          </div>
        </div>

        {/* 4 Core Success Measures Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: 5-Minute Lead SLA */}
          <div className="bg-slate-950/80 p-5 rounded-3xl border border-slate-800 shadow-md">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase">5-Min First Contact</span>
              <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-black text-white">{kpis.slaComplianceRate}%</span>
              <span className="text-xs text-slate-400 font-semibold">Target: {kpis.slaTargetPct}%</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2 mt-3 overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, kpis.slaComplianceRate)}%` }}
              ></div>
            </div>
            <span className="text-[11px] text-slate-400 mt-2 block">
              Human first contact within 300 seconds
            </span>
          </div>

          {/* Card 2: Test-Drive Volume */}
          <div className="bg-slate-950/80 p-5 rounded-3xl border border-slate-800 shadow-md">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Online Test Drives</span>
              <div className="p-2 bg-sky-500/20 text-sky-400 rounded-xl border border-sky-500/30">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-black text-white">{kpis.monthlyTestDrives}</span>
              <span className="text-xs text-slate-400 font-semibold">Target: {kpis.monthlyTestDriveTarget} / mo</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2 mt-3 overflow-hidden">
              <div
                className="bg-sky-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (kpis.monthlyTestDrives / (kpis.monthlyTestDriveTarget || 400)) * 100)}%` }}
              ></div>
            </div>
            <span className="text-[11px] text-slate-400 mt-2 block">
              Atomic demo bookings across 3 showrooms
            </span>
          </div>

          {/* Card 3: Service Bookings */}
          <div className="bg-slate-950/80 p-5 rounded-3xl border border-slate-800 shadow-md">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Online Service Bookings</span>
              <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
                <BarChart3 className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-black text-white">{kpis.monthlyServiceBookings}</span>
              <span className="text-xs text-slate-400 font-semibold">MTD</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold mt-3 block">
              Unanswered Call Loss: {kpis.serviceCallAbandonmentRate}
            </span>
            <span className="text-[11px] text-slate-500 block">
              Target &lt; 5% abandonment
            </span>
          </div>

          {/* Card 4: Vehicle Sales Saved */}
          <div className="bg-slate-950/80 p-5 rounded-3xl border border-slate-800 shadow-md">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Leads Protected</span>
              <div className="p-2 bg-purple-500/20 text-purple-400 rounded-xl border border-purple-500/30">
                <IndianRupee className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-black text-white">{businessImpactRecovery.leadsProtectedThisMonth}</span>
              <span className="text-xs text-slate-400 font-semibold">Leads/Mo</span>
            </div>
            <span className="text-[11px] text-purple-300 font-semibold mt-3 block">
              Annual Sales Contribution Saved:
            </span>
            <span className="text-xs font-bold text-white">
              {businessImpactRecovery.salesContributionSavedAnnual}
            </span>
          </div>
        </div>

        {/* Detailed Financial Calculation Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-950/90 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <IndianRupee className="w-4 h-4 text-sky-400" />
              <span>Section 3.1: Missed Online Leads Recovery Model</span>
            </h3>

            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-xs space-y-2 font-mono text-slate-300">
              <div className="flex justify-between">
                <span>Total Online Inflow (Monthly):</span>
                <strong className="text-white">4,500 leads/mo</strong>
              </div>
              <div className="flex justify-between text-red-400">
                <span>Uncontacted within 24h (30%):</span>
                <strong>1,350 leads delayed</strong>
              </div>
              <div className="flex justify-between">
                <span>Conversion Drop:</span>
                <span>6% on-time &rarr; 2% delayed (4% gap)</span>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-1.5 font-bold text-white">
                <span>Potentially Lost Car Sales:</span>
                <span>1,350 × 4% = 54 cars / month</span>
              </div>
              <div className="flex justify-between">
                <span>Assumed Dealer Margin:</span>
                <span>₹25,000 per car</span>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-1.5 text-emerald-400 font-bold text-sm">
                <span>Monthly Contribution Recovery:</span>
                <span>₹13.5 Lakh / month</span>
              </div>
              <div className="flex justify-between font-black text-white text-sm">
                <span>Annualized Sales Impact:</span>
                <span>₹1.62 Crore / year</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/90 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <IndianRupee className="w-4 h-4 text-emerald-400" />
              <span>Section 3.2: Unanswered Service Call Retention Model</span>
            </h3>

            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-xs space-y-2 font-mono text-slate-300">
              <div className="flex justify-between">
                <span>Monthly Service Call Volume:</span>
                <strong className="text-white">3,000 calls/mo</strong>
              </div>
              <div className="flex justify-between text-red-400">
                <span>Unanswered Phone Calls (20%):</span>
                <strong>600 missed calls</strong>
              </div>
              <div className="flex justify-between">
                <span>Customers Lost to Independent Garages (50%):</span>
                <span>300 vehicle owners lost</span>
              </div>
              <div className="flex justify-between">
                <span>Average Workshop RO Ticket:</span>
                <span>₹4,500 @ 30% contribution margin</span>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-1.5 text-emerald-400 font-bold text-sm">
                <span>Monthly Service Contribution Recovery:</span>
                <span>₹4.05 Lakh / month</span>
              </div>
              <div className="flex justify-between font-black text-white text-sm">
                <span>Annualized Workshop Impact:</span>
                <span>₹48.6 Lakh / year</span>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-1.5 text-sky-400 font-black text-base">
                <span>Combined Dealership Value:</span>
                <span>₹2.106 Crore (~₹2.11 Cr/year)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Source Distribution */}
        <div className="bg-slate-950/90 rounded-3xl p-6 border border-slate-800 shadow-xl">
          <h3 className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">
            Lead Ingestion by Source (Current Month)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {leadSources.map((ls, idx) => (
              <div key={idx} className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 font-medium block truncate" title={ls.source}>
                  {ls.source}
                </span>
                <span className="text-2xl font-black text-white mt-1 block">
                  {ls.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// client/src/components/RoleSwitcher.jsx
import React, { useState } from 'react';
import { User, Shield, Briefcase, ChevronDown, Check, UserCheck, Wrench, Settings, Crown, Award, Key } from 'lucide-react';

export const availableUsers = [
  {
    id: "GUEST-01",
    name: "Prospective Car Buyer",
    role: "buyer",
    roleLabel: "Buyer / Public Customer",
    email: "buyer@companya.com",
    username: "buyer",
    password: "Buyer@2026",
    targetView: "showroom",
    dashboardLabel: "Digital Showroom & Price Estimator",
    icon: User,
    badgeColor: "bg-slate-700 text-slate-200",
    description: "Public showroom, transparent on-road pricing, demo test-drive & workshop booking."
  },
  {
    id: "EMP-01",
    name: "Rajesh Sharma",
    role: "sales_consultant",
    roleLabel: "Sales Consultant (Hazratganj)",
    email: "sales.hazratganj@companya.com",
    username: "rajesh.sharma",
    password: "Sales@2026",
    targetView: "inbox",
    dashboardLabel: "Hazratganj Scoped Lead Desk & Direct Communications",
    showroom_id: "SR-01",
    icon: Briefcase,
    badgeColor: "bg-sky-600 text-white",
    description: "Scoped Lead Inbox: Only views assigned leads, records human contact, uses quick-reply templates."
  },
  {
    id: "EMP-02",
    name: "Priya Verma",
    role: "sales_consultant",
    roleLabel: "Sales Consultant (Gomti Nagar)",
    email: "sales.gomti@companya.com",
    username: "priya.verma",
    password: "Sales@2026",
    targetView: "inbox",
    dashboardLabel: "Gomti Nagar Scoped Lead Desk (Model S & EV)",
    showroom_id: "SR-02",
    icon: Briefcase,
    badgeColor: "bg-sky-600 text-white",
    description: "Scoped Lead Inbox: Specializes in Model S & Model E at Gomti Nagar."
  },
  {
    id: "EMP-04",
    name: "Sunita Rao",
    role: "lead_supervisor",
    roleLabel: "Lead Desk Supervisor (All Showrooms)",
    email: "supervisor@companya.com",
    username: "sunita.rao",
    password: "Supervisor@2026",
    targetView: "inbox",
    dashboardLabel: "All-Showrooms 5-Min SLA Watchdog & CSV Ingestion",
    showroom_id: "SR-01",
    icon: UserCheck,
    badgeColor: "bg-amber-600 text-white",
    description: "Monitors 5-min SLA across all 3 showrooms, reassigns overdue leads, imports portal CSV."
  },
  {
    id: "EMP-06",
    name: "Manoj Pandey",
    role: "service_advisor",
    roleLabel: "Service Advisor (Transport Nagar)",
    email: "service@companya.com",
    username: "manoj.pandey",
    password: "Service@2026",
    targetView: "service",
    dashboardLabel: "Transport Nagar 8-Bay Workshop Capacity & Repair Scheduler",
    workshop_id: "WS-01",
    icon: Wrench,
    badgeColor: "bg-emerald-600 text-white",
    description: "Monitors 8 workshop bays, manages scheduled maintenance and running repairs."
  },
  {
    id: "EMP-05",
    name: "Vikram Singh",
    role: "used_car_manager",
    roleLabel: "Used-Car Manager (Faizabad Rd)",
    email: "usedcars@companya.com",
    username: "vikram.singh",
    password: "UsedCars@2026",
    targetView: "admin",
    dashboardLabel: "Faizabad Rd Pre-Owned Yard & Market Valuation Tool",
    showroom_id: "SR-01",
    icon: Award,
    badgeColor: "bg-purple-600 text-white",
    description: "Controls pre-owned inventory, accesses certified Lucknow market comparable valuations."
  },
  {
    id: "EMP-07",
    name: "Siddharth Malhotra",
    role: "admin",
    roleLabel: "Dealership Administrator",
    email: "admin@companya.com",
    username: "siddharth.malhotra",
    password: "Admin@2026",
    targetView: "admin",
    dashboardLabel: "Admin CMS: Fleet Model Manager & Lucknow Pricing Tables",
    showroom_id: "SR-01",
    icon: Settings,
    badgeColor: "bg-red-600 text-white",
    description: "Full system administration: publishes official city pricing tables and stock."
  },
  {
    id: "EMP-08",
    name: "Anand Agarwal",
    role: "dealer_principal",
    roleLabel: "Dealer Principal (Owner / Executive)",
    email: "dealer.principal@companya.com",
    username: "anand.agarwal",
    password: "Lucknow@2026",
    targetView: "analytics",
    dashboardLabel: "Dealer Principal Executive Performance & ₹2.11 Cr Recovery Dashboard",
    showroom_id: "SR-01",
    icon: Crown,
    badgeColor: "bg-amber-500 text-slate-950 font-black",
    description: "Executive oversight, business audit logs, ₹2.11 Cr financial recovery dashboard."
  }
];

export default function RoleSwitcher({ currentUser, onSelectUser, onOpenLoginModal }) {
  const [open, setOpen] = useState(false);
  const CurrentIcon = currentUser.icon || User;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-850 border border-slate-700/80 hover:border-sky-500/50 px-3 py-1.5 rounded-xl text-xs transition duration-200 cursor-pointer shadow-sm"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <div className={`p-1 rounded-md ${currentUser.badgeColor}`}>
          <CurrentIcon className="w-3.5 h-3.5" />
        </div>
        <div className="text-left hidden sm:block">
          <span className="text-[10px] text-slate-400 block leading-none">Role:</span>
          <span className="font-bold text-slate-200 block text-xs truncate max-w-[150px]">
            {currentUser.name}
          </span>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 p-2 overflow-hidden text-xs text-slate-200 animate-scale-in">
            <div className="px-3 py-2 border-b border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  Switch Dealership Role & Persona
                </span>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Select a user to switch roles and open dashboard:
                </p>
              </div>
            </div>

            {/* Quick Link to Credentials Modal */}
            {onOpenLoginModal && (
              <div className="p-2 border-b border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onOpenLoginModal();
                  }}
                  className="w-full bg-gradient-to-r from-sky-600 via-sky-500 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold py-2 px-3 rounded-xl text-xs shadow-md flex items-center justify-center space-x-1.5 transition cursor-pointer"
                >
                  <Key className="w-3.5 h-3.5 text-amber-300" />
                  <span>View All 8 Role Credentials & Login Portal</span>
                </button>
              </div>
            )}

            <div className="max-h-80 overflow-y-auto space-y-1 py-1">
              {availableUsers.map((u) => {
                const IconComponent = u.icon;
                const isSelected = currentUser.id === u.id;

                return (
                  <button
                    key={u.id}
                    onClick={() => {
                      onSelectUser(u, u.targetView);
                      setOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl transition flex items-start space-x-3 cursor-pointer ${
                      isSelected
                        ? 'bg-sky-950/80 border border-sky-500/40 text-white'
                        : 'hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${u.badgeColor}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-white text-xs">{u.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-sky-400 shrink-0 ml-1" />}
                      </div>
                      <span className="text-[11px] text-sky-400 block font-medium">{u.roleLabel}</span>
                      <div className="text-[10px] text-emerald-400 mt-0.5 font-medium truncate">
                        Routes to: {u.dashboardLabel}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                        {u.email} • {u.password}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

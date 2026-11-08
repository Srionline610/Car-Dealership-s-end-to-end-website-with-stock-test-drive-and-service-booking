// client/src/components/CustomerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { User, Calendar, Clock, MapPin, Car, Wrench, ShieldCheck, RefreshCw, LogOut, PlusCircle, CheckCircle2, ChevronRight, Phone, Mail } from 'lucide-react';

export default function CustomerDashboard({
  currentUser,
  onSignOut,
  onOpenTestDrive,
  onOpenService,
  onOpenTradeIn,
  onBackToShowroom
}) {
  const [activity, setActivity] = useState({ testDrives: [], serviceBookings: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        const query = new URLSearchParams();
        if (currentUser?.phone) query.append('phone', currentUser.phone);
        if (currentUser?.email) query.append('email', currentUser.email);

        const res = await fetch(`/api/customer/activity?${query.toString()}`);
        const json = await res.json();
        if (json.success) {
          setActivity(json.data);
        }
      } catch (err) {
        console.error('Failed to load customer activity:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [currentUser]);

  return (
    <div className="py-8 bg-slate-900 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header Card */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-600 via-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-600/30 shrink-0">
              <User className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-400/30 text-xs font-bold tracking-wide mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CUSTOMER ACCOUNT PORTAL</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">{currentUser?.name || 'Customer Profile'}</h2>
              <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-400">
                <span className="flex items-center space-x-1">
                  <Mail className="w-3.5 h-3.5 text-sky-400" />
                  <span>{currentUser?.email || 'customer@gmail.com'}</span>
                </span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center space-x-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{currentUser?.phone || '+91 98390 12345'}</span>
                </span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{currentUser?.city || 'Lucknow, UP'}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToShowroom}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700 text-xs font-bold text-slate-200 transition cursor-pointer"
            >
              ← Back to Showroom
            </button>
            <button
              onClick={onSignOut}
              className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs font-bold text-red-400 flex items-center space-x-1.5 transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Quick Customer Action Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => onOpenTestDrive && onOpenTestDrive('model-h')}
            className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 hover:border-sky-500/50 text-left transition duration-200 group cursor-pointer shadow-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3 group-hover:scale-110 transition">
              <Car className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm group-hover:text-sky-300 transition">Schedule Test Drive</h4>
            <p className="text-xs text-slate-400 mt-1">Book an exclusive slot across Hazratganj, Gomti Nagar or Kanpur Road.</p>
          </button>

          <button
            onClick={() => onOpenService && onOpenService()}
            className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 hover:border-emerald-500/50 text-left transition duration-200 group cursor-pointer shadow-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition">
              <Wrench className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm group-hover:text-emerald-300 transition">Book Service Bay</h4>
            <p className="text-xs text-slate-400 mt-1">Periodic maintenance, 60-min express bay, or running repairs in Lucknow.</p>
          </button>

          <button
            onClick={() => onOpenTradeIn && onOpenTradeIn()}
            className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 hover:border-amber-500/50 text-left transition duration-200 group cursor-pointer shadow-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm group-hover:text-amber-300 transition">Car Exchange & Trade-In</h4>
            <p className="text-xs text-slate-400 mt-1">Free doorstep or yard appraisal with instant trade-in bonus towards a new car.</p>
          </button>
        </div>

        {/* Section 1: My Active Test-Drive Bookings */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                <Car className="w-5 h-5 text-sky-400" />
                <span>My Test-Drive Appointments</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Your confirmed vehicle test-drive reservations with designated sales consultants.</p>
            </div>
            <button
              onClick={() => onOpenTestDrive && onOpenTestDrive('model-h')}
              className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center space-x-1 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Book New Slot</span>
            </button>
          </div>

          {loading ? (
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 text-center text-xs text-slate-400">
              Loading your bookings...
            </div>
          ) : activity.testDrives.length === 0 ? (
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 text-center space-y-3">
              <Car className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                You don't have any active test-drive bookings yet. Experience the Brand X fleet in Hazratganj or Gomti Nagar.
              </p>
              <button
                onClick={() => onOpenTestDrive && onOpenTestDrive('model-h')}
                className="bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer"
              >
                Schedule First Test Drive
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activity.testDrives.map((td) => (
                <div key={td.bookingId} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-md space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase block">Ref: {td.bookingId}</span>
                      <h4 className="text-base font-bold text-white">{td.modelName || 'Brand X Model H'}</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Confirmed</span>
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-300 border-t border-slate-900 pt-3">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span>{td.showroomName || td.showroomId}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Date: <strong className="text-white">{td.date}</strong></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Slot Time: <strong className="text-white">{td.slotTime}</strong></span>
                    </div>
                  </div>

                  <div className="bg-slate-900/60 p-2.5 rounded-xl text-[11px] text-slate-400">
                    A dedicated Relationship Consultant will welcome you at the showroom with the prepared vehicle.
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 2: My Workshop Service Appointments */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                <Wrench className="w-5 h-5 text-emerald-400" />
                <span>My Workshop Service Appointments</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Authorised service bay bookings across Transport Nagar (8 Bays) & Chinhat East (5 Bays).</p>
            </div>
            <button
              onClick={() => onOpenService && onOpenService()}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Book Service</span>
            </button>
          </div>

          {loading ? (
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 text-center text-xs text-slate-400">
              Loading service records...
            </div>
          ) : activity.serviceBookings.length === 0 ? (
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 text-center space-y-3">
              <Wrench className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No active service bookings found for this vehicle. Ensure genuine Brand X parts and certified technicians.
              </p>
              <button
                onClick={() => onOpenService && onOpenService()}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer"
              >
                Book First Service Bay
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activity.serviceBookings.map((sb) => (
                <div key={sb.bookingId} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-md space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase block">Ref: {sb.bookingId}</span>
                      <h4 className="text-base font-bold text-white">{sb.vehicleReg} • {sb.serviceType || 'Periodic Service'}</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Bay Reserved</span>
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-300 border-t border-slate-900 pt-3">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{sb.workshopName || sb.workshopId}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Date: <strong className="text-white">{sb.date}</strong></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span>Bay Slot: <strong className="text-white">{sb.slotTime}</strong></span>
                    </div>
                  </div>

                  <div className="bg-slate-900/60 p-2.5 rounded-xl text-[11px] text-slate-400">
                    Express 60-min intake guaranteed with real-time technician SMS updates.
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

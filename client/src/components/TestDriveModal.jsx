// client/src/components/TestDriveModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, Car, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export default function TestDriveModal({ isOpen, onClose, preselectedModelId, models, showrooms, t, onBookingSuccess, currentUser }) {
  const [modelId, setModelId] = useState(preselectedModelId || 'model-h');
  const [showroomId, setShowroomId] = useState('SR-01');
  const [date, setDate] = useState(() => {
    // Tomorrow by default
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotData, setSlotData] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  
  // Customer info
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [dpdpConsent, setDpdpConsent] = useState(true);
  const [marketingOptIn, setMarketingOptIn] = useState(false);

  useEffect(() => {
    if (currentUser && isOpen) {
      if (currentUser.name && !customerName) setCustomerName(currentUser.name);
      if (currentUser.phone && !customerPhone) setCustomerPhone(currentUser.phone);
      if (currentUser.email && !customerEmail) setCustomerEmail(currentUser.email);
    }
  }, [currentUser, isOpen]);
  
  // Submitting state & message
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Fetch slot availability whenever showroom, model, or date changes
  const fetchSlots = async (mId = modelId, sId = showroomId, d = date) => {
    if (!mId || !sId || !d) return;
    try {
      setSlotsLoading(true);
      setErrorMsg('');
      setSelectedSlot('');
      const res = await fetch(`/api/test-drives/slots?modelId=${mId}&showroomId=${sId}&date=${d}`);
      const json = await res.json();
      if (json.success) {
        setSlotData(json);
        if (json.slots && json.slots.length > 0) {
          const firstAvailable = json.slots.find(s => s.isAvailable);
          if (firstAvailable) {
            setSelectedSlot(firstAvailable.time);
          }
        }
      }
    } catch (err) {
      console.error('Failed to fetch test-drive slots:', err);
    } finally {
      setSlotsLoading(false);
    }
  };

  // Synchronize modelId ONLY when modal opens or external preselectedModelId prop changes
  useEffect(() => {
    if (isOpen && preselectedModelId) {
      setModelId(preselectedModelId);
    }
  }, [isOpen, preselectedModelId]);

  // Fetch slots whenever modelId, showroomId, or date changes
  useEffect(() => {
    if (isOpen && modelId && showroomId && date) {
      fetchSlots(modelId, showroomId, date);
    }
  }, [isOpen, modelId, showroomId, date]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlot) {
      setErrorMsg('Please select an available test-drive time slot.');
      return;
    }
    if (!customerName || !customerPhone) {
      setErrorMsg('Name and 10-digit mobile number are required.');
      return;
    }
    if (!dpdpConsent) {
      setErrorMsg('DPDP Act consent is mandatory to process this test-drive reservation.');
      return;
    }

    try {
      setSubmitting(true);
      setErrorMsg('');
      const payload = {
        demoId: slotData?.demoVehicle?.demoId,
        showroomId,
        date,
        slotTime: selectedSlot,
        customerName,
        customerPhone,
        customerEmail,
        consentDPDP: {
          accepted: true,
          marketingOptIn,
          noticeVersion: 'v1.2-dpdp2023'
        }
      };

      const res = await fetch('/api/test-drives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();

      if (res.status === 409) {
        // Concurrency conflict
        setErrorMsg('Conflict: This demo car slot was just booked by another user. Please choose an alternate slot.');
        fetchSlots();
        return;
      }

      if (json.success) {
        setConfirmedBooking(json.booking);
        if (onBookingSuccess) onBookingSuccess(json.leadId);
      } else {
        setErrorMsg(json.message || 'Failed to complete reservation.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setConfirmedBooking(null);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="test-drive-title"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2.5">
            <Car className="w-5 h-5 text-sky-400" />
            <div>
              <h3 id="test-drive-title" className="text-base sm:text-lg font-bold">
                Book a Guaranteed Demo Test Drive
              </h3>
              <p className="text-xs text-slate-400">
                Atomic slot reservation • Doorstep or Showroom • Lucknow
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedBooking ? (
          /* Confirmation Success Screen */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-700">Booking Confirmed</span>
              <h4 className="text-2xl font-black text-slate-900">Slot Locked & Reserved</h4>
              <p className="text-xs text-slate-500">Booking ID: <span className="font-mono font-bold text-slate-800">{confirmedBooking.bookingId}</span></p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-left space-y-2 max-w-md mx-auto">
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Demo Vehicle:</span>
                <span className="font-bold text-slate-800">{slotData?.demoVehicle?.modelName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Showroom Location:</span>
                <span className="font-bold text-slate-800">
                  {showrooms.find(s => s.id === confirmedBooking.showroomId)?.name || 'Lucknow Showroom'}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Date & Slot:</span>
                <span className="font-bold text-emerald-700">{confirmedBooking.date} • {confirmedBooking.slotTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Customer:</span>
                <span className="font-bold text-slate-800">{confirmedBooking.customerName} ({confirmedBooking.customerPhone})</span>
              </div>
            </div>

            <div className="bg-sky-50 border border-sky-200 p-3 rounded-xl text-xs text-sky-800 max-w-md mx-auto">
              <strong>5-Minute Response Pledge:</strong> A Company A Relationship Consultant has been notified. You will receive a personal call within 5 minutes to confirm license verification and exact venue.
            </div>

            <button
              onClick={handleResetAndClose}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition cursor-pointer"
            >
              Done & Return to Showroom
            </button>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Step 1: Model Selection with Visual Tabs & Dropdown */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                1. Select Brand X Model:
              </label>

              {/* High-Visibility Interactive Model Selector Tabs */}
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { id: 'model-h', label: 'Model H', desc: 'Hatchback' },
                  { id: 'model-c', label: 'Model C', desc: 'SUV' },
                  { id: 'model-s', label: 'Model S', desc: 'Sedan' },
                  { id: 'model-e', label: 'Model E', desc: 'EV' }
                ].map(m => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setModelId(m.id)}
                    className={`p-2 rounded-xl text-center border-2 transition-all cursor-pointer ${
                      modelId === m.id
                        ? 'bg-sky-600 text-white border-sky-600 shadow-md font-black ring-2 ring-sky-300'
                        : 'bg-white text-slate-800 border-slate-300 hover:border-sky-400 hover:bg-sky-50 font-bold'
                    }`}
                  >
                    <span className="block text-xs font-bold">{m.label}</span>
                    <span className={`block text-[10px] ${modelId === m.id ? 'text-sky-100 font-semibold' : 'text-slate-500 font-medium'}`}>{m.desc}</span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label htmlFor="td-model-select" className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Confirmed Model:
                  </label>
                  <select
                    id="td-model-select"
                    value={modelId}
                    onChange={(e) => setModelId(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border-2 border-slate-400 focus:border-sky-600 bg-white text-black font-bold cursor-pointer shadow-xs"
                    style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                  >
                    {(models && models.length > 0 ? models : [
                      { id: 'model-h', name: 'Brand X Model H (Premium Hatchback)' },
                      { id: 'model-c', name: 'Brand X Model C (Compact Luxury SUV)' },
                      { id: 'model-s', name: 'Brand X Model S (Executive Sedan)' },
                      { id: 'model-e', name: 'Brand X Model E (Electric AWD)' }
                    ]).map(m => (
                      <option key={m.id} value={m.id} style={{ color: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="td-showroom-select" className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    2. Lucknow Showroom:
                  </label>
                  <select
                    id="td-showroom-select"
                    value={showroomId}
                    onChange={(e) => setShowroomId(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border-2 border-slate-400 focus:border-sky-600 bg-white text-black font-bold cursor-pointer shadow-xs"
                    style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                  >
                    {showrooms.map(s => (
                      <option key={s.id} value={s.id} style={{ color: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Date & Atomic Slot Selection */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  3. Select Test-Drive Date:
                </label>
                {slotData?.demoVehicle && (
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Demo: {slotData.demoVehicle.modelName}</span>
                  </span>
                )}
              </div>
              <input
                type="date"
                value={date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-sm p-3 rounded-xl border-2 border-slate-400 focus:border-sky-600 bg-white text-black font-bold cursor-pointer mb-3 shadow-xs"
                style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
              />

              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                4. Select 1-Hour Time Slot (Atomic Concurrency Protected):
              </label>

              {slotsLoading ? (
                <div className="py-4 text-center text-xs text-slate-500">Checking slot availability in real-time...</div>
              ) : slotData && slotData.slots ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {slotData.slots.map(slot => (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.isAvailable}
                      onClick={() => setSelectedSlot(slot.time)}
                      className={`p-2.5 text-xs rounded-xl border font-semibold text-center transition ${
                        !slot.isAvailable
                          ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through'
                          : selectedSlot === slot.time
                          ? 'bg-sky-600 text-white border-sky-600 shadow-md ring-2 ring-sky-400'
                          : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-300 cursor-pointer'
                      }`}
                    >
                      {slot.time}
                      <span className="block text-[10px] font-normal opacity-80">
                        {slot.isAvailable ? 'Available' : 'Reserved'}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-amber-700 bg-amber-50 p-2 rounded">
                  Checking demo fleet availability...
                </p>
              )}
            </div>

            {/* Step 3: Customer Details & DPDP Consent */}
            <div className="pt-3 border-t border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                5. Contact & DPDP Compliance:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="td-cust-name" className="block text-xs font-bold text-slate-900 mb-1">
                    Full Name *
                  </label>
                  <input
                    id="td-cust-name"
                    type="text"
                    required
                    placeholder="e.g. Alok Srivastava"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border-2 border-slate-400 focus:border-sky-600 bg-white text-black font-bold placeholder:text-black placeholder:opacity-80"
                    style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                  />
                </div>

                <div>
                  <label htmlFor="td-cust-phone" className="block text-xs font-bold text-slate-900 mb-1">
                    Mobile Number (for 5-min call) *
                  </label>
                  <input
                    id="td-cust-phone"
                    type="tel"
                    required
                    placeholder="e.g. 98390 12345"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border-2 border-slate-400 focus:border-sky-600 bg-white text-black font-bold placeholder:text-black placeholder:opacity-80"
                    style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                  />
                </div>
              </div>

              {/* DPDP Consent Checkbox */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                <label className="flex items-start space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dpdpConsent}
                    onChange={(e) => setDpdpConsent(e.target.checked)}
                    className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500 mt-0.5 cursor-pointer shrink-0"
                  />
                  <span className="text-[11px] text-slate-700 leading-tight font-medium">
                    {t.dpdpNotice}
                  </span>
                </label>

                <label className="flex items-start space-x-2.5 cursor-pointer pt-1 border-t border-slate-200">
                  <input
                    type="checkbox"
                    checked={marketingOptIn}
                    onChange={(e) => setMarketingOptIn(e.target.checked)}
                    className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500 mt-0.5 cursor-pointer shrink-0"
                  />
                  <span className="text-[11px] text-slate-600 leading-tight">
                    {t.dpdpOptIn}
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex justify-between items-center">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting}
                className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white transition cursor-pointer shadow-md ${
                  submitting
                    ? 'bg-slate-400 cursor-not-allowed'
                    : 'bg-sky-600 hover:bg-sky-500 hover:shadow-sky-600/30'
                }`}
              >
                {submitting ? 'Locking Slot...' : 'Confirm Test-Drive Slot'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

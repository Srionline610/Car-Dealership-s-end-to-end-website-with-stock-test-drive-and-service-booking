// client/src/components/ServiceBookingModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Wrench, Calendar, Clock, MapPin, CheckCircle2, AlertCircle, ShieldAlert } from 'lucide-react';

export default function ServiceBookingModal({ isOpen, onClose, workshops, t, currentUser }) {
  const [workshopId, setWorkshopId] = useState('WS-01');
  const [serviceType, setServiceType] = useState('Periodic Maintenance (Scheduled)');
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState('');
  const [availability, setAvailability] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Customer & Vehicle fields
  const [vehicleReg, setVehicleReg] = useState('');
  const [modelName, setModelName] = useState('Brand X Model C');
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [dpdpConsent, setDpdpConsent] = useState(true);

  useEffect(() => {
    if (currentUser && isOpen) {
      if (currentUser.name && !customerName) setCustomerName(currentUser.name);
      if (currentUser.phone && !customerPhone) setCustomerPhone(currentUser.phone);
      if (currentUser.email && !customerEmail) setCustomerEmail(currentUser.email);
    }
  }, [currentUser, isOpen]);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const fetchCapacity = async () => {
    try {
      setLoadingSlots(true);
      setErrorMsg('');
      setSelectedSlot('');
      const res = await fetch(`/api/service-bookings/availability?workshopId=${workshopId}&date=${date}&serviceType=${encodeURIComponent(serviceType)}`);
      const json = await res.json();
      if (json.success) {
        setAvailability(json);
        if (json.slots && json.slots.length > 0) {
          const firstAvailable = json.slots.find(s => s.isAvailable);
          if (firstAvailable) {
            setSelectedSlot(firstAvailable.time);
          }
        }
      }
    } catch (err) {
      console.error('Error fetching workshop capacity:', err);
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCapacity();
    }
  }, [isOpen, workshopId, date, serviceType]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlot) {
      setErrorMsg('Please choose an available workshop bay time slot.');
      return;
    }
    if (!vehicleReg || !customerName || !customerPhone) {
      setErrorMsg('Vehicle registration, customer name, and mobile number are required.');
      return;
    }
    if (!dpdpConsent) {
      setErrorMsg('DPDP Act consent is mandatory.');
      return;
    }

    try {
      setSubmitting(true);
      setErrorMsg('');
      const payload = {
        workshopId,
        date,
        slotTime: selectedSlot,
        vehicleReg,
        modelName,
        serviceType,
        customerName,
        customerPhone,
        customerEmail,
        consentDPDP: {
          accepted: true,
          noticeVersion: 'v1.2-dpdp2023'
        }
      };

      const res = await fetch('/api/service-bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();

      if (res.status === 409) {
        setErrorMsg('Workshop capacity full for this slot. Please select another slot.');
        fetchCapacity();
        return;
      }

      if (json.success) {
        setConfirmedBooking(json.booking);
      } else {
        setErrorMsg(json.message || 'Service booking failed.');
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
        aria-labelledby="service-modal-title"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2.5">
            <Wrench className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 id="service-modal-title" className="text-base sm:text-lg font-bold">
                Book Workshop Service Appointment
              </h3>
              <p className="text-xs text-slate-400">
                Direct Bay Capacity Allocation • Lucknow Workshops
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
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-700">Appointment Confirmed</span>
              <h4 className="text-2xl font-black text-slate-900">Service Bay Allocated</h4>
              <p className="text-xs text-slate-500">Service Reference: <span className="font-mono font-bold text-slate-800">{confirmedBooking.bookingId}</span></p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-left space-y-2 max-w-md mx-auto">
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Workshop:</span>
                <span className="font-bold text-slate-800">
                  {workshops.find(w => w.id === confirmedBooking.workshopId)?.name}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Allocated Bay:</span>
                <span className="font-bold text-emerald-700">Bay #{confirmedBooking.bayNumber} (Reserved)</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Date & Slot:</span>
                <span className="font-bold text-slate-800">{confirmedBooking.date} • {confirmedBooking.slotTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Vehicle / Reg:</span>
                <span className="font-bold text-slate-800">{confirmedBooking.vehicleReg} ({confirmedBooking.serviceType})</span>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-900 max-w-md mx-auto">
              Zero wait-time check-in guaranteed upon arrival. Service Advisor Manoj Pandey will receive your vehicle.
            </div>

            <button
              onClick={handleResetAndClose}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Step 1: Workshop & Service Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                  1. Workshop Location:
                </label>
                <select
                  value={workshopId}
                  onChange={(e) => setWorkshopId(e.target.value)}
                  className="w-full text-sm p-3 rounded-xl border-2 border-slate-400 focus:border-sky-600 bg-white text-black font-bold cursor-pointer shadow-xs"
                  style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                >
                  {workshops.map(w => (
                    <option key={w.id} value={w.id} style={{ color: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}>
                      {w.name} ({w.bays} Bays)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                  2. Service Category:
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full text-sm p-3 rounded-xl border-2 border-slate-400 focus:border-sky-600 bg-white text-black font-bold cursor-pointer shadow-xs"
                  style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                >
                  <option value="Periodic Maintenance (Scheduled)">Periodic Maintenance (Scheduled)</option>
                  <option value="Express Care 60-Minute Service">Express Care 60-Minute Service</option>
                  <option value="Running Repair / Diagnostics">Running Repair / Diagnostics</option>
                  <option value="Body & Paint Insurance Claim">Body & Paint Insurance Claim</option>
                  <option value="Wheel Alignment & Balancing">Wheel Alignment & Balancing</option>
                </select>
              </div>
            </div>

            {/* Step 2: Date & Bay Slots */}
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                3. Choose Date:
              </label>
              <input
                type="date"
                value={date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-sm p-3 rounded-xl border-2 border-slate-400 focus:border-sky-600 bg-white text-black font-bold cursor-pointer mb-3 shadow-xs"
                style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
              />

              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                4. Select Time Window (Live Bay Capacity):
              </label>

              {loadingSlots ? (
                <div className="py-4 text-center text-xs text-slate-500">Evaluating bay occupancy...</div>
              ) : availability && availability.slots ? (
                <div className="grid grid-cols-2 gap-2">
                  {availability.slots.map(slot => (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.isAvailable}
                      onClick={() => setSelectedSlot(slot.time)}
                      className={`p-2.5 text-xs rounded-xl border font-semibold text-left transition ${
                        !slot.isAvailable
                          ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through'
                          : selectedSlot === slot.time
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 cursor-pointer'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{slot.time}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${selectedSlot === slot.time ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600'}`}>
                          {slot.remainingCapacity} of {slot.totalBays} Bays Free
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Step 3: Vehicle & Customer */}
            <div className="pt-3 border-t border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                5. Vehicle & Customer Details:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="srv-reg" className="block text-xs font-bold text-slate-900 mb-1">
                    Vehicle Registration No. *
                  </label>
                  <input
                    id="srv-reg"
                    type="text"
                    required
                    placeholder="e.g. UP 32 DZ 8810"
                    value={vehicleReg}
                    onChange={(e) => setVehicleReg(e.target.value.toUpperCase())}
                    className="w-full text-sm p-3 rounded-xl border-2 border-slate-400 focus:border-sky-600 bg-white text-black font-mono font-bold placeholder:text-black placeholder:opacity-80"
                    style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                  />
                </div>

                <div>
                  <label htmlFor="srv-model" className="block text-xs font-bold text-slate-900 mb-1">
                    Car Model
                  </label>
                  <input
                    id="srv-model"
                    type="text"
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border-2 border-slate-400 focus:border-sky-600 bg-white text-black font-bold placeholder:text-black placeholder:opacity-80"
                    style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                  />
                </div>

                <div>
                  <label htmlFor="srv-name" className="block text-xs font-bold text-slate-900 mb-1">
                    Customer Name *
                  </label>
                  <input
                    id="srv-name"
                    type="text"
                    required
                    placeholder="e.g. Mohd. Rizwan"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border-2 border-slate-400 focus:border-sky-600 bg-white text-black font-bold placeholder:text-black placeholder:opacity-80"
                    style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                  />
                </div>

                <div>
                  <label htmlFor="srv-phone" className="block text-xs font-bold text-slate-900 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    id="srv-phone"
                    type="tel"
                    required
                    placeholder="e.g. 98391 11223"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border-2 border-slate-400 focus:border-sky-600 bg-white text-black font-bold placeholder:text-black placeholder:opacity-80"
                    style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                  />
                </div>
              </div>

              {/* DPDP Consent */}
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
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
              </div>
            </div>

            {/* Action */}
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
                    : 'bg-emerald-600 hover:bg-emerald-500 hover:shadow-emerald-600/30'
                }`}
              >
                {submitting ? 'Allocating Bay...' : 'Confirm Service Appointment'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

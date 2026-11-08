// client/src/components/TradeInModal.jsx
import React, { useState, useEffect } from 'react';
import { X, RefreshCw, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

export default function TradeInModal({ isOpen, onClose, t, currentUser }) {
  const [currentMake, setCurrentMake] = useState('');
  const [currentModel, setCurrentModel] = useState('');
  const [currentYear, setCurrentYear] = useState('2019');
  const [currentKm, setCurrentKm] = useState('45000');
  const [condition, setCondition] = useState('Good (Minor wear, no accidental damage)');
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [targetCar, setTargetCar] = useState('Brand X Model H');
  const [dpdpConsent, setDpdpConsent] = useState(true);

  useEffect(() => {
    if (currentUser && isOpen) {
      if (currentUser.name && !customerName) setCustomerName(currentUser.name);
      if (currentUser.phone && !customerPhone) setCustomerPhone(currentUser.phone);
    }
  }, [currentUser, isOpen]);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentMake || !currentModel || !customerName || !customerPhone) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    if (!dpdpConsent) {
      setErrorMsg('DPDP Act consent is mandatory.');
      return;
    }

    try {
      setSubmitting(true);
      setErrorMsg('');

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          phone: customerPhone,
          source: 'Website Trade-In Request',
          modelInterest: targetCar,
          budget: `Trade-in ${currentYear} ${currentMake} ${currentModel}`,
          preferredLanguage: 'Hindi',
          showroomId: 'SR-01',
          consentDPDP: {
            accepted: true,
            noticeVersion: 'v1.2-dpdp2023'
          }
        })
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(json.message || 'Submission failed.');
      }
    } catch (err) {
      setErrorMsg('Network error.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-5 h-5 text-sky-600" />
            <h3 className="font-bold text-slate-900 text-base">Vehicle Exchange & Trade-In Request</h3>
          </div>
          <button onClick={handleClose} className="text-slate-400 hover:text-slate-700">✕</button>
        </div>

        {submitted ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Exchange Request Registered!</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Our Certified Used-Car Valuation team at Faizabad Road has received your request. A consultant will call within 5 minutes to arrange physical inspection.
            </p>
            <button
              onClick={handleClose}
              className="mt-2 bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-lg"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {errorMsg && (
              <div className="bg-red-50 text-red-700 p-2 rounded border border-red-200">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">Current Car Make *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maruti / Hyundai"
                  value={currentMake}
                  onChange={(e) => setCurrentMake(e.target.value)}
                  className="w-full p-2.5 border-2 border-slate-400 rounded-lg bg-white text-black font-bold placeholder:text-black placeholder:opacity-80 text-sm"
                  style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">Current Model *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Swift Dzire"
                  value={currentModel}
                  onChange={(e) => setCurrentModel(e.target.value)}
                  className="w-full p-2.5 border-2 border-slate-400 rounded-lg bg-white text-black font-bold placeholder:text-black placeholder:opacity-80 text-sm"
                  style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">Year of Reg.</label>
                <input
                  type="number"
                  value={currentYear}
                  onChange={(e) => setCurrentYear(e.target.value)}
                  className="w-full p-2.5 border-2 border-slate-400 rounded-lg bg-white text-black font-bold text-sm"
                  style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">Approx. Kilometres</label>
                <input
                  type="number"
                  value={currentKm}
                  onChange={(e) => setCurrentKm(e.target.value)}
                  className="w-full p-2.5 border-2 border-slate-400 rounded-lg bg-white text-black font-bold text-sm"
                  style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1">Car Condition:</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full p-2.5 border-2 border-slate-400 rounded-lg bg-white text-black font-bold cursor-pointer text-sm"
                style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
              >
                <option value="Excellent (Showroom condition, single hand)">Excellent (Showroom condition, single hand)</option>
                <option value="Good (Minor wear, no accidental damage)">Good (Minor wear, no accidental damage)</option>
                <option value="Average (Scratches/dents, running condition)">Average (Scratches/dents, running condition)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1">Interested Brand X New Car:</label>
              <select
                value={targetCar}
                onChange={(e) => setTargetCar(e.target.value)}
                className="w-full p-2.5 border-2 border-slate-400 rounded-lg bg-white text-black font-bold cursor-pointer text-sm"
                style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
              >
                <option value="Brand X Model H">Brand X Model H</option>
                <option value="Brand X Model C">Brand X Model C</option>
                <option value="Brand X Model S">Brand X Model S</option>
                <option value="Brand X Model E">Brand X Model E (Electric)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-200">
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gaurav Rastogi"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-2.5 border-2 border-slate-400 rounded-lg bg-white text-black font-bold placeholder:text-black placeholder:opacity-80 text-sm"
                  style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">Mobile No. *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 99355 12098"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full p-2.5 border-2 border-slate-400 rounded-lg bg-white text-black font-bold placeholder:text-black placeholder:opacity-80 text-sm"
                  style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                />
              </div>
            </div>

            <label className="flex items-start space-x-2 cursor-pointer bg-slate-50 p-2 rounded border border-slate-200">
              <input
                type="checkbox"
                checked={dpdpConsent}
                onChange={(e) => setDpdpConsent(e.target.checked)}
                className="mt-0.5"
              />
              <span className="text-[11px] text-slate-600">
                {t.dpdpNotice}
              </span>
            </label>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-3 py-1.5 text-slate-600 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-4 py-2 rounded-lg cursor-pointer"
              >
                {submitting ? 'Submitting...' : 'Request Trade-In Evaluation'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

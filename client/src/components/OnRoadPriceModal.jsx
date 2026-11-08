// client/src/components/OnRoadPriceModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Calculator, ShieldCheck, CheckSquare, Square, ChevronRight, IndianRupee, Sparkles } from 'lucide-react';

export const modelVariantsMap = {
  'model-h': {
    name: 'Brand X Model H',
    shortName: 'Model H',
    type: 'Premium Hatchback',
    variants: [
      { id: 'H-ZX-AT', label: 'ZX Automatic (Top End)', exShowroom: 1245000, rto: 124500, ins: 45000 },
      { id: 'H-VX-MT', label: 'VX Manual', exShowroom: 1025000, rto: 102500, ins: 39000 }
    ]
  },
  'model-c': {
    name: 'Brand X Model C',
    shortName: 'Model C',
    type: 'Luxury SUV',
    variants: [
      { id: 'C-ZX-AT', label: 'ZX Automatic (Top End)', exShowroom: 1420000, rto: 142000, ins: 49500 },
      { id: 'C-VX-MT', label: 'VX Manual', exShowroom: 1180000, rto: 118000, ins: 42000 }
    ]
  },
  'model-s': {
    name: 'Brand X Model S',
    shortName: 'Model S',
    type: 'Executive Sedan',
    variants: [
      { id: 'S-ZX-AT', label: 'ZX Automatic (Top End)', exShowroom: 1390000, rto: 139000, ins: 48000 },
      { id: 'S-VX-MT', label: 'VX Manual', exShowroom: 1150000, rto: 115000, ins: 41000 }
    ]
  },
  'model-e': {
    name: 'Brand X Model E (Electric)',
    shortName: 'Model E (EV)',
    type: 'Electric AWD',
    variants: [
      { id: 'E-LR-AWD', label: 'Long Range AWD (0% UP Tax)', exShowroom: 2250000, rto: 0, ins: 68500 },
      { id: 'E-STD-RWD', label: 'Standard RWD', exShowroom: 1890000, rto: 0, ins: 58000 }
    ]
  }
};

export const getModelFromVariant = (vId) => {
  if (!vId || typeof vId !== 'string') return 'model-h';
  const clean = vId.trim();
  if (clean.startsWith('C-')) return 'model-c';
  if (clean.startsWith('S-')) return 'model-s';
  if (clean.startsWith('E-')) return 'model-e';
  return 'model-h';
};

export const createFallbackPriceData = (vId, withWarranty = false, withAcc = false) => {
  const modelId = getModelFromVariant(vId);
  const model = modelVariantsMap[modelId] || modelVariantsMap['model-h'];
  const variant = model.variants.find(v => v.id === vId) || model.variants[0];

  const exShowroom = variant.exShowroom;
  const roadTaxRTO = variant.rto;
  const insuranceComprehensive = variant.ins;
  const mandatoryRegistrationFastag = 2500;
  const warrantyRate = 18500;
  const accessoriesRate = 15000;
  const extWarranty = withWarranty ? warrantyRate : 0;
  const accessories = withAcc ? accessoriesRate : 0;
  const totalOnRoad = exShowroom + roadTaxRTO + insuranceComprehensive + mandatoryRegistrationFastag + extWarranty + accessories;

  return {
    variantId: variant.id,
    city: 'Lucknow',
    validUntil: '2026-12-31',
    status: 'active',
    disclaimer: roadTaxRTO === 0 
      ? '0% Road Tax applied under UP EV Promotion Policy 2022-2027.' 
      : 'Prices effective in Lucknow, UP. Road tax calculated as per UP Motor Vehicle Taxation Act.',
    breakup: {
      exShowroom,
      roadTaxRTO,
      insuranceComprehensive,
      mandatoryRegistrationFastag,
      optionalExtendedWarranty: extWarranty,
      optionalAccessories: accessories,
      extendedWarranty: extWarranty,
      accessories: accessories,
      extendedWarrantyRate: warrantyRate,
      accessoriesRate: accessoriesRate,
      totalOnRoad
    }
  };
};

export default function OnRoadPriceModal({ variantId, isOpen, onClose, onBookTestDrive, t }) {
  const [activeModelId, setActiveModelId] = useState(() => getModelFromVariant(variantId));
  const [activeVariantId, setActiveVariantId] = useState(() => {
    return (typeof variantId === 'string' && variantId.trim()) ? variantId.trim() : 'H-ZX-AT';
  });
  const [includeWarranty, setIncludeWarranty] = useState(false);
  const [includeAccessories, setIncludeAccessories] = useState(false);
  const [tenure, setTenure] = useState(60); // 5 years
  const [downPaymentPct, setDownPaymentPct] = useState(20); // 20%
  const [priceData, setPriceData] = useState(() => createFallbackPriceData(variantId || 'H-ZX-AT', false, false));

  // Sync state whenever external variantId prop updates
  useEffect(() => {
    if (variantId && typeof variantId === 'string') {
      const clean = variantId.trim();
      setActiveVariantId(clean);
      setActiveModelId(getModelFromVariant(clean));
      setPriceData(createFallbackPriceData(clean, includeWarranty, includeAccessories));
    }
  }, [variantId]);

  // Fetch updated calculation from API whenever selection changes
  const fetchPrice = async (vId, withWarranty, withAcc) => {
    const targetVariant = vId || activeVariantId || 'H-ZX-AT';
    try {
      const res = await fetch('/api/prices/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          variantId: targetVariant,
          city: 'Lucknow',
          includeExtendedWarranty: withWarranty,
          includeAccessories: withAcc
        })
      });
      const json = await res.json();
      if (json && json.success && json.data) {
        setPriceData(json.data);
      } else {
        setPriceData(createFallbackPriceData(targetVariant, withWarranty, withAcc));
      }
    } catch (err) {
      console.warn('Using client-side calculated on-road price fallback:', err);
      setPriceData(createFallbackPriceData(targetVariant, withWarranty, withAcc));
    }
  };

  useEffect(() => {
    if (isOpen && activeVariantId) {
      fetchPrice(activeVariantId, includeWarranty, includeAccessories);
    }
  }, [isOpen, activeVariantId, includeWarranty, includeAccessories]);

  if (!isOpen) return null;

  const handleModelSelect = (mId) => {
    setActiveModelId(mId);
    const targetModel = modelVariantsMap[mId] || modelVariantsMap['model-h'];
    const firstVar = targetModel.variants[0].id;
    setActiveVariantId(firstVar);
    setPriceData(createFallbackPriceData(firstVar, includeWarranty, includeAccessories));
    fetchPrice(firstVar, includeWarranty, includeAccessories);
  };

  const handleVariantSelect = (vId) => {
    setActiveVariantId(vId);
    setPriceData(createFallbackPriceData(vId, includeWarranty, includeAccessories));
    fetchPrice(vId, includeWarranty, includeAccessories);
  };

  // Safe pricing metrics
  const currentModelMeta = modelVariantsMap[activeModelId] || modelVariantsMap['model-h'];
  const breakup = priceData?.breakup || createFallbackPriceData(activeVariantId, includeWarranty, includeAccessories).breakup;
  const totalAmount = breakup.totalOnRoad || 1400000;
  const downPayment = Math.round(totalAmount * (downPaymentPct / 100));
  const principal = Math.max(0, totalAmount - downPayment);
  const monthlyRate = 0.0875 / 12; // 8.75% annual
  const emiFactor = Math.pow(1 + monthlyRate, tenure);
  const calculatedEMI = Math.round((principal * monthlyRate * emiFactor) / (emiFactor - 1)) || 0;

  const warrantyCost = breakup.extendedWarrantyRate || 18500;
  const accessoriesCost = breakup.accessoriesRate || 15000;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all animate-scale-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="price-breakup-title"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white px-6 py-4 flex justify-between items-center border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-sky-500/20 rounded-xl border border-sky-400/30">
              <Calculator className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <h3 id="price-breakup-title" className="text-base sm:text-lg font-black tracking-wide">
                City On-Road Price Quotation
              </h3>
              <p className="text-xs text-slate-400">
                Lucknow, Uttar Pradesh • Verified Deterministic Pricing
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800 transition cursor-pointer"
            aria-label="Close on-road price modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[78vh] overflow-y-auto space-y-5">
          {/* Brand X Interactive Model & Variant Selector Tabs */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 space-y-3 shadow-md">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                1. Choose Brand X Model:
              </span>
              <span className="text-[11px] text-slate-400">Instant Lucknow On-Road Recalculation</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {Object.entries(modelVariantsMap).map(([mId, mData]) => (
                <button
                  key={mId}
                  type="button"
                  onClick={() => handleModelSelect(mId)}
                  className={`py-2 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                    activeModelId === mId
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30 ring-2 ring-sky-300'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <span className="block font-bold">{mData.shortName}</span>
                  <span className={`block text-[10px] ${activeModelId === mId ? 'text-sky-100 font-semibold' : 'text-slate-400 font-medium'}`}>{mData.type}</span>
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800">
              <span className="text-[11px] font-bold text-slate-300 block mb-1.5">
                2. Select Trim / Powertrain:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentModelMeta.variants.map(v => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => handleVariantSelect(v.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      activeVariantId === v.id
                        ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {v.label} • ₹{(v.exShowroom / 100000).toFixed(2)}L
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Variant Info Banner */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex justify-between items-center shadow-xs">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Variant Selected</span>
              <p className="text-base font-black text-slate-900">{activeVariantId} • {currentModelMeta.name}</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Admin Table Verified</span>
              </span>
              <p className="text-[10px] text-slate-500 mt-1">Lucknow, UP RTO Deterministic</p>
            </div>
          </div>

          {/* Price Components Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 text-sm shadow-xs">
            <div className="flex justify-between items-center px-4 py-3 bg-slate-50 font-bold text-slate-700 text-xs uppercase tracking-wider">
              <span>Component</span>
              <span>Amount (INR)</span>
            </div>

            <div className="flex justify-between items-center px-4 py-3 text-slate-800">
              <span className="font-medium">Ex-Showroom Price</span>
              <span className="font-bold">₹{breakup.exShowroom.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between items-center px-4 py-3 text-slate-800">
              <div className="flex items-center space-x-1.5">
                <span className="font-medium">UP Road Tax & RTO Registration</span>
                <span className="text-[10px] bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full font-bold">
                  {breakup.roadTaxRTO === 0 ? '0% UP EV Waiver' : '~10%'}
                </span>
              </div>
              <span className="font-bold">₹{breakup.roadTaxRTO.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between items-center px-4 py-3 text-slate-800">
              <div>
                <span className="font-medium block">Comprehensive Insurance</span>
                <span className="text-[11px] text-slate-500">1-yr Own Damage + 3-yr Third Party + Zero Dep</span>
              </div>
              <span className="font-bold">₹{breakup.insuranceComprehensive.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between items-center px-4 py-3 text-slate-800">
              <span className="font-medium">Mandatory Fastag & Permanent RTO Smart Card</span>
              <span className="font-bold">₹{breakup.mandatoryRegistrationFastag.toLocaleString('en-IN')}</span>
            </div>

            {/* Optional Extended Warranty Checkbox */}
            <div 
              onClick={() => setIncludeWarranty(!includeWarranty)}
              className="flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-slate-50 transition"
            >
              <div className="flex items-center space-x-2.5">
                {includeWarranty ? (
                  <CheckSquare className="w-5 h-5 text-sky-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
                <div>
                  <span className="font-medium block text-slate-800">5-Year / 1,00,000 km Extended Warranty</span>
                  <span className="text-[11px] text-slate-500">Full mechanical & electrical breakdown cover</span>
                </div>
              </div>
              <span className={`font-semibold ${includeWarranty ? 'text-sky-700 font-bold' : 'text-slate-600'}`}>
                + ₹{warrantyCost.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Optional Chrome Accessories Kit */}
            <div 
              onClick={() => setIncludeAccessories(!includeAccessories)}
              className="flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-slate-50 transition"
            >
              <div className="flex items-center space-x-2.5">
                {includeAccessories ? (
                  <CheckSquare className="w-5 h-5 text-sky-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
                <div>
                  <span className="font-medium block text-slate-800">Dealership Premium Protection Pack</span>
                  <span className="text-[11px] text-slate-500">3D Mats, Mud Flaps, Body Cover, Underbody Anti-Rust</span>
                </div>
              </div>
              <span className={`font-semibold ${includeAccessories ? 'text-sky-700 font-bold' : 'text-slate-600'}`}>
                + ₹{accessoriesCost.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Total Row */}
            <div className="flex justify-between items-center px-4 py-4 bg-sky-50 font-black text-slate-900 border-t-2 border-sky-200">
              <div>
                <span className="text-base sm:text-lg block">Total Lucknow On-Road Price</span>
                <span className="text-[11px] text-slate-600 font-normal">All taxes & statutory levies included</span>
              </div>
              <span className="text-xl sm:text-2xl text-sky-700 font-black">
                ₹{totalAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Dynamic EMI Simulator Box */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <IndianRupee className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Interactive EMI Simulator
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium">8.75% p.a. Indicative</span>
            </div>

            {/* Sliders Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Down Payment Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600">Down Payment ({downPaymentPct}%):</span>
                  <span className="font-bold text-slate-900">₹{downPayment.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={downPaymentPct}
                  onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
              </div>

              {/* Loan Tenure Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600">Tenure:</span>
                  <span className="font-bold text-slate-900">{tenure / 12} Years ({tenure} mos)</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="84"
                  step="12"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div>
                <span className="text-[11px] text-slate-500 block uppercase font-medium">Monthly Installment</span>
                <span className="text-2xl font-black text-emerald-700">₹{calculatedEMI.toLocaleString('en-IN')} <span className="text-xs font-semibold text-slate-500">/ mo</span></span>
              </div>
              <span className="text-[10px] text-slate-400 max-w-[180px] text-right leading-tight">
                Financing through Brand X preferred banking partners (SBI, HDFC, ICICI).
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex flex-wrap justify-between items-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              if (onBookTestDrive) {
                onBookTestDrive(activeModelId);
              }
            }}
            className="bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg shadow-sky-600/30 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center space-x-2 cursor-pointer"
          >
            <span>Proceed to Book Test Drive ({currentModelMeta.shortName})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// client/src/components/AdminCMS.jsx
import React, { useState, useEffect } from 'react';
import { Settings, Tag, Upload, Calculator, CheckCircle2, AlertCircle, ShieldAlert, History, User, PlusCircle, Car, ChevronRight, Check, ArrowLeft, Sparkles } from 'lucide-react';

export default function AdminCMS({ models = [], showrooms = [], currentUser, onModelAdded, onBackToShowroom }) {
  const role = currentUser?.role || 'admin';
  const isUsedCarMgr = role === 'used_car_manager';
  const isSupervisor = role === 'lead_supervisor';
  
  // Default to Add Brand & Vehicle Model tab
  const [activeTab, setActiveTab] = useState('add-brand');

  // Pricing state
  const [selectedVariant, setSelectedVariant] = useState('H-ZX-AT');
  const [exShowroom, setExShowroom] = useState(1245000);
  const [roadTax, setRoadTax] = useState(124500);
  const [insurance, setInsurance] = useState(45000);
  const [accessories, setAccessories] = useState(15000);
  const [pricingMsg, setPricingMsg] = useState('');
  const [pricingError, setPricingError] = useState('');

  // Portal CSV state
  const [csvSource, setCsvSource] = useState('CarWale CSV Export');
  const [csvText, setCsvText] = useState(
`customerName,phone,email,modelInterest,preferredLanguage,budget
Rajesh Khanna,9839912001,r.khanna@gmail.com,Brand X Model H,Hindi,14 Lakh
Sunil Kashyap,9839912002,s.kashyap@yahoo.com,Brand X Model C,English,15 Lakh
Pooja Saxena,9839912003,pooja.s@outlook.com,Brand X Model S,Hindi,13 Lakh`
  );
  const [importSummary, setImportSummary] = useState(null);
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState('');

  // Used-Car Valuation Tool state
  const [valModel, setValModel] = useState('Model C');
  const [valYear, setValYear] = useState(2022);
  const [valKm, setValKm] = useState(41000);
  const [valFuel, setValFuel] = useState('Diesel');
  const [valResult, setValResult] = useState(null);
  const [valLoading, setValLoading] = useState(false);

  // Audit Logs state
  const [auditLogs, setAuditLogs] = useState([]);
  const [loadingAudits, setLoadingAudits] = useState(false);

  // Add Brand & Vehicle Model state
  const [newBrandName, setNewBrandName] = useState('Brand X');
  const [newModelName, setNewModelName] = useState('');
  const [newBodyType, setNewBodyType] = useState('Compact Luxury SUV');
  const [newTagline, setNewTagline] = useState('Command Every Journey with Distinction');
  const [newFuel, setNewFuel] = useState('Petrol');
  const [newTransmission, setNewTransmission] = useState('Automatic');
  const [newMileage, setNewMileage] = useState('16.8 kmpl');
  const [newSeating, setNewSeating] = useState(5);
  const [newVariantName, setNewVariantName] = useState('ZX Automatic');
  const [newExShowroom, setNewExShowroom] = useState(1850000);
  const [newShowroomId, setNewShowroomId] = useState('SR-01');
  const [newHeroImage, setNewHeroImage] = useState('https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80');
  const [addModelLoading, setAddModelLoading] = useState(false);
  const [addModelSuccess, setAddModelSuccess] = useState('');
  const [addModelError, setAddModelError] = useState('');

  const imagePresets = [
    { label: 'Luxury SUV', url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Executive Sedan', url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Premium Hatchback', url: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Electric Crossover', url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Rugged 4x4', url: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80' }
  ];

  // Fetch audit logs
  const fetchAuditLogs = async () => {
    try {
      setLoadingAudits(true);
      const res = await fetch('/api/admin/audit-logs', {
        headers: { 'x-user-id': currentUser?.id || 'EMP-07' }
      });
      const json = await res.json();
      if (json.success) {
        setAuditLogs(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAudits(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'audits') {
      fetchAuditLogs();
    }
  }, [activeTab]);

  // Save updated pricing (RBAC Protected)
  const handleSavePrice = async (e) => {
    e.preventDefault();
    setPricingError('');
    setPricingMsg('');
    try {
      const res = await fetch('/api/admin/prices', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-user-id': currentUser?.id || 'EMP-07'
        },
        body: JSON.stringify({
          variantId: selectedVariant,
          exShowroom,
          roadTaxRTO: roadTax,
          insuranceComprehensive: insurance,
          accessoryPack: accessories
        })
      });
      const json = await res.json();
      if (res.status === 403) {
        setPricingError(json.message || 'Access Denied: Only Admin or Dealer Principal can modify official price tables.');
        return;
      }
      if (json.success) {
        setPricingMsg(`Official price updated & logged under ${currentUser.name} (${currentUser.role}).`);
        setTimeout(() => setPricingMsg(''), 4000);
      } else {
        setPricingError(json.message || 'Failed to update pricing.');
      }
    } catch (err) {
      setPricingError('Failed to publish price update.');
    }
  };

  // CSV Lead Ingestion
  const handleImportCsv = async () => {
    try {
      setImporting(true);
      setImportError('');
      setImportSummary(null);

      // Parse client-side CSV format into lead objects
      const lines = csvText.trim().split('\n');
      if (lines.length < 2) {
        setImportError('CSV must include header row and at least 1 lead.');
        return;
      }

      const rows = lines.slice(1).map(line => {
        const parts = line.split(',');
        return {
          customerName: parts[0]?.trim(),
          phone: parts[1]?.trim(),
          customerPhone: parts[1]?.trim(),
          email: parts[2]?.trim(),
          customerEmail: parts[2]?.trim(),
          modelInterest: parts[3]?.trim(),
          preferredLanguage: parts[4]?.trim(),
          budget: parts[5]?.trim()
        };
      }).filter(r => r.customerName && (r.phone || r.customerPhone));

      const res = await fetch('/api/admin/imports/portal-leads', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-user-id': currentUser?.id || 'EMP-07'
        },
        body: JSON.stringify({
          source: csvSource,
          sourceName: csvSource,
          rows,
          leads: rows
        })
      });

      const json = await res.json();
      if (res.status === 403) {
        setImportError(json.message || 'Access Denied: Requires lead_supervisor, admin, or dealer_principal.');
        return;
      }
      if (json.success) {
        setImportSummary(json);
      } else {
        setImportError(json.message || 'CSV Import failed.');
      }
    } catch (err) {
      setImportError('Error parsing or submitting CSV leads.');
    } finally {
      setImporting(false);
    }
  };

  // Used Car Valuation Statistical Inquiry
  const handleEvaluateUsedCar = async (e) => {
    e.preventDefault();
    try {
      setValLoading(true);
      setValResult(null);
      const adminUserId = (currentUser?.role === 'admin' || currentUser?.role === 'dealer_principal' || currentUser?.role === 'used_car_manager')
        ? currentUser.id
        : 'EMP-07';

      const res = await fetch('/api/admin/used-cars/valuation-estimate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-user-id': adminUserId
        },
        body: JSON.stringify({
          model: valModel,
          year: Number(valYear),
          km: Number(valKm),
          kmDriven: Number(valKm),
          fuel: valFuel
        })
      });
      const json = await res.json();
      if (json.success) {
        setValResult(json.suggestedBand ? json : json.data);
      }
    } catch (err) {
      console.error('Valuation error:', err);
    } finally {
      setValLoading(false);
    }
  };

  // Add Brand & Vehicle Model Handler
  const handleAddNewModel = async (e) => {
    e.preventDefault();
    setAddModelSuccess('');
    setAddModelError('');

    if (!newModelName.trim()) {
      setAddModelError('Please enter a vehicle model name (e.g. Model Z, Safari, Creta).');
      return;
    }
    if (!newExShowroom || Number(newExShowroom) <= 0) {
      setAddModelError('Please enter a valid ex-showroom price.');
      return;
    }

    try {
      setAddModelLoading(true);
      const isEV = newFuel === 'Electric' || newBodyType.toLowerCase().includes('electric');
      const calcRTO = isEV ? 0 : Math.round(Number(newExShowroom) * 0.10);
      const calcIns = Math.round(Number(newExShowroom) * 0.035 + 15000);

      const adminUserId = (currentUser?.role === 'admin' || currentUser?.role === 'dealer_principal') 
        ? currentUser.id 
        : 'EMP-07';

      const res = await fetch('/api/admin/models', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': adminUserId
        },
        body: JSON.stringify({
          brandName: newBrandName.trim(),
          modelName: newModelName.trim(),
          type: newBodyType,
          tagline: newTagline.trim(),
          startingPrice: Number(newExShowroom),
          heroImage: newHeroImage,
          fuel: newFuel,
          transmission: newTransmission,
          mileage: newMileage,
          seating: Number(newSeating),
          variantName: newVariantName.trim(),
          exShowroomPrice: Number(newExShowroom),
          roadTaxRTO: calcRTO,
          insuranceComprehensive: calcIns,
          showroomId: newShowroomId
        })
      });

      const json = await res.json();
      if (res.status === 403) {
        setAddModelError(json.message || 'Access Denied: Only Admin or Dealer Principal can add brand models.');
        return;
      }
      if (json.success) {
        setAddModelSuccess(`Successfully registered ${json.data.name}! Live demo fleet allocated to Lucknow showroom.`);
        if (onModelAdded) {
          onModelAdded(json.data);
        }
        setNewModelName('');
      } else {
        setAddModelError(json.message || 'Failed to create new brand model.');
      }
    } catch (err) {
      console.error(err);
      setAddModelError('Network error while creating new brand model.');
    } finally {
      setAddModelLoading(false);
    }
  };

  const isEVSelected = newFuel === 'Electric' || newBodyType.toLowerCase().includes('electric');
  const estimatedRTO = isEVSelected ? 0 : Math.round(Number(newExShowroom || 0) * 0.10);
  const estimatedIns = Math.round(Number(newExShowroom || 0) * 0.035 + 15000);
  const estimatedTotal = Number(newExShowroom || 0) + estimatedRTO + estimatedIns + 2500;

  return (
    <div className="py-8 bg-slate-900 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 text-sky-400 border border-slate-800 text-xs font-bold tracking-wide mb-2">
              <Settings className="w-3.5 h-3.5" />
              <span>ROLE-BASED DEALERSHIP CONTROL SUITE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Dealership Management CMS</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Maintain city pricing tables, import portal leads, add new brands/models, and evaluate used-car comps.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onBackToShowroom && (
              <button
                type="button"
                onClick={onBackToShowroom}
                className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-4 py-2.5 rounded-2xl text-xs sm:text-sm flex items-center space-x-2 shadow-lg shadow-sky-600/30 transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Showroom</span>
              </button>
            )}

            <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl flex items-center space-x-3">
              <div className={`p-2 rounded-xl ${currentUser?.badgeColor || 'bg-sky-500/20 text-sky-400'}`}>
                <User className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Administrator</span>
                <span className="font-bold text-white text-xs block">{currentUser?.name || 'Dealership Admin'}</span>
                <span className="text-[10px] text-sky-400">{currentUser?.roleLabel || 'Dealership Manager'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab strip */}
        <div className="flex border-b border-slate-800 mb-6 space-x-3 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('add-brand')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm flex items-center space-x-2 border-b-2 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'add-brand'
                ? 'border-sky-500 text-sky-400 bg-slate-950/60 rounded-t-xl'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-sky-400" />
            <span>Add Brand & Vehicle Model</span>
          </button>

          {!isUsedCarMgr && (
            <button
              onClick={() => setActiveTab('pricing')}
              className={`py-3 px-4 font-bold text-xs sm:text-sm flex items-center space-x-2 border-b-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'pricing'
                  ? 'border-sky-500 text-sky-400 bg-slate-950/60 rounded-t-xl'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Tag className="w-4 h-4 text-sky-400" />
              <span>City On-Road Pricing Table</span>
            </button>
          )}

          {!isUsedCarMgr && (
            <button
              onClick={() => setActiveTab('csv')}
              className={`py-3 px-4 font-bold text-xs sm:text-sm flex items-center space-x-2 border-b-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'csv'
                  ? 'border-sky-500 text-sky-400 bg-slate-950/60 rounded-t-xl'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Upload className="w-4 h-4 text-emerald-400" />
              <span>Portal CSV Lead Importer</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('valuation')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm flex items-center space-x-2 border-b-2 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'valuation'
                ? 'border-sky-500 text-sky-400 bg-slate-950/60 rounded-t-xl'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Calculator className="w-4 h-4 text-amber-400" />
            <span>Used-Car Valuation Calculator</span>
          </button>

          {['admin', 'dealer_principal'].includes(role) && (
            <button
              onClick={() => setActiveTab('audits')}
              className={`py-3 px-4 font-bold text-xs sm:text-sm flex items-center space-x-2 border-b-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'audits'
                  ? 'border-sky-500 text-sky-400 bg-slate-950/60 rounded-t-xl'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <History className="w-4 h-4 text-purple-400" />
              <span>Security & Pricing Audit Logs</span>
            </button>
          )}
        </div>

        {/* Tab 0: Add New Brand & Vehicle Model */}
        {activeTab === 'add-brand' && (
          <div className="bg-slate-950/90 rounded-3xl border border-slate-800 p-6 shadow-xl max-w-4xl space-y-5">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/40 text-xs font-bold tracking-wide mb-1.5">
                <Car className="w-3.5 h-3.5" />
                <span>EXPAND DEALERSHIP PRODUCT PORTFOLIO</span>
              </div>
              <h3 className="text-xl font-bold text-white">Register New Brand & Vehicle Model</h3>
              <p className="text-xs text-slate-400">
                Instantly register new brands (e.g., Brand X, Tata, Hyundai, Toyota) and vehicle models into the Lucknow showroom catalogue, pricing engine, and live demo fleet.
              </p>
            </div>

            {addModelSuccess && (
              <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-2xl text-xs flex items-center space-x-2 animate-scale-in">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                <span>{addModelSuccess}</span>
              </div>
            )}

            {addModelError && (
              <div className="bg-red-500/20 border border-red-500/40 text-red-300 px-4 py-3 rounded-2xl text-xs flex items-center space-x-2 animate-scale-in">
                <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                <span>{addModelError}</span>
              </div>
            )}

            <form onSubmit={handleAddNewModel} className="space-y-5">
              {/* Row 1: Brand & Model Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    1. Brand / Manufacturer:
                  </label>
                  <input
                    type="text"
                    value={newBrandName}
                    onChange={(e) => setNewBrandName(e.target.value)}
                    placeholder="e.g. Brand X, Tata, Hyundai, Toyota, Mahindra"
                    className="w-full p-3 rounded-xl border border-slate-300 bg-white text-black font-bold text-sm shadow-xs"
                    style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                  />
                  <div className="flex gap-1.5 mt-1.5 text-[10px]">
                    <span className="text-slate-500">Quick suggestions:</span>
                    {['Brand X', 'Tata', 'Hyundai', 'Toyota', 'Mahindra'].map(b => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setNewBrandName(b)}
                        className="text-sky-400 hover:text-sky-300 underline cursor-pointer"
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    2. Vehicle Model Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={newModelName}
                    onChange={(e) => setNewModelName(e.target.value)}
                    placeholder="e.g. Model Z, Safari, Creta, XUV700, Innova"
                    className="w-full p-3 rounded-xl border border-slate-300 bg-white text-black font-bold text-sm shadow-xs"
                    style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                  />
                </div>
              </div>

              {/* Row 2: Category, Fuel & Transmission */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    3. Body Segment:
                  </label>
                  <select
                    value={newBodyType}
                    onChange={(e) => setNewBodyType(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 bg-white text-black font-bold text-xs cursor-pointer shadow-xs"
                    style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                  >
                    <option value="Compact Luxury SUV">Compact Luxury SUV</option>
                    <option value="Full-Size 7-Seater SUV">Full-Size 7-Seater SUV</option>
                    <option value="Executive Sedan">Executive Sedan</option>
                    <option value="Premium Hatchback">Premium Hatchback</option>
                    <option value="All-Electric Crossover">All-Electric Crossover</option>
                    <option value="Rugged 4x4 Off-Roader">Rugged 4x4 Off-Roader</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    4. Powertrain / Fuel:
                  </label>
                  <select
                    value={newFuel}
                    onChange={(e) => setNewFuel(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 bg-white text-black font-bold text-xs cursor-pointer shadow-xs"
                    style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                  >
                    <option value="Petrol">Turbo Petrol</option>
                    <option value="Diesel">Torque Diesel</option>
                    <option value="Electric">All-Electric (0% UP Tax)</option>
                    <option value="Strong Hybrid">Strong Hybrid (Self-Charging)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    5. Transmission:
                  </label>
                  <select
                    value={newTransmission}
                    onChange={(e) => setNewTransmission(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 bg-white text-black font-bold text-xs cursor-pointer shadow-xs"
                    style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                  >
                    <option value="CVT with Paddle Shifters">CVT with Paddle Shifters</option>
                    <option value="6-Speed Torque Converter AT">6-Speed Torque Converter AT</option>
                    <option value="7-Speed Dual-Clutch (DCT)">7-Speed Dual-Clutch (DCT)</option>
                    <option value="6-Speed Manual">6-Speed Manual</option>
                    <option value="Single-Speed Direct Drive EV">Single-Speed Direct Drive EV</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Pricing, Seating, Mileage */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    6. Ex-Showroom Price (₹ INR):
                  </label>
                  <input
                    type="number"
                    required
                    step="10000"
                    value={newExShowroom}
                    onChange={(e) => setNewExShowroom(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border border-slate-300 bg-white text-black font-bold text-sm shadow-xs"
                    style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    7. Efficiency / Range:
                  </label>
                  <input
                    type="text"
                    value={newMileage}
                    onChange={(e) => setNewMileage(e.target.value)}
                    placeholder="e.g. 17.5 kmpl or 520 km"
                    className="w-full p-3 rounded-xl border border-slate-300 bg-white text-black font-bold text-xs shadow-xs"
                    style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    8. Demo Showroom Allocation:
                  </label>
                  <select
                    value={newShowroomId}
                    onChange={(e) => setNewShowroomId(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 bg-white text-black font-bold text-xs cursor-pointer shadow-xs"
                    style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                  >
                    {showrooms && showrooms.length > 0 ? (
                      showrooms.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))
                    ) : (
                      <>
                        <option value="SR-01">Hazratganj Flagship Showroom</option>
                        <option value="SR-02">Gomti Nagar Showroom</option>
                        <option value="SR-03">Kanpur Road Showroom</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              {/* Row 4: Tagline & Photo Presets */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  9. Tagline & Visual Styling:
                </label>
                <input
                  type="text"
                  value={newTagline}
                  onChange={(e) => setNewTagline(e.target.value)}
                  placeholder="e.g. Urban Sophistication Meets Dynamic Performance"
                  className="w-full p-3 rounded-xl border border-slate-300 bg-white text-black font-bold text-xs shadow-xs"
                  style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                />

                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                  <span className="text-slate-400 font-semibold">Photo Preset:</span>
                  {imagePresets.map((p, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setNewHeroImage(p.url)}
                      className={`px-2.5 py-1 rounded-lg border text-xs font-medium cursor-pointer transition ${
                        newHeroImage === p.url
                          ? 'bg-sky-600 text-white border-sky-500 shadow-sm'
                          : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculation Preview Banner */}
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-wrap justify-between items-center text-xs gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Auto Lucknow On-Road Summary</span>
                  <span className="text-white font-bold text-sm">
                    {newBrandName} {newModelName || 'New Model'} • {newBodyType}
                  </span>
                  <div className="text-[11px] text-slate-400 mt-0.5 space-x-2">
                    <span>Ex: ₹{Number(newExShowroom || 0).toLocaleString('en-IN')}</span>
                    <span>• UP RTO: {isEVSelected ? '₹0 (0% EV)' : `₹${estimatedRTO.toLocaleString('en-IN')}`}</span>
                    <span>• Ins: ₹{estimatedIns.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase">Est. On-Road</span>
                  <span className="text-xl font-black text-emerald-400">
                    ₹{estimatedTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={addModelLoading}
                className="w-full bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-black py-3.5 px-6 rounded-2xl text-sm shadow-xl shadow-sky-600/30 transition transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <PlusCircle className="w-5 h-5" />
                <span>
                  {addModelLoading ? 'Registering Vehicle in Dealership Database...' : 'Register Brand & Model into Dealership Fleet'}
                </span>
              </button>
            </form>
          </div>
        )}

        {/* Tab 1: City Pricing Management */}
        {activeTab === 'pricing' && (
          <div className="bg-slate-950/90 rounded-3xl border border-slate-800 p-6 shadow-xl max-w-3xl space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white">
                Administer Lucknow City Pricing Breakup
              </h3>
              <p className="text-xs text-slate-400">
                Official dealer principal pricing table. Modifications immediately recalculate customer quotes and are logged to immutable audit trail.
              </p>
            </div>

            {pricingMsg && (
              <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{pricingMsg}</span>
              </div>
            )}

            {pricingError && (
              <div className="bg-red-500/20 border border-red-500/40 text-red-300 px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{pricingError}</span>
              </div>
            )}

            <form onSubmit={handleSavePrice} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Select Vehicle Variant:
                  </label>
                  <select
                    value={selectedVariant}
                    onChange={(e) => setSelectedVariant(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border border-slate-300 bg-white text-black font-semibold cursor-pointer shadow-xs"
                    style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                  >
                    <option value="H-ZX-AT">Brand X Model H - ZX Automatic</option>
                    <option value="H-VX-MT">Brand X Model H - VX Manual</option>
                    <option value="C-ZX-AT">Brand X Model C - ZX Automatic</option>
                    <option value="C-VX-MT">Brand X Model C - VX Manual</option>
                    <option value="S-ZX-AT">Brand X Model S - ZX Automatic</option>
                    <option value="S-VX-MT">Brand X Model S - VX Manual</option>
                    <option value="E-LR-AWD">Brand X Model E - Long Range AWD (EV)</option>
                    <option value="E-STD-RWD">Brand X Model E - Standard RWD (EV)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Ex-Showroom Price (INR):
                  </label>
                  <input
                    type="number"
                    value={exShowroom}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setExShowroom(val);
                      setRoadTax(Math.round(val * 0.10));
                    }}
                    className="w-full text-sm p-3 rounded-xl border border-slate-300 bg-white text-black font-bold shadow-xs"
                    style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    UP Road Tax (RTO):
                  </label>
                  <input
                    type="number"
                    value={roadTax}
                    onChange={(e) => setRoadTax(Number(e.target.value))}
                    className="w-full text-sm p-3 rounded-xl border border-slate-300 bg-white text-black font-bold shadow-xs"
                    style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Insurance Comprehensive:
                  </label>
                  <input
                    type="number"
                    value={insurance}
                    onChange={(e) => setInsurance(Number(e.target.value))}
                    className="w-full text-sm p-3 rounded-xl border border-slate-300 bg-white text-black font-bold shadow-xs"
                    style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Accessories Kit:
                  </label>
                  <input
                    type="number"
                    value={accessories}
                    onChange={(e) => setAccessories(Number(e.target.value))}
                    className="w-full text-sm p-3 rounded-xl border border-slate-300 bg-white text-black font-bold shadow-xs"
                    style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                  />
                </div>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400">Calculated On-Road Total:</span>
                <span className="text-xl font-black text-emerald-400">
                  ₹{(Number(exShowroom) + Number(roadTax) + Number(insurance) + 2500 + Number(accessories)).toLocaleString('en-IN')}
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 rounded-xl text-xs sm:text-sm transition cursor-pointer shadow-lg shadow-sky-600/30"
              >
                Publish & Save Price Configuration
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: 3rd Party Portal CSV Lead Ingestion */}
        {activeTab === 'csv' && (
          <div className="bg-slate-950/90 rounded-3xl border border-slate-800 p-6 shadow-xl max-w-3xl space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white">
                Bulk Lead Import from 3rd Party Portals (CSV)
              </h3>
              <p className="text-xs text-slate-400">
                Direct ingestion from CarWale, CarDekho, and auto-portals. Leads automatically trigger 5-minute SLA timers and assign to active showroom consultants.
              </p>
            </div>

            {importError && (
              <div className="bg-red-500/20 border border-red-500/40 text-red-300 px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{importError}</span>
              </div>
            )}

            {importSummary && (
              <div className="bg-emerald-500/20 border border-emerald-500/40 p-4 rounded-2xl text-xs space-y-2">
                <div className="flex items-center space-x-2 text-emerald-300 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{importSummary.message}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-300 mt-1 pt-1 border-t border-emerald-500/30">
                  <span>Batch Ingestion ID: <strong className="text-white">{importSummary.batchId}</strong></span>
                  <span>Leads Ingested: <strong className="text-white">{importSummary.ingestedCount}</strong></span>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Lead Portal Source:
                </label>
                <select
                  value={csvSource}
                  onChange={(e) => setCsvSource(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white text-black font-semibold cursor-pointer shadow-xs"
                  style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                >
                  <option value="CarWale CSV Export">CarWale CSV Export</option>
                  <option value="CarDekho Portal Export">CarDekho Portal Export</option>
                  <option value="Meta / Facebook Lead Ad Sync">Meta / Facebook Lead Ad Sync</option>
                  <option value="Walk-in Expo Lead Form">Walk-in Expo Lead Form</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Paste Raw CSV Records (Columns: customerName,phone,email,modelInterest,preferredLanguage,budget):
                </label>
                <textarea
                  rows={6}
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                  className="w-full text-xs font-mono p-3 rounded-xl border border-slate-300 bg-white text-black font-bold shadow-xs"
                  style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                />
              </div>

              <button
                onClick={handleImportCsv}
                disabled={importing}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs sm:text-sm transition cursor-pointer shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>{importing ? 'Processing CSV & Ingesting Leads...' : 'Import Leads into 5-Min SLA Watchdog'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Used-Car Valuation Tool */}
        {activeTab === 'valuation' && (
          <div className="bg-slate-950/90 rounded-3xl border border-slate-800 p-6 shadow-xl max-w-3xl space-y-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold tracking-wide mb-2">
                <Calculator className="w-3.5 h-3.5" />
                <span>USED-CAR MANAGER EXPERT PRICING TOOL</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Market Comparable Sales Price Band Estimator
              </h3>
              <p className="text-xs text-slate-400">
                Grounded strictly in historical Lucknow certified transactions. Used-Car Manager Vikram Singh approves final listing price.
              </p>
            </div>

            <form onSubmit={handleEvaluateUsedCar} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Brand X Model:</label>
                  <select
                    value={valModel}
                    onChange={(e) => setValModel(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-black font-semibold cursor-pointer"
                    style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                  >
                    <option value="Model C">Brand X Model C</option>
                    <option value="Model H">Brand X Model H</option>
                    <option value="Model S">Brand X Model S</option>
                    <option value="Model E">Brand X Model E (EV)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Model Year:</label>
                  <input
                    type="number"
                    min="2018"
                    max="2025"
                    value={valYear}
                    onChange={(e) => setValYear(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-black font-bold"
                    style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Kilometers Driven:</label>
                  <input
                    type="number"
                    step="1000"
                    value={valKm}
                    onChange={(e) => setValKm(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-black font-bold"
                    style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Fuel Type:</label>
                  <select
                    value={valFuel}
                    onChange={(e) => setValFuel(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-black font-semibold cursor-pointer"
                    style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={valLoading}
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded-xl text-xs sm:text-sm transition cursor-pointer shadow-lg shadow-amber-600/30 flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{valLoading ? 'Analyzing Registry Transactions...' : 'Generate Statistical Price Band'}</span>
              </button>
            </form>

            {valResult && valResult.suggestedBand && (
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 animate-scale-in text-xs">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Suggested Price Band</span>
                    <div className="text-xl font-black text-amber-400 mt-0.5">
                      ₹{valResult.suggestedBand.low?.toLocaleString('en-IN')} - ₹{valResult.suggestedBand.high?.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Estimated Median</span>
                    <div className="text-base font-bold text-white mt-0.5">
                      ₹{(valResult.suggestedBand.median || Math.round((valResult.suggestedBand.low + valResult.suggestedBand.high) / 2))?.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                {(valResult.explanation || valResult.message) && (
                  <p className="text-slate-300 leading-relaxed text-xs">
                    {valResult.explanation || valResult.message}
                  </p>
                )}

                {valResult.comps && valResult.comps.length > 0 && (
                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                      Recent Certified Registry Transactions in Lucknow ({valResult.comps.length} matched):
                    </span>
                    <div className="space-y-1.5">
                      {valResult.comps.map((c, i) => (
                        <div key={i} className="flex justify-between items-center bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 text-[11px]">
                          <span className="text-slate-300">
                            {c.year} {c.model} {c.variant ? `(${c.variant})` : ''} • {(c.km || c.kmDriven)?.toLocaleString('en-IN')} km • {c.fuel}
                          </span>
                          <span className="font-bold text-emerald-400">₹{(c.salePrice || c.price)?.toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Audit Logs (Admin & Dealer Principal) */}
        {activeTab === 'audits' && (
          <div className="bg-slate-950/90 rounded-3xl border border-slate-800 p-6 shadow-xl max-w-4xl space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white">Dealership Administrative Audit Log</h3>
              <p className="text-xs text-slate-400">
                Audit history of pricing updates, lead reassignments, fleet additions, and administrative actions.
              </p>
            </div>

            {loadingAudits ? (
              <div className="py-8 text-center text-xs text-slate-400">Loading audit trail...</div>
            ) : auditLogs.length === 0 ? (
              <p className="text-xs text-slate-400 bg-slate-900 p-4 rounded-xl border border-slate-800">
                No administrative changes recorded in this session yet.
              </p>
            ) : (
              <div className="divide-y divide-slate-800 border border-slate-800 rounded-2xl overflow-hidden bg-slate-900 text-xs">
                {auditLogs.map((log) => (
                  <div key={log.auditId} className="p-3.5 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-white block">{log.action}</span>
                      <span className="text-slate-400 text-[11px]">
                        Actor: <strong>{log.actorName}</strong> ({log.role}) • Entity: {log.entityType} ({log.entityId})
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

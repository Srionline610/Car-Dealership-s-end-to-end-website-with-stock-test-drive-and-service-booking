// client/src/components/UsedCarMarketplace.jsx
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Award, Fuel, Gauge, Calendar, User, Eye, Phone, CheckCircle, Search, Filter } from 'lucide-react';

export default function UsedCarMarketplace({ t, onEnquireUsed }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterFuel, setFilterFuel] = useState('');
  const [filterModel, setFilterModel] = useState('');
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [selectedCarModal, setSelectedCarModal] = useState(null);

  const fetchUsedCars = async () => {
    try {
      setLoading(true);
      let url = '/api/used-cars?';
      if (filterFuel) url += `fuel=${filterFuel}&`;
      if (filterModel) url += `model=${filterModel}&`;
      if (maxPrice) url += `maxPrice=${maxPrice}&`;

      const res = await fetch(url);
      const json = await res.json();
      if (json.success) {
        setCars(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch used cars:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsedCars();
  }, [filterFuel, filterModel, maxPrice]);

  return (
    <section className="py-12 bg-slate-100 min-h-screen text-slate-900" id="used-cars">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-bold tracking-wide mb-2">
              <Award className="w-4 h-4 text-amber-600" />
              <span>FAIZABAD ROAD PRE-OWNED YARD</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.certifiedUsedTitle}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              {t.certifiedUsedSubtitle}
            </p>
          </div>

          <div className="bg-white px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center space-x-3 shadow-xs">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold text-slate-900 block">Brand X Certified Promise</span>
              <span>Non-accidental certified • Clean UP title • 1-Year Warranty</span>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
            {/* Search by Model */}
            <div>
              <label htmlFor="filter-model" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Model:
              </label>
              <input
                id="filter-model"
                type="text"
                placeholder="e.g. Model C, Model S"
                value={filterModel}
                onChange={(e) => setFilterModel(e.target.value)}
                className="w-full text-sm p-2.5 rounded-lg border-2 border-slate-400 bg-white text-black font-bold placeholder:text-black placeholder:opacity-80 focus:border-sky-600"
                style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
              />
            </div>

            {/* Fuel Type */}
            <div>
              <label htmlFor="filter-fuel" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Fuel Type:
              </label>
              <select
                id="filter-fuel"
                value={filterFuel}
                onChange={(e) => setFilterFuel(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white text-black font-semibold focus:outline-sky-600 cursor-pointer"
              >
                <option value="">All Fuel Types</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            {/* Max Budget Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Max Budget:</span>
                <span className="text-sky-700">₹{(maxPrice / 100000).toFixed(1)} Lakh</span>
              </div>
              <input
                type="range"
                min="400000"
                max="1500000"
                step="50000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
            </div>

            {/* Active Inventory Count */}
            <div className="text-right flex items-center justify-end space-x-2 pt-2 sm:pt-4">
              <span className="text-xs text-slate-500">Showing</span>
              <span className="text-sm font-bold bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md">
                {cars.length} Verified Cars
              </span>
            </div>
          </div>
        </div>

        {/* Cars Grid */}
        {loading ? (
          <div className="py-20 text-center text-slate-500">
            <div className="w-8 h-8 border-3 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm">Loading certified used inventory...</p>
          </div>
        ) : cars.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No matching certified vehicles found</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting the budget or fuel filter.</p>
            <button
              onClick={() => { setFilterFuel(''); setFilterModel(''); setMaxPrice(1500000); }}
              className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => {
              const isAvailable = car.status === 'available';

              return (
                <div
                  key={car.stockId}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition overflow-hidden flex flex-col"
                >
                  {/* Photo with masked plate & status */}
                  <div className="relative aspect-video bg-slate-950 overflow-hidden">
                    <img
                      src={car.image}
                      alt={`${car.year} ${car.modelName} ${car.variantName}`}
                      className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                      loading="lazy"
                    />

                    {/* Masked Registration Plate */}
                    <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wider border border-slate-700 flex items-center space-x-1">
                      <span>Reg:</span>
                      <span className="font-bold text-amber-400">{car.maskedReg}</span>
                    </div>

                    {/* Availability Tag */}
                    <div className="absolute top-3 right-3">
                      {isAvailable ? (
                        <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                          Available
                        </span>
                      ) : (
                        <span className="bg-amber-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                          {car.status.toUpperCase()}
                        </span>
                      )}
                    </div>

                    {/* Inspection badge */}
                    <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-sm text-emerald-400 px-2 py-0.5 rounded text-[11px] flex items-center space-x-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>140-Point Inspection: {car.inspectionScore}/100</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[11px] font-bold text-slate-400 uppercase">Stock ID: {car.stockId}</span>
                          <h3 className="text-lg font-bold text-slate-900 leading-tight">
                            {car.year} {car.modelName}
                          </h3>
                          <p className="text-xs text-sky-700 font-semibold">{car.variantName} • {car.transmission || 'Manual'}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-500 block">Offer Price</span>
                          <span className="text-lg font-black text-slate-900">
                            ₹{car.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      {/* Specs Chips */}
                      <div className="grid grid-cols-3 gap-2 my-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs text-center">
                        <div>
                          <span className="text-[10px] text-slate-400 block">Odometer</span>
                          <span className="font-semibold text-slate-800">{car.km.toLocaleString('en-IN')} km</span>
                        </div>
                        <div className="border-x border-slate-200">
                          <span className="text-[10px] text-slate-400 block">Fuel</span>
                          <span className="font-semibold text-slate-800">{car.fuel}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block">Ownership</span>
                          <span className="font-semibold text-slate-800">{car.owners} {car.owners === 1 ? 'Owner' : 'Owners'}</span>
                        </div>
                      </div>

                      {/* Warranty note */}
                      <div className="text-xs text-slate-600 bg-emerald-50/60 border border-emerald-100 p-2 rounded-lg flex items-center space-x-1.5">
                        <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="truncate">{car.warranty}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 pt-3 border-t border-slate-100 flex space-x-2">
                      <button
                        onClick={() => setSelectedCarModal(car)}
                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2 px-3 rounded-lg text-xs transition flex items-center justify-center space-x-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspection Report</span>
                      </button>

                      <button
                        disabled={!isAvailable}
                        onClick={() => onEnquireUsed(car)}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1 ${
                          isAvailable
                            ? 'bg-sky-600 hover:bg-sky-500 text-white cursor-pointer shadow-xs'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{isAvailable ? 'Enquire Now' : 'Reserved'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Inspection Report Detail Modal */}
        {selectedCarModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h4 className="text-sm font-bold">140-Point Certified Inspection Certificate</h4>
                    <p className="text-[11px] text-slate-400">Stock ID: {selectedCarModal.stockId} • {selectedCarModal.maskedReg}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCarModal(null)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  ✕
                </button>
              </div>

              <div className="p-5 space-y-4 text-xs">
                <div className="flex justify-between items-center bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase">Overall Health Rating</span>
                    <h5 className="text-lg font-black text-emerald-700">{selectedCarModal.inspectionScore} / 100</h5>
                  </div>
                  <span className="bg-emerald-600 text-white font-bold px-2.5 py-1 rounded-md text-[11px]">
                    Passed Certified Standard
                  </span>
                </div>

                <div>
                  <h6 className="font-bold text-slate-800 mb-1">Chief Technician Findings:</h6>
                  <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
                    {selectedCarModal.inspectionSummary}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div className="p-2 border border-slate-200 rounded-lg">
                    <span className="font-semibold block text-slate-900">Engine & Compression:</span>
                    <span>No oil leakage, smooth idle.</span>
                  </div>
                  <div className="p-2 border border-slate-200 rounded-lg">
                    <span className="font-semibold block text-slate-900">Chassis & Body:</span>
                    <span>Zero structural accidental impact.</span>
                  </div>
                  <div className="p-2 border border-slate-200 rounded-lg">
                    <span className="font-semibold block text-slate-900">Electricals & AC:</span>
                    <span>Cooling verified to 6.2°C at vents.</span>
                  </div>
                  <div className="p-2 border border-slate-200 rounded-lg">
                    <span className="font-semibold block text-slate-900">Tyres & Suspension:</span>
                    <span>Front 70%, Rear 75% tread remaining.</span>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                  <span className="text-slate-500">Inspection Yard: Faizabad Road, Lucknow</span>
                  <button
                    onClick={() => {
                      const car = selectedCarModal;
                      setSelectedCarModal(null);
                      onEnquireUsed(car);
                    }}
                    className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-4 py-2 rounded-lg"
                  >
                    Enquire for this Car
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

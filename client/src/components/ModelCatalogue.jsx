// client/src/components/ModelCatalogue.jsx
import React, { useState } from 'react';
import { Fuel, Gauge, Users, Zap, CheckCircle2, ChevronRight, Calculator, ShieldCheck, Sparkles } from 'lucide-react';

const modelColorImages = {
  'model-h': [
    "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80"
  ],
  'model-c': [
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80"
  ],
  'model-s': [
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80"
  ],
  'model-e': [
    "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80"
  ]
};

export default function ModelCatalogue({ models, onOpenPriceCalc, onOpenTestDrive, t }) {
  const [selectedVariants, setSelectedVariants] = useState({
    'model-h': 'H-ZX-AT',
    'model-c': 'C-ZX-AT',
    'model-s': 'S-ZX-AT',
    'model-e': 'E-LR-AWD'
  });

  const [activeColors, setActiveColors] = useState({
    'model-h': 0,
    'model-c': 0,
    'model-s': 0,
    'model-e': 0
  });

  const handleVariantChange = (modelId, variantId) => {
    setSelectedVariants(prev => ({
      ...prev,
      [modelId]: variantId
    }));
  };

  const handleColorSelect = (modelId, colorIndex) => {
    setActiveColors(prev => ({
      ...prev,
      [modelId]: colorIndex
    }));
  };

  return (
    <section className="py-16 bg-slate-900 text-slate-100 relative overflow-hidden" id="catalogue">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-sky-600/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold tracking-widest uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Lucknow Dealership Fleet</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Brand X Digital Showroom
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Discover precision engineering, ARAI-certified mileage, and transparent on-road breakdown. Select your preferred variant and exterior color tone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {models.map(model => {
            const currentVariantId = selectedVariants[model.id] || model.variants[0].id;
            const currentVariant = model.variants.find(v => v.id === currentVariantId) || model.variants[0];
            const activeColorIndex = activeColors[model.id] || 0;
            const activeColor = model.colors ? model.colors[activeColorIndex] : null;

            return (
              <div 
                key={model.id}
                className="group bg-slate-950/80 rounded-3xl border border-slate-800 hover:border-sky-500/50 shadow-xl hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col overflow-hidden backdrop-blur-md"
              >
                {/* Vehicle Image with Tag Overlays */}
                <div className="relative aspect-video bg-slate-900 overflow-hidden">
                  {(() => {
                    const currentImage = (modelColorImages[model.id] && modelColorImages[model.id][activeColorIndex]) || model.heroImage;
                    return (
                      <img
                        src={currentImage}
                        alt={`${model.name} in ${activeColor?.name || 'Standard'}`}
                        className="w-full h-full object-cover group-hover:scale-106 transition-all duration-500 ease-out"
                        loading="lazy"
                      />
                    );
                  })()}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40"></div>

                  {/* Top tags */}
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold border border-white/10">
                    {model.type}
                  </div>

                  <div className="absolute top-4 right-4 bg-sky-500/20 backdrop-blur-md text-sky-300 border border-sky-400/40 px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    Ex-Showroom: ₹{currentVariant.exShowroomPrice.toLocaleString('en-IN')}
                  </div>

                  {/* Exterior Color Swatches preview on card */}
                  {model.colors && (
                    <div className="absolute bottom-3 left-4 flex items-center space-x-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      <span className="text-[10px] text-slate-300 font-medium">Tone: <span className="text-white font-bold">{activeColor?.name}</span></span>
                      <div className="flex space-x-1.5 ml-1">
                        {model.colors.map((c, i) => (
                          <button
                            key={i}
                            title={c.name}
                            onClick={() => handleColorSelect(model.id, i)}
                            style={{ backgroundColor: c.hex }}
                            className={`w-4 h-4 rounded-full border transition cursor-pointer ${
                              activeColorIndex === i ? 'ring-2 ring-sky-400 scale-125 border-white shadow-sm' : 'border-slate-500 opacity-70 hover:opacity-100'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Details Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-black text-white group-hover:text-sky-300 transition duration-200">
                          {model.name}
                        </h3>
                        <p className="text-xs text-sky-400 font-medium italic mt-0.5">
                          {model.tagline}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                      {model.description}
                    </p>

                    {/* Variant Selector Tabs */}
                    <div className="mt-4 pt-4 border-t border-slate-800">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Select Variant:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {model.variants.map(variant => (
                          <button
                            key={variant.id}
                            onClick={() => handleVariantChange(model.id, variant.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all duration-200 cursor-pointer ${
                              currentVariant.id === variant.id
                                ? 'bg-sky-600 text-white border-sky-500 shadow-md shadow-sky-600/30 scale-102'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                          >
                            {variant.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Variant Key Specs Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 bg-slate-900/90 p-3 rounded-2xl border border-slate-800 text-xs">
                      <div className="flex items-center space-x-2">
                        <Fuel className="w-4 h-4 text-sky-400 shrink-0" />
                        <div>
                          <span className="text-[10px] text-slate-400 block">Fuel</span>
                          <span className="font-bold text-slate-200">{currentVariant.fuel}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Gauge className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div>
                          <span className="text-[10px] text-slate-400 block">Efficiency</span>
                          <span className="font-bold text-slate-200">{currentVariant.mileage}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                        <div>
                          <span className="text-[10px] text-slate-400 block">Transmission</span>
                          <span className="font-bold text-slate-200 truncate block max-w-[80px]" title={currentVariant.transmission}>
                            {currentVariant.transmission.split(' ')[0]}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-indigo-400 shrink-0" />
                        <div>
                          <span className="text-[10px] text-slate-400 block">Seating</span>
                          <span className="font-bold text-slate-200">{currentVariant.seating} Seats</span>
                        </div>
                      </div>
                    </div>

                    {/* Features checklist */}
                    <div className="mt-4">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-300">
                        {currentVariant.features.slice(0, 4).map((f, i) => (
                          <li key={i} className="flex items-center space-x-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="truncate">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-2.5">
                    <button
                      onClick={() => onOpenPriceCalc(currentVariant.id)}
                      className="flex-1 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-lg shadow-sky-600/20 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer transform hover:-translate-y-0.5"
                    >
                      <Calculator className="w-4 h-4" />
                      <span>{t.calculateOnRoad}</span>
                    </button>

                    <button
                      onClick={() => onOpenTestDrive(model.id)}
                      className="bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all duration-200 flex items-center justify-center space-x-1.5 cursor-pointer transform hover:-translate-y-0.5"
                    >
                      <span>Book Test Drive</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

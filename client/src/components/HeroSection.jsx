// client/src/components/HeroSection.jsx
import React, { useState } from 'react';
import { ShieldCheck, MapPin, Sparkles, ChevronRight, Calculator, Wrench, Award, Check, Zap, Car } from 'lucide-react';

export default function HeroSection({ t, setActiveView, onOpenPriceCalc, onOpenTestDrive }) {
  // Showcase profiles for all 4 Brand X models in Lucknow
  const showcaseModels = [
    {
      id: "model-h",
      name: "Brand X Model H",
      shortName: "Model H",
      type: "Premium Hatchback",
      trim: "ZX Automatic",
      price: "₹12,45,000",
      variantId: "H-ZX-AT",
      spec1: { label: "Mileage", val: "18.5 kmpl" },
      spec2: { label: "Transmission", val: "CVT Paddle" },
      spec3: { label: "NCAP Rating", val: "5-Star Safety" },
      demoLocation: "Hazratganj Flagship",
      colors: [
        {
          name: "Opulent Blue",
          hex: "#1e3a8a",
          textColor: "text-blue-400",
          image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Pearl Arctic White",
          hex: "#f8fafc",
          textColor: "text-slate-200",
          image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Magma Grey",
          hex: "#475569",
          textColor: "text-slate-400",
          image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Luxe Radiant Red",
          hex: "#b91c1c",
          textColor: "text-red-400",
          image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      id: "model-c",
      name: "Brand X Model C",
      shortName: "Model C",
      type: "Compact Luxury SUV",
      trim: "ZX Automatic Petrol",
      price: "₹14,20,000",
      variantId: "C-ZX-AT",
      spec1: { label: "Mileage", val: "16.2 kmpl" },
      spec2: { label: "Transmission", val: "6-Speed AT" },
      spec3: { label: "Ground Clr.", val: "205 mm" },
      demoLocation: "Gomti Nagar Showroom",
      colors: [
        {
          name: "Forest Metallic Green",
          hex: "#14532d",
          textColor: "text-emerald-400",
          image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Starlight White",
          hex: "#f8fafc",
          textColor: "text-slate-200",
          image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Midnight Obsidian",
          hex: "#0f172a",
          textColor: "text-slate-300",
          image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Copper Bronze",
          hex: "#78350f",
          textColor: "text-amber-400",
          image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      id: "model-s",
      name: "Brand X Model S",
      shortName: "Model S",
      type: "Executive Sedan",
      trim: "ZX Automatic",
      price: "₹13,90,000",
      variantId: "S-ZX-AT",
      spec1: { label: "Mileage", val: "19.1 kmpl" },
      spec2: { label: "Transmission", val: "7-Speed Dual-Clutch" },
      spec3: { label: "Trunk Boot", val: "520 Litres" },
      demoLocation: "Kanpur Road Showroom",
      colors: [
        {
          name: "Pearl Arctic White",
          hex: "#f8fafc",
          textColor: "text-slate-200",
          image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Midnight Black",
          hex: "#0f172a",
          textColor: "text-slate-300",
          image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Magma Grey",
          hex: "#475569",
          textColor: "text-slate-400",
          image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Velvet Blue",
          hex: "#1e3a8a",
          textColor: "text-blue-400",
          image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      id: "model-e",
      name: "Brand X Model E (Electric)",
      shortName: "Model E (EV)",
      type: "Electric All-Wheel Drive",
      trim: "Long Range AWD (0% UP Tax)",
      price: "₹22,50,000",
      variantId: "E-LR-AWD",
      spec1: { label: "Range (ARAI)", val: "510 km" },
      spec2: { label: "Acceleration", val: "0-100 in 4.8s" },
      spec3: { label: "UP Road Tax", val: "0% Waiver" },
      demoLocation: "Hazratganj Flagship",
      colors: [
        {
          name: "Cyber Silver",
          hex: "#94a3b8",
          textColor: "text-slate-300",
          image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Arctic Glacier White",
          hex: "#f8fafc",
          textColor: "text-slate-200",
          image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Obsidian Black",
          hex: "#0f172a",
          textColor: "text-slate-400",
          image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Electric Azure",
          hex: "#0284c7",
          textColor: "text-sky-400",
          image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80"
        }
      ]
    }
  ];

  const [activeModelIndex, setActiveModelIndex] = useState(0);
  const currentModel = showcaseModels[activeModelIndex];
  const [selectedColor, setSelectedColor] = useState(currentModel.colors[0]);
  const [imageLoaded, setImageLoaded] = useState(true);

  const handleSelectModel = (index) => {
    setImageLoaded(false);
    setActiveModelIndex(index);
    setSelectedColor(showcaseModels[index].colors[0]);
    setTimeout(() => setImageLoaded(true), 150);
  };

  const handleColorChange = (color) => {
    setImageLoaded(false);
    setSelectedColor(color);
    setTimeout(() => setImageLoaded(true), 150);
  };

  return (
    <div className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white overflow-hidden pb-16 pt-10 sm:pt-14">
      {/* Background ambient lighting orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-sky-500/20 blur-3xl animate-float"></div>
        <div className="absolute top-72 -left-32 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl animate-float" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headlines & Action Triggers */}
          <div className="lg:col-span-7 space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-sky-500/15 to-indigo-500/15 border border-sky-400/30 text-sky-300 text-xs font-bold tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>OFFICIAL BRAND X DEALER • LUCKNOW</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
              {t.heroTitle}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              {t.heroSubtitle}
            </p>

            {/* Quick Action Buttons with micro-animations */}
            <div className="flex flex-wrap gap-3.5 pt-2">
              <button
                onClick={() => onOpenTestDrive(currentModel.id)}
                className="group relative overflow-hidden bg-gradient-to-r from-sky-600 via-sky-500 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold px-6 py-3.5 rounded-2xl shadow-xl shadow-sky-600/30 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-sky-500/50 flex items-center space-x-2 text-sm sm:text-base cursor-pointer"
              >
                <span>{t.navTestDrive}</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition duration-200" />
              </button>

              <button
                onClick={() => onOpenPriceCalc(currentModel.variantId)}
                className="bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-sky-500/50 text-slate-100 font-semibold px-5 py-3.5 rounded-2xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center space-x-2 text-sm sm:text-base cursor-pointer shadow-md"
              >
                <Calculator className="w-4 h-4 text-sky-400" />
                <span>{t.calculateOnRoad}</span>
              </button>

              <button
                onClick={() => setActiveView('used')}
                className="bg-slate-900/60 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white font-medium px-4 py-3.5 rounded-2xl transition-all duration-300 flex items-center space-x-2 text-sm cursor-pointer"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>{t.navUsed}</span>
              </button>
            </div>

            {/* Key Trust Pillars */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
              <div className="flex items-center space-x-2.5 bg-slate-900/50 p-2.5 rounded-xl border border-slate-800">
                <MapPin className="w-5 h-5 text-sky-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">3 Showrooms</span>
                  <span className="text-slate-400 text-[11px]">Hazratganj • Gomti • Kanpur Rd</span>
                </div>
              </div>
              <div className="flex items-center space-x-2.5 bg-slate-900/50 p-2.5 rounded-xl border border-slate-800">
                <Wrench className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">2 Workshops</span>
                  <span className="text-slate-400 text-[11px]">Transport Nagar & Chinhat</span>
                </div>
              </div>
              <div className="flex items-center space-x-2.5 bg-slate-900/50 p-2.5 rounded-xl border border-slate-800">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">140-Point Pre-Owned</span>
                  <span className="text-slate-400 text-[11px]">Faizabad Road Yard</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Vehicle Showcase with Interactive Model & Color Customizer */}
          <div className="lg:col-span-5">
            <div className="relative group bg-gradient-to-b from-slate-900/90 to-slate-950/90 rounded-3xl border border-slate-700/80 p-5 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-sky-500/50 glow-cyan">
              
              {/* Interactive Brand X Model Selector Tabs */}
              <div className="mb-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-sky-400 block mb-1.5">
                  Choose Brand X Model:
                </span>
                <div className="grid grid-cols-4 gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  {showcaseModels.map((m, idx) => (
                    <button
                      key={m.id}
                      onClick={() => handleSelectModel(idx)}
                      className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        activeModelIndex === idx
                          ? 'bg-sky-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-white hover:bg-slate-900'
                      }`}
                    >
                      {m.shortName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Header Info */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-2xl font-black text-white">{currentModel.name}</h3>
                  <p className="text-xs text-slate-400">
                    {currentModel.trim} • Color: <span className={`font-bold ${selectedColor.textColor}`}>{selectedColor.name}</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Ex-Showroom</span>
                  <span className="text-xl font-black text-white">{currentModel.price}</span>
                </div>
              </div>

              {/* Dynamic Vehicle Image with smooth fade on change */}
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-950 mb-3.5 border border-slate-800 shadow-inner">
                <img
                  src={selectedColor.image}
                  alt={`${currentModel.name} in ${selectedColor.name}`}
                  className={`w-full h-full object-cover transform hover:scale-105 transition-all duration-500 ${
                    imageLoaded ? 'opacity-100 scale-100' : 'opacity-70 scale-98'
                  }`}
                  loading="eager"
                />
                
                {/* Floating Availability Pill */}
                <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/80 backdrop-blur-md rounded-full text-[11px] text-white flex items-center space-x-1.5 border border-white/10 shadow-lg">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Demo Ready at {currentModel.demoLocation}</span>
                </div>
              </div>

              {/* Interactive Color Swatch Bar */}
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 mb-3 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400">Select Exterior Tone:</span>
                <div className="flex items-center space-x-2">
                  {currentModel.colors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => handleColorChange(c)}
                      title={c.name}
                      style={{ backgroundColor: c.hex }}
                      className={`w-6 h-6 rounded-full border-2 transition-all duration-200 transform cursor-pointer flex items-center justify-center ${
                        selectedColor.name === c.name
                          ? 'border-sky-400 scale-120 ring-2 ring-sky-500/50 shadow-md'
                          : 'border-slate-600 hover:scale-110 opacity-80'
                      }`}
                    >
                      {selectedColor.name === c.name && (
                        <Check className={`w-3 h-3 ${c.hex === '#f8fafc' ? 'text-slate-900' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specs Pills */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs py-2 bg-slate-950/60 rounded-xl border border-slate-800 mb-4">
                <div>
                  <span className="text-slate-400 block text-[10px]">{currentModel.spec1.label}</span>
                  <span className="font-semibold text-white">{currentModel.spec1.val}</span>
                </div>
                <div className="border-x border-slate-800">
                  <span className="text-slate-400 block text-[10px]">{currentModel.spec2.label}</span>
                  <span className="font-semibold text-white">{currentModel.spec2.val}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">{currentModel.spec3.label}</span>
                  <span className="font-semibold text-emerald-400">{currentModel.spec3.val}</span>
                </div>
              </div>

              <div className="flex space-x-2.5">
                <button
                  onClick={() => onOpenPriceCalc(currentModel.variantId)}
                  className="flex-1 bg-sky-600 hover:bg-sky-500 text-white font-bold py-2.5 rounded-xl text-xs transition duration-200 text-center cursor-pointer shadow-md hover:shadow-sky-600/30"
                >
                  On-Road Price (Lucknow)
                </button>
                <button
                  onClick={() => onOpenTestDrive(currentModel.id)}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition duration-200 border border-slate-700 cursor-pointer"
                >
                  Book Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

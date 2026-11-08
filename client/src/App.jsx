// client/src/App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ModelCatalogue from './components/ModelCatalogue';
import UsedCarMarketplace from './components/UsedCarMarketplace';
import OnRoadPriceModal from './components/OnRoadPriceModal';
import TestDriveModal from './components/TestDriveModal';
import ServiceBookingModal from './components/ServiceBookingModal';
import TradeInModal from './components/TradeInModal';
import CustomerAuthModal from './components/CustomerAuthModal';
import AdminCMS from './components/AdminCMS';
import CustomerDashboard from './components/CustomerDashboard';
import AdminGate from './components/AdminGate';
import { translations } from './translations';
import { ShieldCheck, MapPin, Phone, Mail, Clock, RefreshCw, User, Check, Settings } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('dealership_customer');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [activeView, setActiveView] = useState('showroom'); // 'showroom', 'used', 'test-drive', 'service'
  const [lang, setLang] = useState('en');
  const [models, setModels] = useState([]);
  const [showrooms, setShowrooms] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  // Modals state
  const [priceModalVariant, setPriceModalVariant] = useState(null);
  const [testDriveModalOpen, setTestDriveModalOpen] = useState(false);
  const [preselectedTestDriveModel, setPreselectedTestDriveModel] = useState('');
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [tradeInModalOpen, setTradeInModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' or 'register'

  const t = translations[lang] || translations.en;

  // Initial load
  useEffect(() => {
    const loadInitData = async () => {
      try {
        const [resModels, resShowrooms, resWorkshops] = await Promise.all([
          fetch('/api/models').then(r => r.json()),
          fetch('/api/showrooms').then(r => r.json()),
          fetch('/api/workshops').then(r => r.json())
        ]);
        if (resModels.success) setModels(resModels.data);
        if (resShowrooms.success) setShowrooms(resShowrooms.data);
        if (resWorkshops.success) setWorkshops(resWorkshops.data);
      } catch (err) {
        console.error('Failed to load initial data:', err);
      }
    };
    loadInitData();
  }, []);

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('dealership_customer', JSON.stringify(user));
    } catch (e) {}
    if (user.role === 'admin' || user.role === 'dealer_principal') {
      setActiveView('admin');
      setToastMessage(`Welcome Dealership Administrator, ${user.name}! Switched to Admin Fleet CMS.`);
    } else {
      setToastMessage(`Welcome back, ${user.name}!`);
    }
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('dealership_customer');
    } catch (e) {}
    setToastMessage('You have signed out.');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const openPriceModal = (variantId) => {
    const validVariant = (typeof variantId === 'string' && variantId.trim()) ? variantId.trim() : 'H-ZX-AT';
    setPriceModalVariant(validVariant);
  };

  const openTestDriveModal = (modelId) => {
    setPreselectedTestDriveModel(typeof modelId === 'string' ? modelId : '');
    setTestDriveModalOpen(true);
  };

  const handleEnquireUsedCar = (car) => {
    openTestDriveModal(car.modelId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      {/* Top Customer Navigation Bar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        lang={lang}
        setLang={setLang}
        t={t}
        currentUser={currentUser}
        onOpenAuthModal={openAuthModal}
        onSignOut={handleSignOut}
        onOpenTestDriveModal={openTestDriveModal}
      />

      {/* Customer Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-sky-950 border border-sky-400/50 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-2.5 animate-scale-in text-xs">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {activeView === 'showroom' && (
          <>
            <HeroSection
              t={t}
              setActiveView={setActiveView}
              onOpenPriceCalc={(varId) => openPriceModal(varId || 'H-ZX-AT')}
              onOpenTestDrive={(mId) => openTestDriveModal(mId || 'model-h')}
            />

            {/* Quick Actions Ribbon */}
            <div className="bg-slate-950 border-y border-slate-800 text-white py-3.5">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center gap-4 text-xs">
                <div className="flex items-center space-x-2 text-sky-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Transparent Pricing: Official Uttar Pradesh RTO registration & zero hidden fees.</span>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setTradeInModalOpen(true)}
                    className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 transition cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                    <span>Vehicle Exchange / Trade-In</span>
                  </button>

                  <button
                    onClick={() => setServiceModalOpen(true)}
                    className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition cursor-pointer shadow-md shadow-emerald-600/20"
                  >
                    <span>{t.bookServiceNow}</span>
                  </button>
                </div>
              </div>
            </div>

            <ModelCatalogue
              models={models}
              onOpenPriceCalc={openPriceModal}
              onOpenTestDrive={openTestDriveModal}
              t={t}
            />

            {/* Used Cars Teaser Section */}
            <div className="bg-slate-950 py-16 border-t border-slate-800 relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Certified Pre-Owned</span>
                <h3 className="text-2xl sm:text-4xl font-black text-white">
                  Looking for a Verified Pre-Owned Brand X Car?
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
                  Every car passes our 140-point technical inspection with Lucknow registration history verification and 1-year dealership warranty.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setActiveView('used')}
                    className="bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-xl shadow-sky-600/30 transition transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    Explore Certified Used Cars Inventory
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {activeView === 'used' && (
          <UsedCarMarketplace
            t={t}
            onEnquireUsed={handleEnquireUsedCar}
          />
        )}

        {activeView === 'test-drive' && (
          <div className="py-12 bg-slate-900 min-h-screen">
            <div className="max-w-3xl mx-auto px-4 text-center mb-8">
              <h2 className="text-3xl font-black text-white tracking-tight">{t.navTestDrive}</h2>
              <p className="text-sm text-slate-400 mt-2">
                Choose your preferred model, Lucknow showroom, and dedicated time slot for a personalized driving experience.
              </p>
              <div className="mt-4">
                <button
                  onClick={() => openTestDriveModal('model-h')}
                  className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-sky-600/30 transition cursor-pointer"
                >
                  Schedule Test Drive Now
                </button>
              </div>
            </div>
          </div>
        )}

        {activeView === 'service' && (
          <div className="py-12 bg-slate-900 min-h-screen">
            <div className="max-w-3xl mx-auto px-4 text-center mb-8">
              <h2 className="text-3xl font-black text-white tracking-tight">{t.navService}</h2>
              <p className="text-sm text-slate-400 mt-2">
                Book a service appointment across our 2 Lucknow workshops: Transport Nagar (8 Bays) or Chinhat East (5 Bays).
              </p>
              <div className="mt-4">
                <button
                  onClick={() => setServiceModalOpen(true)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-emerald-600/30 transition cursor-pointer"
                >
                  Book Service Bay Appointment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Customer Dashboard View (For Customers only) */}
        {activeView === 'customer-dashboard' && (
          <CustomerDashboard
            currentUser={currentUser || { name: 'Customer Profile', role: 'customer' }}
            onSignOut={handleSignOut}
            onOpenTestDrive={(mId) => openTestDriveModal(mId || 'model-h')}
            onOpenService={() => setServiceModalOpen(true)}
            onOpenTradeIn={() => setTradeInModalOpen(true)}
            onBackToShowroom={() => setActiveView('showroom')}
          />
        )}

        {/* Dealership Admin CMS (Protected: Only staff/admin can view) */}
        {activeView === 'admin' && (
          currentUser && ['admin', 'dealer_principal', 'used_car_manager', 'lead_supervisor'].includes(currentUser.role) ? (
            <AdminCMS
              models={models}
              showrooms={showrooms}
              currentUser={currentUser}
              onModelAdded={(newModel) => {
                setModels(prev => [...prev.filter(m => m.id !== newModel.id), newModel]);
                setToastMessage(`Brand model "${newModel.name}" added to showroom catalogue!`);
                setTimeout(() => setToastMessage(''), 4500);
              }}
              onBackToShowroom={() => setActiveView('showroom')}
            />
          ) : (
            <AdminGate
              currentUser={currentUser}
              onAdminLoginSuccess={(adminUser) => {
                handleAuthSuccess(adminUser);
                setActiveView('admin');
              }}
              onBackToShowroom={() => setActiveView('showroom')}
              onOpenCustomerDashboard={() => setActiveView('customer-dashboard')}
            />
          )
        )}
      </main>

      {/* Global Modals */}
      <OnRoadPriceModal
        variantId={priceModalVariant}
        isOpen={!!priceModalVariant}
        onClose={() => setPriceModalVariant(null)}
        onBookTestDrive={(mId) => {
          let targetModel = mId || 'model-h';
          if (!mId && priceModalVariant) {
            if (priceModalVariant.startsWith('C-')) targetModel = 'model-c';
            else if (priceModalVariant.startsWith('S-')) targetModel = 'model-s';
            else if (priceModalVariant.startsWith('E-')) targetModel = 'model-e';
          }
          setPriceModalVariant(null);
          setPreselectedTestDriveModel(targetModel);
          setTestDriveModalOpen(true);
        }}
        t={t}
      />

      <TestDriveModal
        isOpen={testDriveModalOpen}
        onClose={() => {
          setTestDriveModalOpen(false);
          setPreselectedTestDriveModel('');
        }}
        preselectedModelId={preselectedTestDriveModel}
        models={models}
        showrooms={showrooms}
        t={t}
        currentUser={currentUser}
        onBookingSuccess={() => {}}
      />

      <ServiceBookingModal
        isOpen={serviceModalOpen}
        onClose={() => setServiceModalOpen(false)}
        workshops={workshops}
        t={t}
        currentUser={currentUser}
      />

      <TradeInModal
        isOpen={tradeInModalOpen}
        onClose={() => setTradeInModalOpen(false)}
        t={t}
        currentUser={currentUser}
      />

      <CustomerAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        onOpenAdmin={() => setActiveView('admin')}
        initialMode={authModalMode}
      />

      {/* Dealership Footer */}
      <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h4 className="text-white font-bold text-sm tracking-wider uppercase">
                Company A — Brand X Dealership
              </h4>
              <p className="leading-relaxed text-slate-400">
                Authorised Passenger-Car Dealer for Brand X in Lucknow. Committed to transparent on-road pricing, guaranteed test-drive reservations, and certified vehicle maintenance.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-3">
                Showroom Locations
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-200 block">Hazratganj Flagship:</strong>
                    <span>MG Marg, Hazratganj, Lucknow</span>
                  </div>
                </li>
                <li className="flex items-start space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-200 block">Gomti Nagar Showroom:</strong>
                    <span>Vibhuti Khand, Gomti Nagar</span>
                  </div>
                </li>
                <li className="flex items-start space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-200 block">Kanpur Road Showroom:</strong>
                    <span>Sector B, Bargawan, Kanpur Road</span>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-3">
                Workshops & Used Yard
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-200 block">Transport Nagar Central:</strong>
                    <span>Phase 1, Commercial Complex (8 Bays)</span>
                  </div>
                </li>
                <li className="flex items-start space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-200 block">Chinhat East Workshop:</strong>
                    <span>Deva Road Industrial Area (5 Bays)</span>
                  </div>
                </li>
                <li className="flex items-start space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-200 block">Certified Used-Car Yard:</strong>
                    <span>Faizabad Road Pre-Owned Yard</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-3">
                Customer Support
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>Sales & Enquiries: +91 522 401 2200</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>contact@companya-brandx.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>10:00 AM – 08:00 PM (All 7 Days)</span>
                </li>
                <li className="flex items-center space-x-2 pt-1 text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Authorised Brand X Dealership</span>
                </li>
                {currentUser && currentUser.role === 'customer' && (
                  <li className="pt-2 border-t border-slate-800">
                    <button
                      onClick={() => setActiveView('customer-dashboard')}
                      className="flex items-center space-x-1.5 text-sky-400 hover:text-sky-300 font-semibold cursor-pointer transition"
                    >
                      <User className="w-3.5 h-3.5 text-sky-400" />
                      <span>My Customer Account & Bookings</span>
                    </button>
                  </li>
                )}
                <li className="pt-2 border-t border-slate-800">
                  <button
                    onClick={() => setActiveView('admin')}
                    className="flex items-center space-x-1.5 text-slate-400 hover:text-amber-400 font-medium cursor-pointer transition"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-500" />
                    <span>Dealership Staff Portal</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center text-slate-500 text-[11px] flex flex-wrap justify-between items-center gap-2">
            <span>© 2026 Company A Automotive Pvt. Ltd., Lucknow. All rights reserved.</span>
            <button
              onClick={() => setActiveView('admin')}
              className="text-slate-500 hover:text-amber-400 flex items-center space-x-1 cursor-pointer transition"
            >
              <Settings className="w-3 h-3 text-slate-500" />
              <span>Dealership Staff Login</span>
            </button>
            <span>Authorised Brand X Dealership • Lucknow, Uttar Pradesh</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

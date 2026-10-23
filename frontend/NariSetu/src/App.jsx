import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import SchemesSection from './components/SchemesSection';
import HelpSection from './components/HelpSection';
import Footer from './components/Footer';

// Modals
import AuthModal from './components/AuthModal';
import ApplyModal from './components/ApplyModal';
import CscLocatorModal from './components/CscLocatorModal';

// Dashboards & Woman Pages
import WomanProfile from './components/WomanProfile';
import CommunityChat from './components/CommunityChat';
import AdminDashboard from './components/AdminDashboard';
import OperatorDashboard from './components/OperatorDashboard';
import UserDashboard from './components/UserDashboard';

// Hooks & Services
import { useLanguage } from './hooks/useLanguage';
import { useAccessibility } from './hooks/useAccessibility';
import { authService } from './services/authService';
import { api } from './api';

// Icons
import { 
  CheckCircle2, AlertCircle, Info, X, 
  Sparkles, ArrowRight, ShieldCheck, User, ClipboardCheck, ShieldAlert 
} from 'lucide-react';

export default function App() {
  // Multilingual & accessibility custom hooks
  const { lang, changeLanguage, content, availableLanguages } = useLanguage('en');
  const { scale: fontScale, setFontScale } = useAccessibility();

  // Current user state (persisted via authService, null initially if not logged in)
  const [currentUser, setCurrentUser] = useState(() => authService.getCurrentUser());

  // Active view: 'home' | 'profile' | 'community' | 'dashboard'
  // Show landing page ('home') first!
  const [currentView, setCurrentView] = useState('home');

  // Toggle state for Empty State simulation on Community page
  const [simulateEmptyState, setSimulateEmptyState] = useState(false);

  // Modal states
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authRole, setAuthRole] = useState('user'); // 'user' | 'operator' | 'partner' | 'admin'

  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);

  const [cscLocatorOpen, setCscLocatorOpen] = useState(false);

  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  // Toast Helper
  const notify = (type, message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Open Auth directly for the specified user role
  const handleOpenAuth = (roleOrTarget = 'user') => {
    let targetRole = 'user';

    if (roleOrTarget === 'citizen' || roleOrTarget === 'user') {
      targetRole = 'user';
    } else if (roleOrTarget === 'partner' || roleOrTarget === 'business') {
      targetRole = 'partner';
    } else if (roleOrTarget === 'operator') {
      targetRole = 'operator';
    } else if (roleOrTarget === 'gov' || roleOrTarget === 'admin') {
      targetRole = 'admin';
    }

    setAuthRole(targetRole);
    setAuthModalOpen(true);
  };

  // Handle successful login
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    authService.setCurrentUser(user);
    if (user.role === 'user') {
      setCurrentView('profile');
    } else {
      setCurrentView('dashboard');
    }
    notify('success', `Welcome back, ${user.name || user.email}!`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle logout
  const handleLogout = () => {
    setCurrentUser(null);
    authService.logout();
    setCurrentView('home');
    notify('info', 'You have been signed out successfully.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Smooth navigation
  const handleNavigateSection = (sectionId) => {
    if (sectionId === 'profile') {
      if (!currentUser) {
        handleOpenAuth('citizen');
      } else {
        setCurrentView('profile');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (sectionId === 'community') {
      if (!currentUser) {
        handleOpenAuth('citizen');
      } else {
        setCurrentView('community');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (sectionId === 'home') {
      setCurrentView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'dashboard') {
      if (!currentUser) {
        handleOpenAuth('user');
      } else if (currentUser.role === 'user') {
        setCurrentView('profile');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('dashboard');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open apply scheme modal
  const handleApplyScheme = (scheme) => {
    setSelectedScheme(scheme);
    setApplyModalOpen(true);
  };

  const handleToggleSimulateEmptyState = () => {
    setSimulateEmptyState((prev) => !prev);
    notify('info', !simulateEmptyState ? 'Simulating Empty State for Community' : 'Restored active community chat stream');
  };

  return (
    <div className="min-h-screen bg-[#ededeb] text-neutral-800 flex flex-col font-sans selection:bg-orange-200 selection:text-orange-900">
      
      {/* ========================================================= */}
      {/* TOAST NOTIFICATIONS CONTAINER */}
      {/* ========================================================= */}
      <div className="fixed top-24 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => {
          const isSuccess = toast.type === 'success';
          const isError = toast.type === 'error';
          return (
            <div
              key={toast.id}
              className={`pointer-events-auto p-4 rounded-2xl shadow-xl border flex items-start gap-3 backdrop-blur-md transition-all duration-300 text-xs font-medium leading-relaxed ${
                isSuccess
                  ? 'bg-emerald-950/90 text-emerald-100 border-emerald-500/40 shadow-emerald-950/30'
                  : isError
                  ? 'bg-rose-950/90 text-rose-100 border-rose-500/40 shadow-rose-950/30'
                  : 'bg-indigo-950/90 text-indigo-100 border-indigo-500/40 shadow-indigo-950/30'
              }`}
            >
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
              {isError && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
              {!isSuccess && !isError && <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />}
              <span className="flex-1">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-white/60 hover:text-white ml-2 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* TOP NAVBAR (MATCHING WIREFRAME PANEL & BOTH SCREENSHOTS) */}
      {/* ========================================================= */}
      <Navbar
        content={content}
        lang={lang}
        onChangeLanguage={changeLanguage}
        availableLanguages={availableLanguages}
        fontScale={fontScale}
        onChangeFontScale={setFontScale}
        onOpenAuth={handleOpenAuth}
        currentUser={currentUser}
        onLogout={handleLogout}
        onNavigateSection={handleNavigateSection}
        currentView={currentView}
        onGoHome={() => {
          setCurrentView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        simulateEmptyState={simulateEmptyState}
        onToggleSimulateEmptyState={handleToggleSimulateEmptyState}
      />

      {/* ========================================================= */}
      {/* MAIN CONTENT AREA */}
      {/* ========================================================= */}
      <main className="flex-1">
        {/* 1. WOMAN USER PROFILE VIEW (IMAGE 1) */}
        {currentView === 'profile' && (
          <WomanProfile
            onNavigateToCommunity={() => {
              setCurrentView('community');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNotify={notify}
          />
        )}

        {/* 2. COMMUNITY CHAT VIEW (IMAGE 2) */}
        {currentView === 'community' && (
          <CommunityChat
            onNavigateToProfile={() => {
              setCurrentView('profile');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNotify={notify}
            simulateEmptyStateInitial={simulateEmptyState}
          />
        )}

        {/* 3. HOME LANDING VIEW */}
        {currentView === 'home' && (
          <>
            <HomeSection
              content={content}
              onOpenAuth={handleOpenAuth}
              onShowToast={(msg) => notify('info', msg)}
              onNavigate={handleNavigateSection}
              currentUser={currentUser}
            />

            <AboutSection
              content={content}
              onNavigate={handleNavigateSection}
              onOpenAuth={handleOpenAuth}
            />

            <SchemesSection
              content={content}
              onApplyScheme={handleApplyScheme}
            />

            <HelpSection
              content={content}
              onOpenCscLocator={() => setCscLocatorOpen(true)}
              onShowToast={(msg) => notify('info', msg)}
            />

            <Footer
              onOpenAuth={handleOpenAuth}
              onNavigateSection={handleNavigateSection}
            />
          </>
        )}

        {/* 4. OTHER DASHBOARDS (ADMIN / OPERATOR) */}
        {currentView === 'dashboard' && (
          <div className="min-h-[70vh] bg-gradient-to-b from-[#fbf8f3] to-[#f5eee6] pb-20">
            {currentUser ? (
              <>
                {currentUser.role === 'admin' && (
                  <AdminDashboard currentUser={currentUser} onNotify={notify} />
                )}
                {currentUser.role === 'operator' && (
                  <OperatorDashboard currentUser={currentUser} onNotify={notify} />
                )}
                {currentUser.role === 'user' && (
                  <WomanProfile
                    onNavigateToCommunity={() => setCurrentView('community')}
                    onNotify={notify}
                  />
                )}
              </>
            ) : (
              <div className="py-20 max-w-4xl mx-auto px-4 text-center">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center mb-6 shadow-md">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
                  Authentication Required
                </h2>
                <p className="text-neutral-600 max-w-md mx-auto mt-2 text-sm">
                  Please sign in with your verified credentials to access your role-based portal.
                </p>

                <div className="mt-8 flex justify-center gap-4">
                  <button
                    onClick={() => handleOpenAuth('user')}
                    className="px-6 py-3 rounded-2xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    Sign In as Woman Artisan
                  </button>
                  <button
                    onClick={() => setCurrentView('home')}
                    className="px-6 py-3 rounded-2xl bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-800 font-bold text-sm shadow-xs transition-all cursor-pointer"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ========================================================= */}
      {/* MODALS */}
      {/* ========================================================= */}
      <AuthModal
        isOpen={authModalOpen}
        initialRole={authRole}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleLoginSuccess}
        onNotify={notify}
      />

      <ApplyModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        scheme={selectedScheme}
        lang={lang}
        onShowToast={(msg) => notify('success', msg)}
      />

      <CscLocatorModal
        isOpen={cscLocatorOpen}
        onClose={() => setCscLocatorOpen(false)}
        lang={lang}
        onShowToast={(msg) => notify('info', msg)}
      />

    </div>
  );
}

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import SchemesSection from './components/SchemesSection';
import HelpSection from './components/HelpSection';
import Footer from './components/Footer';
import VoiceModal from './components/VoiceModal';
import ApplyModal from './components/ApplyModal';
import AuthModal from './components/AuthModal';
import CscLocatorModal from './components/CscLocatorModal';
import { content } from './data/content';
import './App.css';

export default function App() {
  const [lang, setLang] = useState('en');
  const [fontScale, setFontScale] = useState(1);
  const [activeSection, setActiveSection] = useState('home');
  const [viewMode, setViewMode] = useState('all'); // 'all' | 'home' | 'about' | 'schemes' | 'help'

  // Modals state
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authRole, setAuthRole] = useState('citizen');
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [isCscOpen, setIsCscOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const currentContent = content[lang] || content.en;

  // Apply dynamic font scale to html root
  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', fontScale);
  }, [fontScale]);

  // Toast auto-dismiss
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Smooth scroll handler
  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    if (viewMode !== 'all') {
      setViewMode(sectionId);
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Auth portal opener
  const handleOpenAuth = (role = 'citizen') => {
    setAuthRole(role);
    setIsAuthOpen(true);
  };

  // Scheme apply opener
  const handleApplyScheme = (scheme) => {
    setSelectedScheme(scheme);
    setIsApplyOpen(true);
  };

  return (
    <div className="app-container">
      {/* Navbar with Header & Accessibility Tools */}
      <Navbar
        lang={lang}
        setLang={setLang}
        fontScale={fontScale}
        setFontScale={setFontScale}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenVoice={() => setIsVoiceOpen(true)}
        onOpenAuth={handleOpenAuth}
        viewMode={viewMode}
        setViewMode={(mode) => {
          setViewMode(mode);
          if (mode !== 'all') {
            setActiveSection(mode);
            setTimeout(() => {
              const el = document.getElementById(mode);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 50);
          }
        }}
      />

      {/* Main Content Sections */}
      <main>
        {/* 01. HOME */}
        {(viewMode === 'all' || viewMode === 'home') && (
          <HomeSection
            content={currentContent}
            onOpenAuth={handleOpenAuth}
            onShowToast={showToast}
            onNavigate={handleNavigate}
          />
        )}

        {/* 02. ABOUT US */}
        {(viewMode === 'all' || viewMode === 'about') && (
          <AboutSection
            content={currentContent}
            onNavigate={handleNavigate}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {/* 03. SCHEMES & SUPPORT */}
        {(viewMode === 'all' || viewMode === 'schemes') && (
          <SchemesSection
            content={currentContent}
            lang={lang}
            onApplyScheme={handleApplyScheme}
            onShowToast={showToast}
          />
        )}

        {/* 04. HELP / SAHAYATA KENDRA */}
        {(viewMode === 'all' || viewMode === 'help') && (
          <HelpSection
            content={currentContent}
            onOpenVoice={() => setIsVoiceOpen(true)}
            onOpenCscLocator={() => setIsCscOpen(true)}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        content={currentContent}
        onNavigate={handleNavigate}
        onShowToast={showToast}
      />

      {/* Interactive Modals */}
      <VoiceModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        lang={lang}
        onShowToast={showToast}
      />

      <ApplyModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        scheme={selectedScheme}
        lang={lang}
        onShowToast={showToast}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialRole={authRole}
        lang={lang}
        onShowToast={showToast}
      />

      <CscLocatorModal
        isOpen={isCscOpen}
        onClose={() => setIsCscOpen(false)}
        lang={lang}
        onShowToast={showToast}
      />

      {/* Global Toast Alert */}
      {toastMessage && (
        <div className="toast-notice">
          <span>🔔</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

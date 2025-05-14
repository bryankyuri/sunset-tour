// src/contexts/PwaInstallContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const PwaInstallContext = createContext(null);
const INFOBAR_DISMISSED_KEY = 'pwa-infobar-dismissed';

export const PwaInstallProvider = ({ children }) => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const [showMiniInfobar, setShowMiniInfobar] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  
  // iOS Safari detection function
  const checkIOSSafari = () => {
    const ua = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua) || 
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); // Modern iPads
    const isSafari = /Safari/.test(ua) && !/Chrome/.test(ua) && !/CriOS/.test(ua) && !/FxiOS/.test(ua);
    
    return isIOS && isSafari;
  };
  
  useEffect(() => {
    // Check if app is already installed
    const checkIfInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isIOSInstalled = window.navigator.standalone === true;
      setIsAppInstalled(isStandalone || isIOSInstalled);
    };
    
    checkIfInstalled();
    
    // Check if user has previously dismissed the infobar
    const isDismissed = sessionStorage.getItem(INFOBAR_DISMISSED_KEY) === 'true';
    
    // For iOS Safari, we need to manually set installable state
    // since beforeinstallprompt doesn't fire on iOS
    const isIOSSafari = checkIOSSafari();
    
    if (isIOSSafari) {
      setIsInstallable(true);
      
      // Only show mini-infobar on iOS Safari if not dismissed
      if (!isDismissed && !isAppInstalled) {
        setTimeout(() => {
          setShowMiniInfobar(true);
        }, 2000);
      }
    }
    
    // For other browsers, capture install prompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      setIsInstallable(true);
      
      // Only show the mini-infobar if it wasn't dismissed before
      if (!isDismissed) {
        // Small delay before showing
        setTimeout(() => {
          setShowMiniInfobar(true);
        }, 2000);
      }
    };
    
    const handleAppInstalled = () => {
      setIsAppInstalled(true);
      setInstallPrompt(null);
      setShowMiniInfobar(false);
      // Clear the dismissed flag after installation
      sessionStorage.removeItem(INFOBAR_DISMISSED_KEY);
    };
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);
  
  const triggerInstall = async () => {
    // For iOS Safari, just show instructions
    if (checkIOSSafari()) {
      showIOSInstallInstructions();
      return false;
    }
    
    // For other browsers, use the installPrompt
    if (!installPrompt) return false;
    
    try {
      installPrompt.prompt();
      const result = await installPrompt.userChoice;
      
      // Reset the prompt variable - it can only be used once
      setInstallPrompt(null);
      setShowMiniInfobar(false);
      
      if (result.outcome === 'accepted') {
        setIsAppInstalled(true);
        // Clear the dismissed flag after installation
        sessionStorage.removeItem(INFOBAR_DISMISSED_KEY);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Installation error:', error);
      return false;
    }
  };
  
  // Show iOS installation instructions
  const showIOSInstallInstructions = () => {
    // This could be a modal or toast with instructions
    // For now, we'll just use alert, but you might want to replace this
    // with a nicer UI component
    alert(
      'To install this app on your iOS device:\n\n' +
      '1. Tap the Share icon in Safari\n' +
      '2. Scroll down and tap "Add to Home Screen"\n' +
      '3. Tap "Add" in the upper right corner'
    );
    
    // Consider the infobar "dismissed" after showing instructions
    dismissInfobar();
    return false;
  };
  
  const dismissInfobar = () => {
    // Save the user's preference in sessionStorage
    sessionStorage.setItem(INFOBAR_DISMISSED_KEY, 'true');
    setShowMiniInfobar(false);
  };
  
  return (
    <PwaInstallContext.Provider value={{
      installPrompt,
      isAppInstalled,
      triggerInstall,
      showMiniInfobar,
      dismissInfobar,
      isIOSSafari: checkIOSSafari(),
      canInstall: (!!installPrompt || checkIOSSafari()) && !isAppInstalled
    }}>
      {children}
    </PwaInstallContext.Provider>
  );
};

export const usePwaInstall = () => {
  const context = useContext(PwaInstallContext);
  if (context === null) {
    throw new Error('usePwaInstall must be used within a PwaInstallProvider');
  }
  return context;
};
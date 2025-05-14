// Service worker registration with iOS support
export async function registerServiceWorker() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      // iOS detection
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      const isPWA = window.matchMedia('(display-mode: standalone)').matches;
      
      console.log('Registering service worker...');
      console.log('Environment:', { isIOS, isPWA });
      
      // Path to your existing service worker
      const swPath = '/serviceWorker.js'; // Adjust if your file is named differently
      
      // Register the service worker
      const registration = await navigator.serviceWorker.register(swPath, {
        scope: '/'
      });
      
      console.log('Service Worker registered with scope:', registration.scope);
      
      // iOS-specific logic
      if (isIOS) {
        console.log('iOS device detected - checking push capability');
        if (isPWA) {
          console.log('Running as installed PWA on iOS - push should work on iOS 16.4+');
        } else {
          console.log('Not running as PWA - push notifications require installation on iOS');
        }
      }
      
      return registration;
    } catch (error) {
      console.error('Service worker registration failed:', error);
      return null;
    }
  } else {
    console.log('Service workers or push messaging not supported in this browser');
    return null;
  }
}

// Function to check if service worker is active
export async function isServiceWorkerActive() {
  if (!('serviceWorker' in navigator)) return false;
  
  const registration = await navigator.serviceWorker.getRegistration();
  return !!registration && !!registration.active;
}
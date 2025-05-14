import React, { useState, useEffect } from 'react';
import styles from './NetworkToast.module.scss';

const NetworkToast = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [visible, setVisible] = useState(false);

  // Function to check real connectivity
  const checkRealConnectivity = async () => {
    try {
      // Make a tiny request to check real connectivity
      // The timestamp parameter prevents caching
      const response = await fetch('/favicon.ico?' + new Date().getTime(), { 
        method: 'HEAD',
        cache: 'no-store',
        mode: 'no-cors',
        timeout: 2000
      });
      setIsOnline(true);
      return true;
    } catch (error) {
      setIsOnline(false);
      return false;
    }
  };

  useEffect(() => {
    // Check initial connectivity with a real request
    checkRealConnectivity();

    // Event handlers for online/offline events
    const handleOffline = () => {
      console.log('Offline event detected');
      // Double-check with a real request to avoid false positives
      checkRealConnectivity().then(isReallyOnline => {
        if (!isReallyOnline) {
          setVisible(true);
        }
      });
    };

    const handleOnline = () => {
      console.log('Online event detected');
      checkRealConnectivity().then(isReallyOnline => {
        if (isReallyOnline) {
          setIsOnline(true);
          // Show "back online" message briefly before hiding
          setVisible(true);
          setTimeout(() => {
            setVisible(false);
          }, 3000);
        }
      });
    };

    // Add event listeners
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    // Set up periodic connectivity checks (every 30 seconds)
    const intervalId = setInterval(() => {
      checkRealConnectivity().then(isReallyOnline => {
        if (isReallyOnline !== isOnline) {
          setIsOnline(isReallyOnline);
          setVisible(!isReallyOnline ? true : false);
          if (isReallyOnline) {
            setTimeout(() => setVisible(false), 3000);
          }
        }
      });
    }, 30000);

    // Clean up
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
      clearInterval(intervalId);
    };
  }, [isOnline]);

  // If not visible, don't render anything
  if (!visible) return null;

  return (
    <div className={`${styles.networkToast} ${isOnline ? styles.online : styles.offline}`}>
      <div className={styles.icon}>
        {isOnline ? '🟢' : '🔴'}
      </div>
      <div className={styles.message}>
        {isOnline ? 'Back online' : 'You are offline'}
      </div>
      <button 
        className={styles.closeButton} 
        onClick={() => setVisible(false)}
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  );
};

export default NetworkToast;
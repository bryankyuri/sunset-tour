import { useState, useEffect } from 'react';
import './DevTools.css';
import { getMessaging, getToken } from 'firebase/messaging';
import { requestNotificationPermission } from '../services/firebase';

function DevTools() {
  const [isOpen, setIsOpen] = useState(false);
  const [deviceId, setDeviceId] = useState('Loading...');
  const [deviceInfo, setDeviceInfo] = useState({});

  const updateDeviceId = async () => {
    try {
      // Device detection
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      const isPWA = window.matchMedia('(display-mode: standalone)').matches;
      
      setDeviceInfo({
        userAgent: navigator.userAgent,
        isIOS,
        isPWA,
        mode: isPWA ? 'standalone' : 'browser'
      });

      // Try to get token from various storage methods
      let fcmToken = localStorage.getItem('fcmToken') || 
                    sessionStorage.getItem('fcmToken');
      
      if (fcmToken) {
        setDeviceId(fcmToken);
        return;
      }
      
      // If token not found in storage, request it
      if ('Notification' in window && navigator.serviceWorker) {
        try {
          // Use your existing function to get token
          const token = await requestNotificationPermission();
          
          if (token) {
            setDeviceId(token);
            return;
          }
        } catch (firebaseError) {
          console.log('Firebase token error:', firebaseError);
        }
      }
      
      setDeviceId('FCM Token not found - Make sure notifications are enabled');
    } catch (error) {
      console.error('Error fetching device ID:', error);
      setDeviceId('Error retrieving FCM token');
    }
  };

  useEffect(() => {
    updateDeviceId();
  }, []);

  return (
    <>
      <button 
        className="devtools-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Developer Tools"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="currentColor">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
        </svg>
      </button>
      
      {isOpen && (
        <div className="devtools-popup">
          <div className="devtools-popup-header">
            <h3>DevTools</h3>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>
          <div className="devtools-popup-content">
            <h4>Device Info</h4>
            <div className="device-info">
              <p>iOS: {deviceInfo.isIOS ? 'Yes' : 'No'}</p>
              <p>PWA Mode: {deviceInfo.isPWA ? 'Yes' : 'No'}</p>
            </div>
            
            <h4>FCM Token</h4>
            <div className="device-id-container">
              <p className="device-id">{deviceId}</p>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(deviceId);
                  alert('FCM Token copied to clipboard!');
                }}
              >
                Copy
              </button>
            </div>
            <button 
              className="refresh-button" 
              onClick={updateDeviceId}
            >
              Refresh Token
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DevTools;
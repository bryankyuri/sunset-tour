import React, { useState, useEffect } from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { requestNotificationPermission } from '../services/firebase';

const Header = () => {
  const [notificationStatus, setNotificationStatus] = useState('default');
  
  // Check notification permission on component mount
  useEffect(() => {
    if ('Notification' in window) {
      setNotificationStatus(Notification.permission);
      
      // Add permission change listener
      if (navigator.permissions && navigator.permissions.query) {
        navigator.permissions.query({ name: 'notifications' })
          .then(permissionStatus => {
            // Update initial state
            setNotificationStatus(permissionStatus.state);
            
            // Add listener for future changes
            permissionStatus.onchange = () => {
              setNotificationStatus(permissionStatus.state);
            };
          })
          .catch(err => console.log('Permission query error:', err));
      }
    }
  }, []);
  
  const handleNotificationToggle = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications.');
      return;
    }
    
    // If permission is already granted, show confirmation
    if (notificationStatus === 'granted') {
      alert('Notifications are enabled! To disable them, please use your browser settings.');
      return;
    }
    
    // If permission is denied, show instructions to reset
    if (notificationStatus === 'denied') {
      // Determine browser and provide specific instructions
      const browser = detectBrowser();
      let instructions = '';
      
      if (browser === 'chrome') {
        instructions = 'To reset notification permissions:\n\n' +
          '1. Click the lock/info icon in the address bar\n' +
          '2. Click "Site Settings"\n' +
          '3. Find "Notifications" and change to "Ask" or "Allow"';
      } else if (browser === 'firefox') {
        instructions = 'To reset notification permissions:\n\n' +
          '1. Click the lock icon in the address bar\n' +
          '2. Click the gear icon next to "Permissions"\n' +
          '3. Find "Send Notifications" and change to "Allow"';
      } else if (browser === 'safari') {
        instructions = 'To reset notification permissions:\n\n' +
          '1. Open Safari Preferences\n' +
          '2. Go to the "Websites" tab\n' +
          '3. Select "Notifications" and change the permission for this website';
      } else {
        instructions = 'To reset notification permissions, please check your browser settings and look for permission settings for this website.';
      }
      
      alert('Notifications are currently blocked by your browser.\n\n' + instructions);
      return;
    }
    
    try {
      const token = await requestNotificationPermission();
      
      // Update status regardless of the outcome
      // This ensures the UI updates even if the user denies permission
      if ('Notification' in window) {
        setNotificationStatus(Notification.permission);
      }
      
      if (token) {
        console.log("FCM token obtained:", token);
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      // Still check the permission state even if there was an error
      if ('Notification' in window) {
        setNotificationStatus(Notification.permission);
      }
    }
  };
  
  // Helper function to detect browser
  const detectBrowser = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('chrome') > -1) return 'chrome';
    if (userAgent.indexOf('firefox') > -1) return 'firefox';
    if (userAgent.indexOf('safari') > -1) return 'safari';
    return 'other';
  };
  
  // Determine the bell icon color based on permission status
  // Now keeping the same color for both denied and default states
  const getBellColor = () => {
    return notificationStatus === 'granted' ? '#4CAF50' : notificationStatus === 'denied' ? "#ef4444" : '#9E9E9E';
  };

  return (
    <header className={styles.header}>
      <Link to="/" className="flex lg:justify-start justify-center items-center px-8">
        <img src="/Logo.png" alt="Logo" className='mr-1' height="auto" width="60px" />
        <div className="text-[#fab978] text-4xl font-bold mt-1">
          Sunset Tour
        </div>
      </Link>
      
      {/* Notification Bell Button */}
      <div className="ml-auto pr-4 flex items-center">
        <button 
          onClick={handleNotificationToggle}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
          aria-label="Toggle notifications"
          title={
            notificationStatus === 'granted' 
              ? 'Notifications are enabled' 
              : notificationStatus === 'denied'
                ? 'Click for help enabling notifications'
                : 'Enable notifications'
          }
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24"
            fill={getBellColor()}
          >
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>

        </button>
      </div>
    </header>
  );
};

export default Header;
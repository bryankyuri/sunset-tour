// src/components/MiniInfobar.jsx
import React from 'react';
import { usePwaInstall } from '../contexts/PwaInstallContext';
import styles from './MiniInfobar.module.scss';

const MiniInfobar = () => {
  const { showMiniInfobar, triggerInstall, dismissInfobar, canInstall } = usePwaInstall();
  
  if (!showMiniInfobar || !canInstall) return null;
  
  return (
    <div className={styles.miniInfobar}>
      <div className={styles.iconContainer}>
        <img 
          src="/Logo/android/android-launchericon-48-48.png" 
          alt="App icon" 
          className={styles.appIcon} 
        />
      </div>
      <div className={styles.content}>
        <p>Install this app on your device</p>
      </div>
      <div className={styles.actions}>
        <button 
          className={styles.installButton} 
          onClick={triggerInstall}
        >
          Install
        </button>
        <button 
          className={styles.closeButton} 
          onClick={dismissInfobar}
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default MiniInfobar;
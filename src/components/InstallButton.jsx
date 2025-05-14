// src/components/InstallButton.jsx
import React from 'react';
import { usePwaInstall } from '../contexts/PwaInstallContext';
import styles from './InstallButton.module.scss';

const InstallButton = () => {
  const { canInstall, triggerInstall } = usePwaInstall();
  
  // Don't render if installation isn't available
  if (!canInstall) return null;
  
  return (
    <button 
      className={styles.installButton} 
      onClick={triggerInstall}
      aria-label="Install App"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
      Install
    </button>
  );
};

export default InstallButton;
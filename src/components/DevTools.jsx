import React from 'react';

const DevTools = () => {
  const clearCacheAndReload = () => {
    if ('caches' in window) {
      // Clear all caches
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name);
        });
      });
    }
    window.location.reload(true);
  };
  
  // Only show in development mode
  if (import.meta.env.DEV) {
    return (
      <div style={{position: 'fixed', bottom: '10px', right: '10px', zIndex: 9999}}>
        <button 
          onClick={clearCacheAndReload}
          style={{
            background: '#ff4757',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Clear Cache & Refresh
        </button>
      </div>
    );
  }
  
  return null;
};

export default DevTools;
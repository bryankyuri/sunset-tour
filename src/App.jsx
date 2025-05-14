import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TourDetail from './pages/TourDetail';
import Header from './components/Header';
import Footer from './components/Footer';
import NetworkToast from './components/NetworkToast';
import MiniInfobar from './components/MiniInfobar';
import InstallButton from './components/InstallButton';
import { PwaInstallProvider } from './contexts/PwaInstallContext';
import styles from './App.module.scss';
import './index.css';
import { requestNotificationPermission, setupMessaging } from './services/firebase';

function App() {
  useEffect(() => {
    // Initialize FCM
    const initializeFCM = async () => {
      try {
        // Don't manually register the service worker - let Firebase do it
        // Just request permission directly
        const token = await requestNotificationPermission();
        if (token) {
          setupMessaging();
          console.log("Your device token:", token);
        }
      } catch (error) {
        console.error('Firebase messaging error:', error);
      }
    };
    
    initializeFCM();
  }, []);

  return (
    <PwaInstallProvider>
      <Router>
        <div className={styles.app}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tour/:id" element={<TourDetail />} />
          </Routes>
          <Footer />
          <NetworkToast />
          <MiniInfobar />
        </div>
      </Router>
    </PwaInstallProvider>
  );
}

export default App;
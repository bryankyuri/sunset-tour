import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TourDetail from './pages/TourDetail';
import Header from './components/Header';
import Footer from './components/Footer';
import NetworkToast from './components/NetworkToast';
import styles from './App.module.scss';
import './index.css';

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tour/:id" element={<TourDetail />} />
        </Routes>
        <Footer />
        <NetworkToast />
      </div>
    </Router>
  );
}

export default App;
import React, { useState } from 'react';
import GeolocationCard from './GeolocationCard';
import useGeolocation from '../hooks/useGeolocation';
import styles from './FeatureSection.module.scss';

const FeatureSection = () => {
  const { location, error, getGeolocation } = useGeolocation();
  const [showCard, setShowCard] = useState(false);

  const handleGetGeolocation = () => {
    getGeolocation();
    setShowCard(true);
  };

  return (
    <section className={styles.featureSection}>
      <h2>Geolocation Feature</h2>
      <p>Click the button below to get your current coordinates</p>
      
      <button onClick={handleGetGeolocation}>
        Get My Location
      </button>
      
      {error && <p className={styles.error}>{error}</p>}
      
      {showCard && location.latitude && location.longitude && (
        <GeolocationCard 
          latitude={location.latitude} 
          longitude={location.longitude} 
        />
      )}
    </section>
  );
};

export default FeatureSection;
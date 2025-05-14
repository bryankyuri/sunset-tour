import React from 'react';
import styles from './GeolocationCard.module.scss';

const GeolocationCard = ({ latitude, longitude }) => {
  return (
    <div className={styles.geolocationCard}>
      <h2>Your Location</h2>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
    </div>
  );
};

export default GeolocationCard;
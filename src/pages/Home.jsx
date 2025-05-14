import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import FeatureSection from "../components/FeatureSection";
import useGeolocation from "../hooks/useGeolocation";
import { FiMap, FiClock, FiUser, FiPercent } from "react-icons/fi";
import styles from "./Home.module.scss";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {
  const { location, error, getGeolocation } = useGeolocation();

  const tours = [
    {
      id: 1,
      title: "Alone with nature",
      price: "$100",
      image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=500",
      rating: "5.0"
    },
    {
      id: 2,
      title: "Jeep ride",
      price: "$200",
      image: "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?q=80&w=500", // Fixed URL
      rating: "4.9"
    },
    {
      id: 3,
      title: "Hiking tour",
      price: "$150",
      image: "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?q=80&w=500",
      rating: "5.0"
    },
    {
      id: 4,
      title: "Corners of the Island",
      price: "$220",
      image: "https://images.unsplash.com/photo-1506318164473-2dfd3ede3623?q=80&w=500",
      rating: "4.8"
    }
  ];

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Explore the sights of the world</h1>
          <h2>A place where nature and adventure unite</h2>
          <button className={styles.bookNow}>Book now</button>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.values}>
        <h2>Top values for you</h2>
        <p>Try variety of benefits when using our services</p>

        <div className={styles.valueCards}>
          <div className={styles.valueCard}>
            <FiMap className={styles.icon} />
            <h3>Airport pickup</h3>
            <p>We provide escort from the airport to the hotel</p>
          </div>
          <div className={styles.valueCard}>
            <FiClock className={styles.icon} />
            <h3>Easy booking</h3>
            <p>Quick and easy booking of tours for upcoming dates</p>
          </div>
          <div className={styles.valueCard}>
            <FiUser className={styles.icon} />
            <h3>Best tour guide</h3>
            <p>Our best tour guide is ready to guide your trip</p>
          </div>
          <div className={styles.valueCard}>
            <FiPercent className={styles.icon} />
            <h3>Lots of promos</h3>
            <p>Various promotions and drawings of tours</p>
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section className={styles.tours}>
        <h2>Choose your tour</h2>
        
        <div className={styles.tourCards}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className={styles.swiper}
          >
            {tours.map((tour) => (
              <SwiperSlide key={tour.id}>
                <Link to={`/tour/${tour.id}`} className={styles.tourCard}>
                  <div className={styles.tourImage} style={{ backgroundImage: `url(${tour.image})` }}>
                    <span className={styles.rating}>{tour.rating} ★</span>
                  </div>
                  <div className={styles.tourInfo}>
                    <h3>{tour.title}</h3>
                    <p>{tour.price} <span>/person</span></p>
                    <div className={styles.viewTour}>View</div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
      </section>

      {/* Geolocation Section */}
      <section className={styles.geolocationSection}>
        <h2>Discover Your Current Location</h2>
        <p>Get your coordinates with just one click</p>
        
        <div className={styles.geolocationContainer}>
          <button onClick={getGeolocation} className={styles.locationButton}>
            Find My Location
          </button>
          
          {error && <p className={styles.error}>{error}</p>}
          
          {location.latitude && location.longitude && (
            <div className={styles.locationCard}>
              <h3>Your Current Coordinates</h3>
              <div className={styles.coordinates}>
                <div className={styles.coordinate}>
                  <span>Latitude</span>
                  <p>{location.latitude.toFixed(6)}°</p>
                </div>
                <div className={styles.coordinate}>
                  <span>Longitude</span>
                  <p>{location.longitude.toFixed(6)}°</p>
                </div>
              </div>
              <p className={styles.locationInfo}>
                These coordinates can be used to find your exact position on Earth.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

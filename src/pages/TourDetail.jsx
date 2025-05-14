import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FiClock, FiUsers, FiMapPin, FiCalendar } from "react-icons/fi";
import styles from "./TourDetail.module.scss";

// Loading skeleton component
const TourDetailSkeleton = () => {
  return (
    <div className={styles.tourDetail}>
      {/* Hero section skeleton */}
      <div className={`${styles.hero} ${styles.skeleton}`}>
        <div className={styles.heroContent}>
          <div className={`${styles.skeletonRating} ${styles.pulse}`}></div>
          <div className={`${styles.skeletonTitle} ${styles.pulse}`}></div>
        </div>
      </div>

      {/* Content section skeleton */}
      <div className={styles.contentGrid}>
        <div className={styles.main}>
          {/* Price skeleton */}
          <div className={styles.price}>
            <div className={`${styles.skeletonText} ${styles.pulse}`} style={{ width: '120px' }}></div>
          </div>

          {/* Description skeleton */}
          <div className={styles.description}>
            <div className={`${styles.skeletonHeading} ${styles.pulse}`}></div>
            <div className={`${styles.skeletonText} ${styles.pulse}`}></div>
            <div className={`${styles.skeletonText} ${styles.pulse}`}></div>
          </div>

          {/* Features skeleton */}
          <div className={styles.features}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className={styles.feature}>
                <div className={`${styles.skeletonIcon} ${styles.pulse}`}></div>
                <div>
                  <div className={`${styles.skeletonSmallText} ${styles.pulse}`}></div>
                  <div className={`${styles.skeletonSmallText} ${styles.pulse}`}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Includes skeleton */}
          <div className={styles.includes}>
            <div className={`${styles.skeletonHeading} ${styles.pulse}`}></div>
            <ul>
              {[...Array(4)].map((_, i) => (
                <li key={i} className={`${styles.skeletonSmallText} ${styles.pulse}`}></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar skeleton */}
        <div className={styles.sidebar}>
          <div className={styles.bookingCard}>
            <div className={`${styles.skeletonHeading} ${styles.pulse}`}></div>
            <div className={`${styles.skeletonText} ${styles.pulse}`} style={{ width: '100px' }}></div>
            <div className={styles.bookingForm}>
              <div className={styles.formGroup}>
                <div className={`${styles.skeletonSmallText} ${styles.pulse}`}></div>
                <div className={`${styles.skeletonInput} ${styles.pulse}`}></div>
              </div>
              <div className={styles.formGroup}>
                <div className={`${styles.skeletonSmallText} ${styles.pulse}`}></div>
                <div className={`${styles.skeletonInput} ${styles.pulse}`}></div>
              </div>
              <div className={`${styles.skeletonButton} ${styles.pulse}`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TourDetail = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sample tour data - in a real app, you'd fetch this from an API based on ID
  const tourData = {
    1: {
      id: 1,
      title: "Alone with nature",
      price: "$100",
      image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=1200",
      rating: "5.0",
      description: "Experience the serenity of nature with this exclusive tour that takes you through pristine forests and breathtaking landscapes. Disconnect from the digital world and connect with the natural environment.",
      duration: "6 hours",
      groupSize: "1-2 people",
      location: "National Park",
      dates: "Available all year",
      includes: ["Professional guide", "Snacks and refreshments", "Transportation", "Safety equipment"]
    },
    2: {
      id: 2,
      title: "Jeep ride",
      price: "$200",
      image: "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?q=80&w=1200",
      rating: "4.9",
      description: "Embark on an exciting jeep adventure through rugged terrains and scenic routes. Our experienced drivers will take you off the beaten path to discover hidden gems and spectacular viewpoints.",
      duration: "4 hours",
      groupSize: "2-6 people",
      location: "Mountain trails",
      dates: "March to November",
      includes: ["Expert driver", "Off-road vehicle", "Refreshments", "Photo stops"]
    },
    3: {
      id: 3,
      title: "Hiking tour",
      price: "$150",
      image: "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?q=80&w=1200",
      rating: "5.0",
      description: "Challenge yourself with our guided hiking tour through beautiful mountain trails. Suitable for all experience levels, this tour combines physical activity with stunning natural scenery.",
      duration: "8 hours",
      groupSize: "4-12 people",
      location: "Mountain ranges",
      dates: "April to October",
      includes: ["Trail guide", "Packed lunch", "Walking poles", "First aid kit"]
    },
    4: {
      id: 4,
      title: "Corners of the Island",
      price: "$220",
      image: "https://images.unsplash.com/photo-1506318164473-2dfd3ede3623?q=80&w=1200",
      rating: "4.8",
      description: "Explore the hidden corners of our beautiful island with this comprehensive tour. Visit secluded beaches, local villages, and spectacular viewpoints that most tourists never see.",
      duration: "Full day (10 hours)",
      groupSize: "4-8 people",
      location: "Coastal areas and inland",
      dates: "Year-round",
      includes: ["Local guide", "Lunch at authentic restaurant", "Transportation", "Entrance fees"]
    }
  };

  useEffect(() => {
    // Simulate API fetch
    const fetchTour = async () => {
      setLoading(true);
      try {
        // In a real app, fetch from API instead of using local data
        // const response = await fetch(`/api/tours/${id}`);
        // const data = await response.json();
        
        // Using our sample data instead
        setTimeout(() => {
          setTour(tourData[id]);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching tour:", error);
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  if (loading) {
    return <TourDetailSkeleton />;
  }

  if (!tour) {
    return <div className={styles.error}>Tour not found</div>;
  }

  return (
    <div className={styles.tourDetail}>
      <div className={styles.hero} style={{ backgroundImage: `url(${tour.image})` }}>
        <div className={styles.overlay}></div>
        <div className={styles.backLink}>
            <Link to="/">← Back </Link>
          </div>
        <div className={styles.heroContent}>
          
          <span className={styles.rating}>{tour.rating} ★</span>
          <h1>{tour.title}</h1>
        </div>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.main}>
          <div className={styles.price}>
            <span>{tour.price}</span> per person
          </div>

          <div className={styles.description}>
            <h2>About This Tour</h2>
            <p>{tour.description}</p>
          </div>

          <div className={styles.features}>
            <div className={styles.feature}>
              <FiClock className={styles.icon} />
              <div>
                <h3>Duration</h3>
                <p>{tour.duration}</p>
              </div>
            </div>
            <div className={styles.feature}>
              <FiUsers className={styles.icon} />
              <div>
                <h3>Group Size</h3>
                <p>{tour.groupSize}</p>
              </div>
            </div>
            <div className={styles.feature}>
              <FiMapPin className={styles.icon} />
              <div>
                <h3>Location</h3>
                <p>{tour.location}</p>
              </div>
            </div>
            <div className={styles.feature}>
              <FiCalendar className={styles.icon} />
              <div>
                <h3>Dates</h3>
                <p>{tour.dates}</p>
              </div>
            </div>
          </div>

          <div className={styles.includes}>
            <h2>What's Included</h2>
            <ul>
              {tour.includes.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.bookingCard}>
            <h3>Book This Tour</h3>
            <div className={styles.bookingPrice}>{tour.price} <span>per person</span></div>
            <form className={styles.bookingForm}>
              <div className={styles.formGroup}>
                <label htmlFor="date">Select Date:</label>
                <input type="date" id="date" name="date" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="guests">Number of Guests:</label>
                <select id="guests" name="guests">
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                  <option value="5">5+ People</option>
                </select>
              </div>
              <button type="submit" className={styles.bookNow}>Book Now</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;
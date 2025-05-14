import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Sunset Tour. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
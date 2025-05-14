import React from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className="flex lg:justify-start justify-center items-center px-8">
        <img src="/Logo.png" alt="Logo" className='mr-1' height="auto" width="60px" />
        <div className="text-[#fab978] text-4xl font-bold mt-1">
          Sunset Tour
        </div>
      </Link>
    </header>
  );
};

export default Header;
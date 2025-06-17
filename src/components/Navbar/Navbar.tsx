import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }
  const { isAuthenticated, logout } = authContext;

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <Link to="/dashboard" className={styles.logo}>
          Aadhaar OCR
        </Link>
        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          ☰
        </button>
        <div className={styles.navLinks}>
          {isAuthenticated ? (
            <>
              <Link to="/upload" className={styles.navLink}>
                Upload
              </Link>
              <Link to="/history" className={styles.navLink}>
                History
              </Link>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/dashboard" className={styles.navLink}>
                Dashboard
              </Link>
              <Link to="/login" className={styles.navLink}>
                Login
              </Link>
              <Link to="/register" className={styles.navLink}>
                Register
              </Link>
            </>
          )}
        </div>
        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
          {isAuthenticated ? (
            <>
              <Link to="/upload" className={styles.navLink} onClick={toggleMenu}>
                Upload
              </Link>
              <Link to="/history" className={styles.navLink} onClick={toggleMenu}>
                History
              </Link>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/dashboard" className={styles.navLink} onClick={toggleMenu}>
                Dashboard
              </Link>
              <Link to="/login" className={styles.navLink} onClick={toggleMenu}>
                Login
              </Link>
              <Link to="/register" className={styles.navLink} onClick={toggleMenu}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
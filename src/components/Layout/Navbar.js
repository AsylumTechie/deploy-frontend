import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
  
  return (
    <nav style={styles.navbar}>
      <div style={styles.brand}>
        <Link to="/" style={styles.logo}>MyStore</Link>
      </div>
      <div style={styles.links}>
        {isAuthenticated ? (
          <>
            <Link to="/create-product" style={styles.link}>Create Product</Link>
            <Link to="/products" style={styles.link}>My Products</Link>
            <button onClick={onLogout} style={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/register" style={styles.link}>Register</Link>
            <Link to="/login" style={styles.link}>Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#1A1A2E',
    padding: '1rem 3rem',
    color: 'white',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.25)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  brand: {
    fontSize: '1.75rem',
    fontWeight: '900',
    letterSpacing: '2px',
    userSelect: 'none',
  },
  logo: {
    textDecoration: 'none',
    color: '#E94560',
    fontWeight: '900',
    fontSize: '1.75rem',
    transition: 'color 0.3s',
  },
  links: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  },
  link: {
    
    textDecoration: 'none',
    color: 'black',
    fontSize: '1.1rem',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    fontWeight: '600',
    backgroundColor: 'transparent',
    transition: 'background-color 0.3s, color 0.3s',
    cursor: 'pointer',
  },
  linkHover: {
    backgroundColor: '#E94560',
    color: '#fff',
  },
  button: {
    backgroundColor: '#E94560',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1.5rem',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: '700',
    boxShadow: '0 4px 8px rgba(233, 69, 96, 0.4)',
    transition: 'background-color 0.3s, box-shadow 0.3s',
  },
  buttonHover: {
    backgroundColor: '#b6314a',
    boxShadow: '0 6px 14px rgba(182, 49, 74, 0.6)',
  },
};


export default Navbar;
